import React from 'react';

export function Input({
  label, name, type = 'text', placeholder, value, onChange,
  error, required = false, icon = null, hint = '', style: extra = {},
}) {
  return (
    <div style={{ marginBottom: 18, ...extra }}>
      {label && (
        <label htmlFor={name} style={{
          display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text2)',
          textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8,
        }}>
          {label} {required && <span style={{ color: 'var(--red)' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <div style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            width: 16, height: 16, color: 'var(--text3)', pointerEvents: 'none',
          }}>{icon}</div>
        )}
        <input
          id={name} name={name} type={type}
          placeholder={placeholder} value={value} onChange={onChange}
          style={{
            width: '100%', background: 'var(--card)', color: 'var(--text1)',
            border: `1px solid ${error ? 'var(--red)' : 'var(--border)'}`,
            borderRadius: 10, padding: icon ? '12px 16px 12px 40px' : '12px 16px',
            fontSize: 14, outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = error ? 'var(--red)' : 'var(--amber)';
            e.target.style.boxShadow = error ? '0 0 0 3px var(--red-glow)' : '0 0 0 3px var(--amber-glow)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? 'var(--red)' : 'var(--border)';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>
      {error && <div style={{ fontSize: 12, color: 'var(--red)', marginTop: 5 }}>{error}</div>}
      {hint && !error && <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 5 }}>{hint}</div>}
    </div>
  );
}

export function Select({ label, name, value, onChange, options = [], error, required = false }) {
  return (
    <div style={{ marginBottom: 18 }}>
      {label && (
        <label htmlFor={name} style={{
          display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text2)',
          textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8,
        }}>
          {label} {required && <span style={{ color: 'var(--red)' }}>*</span>}
        </label>
      )}
      <select
        id={name} name={name} value={value} onChange={onChange}
        style={{
          width: '100%', background: 'var(--card)', color: value ? 'var(--text1)' : 'var(--text3)',
          border: `1px solid ${error ? 'var(--red)' : 'var(--border)'}`,
          borderRadius: 10, padding: '12px 16px', fontSize: 14,
          outline: 'none', cursor: 'pointer', appearance: 'none',
        }}
      >
        <option value="">Select…</option>
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt} style={{ background: 'var(--card2)' }}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      {error && <div style={{ fontSize: 12, color: 'var(--red)', marginTop: 5 }}>{error}</div>}
    </div>
  );
}

export default Input;