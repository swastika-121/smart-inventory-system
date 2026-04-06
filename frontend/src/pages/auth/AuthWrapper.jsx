import React, { useState } from 'react';
import LoginPage  from './LoginPage';
import SignupPage from './SignupPage';
import '../../styles/components/auth.css';

export default function AuthWrapper() {
  const [tab, setTab] = useState('login');

  return (
    <div className="auth-wrap">
      {/* ── Left Hero ── */}
      <div className="auth-hero">
        <div className="grid-bg" />

        {/* Brand */}
        <div className="brand" style={{ position: 'relative', zIndex: 1 }}>
          <div className="brand-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
          </div>
          <div className="brand-name">Stock<span>Sense</span></div>
        </div>

        {/* Headline */}
        <div className="hero-body">
          <h1>Inventory<br />that thinks <em>ahead.</em></h1>
          <p>Real-time stock tracking, intelligent alerts, and deep analytics — all in one command center built for modern operations.</p>
        </div>

        {/* Stats */}
        <div className="hero-stats" style={{ position: 'relative', zIndex: 1 }}>
          {[['2,847', 'Products Tracked'], ['3', 'Warehouses'], ['98.4%', 'Accuracy Rate']].map(([v, l]) => (
            <div key={l}>
              <div className="hero-stat-val">{v}</div>
              <div className="hero-stat-lbl">{l}</div>
            </div>
          ))}
        </div>

        {/* Floating cards */}
        <div className="hero-preview p1">
          <div className="preview-label">Live Stock Status</div>
          {[['In Stock', '68%', '#00D4AA'], ['Low Stock', '22%', '#F5A623'], ['Out of Stock', '10%', '#FF4D6D']].map(([l, v, c]) => (
            <div className="preview-row" key={l}>
              <span className="preview-dot" style={{ background: c }} />
              <span style={{ flex: 1 }}>{l}</span>
              <span style={{ fontFamily: 'var(--ff-mono)', color: c, fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>

        <div className="hero-preview p2">
          <div className="preview-label">Today's Activity</div>
          <div className="preview-val" style={{ color: 'var(--amber)' }}>
            +134 <span style={{ fontSize: 13, color: 'var(--text2)', fontWeight: 400, fontFamily: 'var(--ff-body)' }}>units in</span>
          </div>
          <div className="preview-row" style={{ marginTop: 6 }}>
            <span style={{ color: 'var(--red)', fontFamily: 'var(--ff-mono)' }}>−89</span>
            <span style={{ marginLeft: 8, color: 'var(--text2)' }}>units out</span>
          </div>
        </div>
      </div>

      {/* ── Right Form ── */}
      <div className="auth-form-side">
        <div className="auth-box animate-in">
          {/* Tabs */}
          <div className="auth-tabs">
            <button className={`auth-tab${tab === 'login' ? ' active' : ''}`} onClick={() => setTab('login')}>
              Sign In
            </button>
            <button className={`auth-tab${tab === 'signup' ? ' active' : ''}`} onClick={() => setTab('signup')}>
              Create Account
            </button>
          </div>

          {tab === 'login'
            ? <LoginPage  onSwitch={setTab} />
            : <SignupPage onSwitch={setTab} />
          }
        </div>
      </div>
    </div>
  );
}
