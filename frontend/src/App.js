import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Paper from './pages/Paper';
import ReadingList from './pages/ReadingList';
import Trends from './pages/Trends';
import Chat from './pages/Chat';

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      style={{
        color: isActive ? '#a78bfa' : 'rgba(226,232,240,0.7)',
        fontWeight: isActive ? '600' : '500',
        fontSize: '14px',
        textDecoration: 'none',
        padding: '6px 12px',
        borderRadius: '8px',
        background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
        transition: 'all 0.2s ease'
      }}
    >
      {children}
    </Link>
  );
}

function AppContent() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <nav className="glass-strong" style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '16px 40px',
        display: 'flex',
        alignItems: 'center',
        gap: '32px'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            <span className="gradient-text">Research</span>
            <span style={{ color: '#e2e8f0' }}>IQ</span>
          </span>
        </Link>
        <div style={{ display: 'flex', gap: '4px', marginLeft: '8px' }}>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/chat">Chat</NavLink>
          <NavLink to="/reading-list">Reading List</NavLink>
          <NavLink to="/trends">Trends</NavLink>
        </div>
      </nav>
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/paper/:id" element={<Paper />} />
          <Route path="/reading-list" element={<ReadingList />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;