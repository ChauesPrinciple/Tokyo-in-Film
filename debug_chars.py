try:
    with open("post-production/sound-design.html", "r", encoding="utf-8") as f:
        lines = f.readlines()
        for i in range(60, 70):
            print(f"{i+1}: {ascii(lines[i])}")
except Exception as e:
    print(e)
