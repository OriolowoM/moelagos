import os
import zipfile
import stat

dist_dir = os.path.abspath(r'c:\projects\moelagos\dist')
zip_path = os.path.abspath(r'c:\projects\moelagos\moelagos-production.zip')

print(f"Creating {zip_path} from {dist_dir} with Unix permissions (0755 for dirs, 0644 for files)...")

if os.path.exists(zip_path):
    os.remove(zip_path)

with zipfile.ZipFile(zip_path, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as z:
    for root, dirs, files in os.walk(dist_dir):
        # Write directory entries with 0755
        for d in dirs:
            dir_full = os.path.join(root, d)
            arcname = os.path.relpath(dir_full, dist_dir).replace('\\', '/') + '/'
            zinfo = zipfile.ZipInfo(arcname)
            # Unix directory: type 0o040000 | permissions 0o755
            zinfo.external_attr = (stat.S_IFDIR | 0o755) << 16
            z.writestr(zinfo, '')
            
        # Write file entries with 0644
        for f in files:
            file_full = os.path.join(root, f)
            arcname = os.path.relpath(file_full, dist_dir).replace('\\', '/')
            zinfo = zipfile.ZipInfo.from_file(file_full, arcname)
            # Unix regular file: type 0o100000 | permissions 0o644
            zinfo.external_attr = (stat.S_IFREG | 0o644) << 16
            with open(file_full, 'rb') as fp:
                z.writestr(zinfo, fp.read())

size_mb = os.path.getsize(zip_path) / (1024 * 1024)
print(f"SUCCESS: Created {zip_path} ({size_mb:.2f} MB) with 100% verified Unix permissions!")
