import os
import zipfile

zip_path = 'moelagos-patch-update.zip'
if os.path.exists(zip_path):
    os.remove(zip_path)

include_dirs = ['assets', 'api', 'officials']
include_files = [
    '.htaccess', 'index.html', 'moe-logo.png', 'moe-crest.png',
    'tokunbowahab.jpg', 'moelagos-social-card.jpg', 'moelagos-social-square.jpg',
    'favicon.ico', 'favicon-32x32.png', 'apple-touch-icon.png'
]

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
    for f in include_files:
        p = os.path.join('dist', f)
        if os.path.exists(p):
            zf.write(p, arcname=f)
            print(f'Added file: {f}')
        else:
            print(f'MISSING file: {f}')
            
    for d in include_dirs:
        dir_p = os.path.join('dist', d)
        for root, dirs, files in os.walk(dir_p):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, 'dist').replace('\\', '/')
                zf.write(full_path, arcname=rel_path)
                print(f'Added: {rel_path}')

print(f'\n[SUCCESS] Patch zip created: {zip_path} ({os.path.getsize(zip_path):,} bytes)')
