import React, { useState } from 'react';
import { searchPapers } from '../api';
import PaperCard from '../components/PaperCard';

function Search() {
  const [query, setQuery] = useState('');
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await searchPapers(query);
      setPapers(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-1px' }}>
        <span className="gradient-text">Search Papers</span>
      </h1>
      <p style={{ color: 'rgba(226,232,240,0.5)', marginBottom: '28px', fontSize: '14px' }}>
        Search across ArXiv, PubMed and Semantic Scholar
      </p>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search for research papers..."
          className="input-field"
        />
        <button onClick={handleSearch} className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
          Search
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(226,232,240,0.5)' }}>
          Searching papers...
        </div>
      )}

      {!loading && searched && papers.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(226,232,240,0.5)' }}>
          No papers found. Try a different query.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {papers.map((paper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    </div>
  );
}

export default Search;