import json, re
import sitelib as s
src = (s.ROOT / 'js/glossary.js').read_bytes().decode('utf-8')
start = src.index('const glossaryTerms = [') + len('const glossaryTerms = ')
end = src.index('];', start) + 1
arr = src[start:end]
js_terms = arr.count('term:')
arr = re.sub(r'(?m)^(\s*)(\w+):', r'\1"\2":', arr)          # quote keys
arr = re.sub(r',(\s*[}\]])', r'\1', arr)                      # trailing commas
data = json.loads(arr)
assert len(data) == js_terms, (len(data), js_terms)
keys = sorted({k for d in data for k in d})
print(len(data), 'terms; keys:', keys)
out = json.dumps(data, ensure_ascii=False, indent=2) + '\n'
(s.ROOT / 'js/glossary-data.json').write_bytes(out.replace('\n', '\r\n').encode('utf-8'))
print('rest of glossary.js starts at line', src[:end].count('\n') + 2)
