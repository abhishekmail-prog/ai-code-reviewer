# AI Code Reviewer

A full-stack AI-powered code reviewer with React frontend and Node.js/Express backend.

## Features
- Paste C++, JavaScript, or Python code
- AI returns bugs, time/space complexity, optimizations, and a cleaned-up version
- Dark theme, modular React components, loading animation

## Project Structure

```
ai-code-reviewer/
├── backend/
│   ├── src/
│   │   ├── server.js              # Express entry point
│   │   ├── routes/
│   │   │   └── review.js          # POST /api/review route
│   │   └── services/
│   │       └── openaiService.js   # OpenAI GPT-4o call + prompt
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── index.js               # React entry
    │   ├── App.jsx                # Root component
    │   ├── App.module.css
    │   ├── api.js                 # fetch wrapper for backend
    │   └── components/
    │       ├── CodeEditor.jsx     # Textarea + language selector
    │       ├── CodeEditor.module.css
    │       ├── LoadingBar.jsx     # Animated progress bar
    │       ├── LoadingBar.module.css
    │       ├── ResultSection.jsx  # Collapsible section wrapper
    │       ├── ResultSection.module.css
    │       ├── ReviewResults.jsx  # All 4 result panels
    │       └── ReviewResults.module.css
    └── package.json
```

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
npm run dev        # development (nodemon)
# or
npm start          # production
```

Backend runs on http://localhost:5000

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on http://localhost:3000 and proxies `/api/*` to the backend.

## Environment Variables

**backend/.env**
```
OPENAI_API_KEY=sk-...
PORT=5000
```

## API

### POST /api/review

**Request body:**
```json
{
  "code": "def foo(): pass",
  "language": "python"
}
```

**Response:**
```json
{
  "bugs": [{ "title": "...", "description": "..." }],
  "complexity": {
    "time": "O(n)",
    "space": "O(1)",
    "timeExplanation": "...",
    "spaceExplanation": "..."
  },
  "optimizations": [{ "title": "...", "description": "..." }],
  "cleanedCode": "def foo():\n    pass\n"
}
```

Supported languages: `python`, `javascript`, `cpp`
