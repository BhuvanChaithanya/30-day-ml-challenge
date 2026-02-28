# 🤖 30-Day ML Challenge — Portfolio Hub

A static landing page that indexes all 30 daily ML model deployments.

---

## Project Structure

```
Portfolio/
├── index.html    ← Main page (you never need to edit this)
├── style.css     ← All styles (never need to edit this)
├── script.js     ← All interactivity (never need to edit this)
├── projects.js   ← ✅ THE ONLY FILE YOU EDIT DAILY
└── README.md     ← This file
```

---

## ✏️ How to Update Daily (takes ~2 minutes)

### Step 1 — Open `projects.js`

Find the entry for the current day. For example, on Day 4:

```js
{
  day: 4,
  title: "Day 4 — Coming Soon",     // ← Replace with your model name
  summary: "Project details...",     // ← Replace with 1-2 sentence description
  tags: ["TBD"],                     // ← Replace with real tags
  status: "upcoming",                // ← Change to "completed"
  link: "#"                          // ← Paste your live app URL here
},
```

### Step 2 — Fill in the details

```js
{
  day: 4,
  title: "Spam Email Detector",
  summary: "Naive Bayes classifier trained on the Enron spam dataset. Achieves 97.2% accuracy with TF-IDF features.",
  tags: ["NLP", "Classification", "Naive Bayes"],
  status: "completed",
  link: "https://your-streamlit-app.streamlit.app"
},
```

### Step 3 — Save the file

The page re-renders automatically. No build step needed.

---

## 🚦 Status Options

| Value | Badge | Description |
|---|---|---|
| `"completed"` | 🟢 Completed | Model is deployed and live |
| `"in-progress"` | 🟡 In Progress | Currently being built |
| `"upcoming"` | ⚪ Upcoming | Not started yet |

---

## 🏷️ Suggested Tags

Use consistent tags so the search/filter works well:

**ML Task:** `Classification`, `Regression`, `Clustering`, `NLP`, `Computer Vision`, `Time Series`, `Recommendation`

**Framework:** `Sklearn`, `XGBoost`, `PyTorch`, `TensorFlow`, `HuggingFace`, `LightGBM`

**Deployment:** `Streamlit`, `Gradio`, `FastAPI`, `HuggingFace Spaces`

---

## 🚀 Deploying the Portfolio Itself

### Option A — GitHub Pages (Free, recommended)

1. Push the `Portfolio/` folder to a GitHub repo
2. Go to **Settings → Pages → Source → main branch → / (root)**
3. Your site is live at `https://yourusername.github.io/Portfolio`

### Option B — Netlify (Free, instant previews)

1. Go to [netlify.com](https://netlify.com) → "Add new site" → "Import from Git"
2. Connect your repo — it auto-detects the static site
3. Deploy! Every `git push` auto-redeploys.

### Option C — Vercel

```bash
npm i -g vercel
cd Portfolio
vercel
```

---

## 📌 Useful Links for Deploying Your Daily Models

| Platform | Free Tier | Best For |
|---|---|---|
| [Streamlit Cloud](https://streamlit.io/cloud) | ✅ | Streamlit apps |
| [HuggingFace Spaces](https://huggingface.co/spaces) | ✅ | Gradio & Streamlit |
| [Render](https://render.com) | ✅ (sleeps) | FastAPI / Flask |
| [Railway](https://railway.app) | $5/mo credit | Docker-based apps |

---

*Update this README whenever your deployment strategy changes.*
