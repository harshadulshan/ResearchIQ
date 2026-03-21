from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
import io

from database import get_db, init_db, Paper, ChatHistory, Citation
from citation_tracker import get_citations_semantic
from scraper import search_all
from summarizer import summarize_paper
from chatbot import chat_with_paper
from exporter import export_to_pdf, export_to_word

app = FastAPI(title="ResearchIQ API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

@app.get("/search")
def search_papers(query: str, db: Session = Depends(get_db)):
    papers = search_all(query, max_results=5)
    saved = []
    for p in papers:
        existing = db.query(Paper).filter(Paper.url == p["url"]).first()
        if not existing:
            summary = summarize_paper(p["abstract"])
            paper = Paper(**p, summary=summary)
            db.add(paper)
            db.commit()
            db.refresh(paper)
            saved.append(paper)
        else:
            saved.append(existing)
    return saved

@app.get("/papers")
def get_papers(db: Session = Depends(get_db)):
    return db.query(Paper).all()

@app.get("/papers/{paper_id}")
def get_paper(paper_id: int, db: Session = Depends(get_db)):
    paper = db.query(Paper).filter(Paper.id == paper_id).first()
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    return paper

@app.post("/papers/{paper_id}/bookmark")
def toggle_bookmark(paper_id: int, db: Session = Depends(get_db)):
    paper = db.query(Paper).filter(Paper.id == paper_id).first()
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    paper.bookmarked = not paper.bookmarked
    db.commit()
    return {"bookmarked": paper.bookmarked}

@app.get("/bookmarks")
def get_bookmarks(db: Session = Depends(get_db)):
    return db.query(Paper).filter(Paper.bookmarked == True).all()

class ChatMessage(BaseModel):
    message: str

@app.post("/papers/{paper_id}/chat")
def chat(paper_id: int, body: ChatMessage, db: Session = Depends(get_db)):
    paper = db.query(Paper).filter(Paper.id == paper_id).first()
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    history = db.query(ChatHistory).filter(ChatHistory.paper_id == paper_id).all()
    reply = chat_with_paper(paper.title, paper.abstract, body.message, history)
    db.add(ChatHistory(paper_id=paper_id, role="user", message=body.message))
    db.add(ChatHistory(paper_id=paper_id, role="assistant", message=reply))
    db.commit()
    return {"reply": reply}

@app.get("/papers/{paper_id}/chat/history")
def get_chat_history(paper_id: int, db: Session = Depends(get_db)):
    return db.query(ChatHistory).filter(ChatHistory.paper_id == paper_id).all()

@app.get("/export/pdf")
def export_pdf(db: Session = Depends(get_db)):
    papers = db.query(Paper).filter(Paper.bookmarked == True).all()
    data = [{"title": p.title, "authors": p.authors, "source": p.source,
             "published": p.published, "summary": p.summary, "abstract": p.abstract}
            for p in papers]
    pdf = export_to_pdf(data)
    return StreamingResponse(io.BytesIO(pdf), media_type="application/pdf",
                             headers={"Content-Disposition": "attachment; filename=researchiq.pdf"})

@app.get("/export/word")
def export_word(db: Session = Depends(get_db)):
    papers = db.query(Paper).filter(Paper.bookmarked == True).all()
    data = [{"title": p.title, "authors": p.authors, "source": p.source,
             "published": p.published, "summary": p.summary, "abstract": p.abstract}
            for p in papers]
    word = export_to_word(data)
    return StreamingResponse(io.BytesIO(word), media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                             headers={"Content-Disposition": "attachment; filename=researchiq.docx"})
@app.get("/papers/{paper_id}/citations")
def get_citations(paper_id: int, db: Session = Depends(get_db)):
    paper = db.query(Paper).filter(Paper.id == paper_id).first()
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    
    existing = db.query(Citation).filter(Citation.paper_id == paper_id).all()
    if existing:
        return {"references": existing, "citations": []}
    
    references, citations = get_citations_semantic(paper.title)
    
    for ref in references:
        citation = Citation(paper_id=paper_id, **ref)
        db.add(citation)
    db.commit()
    
    return {"references": references, "citations": citations}