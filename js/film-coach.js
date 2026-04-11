// Film Coach — Inline Chat for Tokyo in Film
// A coaching AI that helps students improve their filmmaking deliverables.
// Mounts into #film-coach-mount if present on the page.
//
// SETUP: Update WORKER_URL below with your deployed Cloudflare Worker URL.

(function () {
    'use strict';

    // ── Configuration ────────────────────────────────────────────────
    const WORKER_URL = 'https://filmcoach.factum-est-illud.workers.dev';

    const MAX_HISTORY = 30;
    const MAX_INPUT = 8000;

    // ── Find mount point ─────────────────────────────────────────────
    const mount = document.getElementById('film-coach-mount');
    if (!mount) return;

    // ── Styles ───────────────────────────────────────────────────────
    const css = document.createElement('style');
    css.textContent = `
        /* Film Coach — Inline Chat */
        .fc-container {
            width: 100%;
            height: 480px;
            background: #08080c;
            border: 1px solid rgba(0, 243, 255, 0.15);
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            margin-top: 1.5rem;
        }

        /* Messages */
        .fc-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .fc-messages::-webkit-scrollbar { width: 4px; }
        .fc-messages::-webkit-scrollbar-track { background: transparent; }
        .fc-messages::-webkit-scrollbar-thumb {
            background: rgba(0, 243, 255, 0.15);
            border-radius: 2px;
        }

        /* Message bubbles */
        .fc-msg {
            max-width: 80%;
            padding: 10px 14px;
            border-radius: 12px;
            font-size: 0.9rem;
            line-height: 1.55;
            font-family: 'Inter', sans-serif;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }
        .fc-msg.fc-user {
            align-self: flex-end;
            background: rgba(255, 0, 127, 0.12);
            border: 1px solid rgba(255, 0, 127, 0.25);
            color: #e0e0e0;
            border-bottom-right-radius: 4px;
        }
        .fc-msg.fc-assistant {
            align-self: flex-start;
            background: rgba(0, 243, 255, 0.06);
            border: 1px solid rgba(0, 243, 255, 0.12);
            color: #d0d0d0;
            border-bottom-left-radius: 4px;
        }
        .fc-msg.fc-assistant strong { color: #00f3ff; }
        .fc-msg.fc-assistant code {
            background: rgba(0, 243, 255, 0.1);
            padding: 1px 5px;
            border-radius: 3px;
            font-size: 0.84rem;
        }
        .fc-msg.fc-system {
            align-self: center;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.06);
            color: #888;
            font-size: 0.82rem;
            text-align: center;
            max-width: 90%;
            padding: 10px 16px;
        }

        /* Typing indicator */
        .fc-typing {
            padding: 4px 20px;
            color: #00f3ff;
            font-size: 0.8rem;
            font-style: italic;
            font-family: 'Inter', sans-serif;
            display: none;
        }
        .fc-typing.fc-visible { display: block; }

        /* Input area */
        .fc-input-area {
            padding: 12px 14px 14px;
            border-top: 1px solid rgba(0, 243, 255, 0.1);
            display: flex;
            gap: 8px;
            flex-shrink: 0;
            background: rgba(0, 0, 0, 0.3);
        }
        .fc-input {
            flex: 1;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 10px 14px;
            color: #e0e0e0;
            font-family: 'Inter', sans-serif;
            font-size: 0.9rem;
            resize: none;
            outline: none;
            line-height: 1.4;
            max-height: 100px;
            transition: border-color 0.15s;
        }
        .fc-input:focus {
            border-color: rgba(0, 243, 255, 0.35);
        }
        .fc-input::placeholder { color: #444; }
        .fc-send {
            background: linear-gradient(135deg, #00f3ff 0%, #ff007f 100%);
            border: none;
            border-radius: 10px;
            width: 44px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: opacity 0.15s;
        }
        .fc-send:disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }
        .fc-send svg {
            width: 18px;
            height: 18px;
            fill: #050505;
        }

        @media (max-width: 520px) {
            .fc-container { height: 420px; }
            .fc-msg { max-width: 92%; }
        }
    `;
    document.head.appendChild(css);

    // ── Build DOM ─────────────────────────────────────────────────────
    mount.innerHTML = `
        <div class="fc-container">
            <div class="fc-messages" id="fc-messages">
                <div class="fc-msg fc-system">I help you improve your scripts, shot lists, and storyboards. I will not write them for you, but I will help you see what is working and what is not.<br><br>What are you working on?</div>
            </div>
            <div class="fc-typing" id="fc-typing">Thinking...</div>
            <div class="fc-input-area">
                <textarea class="fc-input" id="fc-input" placeholder="Paste your work or ask a question..." rows="1" maxlength="${MAX_INPUT}"></textarea>
                <button class="fc-send" id="fc-send" aria-label="Send message">
                    <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
            </div>
        </div>
    `;

    // ── References ────────────────────────────────────────────────────
    const messagesEl = document.getElementById('fc-messages');
    const typingEl = document.getElementById('fc-typing');
    const inputEl = document.getElementById('fc-input');
    const sendBtn = document.getElementById('fc-send');

    // ── State ─────────────────────────────────────────────────────────
    let history = [];
    let streaming = false;

    // ── Auto-resize textarea ──────────────────────────────────────────
    inputEl.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });

    // ── Send on Enter (Shift+Enter = newline) ─────────────────────────
    inputEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    });

    sendBtn.addEventListener('click', send);

    // ── Send message ──────────────────────────────────────────────────
    async function send() {
        var text = inputEl.value.trim();
        if (!text || streaming) return;

        if (WORKER_URL.includes('YOUR-SUBDOMAIN')) {
            addBubble('fc-system', 'Film Coach is not configured yet. The instructor needs to deploy the API proxy and update the worker URL.');
            return;
        }

        addBubble('fc-user', escapeHtml(text));
        history.push({ role: 'user', content: text });

        inputEl.value = '';
        inputEl.style.height = 'auto';

        if (history.length > MAX_HISTORY) {
            history = history.slice(-MAX_HISTORY);
        }

        streaming = true;
        sendBtn.disabled = true;
        typingEl.classList.add('fc-visible');
        scrollDown();

        try {
            var response = await fetch(WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: history })
            });

            if (!response.ok) {
                const errBody = await response.text();
                addBubble('fc-system', 'Error ' + response.status + ' from server. Check Cloudflare Worker logs.');
                console.error('[Film Coach] HTTP ' + response.status, errBody);
                streaming = false;
                sendBtn.disabled = false;
                typingEl.classList.remove('fc-visible');
                inputEl.focus();
                return;
            }

            var bubble = addBubble('fc-assistant', '');
            typingEl.classList.remove('fc-visible');

            var reader = response.body.getReader();
            var decoder = new TextDecoder();
            var fullText = '';
            var buffer = '';

            while (true) {
                var result = await reader.read();
                if (result.done) break;

                buffer += decoder.decode(result.value, { stream: true });
                var lines = buffer.split('\n');
                buffer = lines.pop();

                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i].trim();
                    if (!line.startsWith('data: ')) continue;
                    var data = line.substring(6);
                    if (data === '[DONE]') continue;

                    try {
                        var parsed = JSON.parse(data);
                        if (parsed.type === 'content_block_delta' && parsed.delta && parsed.delta.text) {
                            fullText += parsed.delta.text;
                            bubble.innerHTML = formatMarkdown(fullText);
                            scrollDown();
                        }
                    } catch (parseErr) {
                        // skip non-JSON SSE lines
                    }
                }
            }

            if (fullText) {
                history.push({ role: 'assistant', content: fullText });
            }

        } catch (err) {
            typingEl.classList.remove('fc-visible');
            addBubble('fc-system', 'Could not reach Film Coach. Check your connection and try again.');
            console.error('[Film Coach]', err);
        }

        streaming = false;
        sendBtn.disabled = false;
        inputEl.focus();
    }

    // ── DOM helpers ───────────────────────────────────────────────────
    function addBubble(cls, html) {
        var el = document.createElement('div');
        el.className = 'fc-msg ' + cls;
        el.innerHTML = html;
        messagesEl.appendChild(el);
        scrollDown();
        return el;
    }

    function scrollDown() {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function formatMarkdown(text) {
        return escapeHtml(text)
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

})();
