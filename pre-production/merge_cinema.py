
import os

base_dir = r"c:\Users\rober\.gemini\antigravity\scratch\tokyo-in-film\pre-production"
orig_path = os.path.join(base_dir, "cinematography.html")
new_path = os.path.join(base_dir, "cinematography_new_content.html")

print(f"Reading {orig_path}...")
with open(orig_path, "r", encoding="utf-8") as f:
    orig_lines = f.readlines()

print(f"Reading {new_path}...")
with open(new_path, "r", encoding="utf-8") as f:
    new_lines = f.readlines()

# Split Original
# Line 611 in 1-indexed is index 610
split_index = 610 
top_part = orig_lines[:split_index] 
bottom_part = orig_lines[split_index:]

# Extract New Content
# Slice [56:810] gives lines 57 through 810 (inclusive of 810 if 810 is the index of that line)
# Wait, let's be precise.
# Python list index starts at 0.
# Line 1 is index 0.
# Line 57 is index 56.
# Line 810 is index 809.
# slice [56:810] goes from index 56 up to 809.
# This captures lines 57 through 810 inclusive.
content_start = 56
content_end = 810
new_content = new_lines[content_start:content_end]

# Create Seps
sep = [
    '\n',
    '        <!-- MERGED NEW CONTENT BEGINS -->\n',
    '        <hr style="margin: 5rem 0; border: 0; border-top: 4px solid var(--accent-neon-cyan);">\n',
    '        <h1 style="text-align: center; font-size: 3rem; margin-bottom: 2rem;">Expanded Concepts & Visual Examples</h1>\n',
    '        <div class="textbook-content">\n'
]

final_lines = top_part + sep + new_content + bottom_part

print(f"Writing merged content to {orig_path}...")
with open(orig_path, "w", encoding="utf-8") as f:
    f.writelines(final_lines)

print("Successfully merged cinematography files.")
