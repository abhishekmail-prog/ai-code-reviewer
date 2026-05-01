# 🤖 AI Code Reviewer

An AI-powered code review web application that analyzes code for bugs, complexity, and optimizations.

Built using an AI-assisted development workflow ("vibe coding") while focusing on architecture, debugging, and iterative improvements.

---

## 🚀 Features

- 🔍 Analyze C++, JavaScript, and Python code
- 🐞 Detect potential bugs and issues
- ⚡ Time & Space complexity breakdown
- 💡 Optimization suggestions
- 🧹 Cleaned and improved version of code
- 🌙 Modern dark-themed UI with smooth loading animations

---

## 🧠 What I Learned

- How to effectively guide AI tools to generate useful code
- Structuring a full-stack application (frontend + backend)
- Debugging and refining AI-generated outputs
- Designing APIs and handling async operations

---

## 🛠️ Tech Stack

Frontend:
- React
- CSS Modules

Backend:
- Node.js
- Express

AI Integration:
- OpenAI API

---

## 📁 Project Structure

ai-code-reviewer/
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/review.js
│   │   └── services/openaiService.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── public/index.html
    ├── src/
    │   ├── index.js
    │   ├── App.jsx
    │   ├── api.js
    │   └── components/
    └── package.json

---

## ⚙️ Setup Instructions

### 1. Backend

cd backend  
npm install  
cp .env.example .env  

Add your API key in `.env`:

OPENAI_API_KEY=your_api_key_here  
PORT=5000  

Run backend:

npm run dev  

---

### 2. Frontend

cd frontend  
npm install  
npm start  

---

## 🔌 API Endpoint

POST /api/review

Request:
{
  "code": "def foo(): pass",
  "language": "python"
}

Response:
{
  "bugs": [],
  "complexity": {},
  "optimizations": [],
  "cleanedCode": ""
}

---

## 📌 Notes

- This project uses AI as a development tool, not a replacement for understanding
- All structure, debugging, and improvements were handled manually

---

## 🌐 Future Improvements

- User authentication
- Save review history
- Support more programming languages
- Deploy as a public SaaS tool

