import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const features = [
    { icon: '🔍', title: 'Smart Search', desc: 'Search across ArXiv, PubMed and Semantic Scholar simultaneously.', color: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.3)' },
    { icon: '🧠', title: 'AI Summaries', desc: 'Get instant AI-powered summaries with key topics from any paper.', color: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.3)' },
    { icon: '💬', title: 'AI Chatbot', desc: 'Ask questions about any paper and get intelligent answers.', color: 'rgba(56,189,248,0.15)', border: 'rgba(56,189,248,0.3)' },
    { icon: '📚', title: 'Reading List', desc: 'Bookmark papers and organize your reading list easily.', color: 'rgba(234,179,8,0.15)', border: 'rgba(234,179,8,0.3)' },
    { icon: '🔗', title: 'Citation Tracker', desc: 'Track paper relationships, references and citations.', color: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.3)' },
    { icon: '📄', title: 'Export', desc: 'Export bookmarked papers as PDF or Word documents.', color: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.3)' },
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', padding: '60px 0 40px' }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(99,102,241,0.15)',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '20px',
          padding: '6px 16px',
          fontSize: '13px',
          fontWeight: '600',
          color: '#a78bfa',
          marginBottom: '24px',
          letterSpacing: '0.5px'
        }}>
          AI POWERED RESEARCH ASSISTANT
        </div>

        <h1 style={{ fontSize: '64px', fontWeight: '800', lineHeight: '1.1', marginBottom: '20px', letterSpacing: '-2px' }}>
          <span className="gradient-text">Research</span>
          <span style={{ color: '#e2e8f0' }}>IQ</span>
        </h1>

        <p style={{ fontSize: '18px', color: 'rgba(226,232,240,0.6)', marginBottom: '36px', maxWidth: '560px', margin: '0 auto 36px', lineHeight: '1.7' }}>
          Search, summarize and chat with academic papers from multiple sources — powered by AI.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link to="/search" className="btn-primary" style={{ textDecoration: 'none', fontSize: '15px', padding: '12px 28px' }}>
            Start Searching →
          </Link>
          <Link to="/chat" className="btn-secondary" style={{ textDecoration: 'none', fontSize: '15px', padding: '12px 28px' }}>
            Chat with Papers
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', margin: '60px 0' }}>
        {features.map((item, i) => (
          <div key={i} className="glass-card" style={{ borderRadius: '16px', padding: '24px' }}>
            <div style={{
              background: item.color,
              border: `1px solid ${item.border}`,
              borderRadius: '12px',
              width: '44px', height: '44px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '16px', fontSize: '20px'
            }}>
              {item.icon}
            </div>
            <h2 style={{ fontWeight: '700', fontSize: '15px', color: '#e2e8f0', marginBottom: '8px' }}>{item.title}</h2>
            <p style={{ fontSize: '13px', color: 'rgba(226,232,240,0.55)', lineHeight: '1.6' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '60px' }}>
        {[
          { value: '3+', label: 'Research Sources' },
          { value: 'AI', label: 'Powered Summaries' },
          { value: '100%', label: 'Free To Use' },
        ].map((stat, i) => (
          <div key={i} className="glass-card" style={{ borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
            <p style={{ fontSize: '36px', fontWeight: '800' }} className="gradient-text">{stat.value}</p>
            <p style={{ color: 'rgba(226,232,240,0.55)', fontSize: '13px', marginTop: '4px' }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;