import React from 'react';
import { TableLoader } from '../../common/Loader';
import EmptyState from '../../common/EmptyState';
import Icons from '../../common/Icons';

/**
 * columns: Array of { key, label, render?, width?, align? }
 * rows: Array of data objects
 */
export default function Table({
  columns = [],
  rows = [],
  loading = false,
  emptyTitle = 'No results',
  emptyDesc = '',
  keyField = 'id',
  onRowClick = null,
  footer = null,
}) {
  return (
    <div className="table-card">
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={{ width: col.width, textAlign: col.align || 'left' }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          {loading ? (
            <TableLoader rows={6} cols={columns.length} />
          ) : rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState title={emptyTitle} description={emptyDesc} />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row[keyField]}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {columns.map((col) => (
                    <td key={col.key} style={{ textAlign: col.align || 'left' }}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {footer && (
        <div className="table-footer">{footer}</div>
      )}
    </div>
  );
}

/** Simple action buttons for table rows */
export function ActionButtons({ onEdit, onDelete, onView }) {
  const btn = (onClick, icon, color) => (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      style={{
        padding: '5px 10px', borderRadius: 6, border: '1px solid var(--border)',
        background: 'transparent', color: color || 'var(--text2)',
        fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center',
        gap: 4, transition: 'all 0.18s', fontFamily: 'var(--ff-body)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--card2)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
    >
      <div style={{ width: 13, height: 13 }}>{icon}</div>
    </button>
  );
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {onView   && btn(onView,   Icons.eye,   'var(--blue)')}
      {onEdit   && btn(onEdit,   Icons.edit,  'var(--text2)')}
      {onDelete && btn(onDelete, Icons.trash, 'var(--red)')}
    </div>
  );
}
