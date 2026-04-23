# Project 9: L'Oréal Routine Builder

This app now supports:

- Click to select or unselect product cards
- Description reveal inside each product card
- Selected products list with remove buttons
- Clear all selections
- localStorage persistence for selected products
- AI routine generation from only selected products
- Follow-up chat using full conversation history

## 1) Connect Frontend to Your Cloudflare Worker

In script.js, set your Worker URL:

const WORKER_ENDPOINT = "https://your-worker-subdomain.workers.dev";

## 2) Deploy the Worker (Secure API Key)

Worker files are in cloudflare-worker/:

- cloudflare-worker/worker.js
- cloudflare-worker/wrangler.toml

From the project root:

1. cd cloudflare-worker
2. npm install -g wrangler
3. wrangler login
4. wrangler secret put OPENAI_API_KEY
5. wrangler deploy

After deploy, copy your Worker URL and paste it into script.js.

## 3) Worker Behavior

The Worker:

- Accepts POST requests from the frontend
- Uses env.OPENAI_API_KEY (not hardcoded)
- Sends requests to OpenAI chat completions with messages
- Returns data.choices[0].message.content in a JSON response
- Supports CORS for browser requests

## 4) Run Locally

Use VS Code Live Server or any simple static server to open index.html.

Then:

1. Choose a category
2. Select products
3. Click Generate Routine
4. Ask follow-up questions in the chatbox
