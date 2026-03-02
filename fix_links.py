import os

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content.replace('css2family=', 'css2?family=')
            new_content = new_content.replace('style.cssv=', 'style.css?v=')
            new_content = new_content.replace('embedmid=', 'embed?mid=')
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed {path}")
