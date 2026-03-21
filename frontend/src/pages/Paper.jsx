import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPaper, toggleBookmark, getCitations } from '../api';
import ChatBox from '../components/ChatBox';

function Paper() {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [references, setReferences] = useState([]);
  const [citations, setCitations] = useState([]);
  const [loadingCitations, setLoadingCitations] = useState(false);
  const [showCitations, setShowCitations] = useState(false);

  useEffect(() => {
    getPaper(id).then((res) => setPaper(res.data));
  }, [id]);

  const handleBookmark = async () => {
    const res = await toggleBookmark(id);
    setPaper((prev) => ({ ...prev, bookmarked: res.data.bookmarked }));
  };

  const handleLoadCitations = async () => {
    setLoadingCitations(true);
    setShowCitations(true);
    try {
      const res = await getCitations(id);
      setReferences(res.data.references || []);
      setCitations(res.data.citations || []);
    } catch (err) {
      console.error(err);
    }
    setLoadingCitations(false);
  };

  const openPaper = () => {
    window.open(paper.url, '_blank');
  };

  if (!paper) {
    return <p className="text-gray-400 text-center py-20">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">{paper.title}</h1>
        <p className="text-gray-400 text-sm">{paper.authors}</p>
        <p className="text-gray-500 text-sm mb-4">{paper.source} - {paper.published}</p>
        <button
          onClick={handleBookmark}
          className={`mb-4 px-4 py-2 rounded-lg text-sm font-bold transition ${paper.bookmarked ? 'bg-yellow-500 text-black' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
        >
          {paper.bookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
        <div className="mt-2">
          <h2 className="text-blue-400 font-bold mb-2">AI Summary</h2>
          <p className="text-gray-300 mb-4">{paper.summary}</p>
        </div>
        <div className="mt-2">
          <h2 className="text-blue-400 font-bold mb-2">Abstract</h2>
          <p className="text-gray-400 text-sm mb-4">{paper.abstract}</p>
        </div>
        <button
          onClick={openPaper}
          className="text-blue-400 hover:underline text-sm bg-transparent border-none cursor-pointer"
        >
          View Original Paper
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-blue-400 font-bold text-lg">Citation Tracker</h2>
          {!showCitations && (
            <button
              onClick={handleLoadCitations}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition"
            >
              Load Citations
            </button>
          )}
        </div>

        {loadingCitations && (
          <p className="text-gray-400">Loading citations...</p>
        )}

        {showCitations && !loadingCitations && (
          <div>
            <h3 className="text-white font-bold mb-3">References ({references.length})</h3>
            {references.length === 0 && (
              <p className="text-gray-500 text-sm mb-4">No references found</p>
            )}
            <div className="flex flex-col gap-2 mb-6">
              {references.map((ref, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-3">
                  <p className="text-white text-sm font-bold">{ref.cited_title}</p>
                  <p className="text-gray-400 text-xs">{ref.cited_authors} {ref.cited_year && `· ${ref.cited_year}`}</p>
                  {ref.cited_url && (
                    <button
                      onClick={() => window.open(ref.cited_url, '_blank')}
                      className="text-blue-400 text-xs hover:underline bg-transparent border-none cursor-pointer"
                    >
                      View Paper
                    </button>
                  )}
                </div>
              ))}
            </div>
            <h3 className="text-white font-bold mb-3">Cited By ({citations.length})</h3>
            {citations.length === 0 && (
              <p className="text-gray-500 text-sm">No citing papers found</p>
            )}
            <div className="flex flex-col gap-2">
              {citations.map((cit, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-3">
                  <p className="text-white text-sm font-bold">{cit.cited_title}</p>
                  <p className="text-gray-400 text-xs">{cit.cited_authors} {cit.cited_year && `· ${cit.cited_year}`}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ChatBox paperId={id} />
    </div>
  );
}

export default Paper;