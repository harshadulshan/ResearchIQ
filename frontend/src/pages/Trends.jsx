import React, { useEffect, useState } from 'react';
import { getPapers } from '../api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(15,12,41,0.9)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '10px',
        padding: '10px 16px',
        fontSize: '13px',
        color: '#e2e8f0'
      }}>
        <p style={{ fontWeight: '600' }}>{label}</p>
        <p style={{ color: '#a78bfa' }}>{payload[0].value} papers</p>
      </div>
    );
  }
  return null;
};

function Trends() {
  const [sourceData, setSourceData] = useState([]);
  const [yearData, setYearData] = useState([]);

  useEffect(() => {
    getPapers().then((res) => {
      const papers = res.data;
      const sourceCounts = {};
      const yearCounts = {};
      papers.forEach((p) => {
        sourceCounts[p.source] = (sourceCounts[p.source] || 0) + 1;
        const year = p.published?.substring(0, 4) || 'Unknown';
        yearCounts[year] = (yearCounts[year] || 0) + 1;
      });
      setSourceData(Object.entries(sourceCounts).map(([name, value]) => ({ name, value })));
      setYearData(Object.entries(yearCounts).sort().map(([name, value]) => ({ name, value })));
    });
  }, []);

  const sourceColors = ['#6366f1', '#a78bfa', '#38bdf8'];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-1px' }}>
        <span className="gradient-text">Research Trends</span>
      </h1>
      <p style={{ color: 'rgba(226,232,240,0.5)', marginBottom: '28px', fontSize: '14px' }}>
        Visualize your research activity
      </p>

      <div className="glass-card" style={{ borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
        <h2 style={{ fontWeight: '700', fontSize: '15px', color: '#e2e8f0', marginBottom: '20px' }}>
          Papers by Source
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={sourceData} barSize={40}>
            <XAxis dataKey="name" stroke="rgba(226,232,240,0.4)" tick={{ fontSize: 12 }} />
            <YAxis stroke="rgba(226,232,240,0.4)" tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {sourceData.map((_, i) => (
                <Cell key={i} fill={sourceColors[i % sourceColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card" style={{ borderRadius: '16px', padding: '24px' }}>
        <h2 style={{ fontWeight: '700', fontSize: '15px', color: '#e2e8f0', marginBottom: '20px' }}>
          Papers by Year
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={yearData} barSize={40}>
            <XAxis dataKey="name" stroke="rgba(226,232,240,0.4)" tick={{ fontSize: 12 }} />
            <YAxis stroke="rgba(226,232,240,0.4)" tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#38bdf8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Trends;