import React, { useState } from 'react';

export default function Tooltip({ children, text, position = 'top' }) {
  const [visible, setVisible] = useState(false);

  const positions = {
    top:    { bottom: '110%', left: '50%', transform: 'translateX(-50%)' },
    bottom: { top: '110%',   left: '50%', transform: 'translateX(-50%)' },
    left:   { right: '110%', top: '50%',  transform: 'translateY(-50%)' },
    right:  { left: '110%',  top: '50%',  transform: 'translateY(-50%)' },
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && text && (
        <div style={{
          position: 'absolute',
          ...positions[position],
          background: 'var(--card2)',
          border: '1px solid var(--border2)',
          color: 'var(--text1)',
          fontSize: 12, padding: '5px 10px',
          borderRadius: 7, whiteSpace: 'nowrap',
          pointerEvents: 'none', zIndex: 500,
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          animation: 'fadeIn 0.15s ease',
        }}>
          {text}
        </div>
      )}
    </div>
  );
}