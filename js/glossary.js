// Glossary: loads term data from js/glossary-data.json and wraps matching
// words in content areas with hover/tap tooltips.
//
// Other scripts can wait on `window.glossaryReady` (a Promise resolving to the
// term array). The ?v= on the data URL is rewritten by tools/build.py.
(function () {
    'use strict';

    const DATA_URL = new URL('glossary-data.json?v=39aec089', document.currentScript.src);
    const domReady = new Promise(resolve => {
        if (document.readyState !== 'loading') resolve();
        else document.addEventListener('DOMContentLoaded', resolve, { once: true });
    });

    window.glossaryReady = fetch(DATA_URL)
        .then(r => { if (!r.ok) throw new Error(r.status + ' ' + r.statusText); return r.json(); })
        .catch(err => { console.warn('[glossary] data unavailable:', err.message); return []; });

    Promise.all([window.glossaryReady, domReady]).then(([glossaryTerms]) => {
        if (!glossaryTerms.length) return;
        // Sort terms by length (longest first) to prevent partial matching issues
        const sortedTerms = glossaryTerms.slice().sort((a, b) => (b.matchTerm || b.term).length - (a.matchTerm || a.term).length);

        // Create Tooltip Element
        const tooltip = document.createElement('div');
        tooltip.className = 'glossary-tooltip';
        document.body.appendChild(tooltip);

        // Target content areas (exclude nav, footer, etc.)
        document.querySelectorAll('.textbook-content, .hero-content p, .intro-main p, .card p')
            .forEach(area => processNode(area, sortedTerms));

        // Tooltip Logic
        let currentTooltipTerm = null;
        let tooltipVisible = false;

        function showTooltip(term) {
            const termKey = term.getAttribute('data-term');
            const data = glossaryTerms.find(t => (t.matchTerm || t.term) === termKey);
            if (!data) return;

            let content = `<strong>${data.term}</strong><br>${data.definition}`;
            if (data.image) {
                content += `<br><img src="${data.image}" alt="${data.term}" class="glossary-tooltip-img">`;
            }
            if (data.caption) {
                content += `<br><small>${data.caption}</small>`;
            }
            tooltip.innerHTML = content;
            tooltip.style.display = 'block';
            tooltipVisible = true;
            currentTooltipTerm = term;

            // Positioning
            const rect = term.getBoundingClientRect();
            const top = rect.bottom + window.scrollY + 5;
            let left = rect.left + window.scrollX;

            // Adjust if off screen
            if (left + 300 > window.innerWidth) {
                left = window.innerWidth - 310;
            }
            if (left < 10) {
                left = 10;
            }

            tooltip.style.top = `${top}px`;
            tooltip.style.left = `${left}px`;
        }

        function hideTooltip() {
            tooltip.style.display = 'none';
            tooltipVisible = false;
            currentTooltipTerm = null;
        }

        document.querySelectorAll('.glossary-term').forEach(term => {
            // Desktop hover
            term.addEventListener('mouseenter', e => showTooltip(e.target));
            term.addEventListener('mouseleave', hideTooltip);

            // Mobile touch/click support
            term.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                if (tooltipVisible && currentTooltipTerm === e.target) {
                    hideTooltip();
                } else {
                    showTooltip(e.target);
                }
            });
        });

        // Close tooltip when tapping elsewhere on mobile
        document.addEventListener('click', e => {
            if (tooltipVisible && !e.target.classList.contains('glossary-term') && !tooltip.contains(e.target)) {
                hideTooltip();
            }
        });
    });

    function processNode(node, terms) {
        // Process text nodes only
        if (node.nodeType === 3) {
            const content = node.nodeValue;
            let replaced = false;

            // Skip if inside specific tags (links, already processed, headers)
            if (node.parentNode.tagName === 'A' ||
                node.parentNode.tagName === 'H1' ||
                node.parentNode.tagName === 'H2' ||
                node.parentNode.tagName === 'H3' ||
                node.parentNode.classList.contains('glossary-term')) {
                return;
            }

            terms.forEach(termData => {
                if (replaced) return; // Simple avoidance of double-wrapping for now

                const term = termData.matchTerm || termData.term;
                // distinct regex to avoid replacing parts of words
                const regex = new RegExp(`\\b(${escapeRegExp(term)})\\b`, 'i');
                const match = content.match(regex);
                if (!match) return;

                // Note: This replaces the *first* instance found in this text node for simplicity and performance
                const span = document.createElement('span');
                span.className = 'glossary-term';
                span.setAttribute('data-term', term);
                span.textContent = match[0]; // Use original casing

                // Split text node
                const before = content.slice(0, match.index);
                const after = content.slice(match.index + match[0].length);
                const afterNode = document.createTextNode(after);
                const beforeNode = document.createTextNode(before);

                // Modify DOM
                node.parentNode.insertBefore(beforeNode, node);
                node.parentNode.insertBefore(span, node);
                node.parentNode.insertBefore(afterNode, node);
                node.parentNode.removeChild(node);
                replaced = true;

                // Recursively process the rest (afterNode) to catch multiple terms in one block
                processNode(afterNode, terms);
            });
        } else if (node.nodeType === 1 && !['SCRIPT', 'STYLE', 'IMG', 'IFRAME'].includes(node.tagName)) {
            // Recurse into children
            Array.from(node.childNodes).forEach(child => processNode(child, terms));
        }
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }
})();
