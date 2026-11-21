<?php
/**
 * Lagos State Ministry of the Environment & Water Resources
 * One-Click Permissions & Image Path Diagnostic Tool for cPanel
 */

header('Content-Type: application/json; charset=utf-8');

$baseDir = realpath(__DIR__ . '/../');
$uploadsDir = $baseDir . '/uploads';

$report = [
    'server_time'   => date('Y-m-d H:i:s'),
    'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? '',
    'base_dir'      => $baseDir,
    'uploads_exist' => is_dir($uploadsDir),
    'uploads_perms' => is_dir($uploadsDir) ? substr(sprintf('%o', fileperms($uploadsDir)), -4) : 'N/A',
    'dirs_fixed'    => 0,
    'files_fixed'   => 0,
    'sample_images' => []
];

if (is_dir($uploadsDir)) {
    // Recursively fix directory and file permissions
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($uploadsDir, RecursiveDirectoryIterator::SKIP_DOTS),
        RecursiveIteratorIterator::SELF_FIRST
    );

    // First fix root uploads directory itself
    @chmod($uploadsDir, 0755);

    foreach ($iterator as $item) {
        $path = $item->getPathname();
        if ($item->isDir()) {
            if (@chmod($path, 0755)) {
                $report['dirs_fixed']++;
            }
        } else {
            if (@chmod($path, 0644)) {
                $report['files_fixed']++;
            }
        }
    }
}

// Check sample images
$samples = [
    '/uploads/2026/11/1000556945.jpg',
    '/uploads/2026/11/1000507898-scaled.jpg',
    '/uploads/2026/11/1000529159.jpg',
    '/uploads/2025/05/TokunboWahab.jpg',
    '/uploads/2023/04/Post-10.jpg'
];

foreach ($samples as $s) {
    $full = $baseDir . $s;
    $report['sample_images'][$s] = [
        'exists'    => file_exists($full),
        'size'      => file_exists($full) ? filesize($full) : 0,
        'readable'  => is_readable($full),
        'perms'     => file_exists($full) ? substr(sprintf('%o', fileperms($full)), -4) : 'N/A'
    ];
}

$report['status'] = 'Permissions scan and auto-fix complete. Directory permissions set to 0755, files to 0644.';
echo json_encode($report, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
