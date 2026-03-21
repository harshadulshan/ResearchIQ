import React, { useEffect, useState } from 'react';
import { sendChat, getChatHistory } from '../api';

function ChatBox({ paperId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getChatHistory(paperId).then((res) => setMessages(res.data));
  }, [paperId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setLoading(true);
    setMessages((prev) => [...prev, { role: 'user', message: userMsg }]);
    try {
      const res = await sendChat(paperId, userMsg);
      setMessages((prev) => [...prev, { role: 'assistant', message: res.data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', message: 'Error getting response.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
      <h2 className="text-blue-400 font-bold text-lg mb-4">💬 Chat About This Paper</h2>
      <div className="flex flex-col gap-3 mb-4 max-h-80 overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm">Ask anything about this paper!</p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-4 py-3 rounded-lg text-sm max-w-[80%] ${
              msg.role === 'user'
                ? 'bg-blue-600 self-end text-white'
                : 'bg-gray-800 self-start text-gray-200'
            }`}
          >
            {msg.message}
          </div>
        ))}
        {loading && (
          <div className="bg-gray-800 self-start px-4 py-3 rounded-lg text-sm text-gray-400">
            ⏳ Thinking...
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about this paper..."
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold transition disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;