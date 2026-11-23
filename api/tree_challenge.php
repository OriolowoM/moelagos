<?php
/**
 * Lagos State Ministry of the Environment and Water Resources (MOE&WR)
 * "My Tree Challenge" Campaign Registration Endpoint
 * 
 * World Environment Day Special Campaign — Plant for a Greener Lagos
 */

require_once __DIR__ . '/config.php';

$json_storage = __DIR__ . '/data/tree_registrations.json';

// Handle Admin Query: GET /api/tree_challenge.php?action=list
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = $_GET['action'] ?? '';
    if ($action === 'list') {
        $registrations = [];
        if (file_exists($json_storage)) {
            $registrations = json_decode(file_get_contents($json_storage), true) ?: [];
        }
        jsonResponse([
            'success' => true,
            'total' => count($registrations),
            'registrations' => $registrations
        ]);
    }
    jsonResponse(['success' => false, 'error' => 'Invalid action.'], 400);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed. Use POST.'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$full_name = trim($input['fullName'] ?? '');
$category  = trim($input['category'] ?? 'Individual Resident');
$lga       = trim($input['lga'] ?? 'Ikeja');
$email     = filter_var(trim($input['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone     = trim($input['phone'] ?? '');
$species   = trim($input['species'] ?? 'Indigenous Hardwood / Fruit Tree');
$address   = trim($input['plantingAddress'] ?? '');
$target_date = trim($input['targetDate'] ?? date('Y-m-d'));

if (empty($full_name) || !$email || empty($phone)) {
    jsonResponse(['success' => false, 'error' => 'Full Name, valid Email address, and Phone number are required.'], 400);
}

$client_ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$timestamp = date('Y-m-d H:i:s');

// 1. Generate Unique Official Registration ID
$random_num = str_pad(mt_rand(1001, 9999), 4, '0', STR_PAD_LEFT);
$reg_id = "LASG-TREE-2026-" . $random_num;

$record = [
    'registration_id' => $reg_id,
    'full_name'       => $full_name,
    'category'        => $category,
    'lga'             => $lga,
    'email'           => strtolower($email),
    'phone'           => $phone,
    'species'         => $species,
    'planting_address'=> $address,
    'target_date'     => $target_date,
    'registered_at'   => $timestamp,
    'status'          => 'Registered',
    'ip'              => $client_ip
];

// 2. Save to JSON file storage
$registrations = [];
if (file_exists($json_storage)) {
    $registrations = json_decode(file_get_contents($json_storage), true) ?: [];
}
$registrations[] = $record;
@file_put_contents($json_storage, json_encode($registrations, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

// 3. Save to MySQL database if available
try {
    $pdo = getDbConnection();
    if ($pdo) {
        $stmt = $pdo->prepare("
            INSERT INTO tree_challenge_registrations 
            (registration_id, full_name, category, lga, email, phone, species, planting_address, target_date, created_at, status) 
            VALUES (:reg_id, :full_name, :category, :lga, :email, :phone, :species, :address, :tdate, :ts, 'Registered')
        ");
        $stmt->execute([
            ':reg_id'   => $reg_id,
            ':full_name'=> $full_name,
            ':category' => $category,
            ':lga'      => $lga,
            ':email'    => strtolower($email),
            ':phone'    => $phone,
            ':species'  => $species,
            ':address'  => $address,
            ':tdate'    => $target_date,
            ':ts'       => $timestamp
        ]);
    }
} catch (Exception $e) {
    // Database fallback bypassed smoothly
}

// 4. Dispatch Email to Ministry Admin
$notify_targets = defined('TREE_CHALLENGE_DISPATCH_EMAILS') 
    ? TREE_CHALLENGE_DISPATCH_EMAILS 
    : ['env.wr@lagosstate.gov.ng', 'lagosstateministryoftheenviron@gmail.com'];

$admin_subject = "[Tree Challenge 2026] New Registration: " . $reg_id . " (" . $full_name . ")";
$admin_body = "Lagos State 'My Tree Challenge' Campaign\n\n"
    . "A new participant has registered for the Greener Lagos Challenge:\n"
    . "• Registration ID: " . $reg_id . "\n"
    . "• Participant Name: " . $full_name . "\n"
    . "• Category: " . $category . "\n"
    . "• LGA / LCDA: " . $lga . "\n"
    . "• Email Address: " . $email . "\n"
    . "• Phone / WhatsApp: " . $phone . "\n"
    . "• Target Species: " . $species . "\n"
    . "• Planting Location: " . $address . "\n"
    . "• Registered Time: " . $timestamp . " WAT\n\n"
    . "View all challenge entries at: https://moelagos.gov.ng/admin\n\n"
    . "Lagos State Ministry of the Environment & Water Resources";

$admin_headers = "From: Lagos State MOE&WR <no-reply@moelagos.gov.ng>\r\n"
    . "Reply-To: " . $email . "\r\n"
    . "X-Mailer: PHP/" . phpversion();

foreach ($notify_targets as $target) {
    @mail($target, $admin_subject, $admin_body, $admin_headers);
}

// 5. Dispatch Official Confirmation Email to Participant
$user_subject = "Tree Challenge Registration Confirmed — " . $reg_id;
$user_body = "Dear " . $full_name . ",\n\n"
    . "Congratulations! You have successfully registered for the Lagos State Ministry of the Environment & Water Resources 'My Tree Challenge' (World Environment Day Special Campaign).\n\n"
    . "YOUR OFFICIAL DETAILS:\n"
    . "• Registration ID: " . $reg_id . "\n"
    . "• Participation Category: " . $category . "\n"
    . "• LGA / LCDA: " . $lga . "\n"
    . "• Tree Species: " . $species . "\n"
    . "• Planting Site: " . $address . "\n\n"
    . "HOW TO COMPETE FOR THE ₦6.5M PRIZE POOL:\n"
    . "1. Plant your designated tree at your registered location.\n"
    . "2. Take an initial geotagged photo showing the sapling planted.\n"
    . "3. Upload monthly growth photo updates on the portal.\n"
    . "4. LASPARK and Ministry environmental evaluators will inspect surviving trees.\n"
    . "5. Awards Ceremony: World Environment Day (June 5, 2027)!\n\n"
    . "Thank you for contributing to an eco-friendly, flood-resilient, and greener Lagos State.\n\n"
    . "Warm regards,\n"
    . "Office of the Honourable Commissioner\n"
    . "Lagos State Ministry of the Environment and Water Resources\n"
    . "https://moelagos.gov.ng";

$user_headers = "From: Lagos State MOE&WR <no-reply@moelagos.gov.ng>\r\n"
    . "Reply-To: env.wr@lagosstate.gov.ng\r\n"
    . "X-Mailer: PHP/" . phpversion();

@mail($email, $user_subject, $user_body, $user_headers);

jsonResponse([
    'success' => true,
    'message' => 'Congratulations! Your registration for My Tree Challenge has been recorded successfully.',
    'registrationId' => $reg_id,
    'data' => $record
]);
