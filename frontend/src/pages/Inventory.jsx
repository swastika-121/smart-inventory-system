import React, { useState, useEffect } from 'react';
import { useInventory }   from '../hooks/useInventory';
import { StatusBadge }    from '../components/ui/Badge';
import Button             from '../components/ui/Button';
import Modal, { ConfirmModal } from '../components/ui/Modal';
import { Input, Select }  from '../components/ui/Input';
import { ActionButtons }  from '../components/ui/Table';
import Icons              from '../components/common/Icons';
import EmptyState         from '../components/common/EmptyState';
import { TableLoader }    from '../components/common/Loader';
import { CATEGORIES, WAREHOUSES, STOCK_STATUS } from '../utils/constants';
import { validateProduct, generateSKU } from '../utils/validators';
import { formatCurrency, stockColor }   from '../utils/formatters';
import '../styles/components/table.css';

/* ── Fallback mock products ── */
const MOCK = [
  { id: 1, sku: 'SKU-001', name: 'Wireless Headphones Pro', category: 'Electronics', stock: 145, min_stock: 50,  price: 89.99,  status: 'In Stock',    warehouse: 'WH-Alpha' },
  { id: 2, sku: 'SKU-002', name: 'Ergonomic Office Chair',  category: 'Furniture',   stock: 12,  min_stock: 20,  price: 299.00, status: 'Low Stock',   warehouse: 'WH-Beta'  },
  { id: 3, sku: 'SKU-003', name: 'Industrial Water Filter', category: 'Appliances',  stock: 0,   min_stock: 10,  price: 149.50, status: 'Out of Stock',warehouse: 'WH-Alpha' },
  { id: 4, sku: 'SKU-004', name: 'USB-C Hub 10-Port',       category: 'Electronics', stock: 320, min_stock: 30,  price: 54.99,  status: 'Overstock',   warehouse: 'WH-Gamma' },
  { id: 5, sku: 'SKU-005', name: 'Standing Desk Frame',     category: 'Furniture',   stock: 34,  min_stock: 15,  price: 489.00, status: 'In Stock',    warehouse: 'WH-Beta'  },
  { id: 6, sku: 'SKU-006', name: 'Air Purifier HEPA',       category: 'Appliances',  stock: 8,   min_stock: 15,  price: 220.00, status: 'Low Stock',   warehouse: 'WH-Alpha' },
  { id: 7, sku: 'SKU-007', name: 'Mechanical Keyboard',     category: 'Electronics', stock: 92,  min_stock: 25,  price: 129.99, status: 'In Stock',    warehouse: 'WH-Gamma' },
  { id: 8, sku: 'SKU-008', name: 'Laptop Cooling Pad',      category: 'Electronics', stock: 0,   min_stock: 20,  price: 39.99,  status: 'Out of Stock',warehouse: 'WH-Beta'  },
  { id: 9, sku: 'SKU-009', name: 'Smart LED Desk Lamp',     category: 'Electronics', stock: 57,  min_stock: 20,  price: 74.00,  status: 'In Stock',    warehouse: 'WH-Alpha' },
  { id:10, sku: 'SKU-010', name: 'Storage Ottoman XL',      category: 'Furniture',   stock: 5,   min_stock: 10,  price: 159.00, status: 'Low Stock',   warehouse: 'WH-Gamma' },
];

const BLANK = { sku: '', name: '', category: '', warehouse: '', price: '', stock: '', min_stock: '' };

export default function Inventory() {
  const inv = useInventory();

  /* Use mock data until API is connected */
  const [localProducts, setLocalProducts] = useState(MOCK);
  const products = inv.products.length ? inv.products : localProducts;

  const [search,  setSearch]  = useState('');
  const [filter,  setFilter]  = useState('All');
  const [modal,   setModal]   = useState(null); // null | 'add' | 'edit'
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState(BLANK);
  const [errors,  setErrors]  = useState({});
  const [saving,  setSaving]  = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const [deleting,  setDeleting]  = useState(false);

  const FILTERS = ['All', ...Object.values(STOCK_STATUS)];

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    const matchFilter = filter === 'All' || p.status === filter;
    return matchSearch && matchFilter;
  });

  const openAdd = () => {
    setForm({ ...BLANK, sku: generateSKU('', '') });
    setErrors({});
    setEditing(null);
    setModal('add');
  };

  const openEdit = (product) => {
    setForm({ ...product, price: String(product.price), stock: String(product.stock), min_stock: String(product.min_stock) });
    setErrors({});
    setEditing(product.id);
    setModal('edit');
  };

  const handleSave = async () => {
    const { errors: errs, isValid } = validateProduct(form);
    if (!isValid) { setErrors(errs); return; }
    setSaving(true);
    try {
      if (editing) {
        const updated = { ...form, id: editing, price: parseFloat(form.price), stock: parseInt(form.stock), min_stock: parseInt(form.min_stock) };
        setLocalProducts((prev) => prev.map((p) => (p.id === editing ? updated : p)));
      } else {
        const newProd = { ...form, id: Date.now(), price: parseFloat(form.price), stock: parseInt(form.stock), min_stock: parseInt(form.min_stock) };
        setLocalProducts((prev) => [newProd, ...prev]);
      }
      setModal(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      setLocalProducts((prev) => prev.filter((p) => p.id !== confirmId));
      setConfirmId(null);
    } finally {
      setDeleting(false);
    }
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="animate-in">
      <div className="page-header">
        <div className="page-title">Inventory</div>
        <div className="page-desc">Manage and monitor all products across your warehouses.</div>
      </div>

      <div className="table-card">
        {/* Toolbar */}
        <div className="table-toolbar">
          <div className="search-input-wrap">
            <div className="search-icon" style={{ width: 14, height: 14, color: 'var(--text3)' }}>{Icons.search}</div>
            <input
              className="search-input"
              placeholder="Search by name, SKU, category…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-group">
            {FILTERS.map((f) => (
              <button key={f} className={`filter-btn${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <Button
            variant="primary" size="sm" icon={<div style={{ width: 13, height: 13 }}>{Icons.plus}</div>}
            onClick={openAdd} style={{ marginLeft: 'auto', whiteSpace: 'nowrap' }}
          >
            Add Product
          </Button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>SKU ID</th><th>Product Name</th><th>Category</th>
                <th>Stock</th><th>Min Stock</th><th>Price</th>
                <th>Status</th><th>Warehouse</th><th>Actions</th>
              </tr>
            </thead>
            {inv.loading ? (
              <TableLoader rows={8} cols={9} />
            ) : filtered.length === 0 ? (
              <tbody><tr><td colSpan={9}>
                <EmptyState title="No products found" description="Try adjusting your search or filter." />
              </td></tr></tbody>
            ) : (
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td><span className="sku">{p.sku}</span></td>
                    <td style={{ fontWeight: 500 }}>{p.name}</td>
                    <td style={{ color: 'var(--text2)' }}>{p.category}</td>
                    <td>
                      <span className="stock-num" style={{ color: stockColor(p.stock, p.min_stock) }}>
                        {p.stock}
                      </span>
                    </td>
                    <td style={{ fontFamily: 'var(--ff-mono)', fontSize: 12, color: 'var(--text3)' }}>{p.min_stock}</td>
                    <td style={{ fontFamily: 'var(--ff-mono)', color: 'var(--text2)' }}>{formatCurrency(p.price)}</td>
                    <td><StatusBadge status={p.status} /></td>
                    <td><span className="warehouse-badge">{p.warehouse}</span></td>
                    <td>
                      <ActionButtons
                        onEdit={() => openEdit(p)}
                        onDelete={() => setConfirmId(p.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>

        {/* Footer */}
        <div className="table-footer">
          <span>Showing {filtered.length} of {products.length} products</span>
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      <Modal
        open={!!modal} onClose={() => setModal(null)}
        title={modal === 'edit' ? 'Edit Product' : 'Add New Product'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModal(null)}>Cancel</Button>
            <Button variant="primary" onClick={handleSave} loading={saving}>
              {modal === 'edit' ? 'Save Changes' : 'Add Product'}
            </Button>
          </>
        }
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Input label="SKU ID" name="sku" value={form.sku} onChange={set('sku')} error={errors.sku} required />
          <Select label="Category" name="category" value={form.category} onChange={set('category')}
            options={CATEGORIES} error={errors.category} required />
        </div>
        <Input label="Product Name" name="name" placeholder="Enter product name"
          value={form.name} onChange={set('name')} error={errors.name} required />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <Input label="Price ($)" name="price" type="number" placeholder="0.00"
            value={form.price} onChange={set('price')} error={errors.price} required />
          <Input label="Stock Qty" name="stock" type="number" placeholder="0"
            value={form.stock} onChange={set('stock')} error={errors.stock} required />
          <Input label="Min Stock" name="min_stock" type="number" placeholder="0"
            value={form.min_stock} onChange={set('min_stock')} error={errors.min_stock} required />
        </div>
        <Select label="Warehouse" name="warehouse" value={form.warehouse} onChange={set('warehouse')}
          options={WAREHOUSES} error={errors.warehouse} required />
      </Modal>

      {/* ── Delete Confirm ── */}
      <ConfirmModal
        open={!!confirmId} onClose={() => setConfirmId(null)} onConfirm={handleDelete}
        loading={deleting}
        title="Delete Product"
        message="This action cannot be undone. The product and all its associated records will be permanently removed."
        confirmLabel="Delete Product"
      />
    </div>
  );
}
