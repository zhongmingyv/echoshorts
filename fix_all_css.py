import os
import glob
import re

dir_path = r"f:\code_new\AiProject\echoshorts_page"
files = glob.glob(os.path.join(dir_path, "home*.html"))

pattern1 = re.compile(r'\s*\.lang-switcher\s*\{\s*position:\s*fixed.*?\}', re.DOTALL)
pattern2 = re.compile(r'\n*\s*\.lang-switcher\s*\{\s*width:\s*100.*?\}', re.DOTALL)
pattern_hover = re.compile(r'(\.lang-switcher\s+select:hover\s*\{\s*border-color:\s*#4ade80;\s*\})')

new_css = r"""\1
    .lang-switcher { width: 100%; max-width: 860px; margin: 0 auto; padding: 20px 40px 0; display: flex; justify-content: flex-end; }"""

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    content = pattern1.sub('', content)
    content = pattern2.sub('', content)
    content = pattern_hover.sub(new_css, content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print(f"Fixed CSS in {len(files)} files.")
