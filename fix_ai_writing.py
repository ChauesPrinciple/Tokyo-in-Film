
import os

def fix_file(filepath, replacements):
    print(f"Processing {filepath}...")
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content
        for search_str, replace_str in replacements:
            if search_str in new_content:
                new_content = new_content.replace(search_str, replace_str)
                print(f"  - Replaced '{search_str}'")
            else:
                print(f"  - WARNING: Could not find '{search_str}'")
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print("  - Saved changes.")
        else:
            print("  - No changes made.")
            
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

# 1. scene-project.html
scene_project_path = "scene-project.html"
scene_project_fixes = [
    ("technical mastery—it’s about", "technical mastery. It’s about"),
    # Fallback in case of standard quote
    ("technical mastery—it's about", "technical mastery. It's about")
]

fix_file(scene_project_path, scene_project_fixes)

# 2. post-production/sound-design.html
sound_design_path = "post-production/sound-design.html"
sound_design_fixes = [
    ("sounds arent just cleaned up—theyre", "sounds aren't just cleaned up; they're"),
    ("moments—when time bends and their worlds blur together—that sound", "moments. When time bends and their worlds blur together, sound"),
    ("mirror this—it", "mirror this; it"),
    ("on set—they", "on set. They"),
    ("on screen—it", "on screen. It"),
    # Fix apostrophes while we're here nearby
    ("doesnt", "doesn't"),
    ("isnt", "isn't"),
    ("its sound design", "its sound design"), # 'its' is correct here (possessive)
    ("But its in the", "But it's in the"),
    ("Its dissonant", "It's dissonant"),
    ("sound plays its most", "sound plays its most") # correct
]
# Note: blind replacing "its" -> "it's" is dangerous. I'll stick to the em-dash patterns mostly.

fix_file(sound_design_path, sound_design_fixes)
