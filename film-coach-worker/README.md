# Film Coach — Cloudflare Worker Setup

This is the API proxy for the Film Coach chat widget. It holds your Anthropic API key securely and forwards requests from the website to Claude.

---

## Step 1 — Create the Worker

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign in (free account is fine)
2. Click **Workers & Pages** in the left sidebar
3. Click **Create**
4. You will see options including GitHub, GitLab, templates, etc. — click **Start with Hello World!**
5. Name the Worker `film-coach` at the top of the page
6. Click **Deploy**

---

## Step 2 — Paste the Worker code

1. After deploying, click **Edit Code** (top right of the Worker page)
2. Select all the code in the editor and delete it
3. Open `worker.js` from this folder and paste its entire contents into the editor
4. Click **Deploy** again

---

## Step 3 — Add your API key as a secret

1. Go back to the Worker overview (click `film-coach` in the breadcrumb)
2. Click **Settings**
3. Scroll to **Variables and Secrets** → click **Add**
4. Set **Type** to **Secret**
5. **Variable name:** `ANTHROPIC_API_KEY`
6. **Value:** your Anthropic API key from [console.anthropic.com](https://console.anthropic.com)
7. Click **Deploy**

---

## Step 4 — Get your Worker URL

On the Worker overview page, your URL is shown under the Worker name. It looks like:

```
https://film-coach.YOUR-ACCOUNT.workers.dev
```

Copy that URL.

---

## Step 5 — Update the website

Open `js/film-coach.js` and replace line 11:

```javascript
const WORKER_URL = 'https://film-coach.YOUR-SUBDOMAIN.workers.dev';
```

Paste your actual Worker URL there. Then push to GitHub:

```
git push origin tokyo-main:main
```

---

## Cost

- **Cloudflare Worker:** Free tier — 100,000 requests/day
- **Anthropic API:** ~$0.01–0.05 per student conversation (Claude Sonnet)
- For a class of 15–20 students: roughly $5–15/month during active use

---

## Changing the AI model

In `worker.js`, find:

```javascript
model: 'claude-sonnet-4-20250514',
```

Change to `claude-3-5-haiku-20241022` for a cheaper option if needed.

---

## Troubleshooting

- **Chat says "not configured"** → WORKER_URL in `js/film-coach.js` still has the placeholder
- **Chat says "could not reach"** → Worker is not deployed or URL is wrong
- **502 error** → ANTHROPIC_API_KEY secret is missing or incorrect in Cloudflare
- **CORS error** → The origin making requests must be in the ALLOWED_ORIGINS list in `worker.js`

