<?php
/**
 * Lagos State Ministry of the Environment & Water Resources (MOE&WR)
 * Secure Media Upload API for Administrative CMS
 * Handles multi-file uploads of images and audio to /public/uploads/
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed. Use POST.']);
    exit;
}

// Target directory by year and month
$year = date('Y');
$month = date('m');
$upload_dir = dirname(__DIR__) . "/public/uploads/{$year}/{$month}";
$relative_base = "/uploads/{$year}/{$month}";

if (!file_exists($upload_dir)) {
    mkdir($upload_dir, 0755, true);
}

$uploaded_files = [];
$errors = [];

$allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'mp3', 'wav', 'ogg', 'm4a', 'pdf'];

// Normalize files array to handle both single and multiple file uploads
$files = [];
if (isset($_FILES['files'])) {
    if (is_array($_FILES['files']['name'])) {
        for ($i = 0; $i < count($_FILES['files']['name']); $i++) {
            $files[] = [
                'name' => $_FILES['files']['name'][$i],
                'type' => $_FILES['files']['type'][$i],
                'tmp_name' => $_FILES['files']['tmp_name'][$i],
                'error' => $_FILES['files']['error'][$i],
                'size' => $_FILES['files']['size'][$i]
            ];
        }
    } else {
        $files[] = $_FILES['files'];
    }
} elseif (isset($_FILES['file'])) {
    $files[] = $_FILES['file'];
}

if (empty($files)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'No files provided for upload.']);
    exit;
}

foreach ($files as $file) {
    if ($file['error'] !== UPLOAD_ERR_OK) {
        $errors[] = "Error uploading {$file['name']} (Code {$file['error']})";
        continue;
    }

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $allowed_extensions)) {
        $errors[] = "File type not permitted for {$file['name']}";
        continue;
    }

    // Clean filename
    $raw_name = pathinfo($file['name'], PATHINFO_FILENAME);
    $clean_name = preg_replace('/[^a-zA-Z0-9_-]/', '-', $raw_name);
    $unique_name = $clean_name . '-' . time() . '-' . rand(100, 999) . '.' . $ext;
    $target_file = $upload_dir . '/' . $unique_name;
    $relative_url = $relative_base . '/' . $unique_name;

    if (move_uploaded_file($file['tmp_name'], $target_file)) {
        $uploaded_files[] = [
            'name' => $file['name'],
            'url' => $relative_url,
            'size' => round($file['size'] / 1024, 1) . ' KB',
            'type' => in_array($ext, ['mp3', 'wav', 'ogg', 'm4a']) ? 'audio' : 'image',
            'date' => date('Y-m-d H:i:s')
        ];
    } else {
        $errors[] = "Failed to move uploaded file: {$file['name']}";
    }
}

echo json_encode([
    'success' => count($uploaded_files) > 0,
    'files' => $uploaded_files,
    'errors' => $errors
]);
