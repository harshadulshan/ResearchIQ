import React, { useEffect, useState } from 'react';
import { getBookmarks, exportPDF, exportWord } from '../api';
import PaperCard from '../components/PaperCard';

function ReadingList() {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    getBookmarks().then((res) => setPapers(res.data));
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-1px' }}>
            <span className="gradient-text">Reading List</span>
          </h1>
          <p style={{ color: 'rgba(226,232,240,0.5)', fontSize: '14px', marginTop: '4px' }}>
            {papers.length} bookmarked papers
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={exportPDF} className="btn-secondary" style={{ fontSize: '13px' }}>
            📄 Export PDF
          </button>
          <button onClick={exportWord} className="btn-primary" style={{ fontSize: '13px' }}>
            📝 Export Word
          </button>
        </div>
      </div>

      {papers.length === 0 ? (
        <div className="glass-card" style={{ borderRadius: '16px', padding: '60px', textAlign: 'center' }}>
          <p style={{ fontSize: '40px', marginBottom: '16px' }}>📚</p>
          <p style={{ color: 'rgba(226,232,240,0.5)', fontSize: '15px' }}>No bookmarks yet.</p>
          <p style={{ color: 'rgba(226,232,240,0.35)', fontSize: '13px', marginTop: '8px' }}>Search and bookmark papers to see them here!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {papers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ReadingList;