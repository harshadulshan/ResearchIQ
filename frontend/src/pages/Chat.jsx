import React, { useState, useEffect } from 'react';
import { getPapers, sendChat, getChatHistory } from '../api';

function Chat() {
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPapers().then((res) => setPapers(res.data));
  }, []);

  const handleSelectPaper = async (paper) => {
    setSelectedPaper(paper);
    setMessages([]);
    try {
      const res = await getChatHistory(paper.id);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !selectedPaper) return;
    const userMsg = input;
    setInput('');
    setLoading(true);
    setMessages((prev) => [...prev, { role: 'user', message: userMsg }]);
    try {
      const res = await sendChat(selectedPaper.id, userMsg);
      setMessages((prev) => [...prev, { role: 'assistant', message: res.data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', message: 'Error getting response.' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-1px' }}>
        <span className="gradient-text">Chat With Papers</span>
      </h1>
      <p style={{ color: 'rgba(226,232,240,0.5)', marginBottom: '28px', fontSize: '14px' }}>
        Select a paper and ask anything about it
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px' }}>
        <div className="glass-card" style={{ borderRadius: '16px', padding: '16px', height: 'fit-content', maxHeight: '70vh', overflowY: 'auto' }}>
          <p style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(226,232,240,0.4)', letterSpacing: '1px', marginBottom: '12px' }}>
            SELECT PAPER
          </p>
          {papers.length === 0 && (
            <p style={{ color: 'rgba(226,232,240,0.4)', fontSize: '13px' }}>No papers yet. Search first!</p>
          )}
          {papers.map((paper) => (
            <button
              key={paper.id}
              onClick={() => handleSelectPaper(paper)}
              style={{
                width: '100%', textAlign: 'left',
                padding: '12px', borderRadius: '10px',
                marginBottom: '6px', border: 'none', cursor: 'pointer',
                background: selectedPaper?.id === paper.id ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.04)',
                borderLeft: selectedPaper?.id === paper.id ? '3px solid #6366f1' : '3px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              <p style={{ fontWeight: '600', fontSize: '12px', color: '#e2e8f0', lineHeight: '1.4', marginBottom: '4px' }}>
                {paper.title?.substring(0, 60)}...
              </p>
              <p style={{ fontSize: '11px', color: 'rgba(226,232,240,0.4)' }}>{paper.source}</p>
            </button>
          ))}
        </div>

        <div className="glass-card" style={{ borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', height: '70vh' }}>
          {!selectedPaper ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '40px' }}>💬</p>
              <p style={{ color: 'rgba(226,232,240,0.4)', fontSize: '14px' }}>Select a paper to start chatting</p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <p style={{ fontWeight: '700', fontSize: '14px', color: '#e2e8f0', lineHeight: '1.4' }}>{selectedPaper.title}</p>
                <p style={{ fontSize: '12px', color: 'rgba(226,232,240,0.4)', marginTop: '4px' }}>{selectedPaper.source}</p>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                {messages.length === 0 && (
                  <p style={{ color: 'rgba(226,232,240,0.35)', fontSize: '13px', textAlign: 'center', marginTop: '20px' }}>
                    Ask anything about this paper!
                  </p>
                )}
                {messages.map((msg, i) => (
                  <div key={i} style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    maxWidth: '80%',
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                      : 'rgba(255,255,255,0.08)',
                    color: '#e2e8f0'
                  }}>
                    {msg.message}
                  </div>
                ))}
                {loading && (
                  <div style={{
                    padding: '12px 16px', borderRadius: '12px',
                    fontSize: '13px', background: 'rgba(255,255,255,0.08)',
                    color: 'rgba(226,232,240,0.5)', alignSelf: 'flex-start'
                  }}>
                    Thinking...
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about this paper..."
                  className="input-field"
                />
                <button
                  onClick={handleSend}
                  disabled={loading}
                  className="btn-primary"
                  style={{ whiteSpace: 'nowrap', opacity: loading ? 0.5 : 1 }}
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;