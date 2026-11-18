const fs = require('fs');
const path = require('path');

const DB_DIR = path.join(__dirname, 'database');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str)
    .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
      switch (char) {
        case "\0": return "\\0";
        case "\x08": return "\\b";
        case "\x09": return "\\t";
        case "\x1a": return "\\z";
        case "\n": return "\\n";
        case "\r": return "\\r";
        case "\"": case "'": case "\\": case "%":
          return "\\" + char;
        default: return char;
      }
    }) + "'";
}

function generateSql() {
  console.log('Generating MySQL schema and seed data for cPanel deployment...');

  const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'posts.json'), 'utf8'));
  const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'pages.json'), 'utf8'));
  const attachments = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'attachments.json'), 'utf8'));

  let sql = `-- =====================================================================
-- Lagos State Ministry of the Environment and Water Resources (MOE&WR)
-- Database Name: moelagos_db
-- Target Stack: MySQL 5.7+ / 8.0+ on cPanel
-- Generated: ${new Date().toISOString()}
-- =====================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+01:00";

DROP TABLE IF EXISTS post_tags;
DROP TABLE IF EXISTS post_categories;
DROP TABLE IF EXISTS complaints;
DROP TABLE IF EXISTS newsletter_subscribers;
DROP TABLE IF EXISTS attachments;
DROP TABLE IF EXISTS pages;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS authors;

-- ---------------------------------------------------------------------
-- Table: authors
-- ---------------------------------------------------------------------
CREATE TABLE authors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  display_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NULL,
  role VARCHAR(50) DEFAULT 'editor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: categories
-- ---------------------------------------------------------------------
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL UNIQUE,
  description TEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: tags
-- ---------------------------------------------------------------------
CREATE TABLE tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: posts
-- ---------------------------------------------------------------------
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  wp_id VARCHAR(50) NULL,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL,
  content_type ENUM('news', 'press_release', 'report', 'event') DEFAULT 'news',
  status ENUM('published', 'draft', 'archived') DEFAULT 'published',
  author_id INT NULL,
  featured_image VARCHAR(1000) NULL,
  excerpt TEXT NULL,
  content LONGTEXT NULL,
  published_at DATETIME NOT NULL,
  modified_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_published_at (published_at),
  INDEX idx_content_type (content_type),
  INDEX idx_slug (slug(191)),
  CONSTRAINT fk_posts_author FOREIGN KEY (author_id) REFERENCES authors (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: post_categories
-- ---------------------------------------------------------------------
CREATE TABLE post_categories (
  post_id INT NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (post_id, category_id),
  CONSTRAINT fk_pc_post FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
  CONSTRAINT fk_pc_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: post_tags
-- ---------------------------------------------------------------------
CREATE TABLE post_tags (
  post_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (post_id, tag_id),
  CONSTRAINT fk_pt_post FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
  CONSTRAINT fk_pt_tag FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: attachments (Media files on local filesystem: /uploads/...)
-- ---------------------------------------------------------------------
CREATE TABLE attachments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  wp_id VARCHAR(50) NULL,
  title VARCHAR(500) NULL,
  file_path VARCHAR(1000) NOT NULL,
  original_url VARCHAR(1000) NULL,
  parent_id VARCHAR(50) NULL,
  created_at DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: pages
-- ---------------------------------------------------------------------
CREATE TABLE pages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  wp_id VARCHAR(50) NULL,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL,
  parent_id VARCHAR(50) DEFAULT '0',
  menu_order INT DEFAULT 0,
  content LONGTEXT NULL,
  featured_image VARCHAR(1000) NULL,
  created_at DATETIME NULL,
  INDEX idx_pages_slug (slug(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: complaints (Dispatched to official emails)
-- ---------------------------------------------------------------------
CREATE TABLE complaints (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tracking_ref VARCHAR(50) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NULL,
  lga VARCHAR(100) NOT NULL,
  landmark VARCHAR(500) NOT NULL,
  category VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  attachment_path VARCHAR(1000) NULL,
  status ENUM('pending', 'in_review', 'dispatched', 'resolved') DEFAULT 'pending',
  emails_dispatched_to VARCHAR(500) DEFAULT 'lagosstateministryoftheenviron@gmail.com, env.wr@lagosstate.gov.ng',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_tracking_ref (tracking_ref)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: newsletter_subscribers
-- ---------------------------------------------------------------------
CREATE TABLE newsletter_subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  status ENUM('active', 'unsubscribed') DEFAULT 'active',
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Insert Authors
-- ---------------------------------------------------------------------
INSERT INTO authors (id, username, display_name, email, role) VALUES
(1, 'moel', 'Directorate of Public Affairs', 'env.wr@lagosstate.gov.ng', 'administrator'),
(2, 'rahman', 'Rahman - Media Office', 'lagosstateministryoftheenviron@gmail.com', 'editor'),
(3, 'moe', 'MOE&WR Secretariat', 'info@moelagos.gov.ng', 'editor');

`;

  // Authors mapping
  const authorMap = { 'moel': 1, 'rahman': 2, 'moe': 3 };

  // Categories mapping
  const categoryMap = new Map();
  let catIdCounter = 1;

  for (const post of posts) {
    if (post.categories) {
      for (const catName of post.categories) {
        if (!categoryMap.has(catName)) {
          const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
          categoryMap.set(catName, { id: catIdCounter++, name: catName, slug });
        }
      }
    }
  }

  sql += `-- ---------------------------------------------------------------------\n`;
  sql += `-- Insert Categories (${categoryMap.size} records)\n`;
  sql += `-- ---------------------------------------------------------------------\n`;
  sql += `INSERT INTO categories (id, name, slug) VALUES\n`;
  const catRows = [];
  for (const [name, data] of categoryMap.entries()) {
    catRows.push(`(${data.id}, ${escapeSql(data.name)}, ${escapeSql(data.slug)})`);
  }
  sql += catRows.join(',\n') + ';\n\n';

  // Insert Posts
  sql += `-- ---------------------------------------------------------------------\n`;
  sql += `-- Insert Published Posts (${posts.length} records)\n`;
  sql += `-- ---------------------------------------------------------------------\n`;

  const postRows = [];
  const postCatInserts = [];
  let postIdCounter = 1;

  for (const p of posts) {
    const currentPostId = postIdCounter++;
    const authorId = authorMap[p.author] || 1;
    const pubDate = p.date ? p.date : '2026-01-01 00:00:00';
    const modDate = p.modified ? p.modified : pubDate;
    
    // Convert remote image url to local filesystem relative path if it matches uploads
    let localFeaturedImage = p.featuredImage;
    if (localFeaturedImage && localFeaturedImage.includes('/wp-content/uploads/')) {
      localFeaturedImage = localFeaturedImage.replace(/https?:\/\/moelagos\.gov\.ng\/wp-content\/uploads\//i, '/uploads/');
    }

    postRows.push(`(${currentPostId}, ${escapeSql(p.id)}, ${escapeSql(p.title)}, ${escapeSql(p.slug)}, ${escapeSql(p.contentType)}, 'published', ${authorId}, ${escapeSql(localFeaturedImage)}, ${escapeSql(p.excerpt)}, ${escapeSql(p.content)}, ${escapeSql(pubDate)}, ${escapeSql(modDate)})`);

    // Map categories
    if (p.categories) {
      for (const c of p.categories) {
        if (categoryMap.has(c)) {
          postCatInserts.push(`(${currentPostId}, ${categoryMap.get(c).id})`);
        }
      }
    }
  }

  // Write posts in chunks of 50 to avoid massive query packets
  const chunkSize = 50;
  for (let i = 0; i < postRows.length; i += chunkSize) {
    const chunk = postRows.slice(i, i + chunkSize);
    sql += `INSERT INTO posts (id, wp_id, title, slug, content_type, status, author_id, featured_image, excerpt, content, published_at, modified_at) VALUES\n` + chunk.join(',\n') + ';\n\n';
  }

  // Insert Post Categories relations
  if (postCatInserts.length > 0) {
    sql += `-- ---------------------------------------------------------------------\n`;
    sql += `-- Insert Post Category Relations (${postCatInserts.length} relations)\n`;
    sql += `-- ---------------------------------------------------------------------\n`;
    for (let i = 0; i < postCatInserts.length; i += 200) {
      const chunk = postCatInserts.slice(i, i + 200);
      sql += `INSERT IGNORE INTO post_categories (post_id, category_id) VALUES\n` + chunk.join(',\n') + ';\n\n';
    }
  }

  // Insert Pages
  sql += `-- ---------------------------------------------------------------------\n`;
  sql += `-- Insert Pages (${pages.length} records)\n`;
  sql += `-- ---------------------------------------------------------------------\n`;
  const pageRows = [];
  for (let i = 0; i < pages.length; i++) {
    const pg = pages[i];
    pageRows.push(`(${i + 1}, ${escapeSql(pg.id)}, ${escapeSql(pg.title)}, ${escapeSql(pg.slug)}, ${escapeSql(pg.parent)}, ${pg.menuOrder || 0}, ${escapeSql(pg.content)}, ${escapeSql(pg.featuredImage)}, ${escapeSql(pg.date)})`);
  }
  for (let i = 0; i < pageRows.length; i += chunkSize) {
    const chunk = pageRows.slice(i, i + chunkSize);
    sql += `INSERT INTO pages (id, wp_id, title, slug, parent_id, menu_order, content, featured_image, created_at) VALUES\n` + chunk.join(',\n') + ';\n\n';
  }

  // Insert Attachments (first 300 key attachments)
  sql += `-- ---------------------------------------------------------------------\n`;
  sql += `-- Insert Local Media Attachments (${attachments.length} records)\n`;
  sql += `-- ---------------------------------------------------------------------\n`;
  const attachRows = [];
  for (let i = 0; i < attachments.length; i++) {
    const att = attachments[i];
    let localPath = att.url || '';
    if (localPath.includes('/wp-content/uploads/')) {
      localPath = localPath.replace(/https?:\/\/moelagos\.gov\.ng\/wp-content\/uploads\//i, '/uploads/');
    }
    attachRows.push(`(${i + 1}, ${escapeSql(att.id)}, ${escapeSql(att.title)}, ${escapeSql(localPath)}, ${escapeSql(att.url)}, ${escapeSql(att.parent)}, ${escapeSql(att.date)})`);
  }
  for (let i = 0; i < attachRows.length; i += 100) {
    const chunk = attachRows.slice(i, i + 100);
    sql += `INSERT INTO attachments (id, wp_id, title, file_path, original_url, parent_id, created_at) VALUES\n` + chunk.join(',\n') + ';\n\n';
  }

  sql += `SET FOREIGN_KEY_CHECKS = 1;\n`;
  sql += `-- =====================================================================\n`;
  sql += `-- End of MOE Lagos Database Export\n`;
  sql += `-- =====================================================================\n`;

  const outputPath = path.join(DB_DIR, 'moelagos_database.sql');
  fs.writeFileSync(outputPath, sql, 'utf8');
  console.log(`Generated database/moelagos_database.sql (${(fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2)} MB)`);
}

generateSql();
