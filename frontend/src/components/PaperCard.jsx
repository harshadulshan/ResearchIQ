import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toggleBookmark } from '../api';

function PaperCard({ paper }) {
  const [bookmarked, setBookmarked] = useState(paper.bookmarked);

  const handleBookmark = async (e) => {
    e.preventDefault();
    try {
      await toggleBookmark(paper.id);
      setBookmarked(!bookmarked);
    } catch (err) {
      console.error(err);
    }
  };

  const getBadgeClass = (source) => {
    if (source === 'ArXiv') return 'badge-arxiv';
    if (source === 'PubMed') return 'badge-pubmed';
    return 'badge-semantic';
  };

  return (
    <div className="glass-card" style={{ borderRadius: '16px', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
        <Link to={`/paper/${paper.id}`} style={{ textDecoration: 'none', flex: 1 }}>
          <h2 style={{ color: '#e2e8f0', fontWeight: '700', fontSize: '15px', lineHeight: '1.5', marginBottom: '8px' }}>
            {paper.title || 'Untitled Paper'}
          </h2>
        </Link>
        <button
          onClick={handleBookmark}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '20px', color: bookmarked ? '#fbbf24' : 'rgba(226,232,240,0.3)',
            transition: 'all 0.2s ease', flexShrink: 0
          }}
        >
          {bookmarked ? '★' : '☆'}
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
        <span className={getBadgeClass(paper.source)}>{paper.source}</span>
        {paper.published && (
          <span style={{ color: 'rgba(226,232,240,0.4)', fontSize: '12px' }}>{paper.published}</span>
        )}
      </div>

      {paper.authors && (
        <p style={{ color: 'rgba(226,232,240,0.5)', fontSize: '12px', marginBottom: '10px' }}>
          {paper.authors.length > 80 ? paper.authors.substring(0, 80) + '...' : paper.authors}
        </p>
      )}

      <p style={{ color: 'rgba(226,232,240,0.65)', fontSize: '13px', lineHeight: '1.6', marginBottom: '12px' }}>
        {(paper.summary || paper.abstract || 'No summary available').substring(0, 200)}...
      </p>

      <Link to={`/paper/${paper.id}`} style={{
        color: '#a78bfa', fontSize: '13px', fontWeight: '600',
        textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px'
      }}>
        Read more →
      </Link>
    </div>
  );
}

export default PaperCard;