"""Pre-deploy sanity checks.  Usage: python tools/check.py

Fails (exit 1) on:
  * pages whose build regions / asset hashes are stale (run tools/build.py)
  * templated pages missing a build region or js/mobile-nav.js
  * local href/src targets that do not exist
  * files that are not valid UTF-8 or contain mojibake sequences
"""
import re
import sys
from urllib.parse import unquote, urlsplit

import sitelib as s
from build import build_page

LINK_RE = re.compile(r'(?:href|src|poster)="([^"#]+)(?:#[^"]*)?"')
MOJIBAKE_RE = re.compile('â€|âˆ|â‰|Ã[©¨ ¢´]|Â[½°§·²\xa0]|ï¿½|\ufffd')
SKIP_SCHEMES = ('http:', 'https:', 'mailto:', 'tel:', 'data:', 'javascript:', '//')


def main():
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    problems = []
    for rel in s.pages():
        try:
            text = s.read(rel)
        except UnicodeDecodeError as e:
            problems.append(f'{rel}: not UTF-8 ({e})')
            continue
        if build_page(rel, text) != text:
            problems.append(f'{rel}: stale build output (run python tools/build.py)')
        if m := MOJIBAKE_RE.search(text):
            line = text.count('\n', 0, m.start()) + 1
            problems.append(f'{rel}:{line}: mojibake "{m.group(0)}"')
        if rel.name not in s.STANDALONE:
            for name in ('head', 'nav', 'footer'):
                if not s.region_re(name).search(text):
                    problems.append(f'{rel}: missing build:{name} region')
            if 'js/mobile-nav.js' not in text:
                problems.append(f'{rel}: missing js/mobile-nav.js')
        for target in LINK_RE.findall(text):
            if target.startswith(SKIP_SCHEMES) or target.startswith('{{') or "' +" in target:
                continue  # external, template, or built in JS
            path = unquote(urlsplit(target).path)
            if not path or path.endswith('/'):
                continue
            if not ((s.ROOT / rel).parent / path).exists():
                problems.append(f'{rel}: broken link -> {target}')
    if problems:
        print('\n'.join(problems))
        print(f'\n{len(problems)} problem(s).')
        return 1
    print(f'OK: {len(s.pages())} pages checked.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
