import os
import re

def fix_all():
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('.html'):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                except UnicodeDecodeError:
                    try:
                        with open(path, 'r', encoding='cp1252') as f:
                            content = f.read()
                    except:
                        continue
                
                new_content = content

                # 1. Fix Mise-en-Scene corruptions
                new_content = re.sub(r'Mise-en-Sc[\ufffd\xe8\x3f]+ne', 'Mise-en-Scène', new_content, flags=re.IGNORECASE)
                new_content = new_content.replace('Mise-en-Scene', 'Mise-en-Scène')
                new_content = new_content.replace('Mise-en-scene', 'Mise-en-scène')
                
                # 2. Fix the emojis in the map legend
                # Originally: 🎥, 📍, 🍜, 🌳, ⛩️, 🛍️
                # Now matching map: ⭐, 🎥, 🍴, 🌲, ⛩️, 🛍️
                
                new_content = new_content.replace('<span>🎥</span> Class-Specific Excursions', '<span>⭐</span> Class-Specific Excursions')
                new_content = new_content.replace('<span>📍</span> Class-Specific Filming Locations', '<span>🎥</span> Class-Specific Filming Locations')
                new_content = new_content.replace('<span>🍜</span> Special Food Recommendations', '<span>🍴</span> Special Food Recommendations')
                new_content = new_content.replace('<span>🌳</span> Greenery and Parks', '<span>🌲</span> Greenery and Parks')
                # Shrine ⛩️ remains the same
                
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed final issues in {path}")

if __name__ == '__main__':
    fix_all()
