<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=6366f1&height=200&section=header&text=ResearchIQ&fontSize=80&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=AI-Powered%20Research%20Assistant&descAlignY=55&descAlign=50" width="100%"/>

<br/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=28&duration=3000&pause=1000&color=6366F1&center=true&vCenter=true&width=600&lines=Search+Academic+Papers+with+AI;Chat+with+Research+Papers;Track+Citations+Automatically;Export+to+PDF+%26+Word)](https://git.io/typing-svg)

<br/>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

<br/>

![GitHub stars](https://img.shields.io/github/stars/harshadulshan/ResearchIQ?style=social)
![GitHub forks](https://img.shields.io/github/forks/harshadulshan/ResearchIQ?style=social)

</div>

---

## 🌟 Overview

> **ResearchIQ** is a full-stack AI-powered research assistant that helps students and researchers search, summarize, and interact with academic papers — all in one beautiful interface.

<div align="center">

### 🏠 Home Page
![Home](screenshots/home.png)

</div>

---

## ✨ Features

<div align="center">

| Feature | Description | Status |
|---------|-------------|--------|
| 🔍 Smart Search | Search ArXiv, PubMed & Semantic Scholar | ✅ Live |
| 🧠 AI Summaries | NLP-powered summaries + keywords | ✅ Live |
| 💬 AI Chatbot | Chat with papers using Groq LLaMA 3 | ✅ Live |
| 🔗 Citation Tracker | Track references & citations | ✅ Live |
| 📚 Reading List | Bookmark & organize papers | ✅ Live |
| 📄 Export | PDF & Word export | ✅ Live |
| 📈 Trend Charts | Visualize research trends | ✅ Live |
| 🎨 Modern UI | Glassmorphism + gradient design | ✅ Live |

</div>

---

## 📸 Screenshots

<div align="center">

### 🔍 Search Papers
![Search](screenshots/search.png)

### 📄 Paper Details & AI Summary
![Paper](screenshots/paper.png)

### 💬 AI Chat Interface
![Chat](screenshots/chat.png)

### 📈 Research Trends
![Trends](screenshots/trends.png)

</div>

---

## 📊 Project Stats

<div align="center">
```
╔═══════════════════════════════════════════════════════════╗
║                    ResearchIQ Stats                       ║
╠═══════════════════════════════════════════════════════════╣
║  📦 Search Sources    │  ArXiv + PubMed + Semantic Scholar ║
║  🤖 AI Model          │  Groq LLaMA 3.3 70B               ║
║  🗄️  Database          │  SQLite                           ║
║  ⚡ Backend           │  Python FastAPI                    ║
║  🎨 Frontend          │  React + TailwindCSS               ║
║  📄 Export Formats    │  PDF + Word                        ║
╚═══════════════════════════════════════════════════════════╝
```

</div>

---

## 🏗️ Architecture
```mermaid
graph TD
    A[👤 User] -->|Search Query| B[React Frontend]
    B -->|API Request| C[FastAPI Backend]
    C -->|Search| D[ArXiv API]
    C -->|Search| E[PubMed API]
    C -->|Search| F[Semantic Scholar API]
    D -->|Papers| G[NLP Summarizer]
    E -->|Papers| G
    F -->|Papers| G
    G -->|Summaries| H[(SQLite Database)]
    H -->|Data| B
    B -->|Chat Message| I[Groq AI LLaMA 3]
    I -->|AI Response| B
    B -->|Export| J[PDF / Word]

    style A fill:#6366f1,color:#fff
    style B fill:#8b5cf6,color:#fff
    style C fill:#06b6d4,color:#fff
    style H fill:#10b981,color:#fff
    style I fill:#f59e0b,color:#fff
    style J fill:#ef4444,color:#fff
```

---

## 🚀 Getting Started

### Prerequisites
```bash
node --version    # v20+
python --version  # 3.11+
npm --version     # 10+
```

### ⚡ Quick Start

**1️⃣ Clone the repository**
```bash
git clone https://github.com/harshadulshan/ResearchIQ.git
cd ResearchIQ
```

**2️⃣ Setup Backend**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

**3️⃣ Add your Groq API key**
```python
# backend/chatbot.py
GROQ_API_KEY = "your-groq-api-key-here"
```
> Get free API key at 👉 https://console.groq.com

**4️⃣ Start Backend**
```bash
uvicorn main:app --reload
```

**5️⃣ Setup & Start Frontend**
```bash
cd frontend
npm install
npm start
```

**6️⃣ Open in browser**
```
http://localhost:3000
```

---

## 📁 Project Structure
```
ResearchIQ/
├── 📂 backend/
│   ├── 🐍 main.py              ← FastAPI server
│   ├── 🔍 scraper.py           ← Paper scraping
│   ├── 🧠 summarizer.py        ← NLP summaries
│   ├── 🗄️  database.py          ← SQLite models
│   ├── 💬 chatbot.py           ← AI chatbot
│   ├── 🔗 citation_tracker.py  ← Citation tracking
│   └── 📄 exporter.py          ← PDF/Word export
│
├── 📂 frontend/
│   └── 📂 src/
│       ├── 📂 pages/
│       │   ├── 🏠 Home.jsx
│       │   ├── 🔍 Search.jsx
│       │   ├── 📄 Paper.jsx
│       │   ├── 📚 ReadingList.jsx
│       │   ├── 📈 Trends.jsx
│       │   └── 💬 Chat.jsx
│       └── 📂 components/
│           ├── 🃏 PaperCard.jsx
│           ├── 💬 ChatBox.jsx
│           └── 📊 Charts.jsx
│
└── 📂 screenshots/
    ├── 🖼️  home.png
    ├── 🖼️  search.png
    ├── 🖼️  paper.png
    ├── 🖼️  chat.png
    └── 🖼️  trends.png
```

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|-------|-----------|---------|
| 🎨 Frontend | React 18 | UI Framework |
| 💅 Styling | TailwindCSS | Glassmorphism UI |
| 📊 Charts | Recharts | Data Visualization |
| ⚡ Backend | Python FastAPI | REST API |
| 🗄️ Database | SQLite + SQLAlchemy | Data Storage |
| 🤖 AI | Groq LLaMA 3.3 70B | Chatbot |
| 🔍 Search | ArXiv + PubMed + Semantic Scholar | Paper Sources |
| 📄 Export | ReportLab + python-docx | PDF & Word |

</div>

---

## 👨‍💻 Author

<div align="center">

**Harsha Dulshan**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/harshadulshan)

*Built with ❤️ for university project*

</div>

---

## 📄 License

<div align="center">

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

<img src="https://capsule-render.vercel.app/api?type=waving&color=6366f1&height=100&section=footer" width="100%"/>

</div>
