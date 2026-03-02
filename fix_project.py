import os
import re

def fix_content(content):
    # Fix Nausicaa
    new_content = re.sub(r'Nausica[\xc3\xa1\xa4\x83\x82\x3f\u0430\ufffd\xef\xbf\xbd ]+\s*of', 'Nausicaä of', content, flags=re.IGNORECASE)
    new_content = re.sub(r'Nausica[\xc3\xa1\xa4\x83\x82\x3f\u0430\ufffd\xef\xbf\xbd]+', 'Nausicaä', new_content, flags=re.IGNORECASE)
    
    # Match any "Nausica" missing the "a" or the umlaut, just to be safe
    new_content = re.sub(r'\bNausica\b', 'Nausicaä', new_content)
    new_content = re.sub(r'\bNausicaa\b', 'Nausicaä', new_content)
    new_content = new_content.replace('Nausicaää', 'Nausicaä')
    
    # Fix Mise-en-Scene
    new_content = re.sub(r'Mise-en-Sc[\xe8\xa8\x3f\x6e\xef\xbf\xbd]+ne', 'Mise-en-Scène', new_content, flags=re.IGNORECASE)
    new_content = new_content.replace('Mise-en-Scne', 'Mise-en-Scène')
    new_content = new_content.replace('Mise-en-Sc?ne', 'Mise-en-Scène')
    new_content = new_content.replace('Mise-en-Scèneène', 'Mise-en-Scène')
    
    # Map keys missing chars
    new_content = new_content.replace('<li><span></span> Class-Specific Excursions</li>', '<li><span>🎥</span> Class-Specific Excursions</li>')
    new_content = new_content.replace('<li><span></span> Class-Specific Filming Locations</li>', '<li><span>📍</span> Class-Specific Filming Locations</li>')
    new_content = new_content.replace('<li><span></span> Special Food Recommendations</li>', '<li><span>🍜</span> Special Food Recommendations</li>')
    new_content = new_content.replace('<li><span></span> Greenery and Parks</li>', '<li><span>🌳</span> Greenery and Parks</li>')
    new_content = new_content.replace('<li><span></span> Special Shrines</li>', '<li><span>⛩️</span> Special Shrines</li>')
    new_content = new_content.replace('<span class="icon-silver"></span> Otaku and Thrift Shopping</li>', '<span class="icon-silver">🛍️</span> Otaku and Thrift Shopping</li>')

    # Remove replacement characters
    new_content = new_content.replace('\xef\xbf\xbd', '')
    
    if new_content != content:
        return True, new_content
    return False, content

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                changed, new_content = fix_content(content)
                if changed:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed {path}")
            except UnicodeDecodeError:
                try:
                    with open(path, 'r', encoding='cp1252') as f:
                        content = f.read()
                    changed, new_content = fix_content(content)
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed and converted {path}")
                except Exception as e:
                    print(f"Failed to read/convert {path}: {e}")
