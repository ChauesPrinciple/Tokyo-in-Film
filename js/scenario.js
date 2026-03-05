/* Tokyo in Film — Branching Scenario Engine v1.0 */
(function () {
  const CSS = `
.tif-scenario{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:2rem;margin:2rem 0;color:#e0e0ff;font-family:'Inter',sans-serif;line-height:1.7;min-height:480px;display:flex;flex-direction:column;justify-content:flex-start}
.tif-label{font-size:.8rem;text-transform:uppercase;letter-spacing:.12em;color:#ff2d78;font-weight:700;margin-bottom:.75rem}
.tif-content h3,.tif-content h2{color:#00f5ff;font-family:'Outfit',sans-serif;margin:1.2rem 0 .5rem}
.tif-content strong{color:#fff}
.tif-content a{color:#00f5ff}
.tif-content ul,.tif-content ol{padding-left:1.4rem;margin:.5rem 0}
.tif-content li{margin-bottom:.3rem}
.tif-content hr{border:none;border-top:1px solid #2a2a4a;margin:1.2rem 0}
.tif-video-wrap{position:relative;padding-bottom:56.25%;height:0;border-radius:8px;overflow:hidden;margin-bottom:1.5rem;background:#000}
.tif-video-wrap iframe{position:absolute;top:0;left:0;width:100%;height:100%;border:0}
.tif-qs{background:rgba(0,0,0,.3);border-radius:8px;padding:1.2rem;margin-bottom:1.5rem}
.tif-qs h4{color:#00f5ff;margin:0 0 1rem;font-size:.95rem;font-family:'Outfit',sans-serif}
.tif-q-item{margin-bottom:1.4rem;padding-bottom:1.4rem;border-bottom:1px solid rgba(255,255,255,.07)}
.tif-q-item:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
.tif-q-text{margin-bottom:.7rem;font-size:.93rem}
.tif-opts,.tif-tf{display:flex;flex-wrap:wrap;gap:.5rem}
.tif-opt{padding:.35rem .9rem;border-radius:20px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.04);color:#ccd;cursor:pointer;font-size:.88rem;transition:all .15s}
.tif-opt:hover:not(:disabled){background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.35)}
.tif-opt.correct{border-color:#00f5ff!important;background:rgba(0,245,255,.14)!important;color:#00f5ff!important}
.tif-opt.wrong{border-color:#ff2d78!important;background:rgba(255,45,120,.14)!important;color:#ff9ab8!important}
.tif-check-row{display:flex;align-items:center;gap:.5rem;margin-bottom:.4rem;font-size:.9rem;cursor:pointer}
.tif-check-row input{accent-color:#00f5ff;width:15px;height:15px}
.tif-info{background:rgba(0,245,255,.07);border-left:3px solid #00f5ff;border-radius:0 4px 4px 0;padding:.7rem 1rem;font-size:.9rem;color:#b0e0e6}
.tif-branch-q{font-size:1rem;font-weight:600;color:#fff;margin-bottom:1.1rem}
.tif-choices{display:flex;flex-direction:column;gap:.7rem}
.tif-choice{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.14);border-radius:8px;padding:.75rem 1.1rem;color:#ccd;text-align:left;cursor:pointer;font-size:.93rem;transition:all .15s;width:100%}
.tif-choice:hover:not(:disabled){border-color:#00f5ff;background:rgba(0,245,255,.07);color:#fff}
.tif-choice:disabled{opacity:.5;cursor:not-allowed}
.tif-feedback{background:rgba(255,45,120,.1);border-left:3px solid #ff2d78;border-radius:0 4px 4px 0;padding:.7rem 1rem;font-size:.9rem;color:#ffb3cc;margin-top:.8rem}
.tif-proceed{display:inline-block;margin-top:1.5rem;padding:.55rem 2rem;background:#00f5ff;color:#000;border:none;border-radius:30px;font-weight:700;font-size:.9rem;cursor:pointer;letter-spacing:.05em;text-transform:uppercase;transition:background .15s}
.tif-proceed:hover:not(:disabled){background:#fff}
.tif-proceed:disabled{opacity:.35;cursor:not-allowed}
.tif-start,.tif-end{text-align:center;padding:1.5rem 0 2rem;margin:auto 0;width:100%}
.tif-start h2,.tif-end h2{color:#00f5ff;font-family:'Outfit',sans-serif;font-size:1.5rem;margin-bottom:.75rem}
.tif-start p,.tif-end p{color:#aaa;margin-bottom:1.8rem;max-width:540px;margin-left:auto;margin-right:auto}
.tif-start-btn{padding:.75rem 2.2rem;background:#ff2d78;color:#fff;border:none;border-radius:30px;font-weight:700;font-size:.95rem;cursor:pointer;letter-spacing:.05em;text-transform:uppercase;transition:background .15s}
.tif-start-btn:hover{background:#ff5599}
.tif-restart{padding:.5rem 1.6rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.18);border-radius:30px;color:#ccd;font-size:.9rem;cursor:pointer;transition:all .15s}
.tif-restart:hover{background:rgba(255,255,255,.1)}
@media(max-width:600px){.tif-scenario{padding:1.1rem}.tif-opts,.tif-tf{flex-direction:column}}
`;

  function injectCSS() {
    if (document.getElementById('tif-scenario-css')) return;
    const s = document.createElement('style');
    s.id = 'tif-scenario-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function el(tag, cls) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  window.initScenario = function (scenario, containerId) {
    injectCSS();
    const container = document.getElementById(containerId);
    if (!container) return;

    const nodeMap = {};
    scenario.nodes.forEach(n => { nodeMap[n.id] = n; });

    function go(id) {
      if (id === -1 || id == null) { showEnd(); return; }
      const node = nodeMap[id];
      if (!node) { showEnd(); return; }
      container.innerHTML = '';
      const wrap = el('div', 'tif-scenario');
      if (node.type === 'text') renderText(wrap, node);
      else if (node.type === 'branch') renderBranch(wrap, node);
      else if (node.type === 'video') renderVideo(wrap, node);
      container.appendChild(wrap);
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function renderText(wrap, node) {
      if (node.title) { const lbl = el('div', 'tif-label'); lbl.textContent = node.title; wrap.appendChild(lbl); }
      const c = el('div', 'tif-content'); c.innerHTML = node.content; wrap.appendChild(c);
      const btn = el('button', 'tif-proceed'); btn.textContent = 'Proceed';
      btn.onclick = () => node.next === -1 ? showEnd() : go(node.next);
      wrap.appendChild(btn);
    }

    function renderBranch(wrap, node) {
      const q = el('div', 'tif-branch-q tif-content'); q.innerHTML = node.question; wrap.appendChild(q);
      const choices = el('div', 'tif-choices');
      node.choices.forEach(ch => {
        const btn = el('button', 'tif-choice'); btn.textContent = ch.text;
        btn.onclick = () => {
          Array.from(choices.querySelectorAll('.tif-choice')).forEach(b => b.disabled = true);
          if (ch.feedback) {
            const fb = el('div', 'tif-feedback'); fb.innerHTML = ch.feedback; choices.appendChild(fb);
            setTimeout(() => {
              if (ch.endMessage !== undefined) showEnd(ch.endMessage);
              else if (ch.next === -1) showEnd();
              else go(ch.next);
            }, 1800);
          } else if (ch.endMessage !== undefined) {
            showEnd(ch.endMessage);
          } else if (ch.next === -1) {
            showEnd();
          } else {
            go(ch.next);
          }
        };
        choices.appendChild(btn);
      });
      wrap.appendChild(choices);
    }

    function renderVideo(wrap, node) {
      if (node.title) { const lbl = el('div', 'tif-label'); lbl.textContent = node.title; wrap.appendChild(lbl); }
      const vw = el('div', 'tif-video-wrap');
      const vSrc = 'https://www.youtube.com/embed/' + node.videoId + '?rel=0' + (node.videoStart ? '&start=' + node.videoStart : '');
      vw.innerHTML = '<iframe src="' + vSrc + '" allowfullscreen loading="lazy" title="' + (node.title || 'Video') + '"></iframe>';
      wrap.appendChild(vw);

      let needed = 0, done = 0;
      const pb = el('button', 'tif-proceed'); pb.textContent = 'Proceed';
      pb.onclick = () => node.next === -1 ? showEnd() : go(node.next);

      if (node.questions && node.questions.length) {
        const qs = el('div', 'tif-qs');
        const h = el('h4'); h.textContent = 'Reflection Questions'; qs.appendChild(h);
        node.questions.forEach(q => {
          const item = el('div', 'tif-q-item');
          if (q.type === 'info') {
            const box = el('div', 'tif-info'); box.innerHTML = q.text; item.appendChild(box);
          } else if (q.type === 'mc') {
            needed++;
            const p = el('p', 'tif-q-text'); p.innerHTML = q.question; item.appendChild(p);
            const opts = el('div', 'tif-opts'); let ans = false;
            q.options.forEach((opt, i) => {
              const b = el('button', 'tif-opt'); b.innerHTML = opt;
              b.onclick = () => {
                if (ans) return; ans = true; done++;
                b.classList.add(i === q.correct ? 'correct' : 'wrong');
                if (i !== q.correct) opts.children[q.correct].classList.add('correct');
                if (done >= needed) pb.disabled = false;
              };
              opts.appendChild(b);
            });
            item.appendChild(opts);
          } else if (q.type === 'tf') {
            needed++;
            const p = el('p', 'tif-q-text'); p.innerHTML = q.question; item.appendChild(p);
            const btns = el('div', 'tif-tf'); let ans = false;
            ['True', 'False'].forEach((lbl, i) => {
              const right = (q.correct === true && i === 0) || (q.correct === false && i === 1);
              const b = el('button', 'tif-opt'); b.textContent = lbl;
              b.onclick = () => {
                if (ans) return; ans = true; done++;
                b.classList.add(right ? 'correct' : 'wrong');
                if (!right) btns.children[q.correct ? 0 : 1].classList.add('correct');
                if (done >= needed) pb.disabled = false;
              };
              btns.appendChild(b);
            });
            item.appendChild(btns);
          } else if (q.type === 'check') {
            const p = el('p', 'tif-q-text'); p.innerHTML = q.question; item.appendChild(p);
            q.options.forEach(opt => {
              const lbl = el('label', 'tif-check-row');
              const cb = document.createElement('input'); cb.type = 'checkbox';
              lbl.appendChild(cb); lbl.append(' ' + opt); item.appendChild(lbl);
            });
          }
          qs.appendChild(item);
        });
        wrap.appendChild(qs);
      }

      if (needed > 0) pb.disabled = true;
      wrap.appendChild(pb);
    }

    function showEnd(msg) {
      container.innerHTML = '';
      const wrap = el('div', 'tif-scenario');
      const e = el('div', 'tif-end');
      e.innerHTML = `<h2>&#10003; Guide Complete</h2><p>${msg || 'You have completed this decision-making guide. Proceed to the worksheets below.'}</p>`;
      const rb = el('button', 'tif-restart'); rb.textContent = '\u21ba Restart Guide';
      rb.onclick = () => showStart();
      e.appendChild(rb); wrap.appendChild(e); container.appendChild(wrap);
    }

    function showStart() {
      container.innerHTML = '';
      const wrap = el('div', 'tif-scenario');
      const s = el('div', 'tif-start');
      s.innerHTML = `<h2>${scenario.title}</h2><p>${scenario.subtitle || 'Work through this guide before completing the worksheets below.'}</p>`;
      const btn = el('button', 'tif-start-btn'); btn.textContent = 'Start the Guide';
      btn.onclick = () => go(0);
      s.appendChild(btn); wrap.appendChild(s); container.appendChild(wrap);
    }

    showStart();
  };
})();
