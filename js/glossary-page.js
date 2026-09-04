// glossary.html: searchable, alphabetised list of every term. Depends on
// glossary.js (window.glossaryReady) being loaded first.
(function () {
    'use strict';

    const container = document.getElementById('glossary-container');
    const searchInput = document.getElementById('search-input');
    if (!container || !searchInput || !window.glossaryReady) return;

    window.glossaryReady.then(terms => {
        const sortedTerms = terms.slice().sort((a, b) => a.term.localeCompare(b.term));

        function renderTerms(filter = '') {
            container.innerHTML = '';
            const lowerFilter = filter.toLowerCase();

            sortedTerms.forEach(item => {
                if (item.term.toLowerCase().includes(lowerFilter) || item.definition.toLowerCase().includes(lowerFilter)) {
                    const card = document.createElement('div');
                    card.className = 'glossary-card';
                    card.innerHTML = `
                        <div class="glossary-term">${item.term}</div>
                        <div class="glossary-def">${item.definition}</div>
                    `;
                    container.appendChild(card);
                }
            });

            if (container.children.length === 0) {
                container.innerHTML = '<p class="glossary-empty">No terms found matching your search.</p>';
            }
        }

        renderTerms();
        searchInput.addEventListener('input', e => renderTerms(e.target.value));
    });
})();
