import os
import re

def verify_all_files():
    errors_found = []
    files_checked = 0

    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('.html'):
                path = os.path.join(root, file)
                files_checked += 1
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                except UnicodeDecodeError:
                    try:
                        with open(path, 'r', encoding='cp1252') as f:
                            content = f.read()
                    except Exception as e:
                        errors_found.append(f"Could not read {path}: {e}")
                        continue

                try:
                    # 1. Check for broken fonts URL
                    if 'css2family=' in content:
                        errors_found.append(f"Broken Font URL in {path}")
                    
                    # 2. Check for broken CSS URL
                    if 'style.cssv=' in content:
                        errors_found.append(f"Broken CSS URL in {path}")

                    # 3. Check for broken Map URL
                    if 'embedmid=' in content:
                        errors_found.append(f"Broken Map URL in {path}")

                    # 4. Check for corrupted characters (replacement character)
                    if '\xef\xbf\xbd' in content:
                        errors_found.append(f"Corrupted character (\xef\xbf\xbd) found in {path}")

                    # 5. Check for bad Nausicaa strings
                    if re.search(r'Nausica[\xc3\xa1\xa4\x83\x82\x3f\u0430\ufffd\xef\xbf\xbd]+', content, re.IGNORECASE) and not 'Nausicaä' in content:
                         # It might correctly contain Nausicaä, we want to flag only bad ones.
                         # Better check:
                         bad_nausica = re.findall(r'Nausica[^ä\s]+', content)
                         if bad_nausica:
                             errors_found.append(f"Bad Nausicaä characters found in {path}: {bad_nausica}")

                    # 6. Check for bad Mise-en-Scene
                    bad_mise = re.findall(r'Mise-en-Sc[^è]+ne', content)
                    if bad_mise:
                        errors_found.append(f"Bad Mise-en-Scène characters found in {path}: {bad_mise}")
                    
                    # 7. Check for empty list/spans (missing map emojis)
                    if '<li><span></span>' in content or '<span class="icon-silver"></span>' in content:
                        errors_found.append(f"Missing map key emoji found in {path}")

                except Exception as e:
                    errors_found.append(f"Error reading {path}: {e}")

    with open('verification_report.txt', 'w', encoding='utf-8') as out_f:
        out_f.write(f"Total HTML files checked: {files_checked}\n")
        if len(errors_found) == 0:
            out_f.write("VERIFICATION SUCCESS: 0 errors or corruptions found across all pages.\n")
        else:
            out_f.write(f"VERIFICATION FAILED. {len(errors_found)} errors found:\n")
            for err in errors_found:
                out_f.write(" - " + err + "\n")

if __name__ == '__main__':
    verify_all_files()
