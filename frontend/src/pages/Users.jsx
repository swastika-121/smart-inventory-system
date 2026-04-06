import React, { useState } from 'react';
import Button         from '../components/ui/Button';
import Modal, { ConfirmModal } from '../components/ui/Modal';
import { Input, Select } from '../components/ui/Input';
import { RoleBadge }  from '../components/ui/Badge';
import { ActionButtons } from '../components/ui/Table';
import Icons          from '../components/common/Icons';
import { ROLES }      from '../utils/constants';

const MOCK_USERS = [
  { id:1, first_name:'Alex',  last_name:'Carter',  email:'alex@acme.com',   role:'admin', status:'Active', joined:'12 Jan 2024' },
  { id:2, first_name:'Priya', last_name:'Sharma',  email:'priya@acme.com',  role:'staff', status:'Active', joined:'03 Feb 2024' },
  { id:3, first_name:'Jake',  last_name:'Mitchell',email:'jake@acme.com',   role:'staff', status:'Active', joined:'15 Mar 2024' },
  { id:4, first_name:'Aisha', last_name:'Khan',    email:'aisha@acme.com',  role:'viewer',status:'Active', joined:'20 Apr 2024' },
  { id:5, first_name:'Sam',   last_name:'Rivera',  email:'sam@acme.com',    role:'staff', status:'Inactive',joined:'01 Jun 2024' },
];

const BLANK = { first_name:'', last_name:'', email:'', role: ROLES.STAFF };

export default function Users() {
  const [users,     setUsers]     = useState(MOCK_USERS);
  const [modal,     setModal]     = useState(null);
  const [editing,   setEditing]   = useState(null);
  const [form,      setForm]      = useState(BLANK);
  const [saving,    setSaving]    = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const openAdd = () => { setForm(BLANK); setEditing(null); setModal('form'); };
  const openEdit = (u) => { setForm(u); setEditing(u.id); setModal('form'); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        setUsers((prev) => prev.map((u) => (u.id === editing ? { ...u, ...form } : u)));
      } else {
        setUsers((prev) => [...prev, { ...form, id: Date.now(), status: 'Active', joined: new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) }]);
      }
      setModal(null);
    } finally { setSaving(false); }
  };

  return (
    <div className="animate-in">
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div className="page-title">User Management</div>
          <div className="page-desc">Manage roles, permissions, and staff access to StockSense.</div>
        </div>
        <Button variant="primary" size="sm" icon={<div style={{ width: 13, height: 13 }}>{Icons.plus}</div>} onClick={openAdd}>
          Add User
        </Button>
      </div>

      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8, background: 'var(--amber-glow)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--ff-head)', fontSize: 12, fontWeight: 800, color: 'var(--amber)',
                      }}>
                        {u.first_name.charAt(0)}{u.last_name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 600 }}>{u.first_name} {u.last_name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text2)', fontFamily: 'var(--ff-mono)', fontSize: 12 }}>{u.email}</td>
                  <td><RoleBadge role={u.role} /></td>
                  <td>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700,
                      background: u.status === 'Active' ? 'var(--teal-glow)' : 'var(--border)',
                      color: u.status === 'Active' ? 'var(--teal)' : 'var(--text3)',
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />
                      {u.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text2)', fontSize: 13 }}>{u.joined}</td>
                  <td>
                    <ActionButtons onEdit={() => openEdit(u)} onDelete={() => setConfirmId(u.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={!!modal} onClose={() => setModal(null)}
        title={editing ? 'Edit User' : 'Add New User'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModal(null)}>Cancel</Button>
            <Button variant="primary" onClick={handleSave} loading={saving}>
              {editing ? 'Save Changes' : 'Create User'}
            </Button>
          </>
        }
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Input label="First Name" name="first_name" value={form.first_name} onChange={set('first_name')} required />
          <Input label="Last Name"  name="last_name"  value={form.last_name}  onChange={set('last_name')}  required />
        </div>
        <Input label="Email" name="email" type="email" value={form.email} onChange={set('email')} required />
        {!editing && <Input label="Temporary Password" name="password" type="password" placeholder="Min. 8 characters" value={form.password || ''} onChange={set('password')} required />}
        <Select label="Role" name="role" value={form.role} onChange={set('role')}
          options={Object.values(ROLES).map((r) => ({ value: r, label: r.charAt(0).toUpperCase() + r.slice(1) }))} required />
      </Modal>

      <ConfirmModal
        open={!!confirmId} onClose={() => setConfirmId(null)}
        onConfirm={() => { setUsers((prev) => prev.filter((u) => u.id !== confirmId)); setConfirmId(null); }}
        title="Remove User"
        message="This user will lose access to StockSense. This action cannot be undone."
        confirmLabel="Remove User"
      />
    </div>
  );
}
