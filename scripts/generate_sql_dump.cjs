const fs = require('fs');
const path = require('path');

const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/posts.json'), 'utf8'));
const pages = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/pages.json'), 'utf8'));

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
    .replace(/\0/g, '\\0') + "'";
}

let sql = `-- Lagos State Ministry of the Environment and Water Resources
-- Production Database Dump (Synchronized: 2026-11-19)
-- Complete Migration: ${posts.length} Published Posts & ${pages.length} Pages

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for authors
-- ----------------------------
DROP TABLE IF EXISTS \`authors\`;
CREATE TABLE \`authors\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`username\` varchar(60) NOT NULL,
  \`name\` varchar(250) DEFAULT NULL,
  \`email\` varchar(100) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`username\` (\`username\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`authors\` (\`id\`, \`username\`, \`name\`, \`email\`) VALUES
(1, 'moelagos', 'Ministry of the Environment & Water Resources', 'env.wr@lagosstate.gov.ng'),
(2, 'moel', 'MOE Media Officer', 'press@moelagos.gov.ng');

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS \`categories\`;
CREATE TABLE \`categories\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(200) NOT NULL,
  \`slug\` varchar(200) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`slug\` (\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS \`posts\`;
CREATE TABLE \`posts\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`wp_id\` int(11) DEFAULT NULL,
  \`title\` text NOT NULL,
  \`slug\` varchar(255) NOT NULL,
  \`content\` longtext DEFAULT NULL,
  \`excerpt\` text DEFAULT NULL,
  \`featured_image\` text DEFAULT NULL,
  \`content_type\` varchar(50) DEFAULT 'news',
  \`author_id\` int(11) DEFAULT 1,
  \`status\` varchar(20) DEFAULT 'publish',
  \`date\` datetime DEFAULT NULL,
  \`modified\` datetime DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`wp_id\` (\`wp_id\`),
  KEY \`slug\` (\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for pages
-- ----------------------------
DROP TABLE IF EXISTS \`pages\`;
CREATE TABLE \`pages\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`wp_id\` int(11) DEFAULT NULL,
  \`title\` text NOT NULL,
  \`slug\` varchar(255) NOT NULL,
  \`content\` longtext DEFAULT NULL,
  \`parent\` int(11) DEFAULT 0,
  \`menu_order\` int(11) DEFAULT 0,
  \`featured_image\` text DEFAULT NULL,
  \`status\` varchar(20) DEFAULT 'publish',
  \`date\` datetime DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`wp_id\` (\`wp_id\`),
  KEY \`slug\` (\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for complaints
-- ----------------------------
DROP TABLE IF EXISTS \`complaints\`;
CREATE TABLE \`complaints\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`ticket_id\` varchar(32) NOT NULL,
  \`full_name\` varchar(150) NOT NULL,
  \`email\` varchar(120) NOT NULL,
  \`phone\` varchar(30) NOT NULL,
  \`category\` varchar(80) NOT NULL,
  \`lga\` varchar(80) NOT NULL,
  \`location_address\` text NOT NULL,
  \`description\` text NOT NULL,
  \`status\` varchar(30) DEFAULT 'Pending Review',
  \`created_at\` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`ticket_id\` (\`ticket_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for newsletter_subscribers
-- ----------------------------
DROP TABLE IF EXISTS \`newsletter_subscribers\`;
CREATE TABLE \`newsletter_subscribers\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`email\` varchar(120) NOT NULL,
  \`subscribed_at\` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`email\` (\`email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of posts (${posts.length} entries)
-- ----------------------------
`;

// Build batch inserts for posts
console.log('Generating SQL inserts for posts...');
for (const p of posts) {
  const authorId = p.author === 'moel' ? 2 : 1;
  sql += `INSERT INTO \`posts\` (\`wp_id\`, \`title\`, \`slug\`, \`content\`, \`excerpt\`, \`featured_image\`, \`content_type\`, \`author_id\`, \`status\`, \`date\`, \`modified\`) VALUES (${escapeSql(p.wpId)}, ${escapeSql(p.title)}, ${escapeSql(p.slug)}, ${escapeSql(p.content)}, ${escapeSql(p.excerpt)}, ${escapeSql(p.featuredImage)}, ${escapeSql(p.contentType)}, ${authorId}, 'publish', ${escapeSql(p.date)}, ${escapeSql(p.modified)});\n`;
}

// Build batch inserts for pages
console.log('Generating SQL inserts for pages...');
sql += `\n-- ----------------------------\n-- Records of pages (${pages.length} entries)\n-- ----------------------------\n`;
for (const pg of pages) {
  sql += `INSERT INTO \`pages\` (\`wp_id\`, \`title\`, \`slug\`, \`content\`, \`parent\`, \`menu_order\`, \`featured_image\`, \`status\`, \`date\`) VALUES (${escapeSql(pg.wpId)}, ${escapeSql(pg.title)}, ${escapeSql(pg.slug)}, ${escapeSql(pg.content)}, ${parseInt(pg.parent) || 0}, ${pg.order || 0}, ${escapeSql(pg.featuredImage)}, 'publish', ${escapeSql(pg.date)});\n`;
}

sql += `\nSET FOREIGN_KEY_CHECKS = 1;\n`;

fs.writeFileSync(path.join(__dirname, '../database/moelagos_database.sql'), sql, 'utf8');
console.log('Generated database/moelagos_database.sql successfully! Total size: ' + Math.round(sql.length / 1024) + ' KB');
