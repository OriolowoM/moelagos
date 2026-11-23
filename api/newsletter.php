<?php
/**
 * Lagos State Ministry of the Environment and Water Resources (MOE&WR)
 * Public Bulletin & Newsletter Subscription Endpoint
 * 
 * 1. Validates submitted email.
 * 2. Saves to persistent JSON archive: api/data/newsletter_subscribers.json
 * 3. Saves to MySQL newsletter_subscribers table if DB is available.
 * 4. Dispatches notification email to official Ministry inbox (Env.wr@lagosstate.gov.ng).
 * 5. Dispatches official confirmation email to the subscriber.
 * 6. Supports admin query: GET ?action=list
 */

require_once __DIR__ . '/config.php';

$json_storage = __DIR__ . '/data/newsletter_subscribers.json';

// Handle Admin Query: GET /api/newsletter.php?action=list
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = $_GET['action'] ?? '';
    if ($action === 'list') {
        $subscribers = [];
        if (file_exists($json_storage)) {
            $subscribers = json_decode(file_get_contents($json_storage), true) ?: [];
        }
        jsonResponse([
            'success' => true,
            'total' => count($subscribers),
            'subscribers' => $subscribers
        ]);
    }
    jsonResponse(['success' => false, 'error' => 'Invalid action.'], 400);
}

// Handle Subscription: POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed. Use POST.'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$email = filter_var(trim($input['email'] ?? ''), FILTER_VALIDATE_EMAIL);

if (!$email) {
    jsonResponse(['success' => false, 'error' => 'Please provide a valid email address.'], 400);
}

$client_ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$user_agent = substr($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown', 0, 200);
$timestamp = date('Y-m-d H:i:s');

// 1. Save to Persistent JSON storage
$subscribers = [];
if (file_exists($json_storage)) {
    $subscribers = json_decode(file_get_contents($json_storage), true) ?: [];
}

$exists = false;
foreach ($subscribers as &$sub) {
    if (strtolower($sub['email']) === strtolower($email)) {
        $sub['last_subscribed'] = $timestamp;
        $sub['status'] = 'active';
        $exists = true;
        break;
    }
}

if (!$exists) {
    $subscribers[] = [
        'id' => count($subscribers) + 1,
        'email' => strtolower($email),
        'subscribed_at' => $timestamp,
        'last_subscribed' => $timestamp,
        'ip' => $client_ip,
        'status' => 'active'
    ];
}

@file_put_contents($json_storage, json_encode($subscribers, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

// 2. Save to MySQL database if available
try {
    $pdo = getDbConnection();
    if ($pdo) {
        $stmt = $pdo->prepare("
            INSERT INTO newsletter_subscribers (email, status, created_at) 
            VALUES (:email, 'active', :ts)
            ON DUPLICATE KEY UPDATE status = 'active', updated_at = :ts2
        ");
        $stmt->execute([
            ':email' => strtolower($email),
            ':ts' => $timestamp,
            ':ts2' => $timestamp
        ]);
    }
} catch (Exception $e) {
    // Database fallback is gracefully bypassed because JSON storage succeeded
}

// 3. Dispatch Notification to Official Ministry Inboxes
$notify_targets = defined('NEWSLETTER_DISPATCH_EMAILS') 
    ? NEWSLETTER_DISPATCH_EMAILS 
    : ['env.wr@lagosstate.gov.ng', 'lagosstateministryoftheenviron@gmail.com'];

$site_name = "Lagos State Ministry of the Environment & Water Resources";
$admin_subject = "[MOE&WR Portal] New Public Bulletin Subscriber: " . $email;
$admin_body = "Official Portal Public Bulletin Subscription\n\n"
    . "A new subscriber has registered to receive official bulletins:\n"
    . "• Email Address: " . $email . "\n"
    . "• Registration Time: " . $timestamp . " WAT\n"
    . "• IP Address: " . $client_ip . "\n"
    . "• Total Active Subscribers: " . count($subscribers) . "\n\n"
    . "You can view and export all subscribers from the Administration CMS:\n"
    . "https://moelagos.gov.ng/admin\n\n"
    . "Lagos State Government — Ministry of the Environment and Water Resources";

$admin_headers = "From: Lagos State MOE&WR <no-reply@moelagos.gov.ng>\r\n"
    . "Reply-To: " . $email . "\r\n"
    . "X-Mailer: PHP/" . phpversion();

foreach ($notify_targets as $target) {
    @mail($target, $admin_subject, $admin_body, $admin_headers);
}

// 4. Dispatch Official Confirmation Email to Resident / Subscriber
$user_subject = "Subscription Confirmed — Lagos State Ministry of the Environment & Water Resources";
$user_body = "Dear Resident / Stakeholder,\n\n"
    . "Thank you for subscribing to official bulletins, flood mitigation alerts, weather forecasts, sanitation schedules, and environmental advisories from the Lagos State Ministry of the Environment and Water Resources (MOE&WR).\n\n"
    . "You will now receive official press statements and public advisories directly from the Ministry and its parastatal agencies (LAWMA, LASEPA, LASPARK, LAGESC, and ODS&WR).\n\n"
    . "Official Portal: https://moelagos.gov.ng\n"
    . "Complaints Desk: https://moelagos.gov.ng/contact\n"
    . "Headquarters: Block 16 & 17, The Secretariat Annex, Alausa, Ikeja, Lagos State.\n"
    . "Telephone Contact: +234 810 255 3775\n\n"
    . "Securing a cleaner, greener, healthier, and flood-resilient megacity.\n\n"
    . "Warm regards,\n"
    . "Public Affairs & ICT Directorate\n"
    . "Lagos State Ministry of the Environment and Water Resources";

$user_headers = "From: Lagos State MOE&WR <no-reply@moelagos.gov.ng>\r\n"
    . "Reply-To: env.wr@lagosstate.gov.ng\r\n"
    . "X-Mailer: PHP/" . phpversion();

@mail($email, $user_subject, $user_body, $user_headers);

jsonResponse([
    'success' => true,
    'message' => 'Thank you! You have been successfully subscribed to MOE&WR official bulletins and alerts.',
    'email' => $email
]);
