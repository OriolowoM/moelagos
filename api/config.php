<?php
/**
 * Lagos State Ministry of the Environment and Water Resources (MOE&WR)
 * API Database Configuration & Global Handlers (cPanel / MySQL)
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Credentials (Update with your cPanel MySQL user/pass)
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'moelagos_db');
define('DB_USER', getenv('DB_USER') ?: 'moelagos_user');
define('DB_PASS', getenv('DB_PASS') ?: 'LagosState2026!Secure');
define('DB_CHARSET', 'utf8mb4');

// Complaints Email Routing Directives
define('COMPLAINTS_DISPATCH_EMAILS', [
    'lagosstateministryoftheenviron@gmail.com',
    'env.wr@lagosstate.gov.ng'
]);

function getDbConnection() {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error'   => 'Database connection failed: ' . $e->getMessage()
            ]);
            exit();
        }
    }
    return $pdo;
}

function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit();
}
