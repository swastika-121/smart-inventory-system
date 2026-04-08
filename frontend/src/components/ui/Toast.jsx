import React, { useState, useCallback, createContext, useContext, useEffect } from 'react';

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = 'info', duration = 3500 }) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx.addToast;
};

const TOAST_STYLES = {
  success: { border: 'var(--teal)',   icon: '✓', bg: 'var(--teal-glow)',   color: 'var(--teal)'   },
  error:   { border: 'var(--red)',    icon: '✕', bg: 'var(--red-glow)',    color: 'var(--red)'    },
  warning: { border: 'var(--amber)',  icon: '⚠', bg: 'var(--amber-glow)', color: 'var(--amber)'  },
  info:    { border: 'var(--purple)', icon: 'ℹ', bg: 'var(--purple-glow)', color: 'var(--purple)' },
};

function ToastContainer({ toasts, onRemove }) {
  if (toasts.length === 0) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      display: 'flex', flexDirection: 'column', gap: 10,
      pointerEvents: 'none',
    }}>
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
}

function Toast({ toast, onRemove }) {
  const s = TOAST_STYLES[toast.type] || TOAST_STYLES.info;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      onClick={() => onRemove(toast.id)}
      style={{
        background: 'var(--card)',
        border: `1px solid ${s.border}`,
        borderLeft: `4px solid ${s.border}`,
        borderRadius: 12,
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
        minWidth: 280, maxWidth: 360,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        cursor: 'pointer', pointerEvents: 'all',
        transition: 'all 0.3s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(32px)',
      }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: s.bg, color: s.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 700, flexShrink: 0,
      }}>
        {s.icon}
      </div>
      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text1)', flex: 1 }}>
        {toast.message}
      </div>
    </div>
  );
}

export default ToastProvider;