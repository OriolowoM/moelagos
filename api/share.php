<?php
/**
 * Lagos State Ministry of the Environment & Water Resources (MOE&WR)
 * Dynamic Open Graph & WhatsApp Social Share Bot Pre-Renderer
 * Serves rich link previews with thumbnails for WhatsApp, Facebook, Twitter, LinkedIn
 */

header('Content-Type: text/html; charset=utf-8');

$slug = isset($_GET['slug']) ? trim($_GET['slug'], '/') : '';
$base_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'];
$site_title = "Lagos State Ministry of the Environment and Water Resources";
$default_desc = "Official portal of the Lagos State Ministry of the Environment and Water Resources. Securing a cleaner, greener, healthier, and flood-resilient megacity.";
$default_image = $base_url . "/uploads/2025/02/DSC_0126-scaled.jpg";

$post_title = $site_title;
$post_desc = $default_desc;
$post_image = $default_image;
$target_url = $base_url . "/" . ($slug ? "news/" . $slug : "");

// Load posts database or JSON file
$json_path = dirname(__DIR__) . '/src/data/posts.json';
if (!file_exists($json_path)) {
    $json_path = dirname(__DIR__) . '/data/posts.json';
}

if ($slug && file_exists($json_path)) {
    $posts_data = json_decode(file_get_contents($json_path), true);
    if (is_array($posts_data)) {
        foreach ($posts_data as $p) {
            if ($p['slug'] === $slug || (string)$p['id'] === $slug || (string)$p['wpId'] === $slug) {
                $post_title = htmlspecialchars($p['title'], ENT_QUOTES, 'UTF-8');
                $raw_desc = !empty($p['excerpt']) ? $p['excerpt'] : strip_tags($p['content']);
                $post_desc = htmlspecialchars(mb_substr(trim(preg_replace('/\s+/', ' ', $raw_desc)), 0, 200) . '...', ENT_QUOTES, 'UTF-8');
                
                if (!empty($p['featuredImage'])) {
                    if (strpos($p['featuredImage'], 'http') === 0) {
                        $post_image = $p['featuredImage'];
                    } else {
                        $post_image = $base_url . '/' . ltrim($p['featuredImage'], '/');
                    }
                }
                break;
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo $post_title; ?></title>
    
    <!-- Primary Meta Tags -->
    <meta name="title" content="<?php echo $post_title; ?>">
    <meta name="description" content="<?php echo $post_desc; ?>">
    
    <!-- Open Graph / WhatsApp / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="<?php echo $site_title; ?>">
    <meta property="og:url" content="<?php echo $target_url; ?>">
    <meta property="og:title" content="<?php echo $post_title; ?>">
    <meta property="og:description" content="<?php echo $post_desc; ?>">
    <meta property="og:image" content="<?php echo $post_image; ?>">
    <meta property="og:image:secure_url" content="<?php echo $post_image; ?>">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    
    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="<?php echo $target_url; ?>">
    <meta name="twitter:title" content="<?php echo $post_title; ?>">
    <meta name="twitter:description" content="<?php echo $post_desc; ?>">
    <meta name="twitter:image" content="<?php echo $post_image; ?>">
    
    <!-- If opened by a real human browser instead of a bot, instantly redirect to the React article page -->
    <script>
        window.location.replace("<?php echo $target_url; ?>");
    </script>
    <meta http-equiv="refresh" content="0; url=<?php echo $target_url; ?>">
</head>
<body style="font-family: sans-serif; padding: 40px; text-align: center;">
    <h2><?php echo $post_title; ?></h2>
    <p><?php echo $post_desc; ?></p>
    <img src="<?php echo $post_image; ?>" alt="<?php echo $post_title; ?>" style="max-width: 600px; border-radius: 12px; margin-top: 20px;">
    <p style="margin-top: 30px;"><a href="<?php echo $target_url; ?>">Click here if you are not redirected automatically</a></p>
</body>
</html>
