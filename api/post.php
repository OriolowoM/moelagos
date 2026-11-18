<?php
/**
 * Single Post Reader Endpoint for Lagos State MOE&WR
 */

require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed. Use GET.'], 405);
}

$slug = trim($_GET['slug'] ?? '');
$id   = (int)($_GET['id'] ?? 0);

if (empty($slug) && empty($id)) {
    jsonResponse(['success' => false, 'error' => 'Missing post slug or id.'], 400);
}

try {
    $pdo = getDbConnection();

    $sql = "
        SELECT 
            p.*, YEAR(p.published_at) AS year,
            a.display_name AS author_name,
            GROUP_CONCAT(DISTINCT c.name SEPARATOR '||') AS category_names
        FROM posts p
        LEFT JOIN authors a ON p.author_id = a.id
        LEFT JOIN post_categories pc ON p.id = pc.post_id
        LEFT JOIN categories c ON pc.category_id = c.id
        WHERE " . (!empty($slug) ? "p.slug = :slug" : "p.id = :id") . " AND p.status = 'published'
        GROUP BY p.id
        LIMIT 1
    ";

    $stmt = $pdo->prepare($sql);
    if (!empty($slug)) {
        $stmt->bindValue(':slug', $slug);
    } else {
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    }
    $stmt->execute();
    $post = $stmt->fetch();

    if (!$post) {
        jsonResponse(['success' => false, 'error' => 'Post not found'], 404);
    }

    $categoriesList = !empty($post['category_names']) ? explode('||', $post['category_names']) : [];

    jsonResponse([
        'success' => true,
        'post'    => [
            'id'            => $post['id'],
            'title'         => $post['title'],
            'slug'          => $post['slug'],
            'contentType'   => $post['content_type'],
            'featuredImage' => $post['featured_image'],
            'excerpt'       => $post['excerpt'],
            'content'       => $post['content'],
            'date'          => $post['published_at'],
            'year'          => (string)$post['year'],
            'author'        => $post['author_name'],
            'categories'    => $categoriesList
        ]
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
