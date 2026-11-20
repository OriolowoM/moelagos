import xml.etree.ElementTree as ET
import json
import os

xml_path = r'c:\projects\moelagos\pages\lagosstateministryoftheenvironmentandwaterresources.WordPress.2026-11-19.xml'
posts_json_path = r'c:\projects\moelagos\src\data\posts.json'
data_posts_json_path = r'c:\projects\moelagos\data\posts.json'
posts_summary_path = r'c:\projects\moelagos\src\data\posts-summary.json'
data_posts_summary_path = r'c:\projects\moelagos\data\posts-summary.json'

print("=== STEP 1: PARSING WORDPRESS XML ===")
tree = ET.parse(xml_path)
root = tree.getroot()
channel = root.find('channel')
items = channel.findall('item')

xml_posts = {}
for item in items:
    post_type = item.find('{http://wordpress.org/export/1.2/}post_type')
    status = item.find('{http://wordpress.org/export/1.2/}status')
    if post_type is not None and post_type.text == 'post' and status is not None and status.text == 'publish':
        pid = str(item.find('{http://wordpress.org/export/1.2/}post_id').text)
        pdate = item.find('{http://wordpress.org/export/1.2/}post_date').text
        pmod_node = item.find('{http://wordpress.org/export/1.2/}post_modified')
        pmod = pmod_node.text if pmod_node is not None and pmod_node.text else pdate
        title = item.find('title').text
        xml_posts[pid] = {
            'post_date': pdate,
            'post_modified': pmod,
            'title': title
        }

print(f"Found {len(xml_posts)} published posts in WordPress XML.")

print("\n=== STEP 2: UPDATING POSTS DATA ===")
with open(posts_json_path, 'r', encoding='utf-8') as f:
    posts = json.load(f)

print(f"Loaded {len(posts)} posts from {posts_json_path}")

updated_count = 0
for p in posts:
    pid = str(p.get('id') or p.get('wpId'))
    if pid in xml_posts:
        p['date'] = xml_posts[pid]['post_date']
        p['modified'] = xml_posts[pid]['post_modified']
        p['year'] = xml_posts[pid]['post_date'][:4]
        updated_count += 1
    else:
        print(f"Warning: post {pid} not found in XML!")

print(f"Updated timestamps on {updated_count} posts.")

print("\n=== STEP 3: SORTING EXACTLY BY WORDPRESS PUBLISHED DATE DESC ===")
# Exact WordPress query: ORDER BY post_date DESC, ID DESC
posts.sort(key=lambda x: (x['date'], int(x['id'])), reverse=True)

print("\nTop 15 posts in new arrangement:")
for i, p in enumerate(posts[:15]):
    print(f" {i+1:2d}. Date: {p['date']} | ID: {p['id']:4s} | Title: {p['title'][:65]}")

print("\n=== STEP 4: WRITING FULL POSTS FILES ===")
with open(posts_json_path, 'w', encoding='utf-8') as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)
print(f"Saved: {posts_json_path}")

with open(data_posts_json_path, 'w', encoding='utf-8') as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)
print(f"Saved: {data_posts_json_path}")

print("\n=== STEP 5: CREATING & WRITING SUMMARY DATA ===")
posts_summary = []
for p in posts:
    posts_summary.append({
        'id': p.get('id'),
        'wpId': p.get('wpId'),
        'title': p.get('title'),
        'slug': p.get('slug'),
        'author': p.get('author'),
        'date': p.get('date'),
        'modified': p.get('modified'),
        'year': p.get('year'),
        'contentType': p.get('contentType'),
        'categories': p.get('categories'),
        'tags': p.get('tags'),
        'featuredImage': p.get('featuredImage'),
        'excerpt': p.get('excerpt'),
        'permalink': p.get('permalink')
    })

with open(posts_summary_path, 'w', encoding='utf-8') as f:
    json.dump(posts_summary, f, indent=2, ensure_ascii=False)
print(f"Saved: {posts_summary_path}")

with open(data_posts_summary_path, 'w', encoding='utf-8') as f:
    json.dump(posts_summary, f, indent=2, ensure_ascii=False)
print(f"Saved: {data_posts_summary_path}")

print("\nSUCCESS: All posts successfully rearranged according to exact WordPress published dates!")
