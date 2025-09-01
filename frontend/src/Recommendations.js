import React from "react";
import useBookStore from "./store";


const Recommendations = () => {
  const recs = useBookStore((state) => state.recommendations);
  if (!recs.length) return null;
  return (
    <div className="recommendations" style={{ margin: '32px 0' }}>
      <h2 style={{ color: '#ffb300', marginBottom: 12 }}>💡 AI Recommendations</h2>
      <ul style={{
        background: '#fffbe6',
        borderRadius: 10,
        padding: '16px 24px',
        boxShadow: '0 1px 6px rgba(255,179,0,0.08)',
        listStyle: 'disc inside',
        maxWidth: 600,
        margin: '0 auto',
      }}>
        {recs.map((rec, idx) => (
          <li key={idx} style={{ margin: '8px 0', color: '#444' }}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
