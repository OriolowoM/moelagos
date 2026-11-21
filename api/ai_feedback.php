<?php
/**
 * Lagos State Ministry of the Environment and Water Resources (MOE&WR)
 * AI Assistant Citizen Feedback Handler
 */

require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed. Use POST.'], 405);
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

$rating = trim($data['rating'] ?? ''); // 'helpful' or 'not_helpful'
$query = trim($data['query'] ?? '');
$comment = trim($data['comment'] ?? '');
$agencyId = trim($data['agencyId'] ?? '');

if (!in_array($rating, ['helpful', 'not_helpful'])) {
    jsonResponse(['success' => false, 'error' => 'Invalid rating value.'], 400);
}

$feedbackFile = __DIR__ . '/data/ai_feedback_log.json';
$feedbackEntry = [
    'id'        => uniqid('fb_', true),
    'timestamp' => date('Y-m-d H:i:s'),
    'rating'    => $rating,
    'query'     => $query,
    'comment'   => $comment,
    'agencyId'  => $agencyId
];

try {
    $existing = file_exists($feedbackFile) ? json_decode(file_get_contents($feedbackFile), true) : [];
    if (!is_array($existing)) { $existing = []; }
    array_unshift($existing, $feedbackEntry);
    if (count($existing) > 500) {
        $existing = array_slice($existing, 0, 500);
    }
    @file_put_contents($feedbackFile, json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
} catch (Exception $e) {}

jsonResponse([
    'success' => true,
    'message' => 'Thank you for your feedback. This helps the Ministry maintain high public information standards.'
]);
