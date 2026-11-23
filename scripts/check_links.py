import glob
import re

files = glob.glob('src/**/*.jsx', recursive=True) + glob.glob('src/**/*.js', recursive=True)
found = 0
for f in files:
    with open(f, encoding='utf-8') as fp:
        for idx, line in enumerate(fp):
            if re.search(r"['\"]#['\"]", line):
                print(f"{f}:{idx+1}: {line.strip()}")
                found += 1
print(f"Total found: {found}")
