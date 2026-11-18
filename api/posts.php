<?php
/**
 * Posts API Endpoint for Lagos State MOE&WR
 * Supports category, year, keyword search, and pagination
 */

require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed. Use GET.'], 405);
}

$page     = max(1, (int)($_GET['page'] ?? 1));
$limit    = min(50, max(1, (int)($_GET['limit'] ?? 6)));
$offset   = ($page - 1) * $limit;
$category = trim($_GET['category'] ?? '');
$year     = trim($_GET['year'] ?? '');
$search   = trim($_GET['search'] ?? '');

try {
    $pdo = getDbConnection();

    $whereClauses = ["p.status = 'published'"];
    $params = [];

    // Filter by Year
    if (!empty($year) && $year !== 'All') {
        $whereClauses[] = "YEAR(p.published_at) = :year";
        $params[':year'] = $year;
    }

    // Filter by Category
    if (!empty($category) && $category !== 'All') {
        $whereClauses[] = "EXISTS (
            SELECT 1 FROM post_categories pc 
            JOIN categories c ON pc.category_id = c.id 
            WHERE pc.post_id = p.id AND (c.name = :catName OR c.slug = :catSlug)
        )";
        $params[':catName'] = $category;
        $params[':catSlug'] = strtolower(str_replace(' ', '-', $category));
    }

    // Keyword Search in title and content
    if (!empty($search)) {
        $whereClauses[] = "(p.title LIKE :search OR p.excerpt LIKE :search)";
        $params[':search'] = '%' . $search . '%';
    }

    $whereSql = implode(' AND ', $whereClauses);

    // Count total matching
    $countStmt = $pdo->prepare("SELECT COUNT(*) AS total FROM posts p WHERE {$whereSql}");
    $countStmt->execute($params);
    $totalCount = (int)$countStmt->fetchColumn();

    // Query paginated posts
    $sql = "
        SELECT 
            p.id, p.title, p.slug, p.content_type, p.featured_image, 
            p.excerpt, p.published_at, 
            YEAR(p.published_at) AS year,
            a.display_name AS author_name,
            GROUP_CONCAT(DISTINCT c.name SEPARATOR '||') AS category_names
        FROM posts p
        LEFT JOIN authors a ON p.author_id = a.id
        LEFT JOIN post_categories pc ON p.id = pc.post_id
        LEFT JOIN categories c ON pc.category_id = c.id
        WHERE {$whereSql}
        GROUP BY p.id
        ORDER BY p.published_at DESC
        LIMIT :limit OFFSET :offset
    ";

    $stmt = $pdo->prepare($sql);
    foreach ($params as $k => $v) {
        $stmt->bindValue($k, $v);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
    $rawPosts = $stmt->fetchAll();

    $posts = [];
    foreach ($rawPosts as $row) {
        $categoriesList = !empty($row['category_names']) ? explode('||', $row['category_names']) : [];
        $posts[] = [
            'id'            => $row['id'],
            'title'         => $row['title'],
            'slug'          => $row['slug'],
            'contentType'   => $row['content_type'],
            'featuredImage' => $row['featured_image'],
            'excerpt'       => $row['excerpt'],
            'date'          => $row['published_at'],
            'year'          => (string)$row['year'],
            'author'        => $row['author_name'],
            'categories'    => $categoriesList
        ];
    }

    jsonResponse([
        'success'    => true,
        'page'       => $page,
        'limit'      => $limit,
        'total'      => $totalCount,
        'totalPages' => ceil($totalCount / $limit),
        'posts'      => $posts
    ]);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
