import React from 'react';
import Icons from '../common/Icons';

export default function Pagination({ page, totalPages, onPage, totalCount, pageSize }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
    if (totalPages <= 7) return i + 1;
    if (page <= 4) return i + 1 <= 5 ? i + 1 : i === 5 ? '…' : totalPages;
    if (page >= totalPages - 3) return i === 0 ? 1 : i === 1 ? '…' : totalPages - 4 + i;
    return i === 0 ? 1 : i === 1 ? '…' : i === 5 ? '…' : i === 6 ? totalPages : page - 2 + i;
  });

  const btn = (content, onClick, active = false, disabled = false) => (
    <button
      key={content}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 32, height: 32, borderRadius: 8,
        border: `1px solid ${active ? 'var(--amber)' : 'var(--border)'}`,
        background: active ? 'var(--amber)' : 'transparent',
        color: active ? '#000' : disabled ? 'var(--text3)' : 'var(--text2)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: 13, fontFamily: 'var(--ff-mono)', fontWeight: active ? 700 : 400,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.18s',
      }}
    >
      {content}
    </button>
  );

  const start = (page - 1) * pageSize + 1;
  const end   = Math.min(page * pageSize, totalCount);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
      <span style={{ fontSize: 13, color: 'var(--text2)', marginRight: 8 }}>
        {start}–{end} of {totalCount}
      </span>
      {btn(<div style={{ width: 14, height: 14 }}>{Icons.chevronL}</div>, () => onPage(page - 1), false, page === 1)}
      {pages.map((p, i) =>
        p === '…'
          ? <span key={`ellipsis-${i}`} style={{ color: 'var(--text3)', padding: '0 4px', fontFamily: 'var(--ff-mono)' }}>…</span>
          : btn(p, () => onPage(p), p === page)
      )}
      {btn(<div style={{ width: 14, height: 14 }}>{Icons.chevronR}</div>, () => onPage(page + 1), false, page === totalPages)}
    </div>
  );
}