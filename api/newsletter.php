<?php
/**
 * Newsletter Subscription Endpoint for Lagos State MOE&WR
 */

require_once __DIR__ . '/config.php';

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

try {
    $pdo = getDbConnection();
    $stmt = $pdo->prepare("
        INSERT INTO newsletter_subscribers (email, status) 
        VALUES (:email, 'active')
        ON DUPLICATE KEY UPDATE status = 'active'
    ");
    $stmt->execute([':email' => $email]);

    jsonResponse([
        'success' => true,
        'message' => 'You have been successfully subscribed to MOE&WR official bulletins.'
    ]);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => 'Subscription failed: ' . $e->getMessage()], 500);
}
