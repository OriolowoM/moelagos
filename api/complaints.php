<?php
/**
 * Complaints Desk Submission & Dual-Email Dispatch Handler
 * Lagos State Ministry of the Environment and Water Resources
 */

require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed. Use POST.'], 405);
}

// Read raw JSON input or POST fields
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

// Validate mandatory fields
$fullName    = trim($input['fullName'] ?? '');
$phone       = trim($input['phone'] ?? '');
$email       = trim($input['email'] ?? '');
$lga         = trim($input['lga'] ?? '');
$landmark    = trim($input['landmark'] ?? '');
$category    = trim($input['category'] ?? '');
$description = trim($input['description'] ?? '');

if (empty($fullName) || empty($phone) || empty($lga) || empty($landmark) || empty($category) || empty($description)) {
    jsonResponse(['success' => false, 'error' => 'Please fill in all mandatory fields.'], 400);
}

// Generate unique government tracking reference
$randomCode = mt_rand(100000, 999999);
$trackingRef = 'LASG-MOE-2026-' . $randomCode;
$dispatchedRecipients = implode(', ', COMPLAINTS_DISPATCH_EMAILS);

try {
    $pdo = getDbConnection();

    // Insert into complaints table
    $stmt = $pdo->prepare("
        INSERT INTO complaints 
        (tracking_ref, full_name, phone, email, lga, landmark, category, description, status, emails_dispatched_to) 
        VALUES 
        (:tracking_ref, :full_name, :phone, :email, :lga, :landmark, :category, :description, 'pending', :emails_dispatched_to)
    ");

    $stmt->execute([
        ':tracking_ref'          => $trackingRef,
        ':full_name'             => $fullName,
        ':phone'                 => $phone,
        ':email'                 => $email,
        ':lga'                   => $lga,
        ':landmark'              => $landmark,
        ':category'              => $category,
        ':description'           => $description,
        ':emails_dispatched_to'  => $dispatchedRecipients
    ]);

    // Format HTML email notification
    $subject = "🚨 [URGENT MOE INCIDENT REPORT] Ref: {$trackingRef} - {$category} ({$lga})";
    
    $emailBody = "
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset='utf-8'>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #008751; color: white; padding: 15px 20px; border-radius: 6px 6px 0 0; }
        .content { padding: 20px; border: 1px solid #ddd; border-top: none; }
        .meta-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        .meta-table td { padding: 8px 12px; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; width: 30%; background: #f9f9f9; }
        .ref-box { background: #fff4eb; border: 2px dashed #FF6A00; padding: 12px; font-size: 18px; font-weight: bold; color: #FF6A00; text-align: center; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class='header'>
        <h2 style='margin:0;'>Lagos State Ministry of the Environment & Water Resources</h2>
        <p style='margin:4px 0 0; font-size: 13px;'>Citizen Incident Report & Complaints Desk Notification</p>
      </div>
      <div class='content'>
        <div class='ref-box'>Tracking Reference: {$trackingRef}</div>
        <p>A new citizen environmental incident report has been registered via the official portal.</p>
        <table class='meta-table'>
          <tr><td class='label'>Incident Category</td><td><strong>{$category}</strong></td></tr>
          <tr><td class='label'>Local Govt Area (LGA)</td><td><strong>{$lga}</strong></td></tr>
          <tr><td class='label'>Location / Landmark</td><td>{$landmark}</td></tr>
          <tr><td class='label'>Complainant Name</td><td>{$fullName}</td></tr>
          <tr><td class='label'>Phone Number</td><td>{$phone}</td></tr>
          <tr><td class='label'>Email Address</td><td>" . ($email ?: 'Not provided') . "</td></tr>
          <tr><td class='label'>Logged Timestamp</td><td>" . date('Y-m-d H:i:s') . "</td></tr>
        </table>
        <h3 style='margin-top:20px; color:#008751;'>Incident Description:</h3>
        <div style='background:#f5f5f5; padding:15px; border-radius:4px;'>
          " . nl2br(htmlspecialchars($description)) . "
        </div>
        <p style='font-size:12px; color:#888; margin-top:30px;'>
          This is an automated dispatch from the MOE&WR Portal. Notification delivered to: " . htmlspecialchars($dispatchedRecipients) . ".
        </p>
      </div>
    </body>
    </html>
    ";

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: MOE Complaints Desk <noreply@moelagos.gov.ng>\r\n";
    $headers .= "Reply-To: {$fullName} <" . ($email ?: 'noreply@moelagos.gov.ng') . ">\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Deliver to both official recipient addresses
    foreach (COMPLAINTS_DISPATCH_EMAILS as $recipientEmail) {
        @mail($recipientEmail, $subject, $emailBody, $headers);
    }

    jsonResponse([
        'success'     => true,
        'trackingRef' => $trackingRef,
        'message'     => 'Complaint successfully registered and dispatched to the Ministry response teams.',
        'dispatched'  => COMPLAINTS_DISPATCH_EMAILS
    ], 201);

} catch (Exception $e) {
    jsonResponse([
        'success' => false,
        'error'   => 'Failed to save complaint: ' . $e->getMessage()
    ], 500);
}
