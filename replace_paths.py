import re

def update_file(filepath, replacements):
    print(f"Updating {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    for pattern, repl in replacements:
        content = re.sub(pattern, repl, content)
        
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully updated {filepath}")
    else:
        print(f"No changes made to {filepath}")

# Define replacements for App.jsx
app_replacements = [
    (r'/images/screenshot_(\d+)\.png', r'/images/screenshot_\1.webp'),
    (r'/images/IMG_7733\.JPG', r'/images/IMG_7733.webp'),
    (r'/images/IMG_8039\.JPG', r'/images/IMG_8039.webp'),
]

# Define replacements for index.css
css_replacements = [
    (r'/images/IMG_7733\.JPG', r'/images/IMG_7733.webp'),
]

update_file(r'd:\code new\fong 1\src\App.jsx', app_replacements)
update_file(r'd:\code new\fong 1\src\index.css', css_replacements)
