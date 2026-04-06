import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Input, Select } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { validateUserForm } from '../../utils/validators';
import { ROLES } from '../../utils/constants';
import '../../styles/components/auth.css';

export default function SignupPage({ onSwitch }) {
  const { register } = useAuth();
  const [form, setForm] = useState({
    first_name: '', last_name: '', company: '',
    email: '', password: '', role: ROLES.STAFF,
  });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [apiErr,  setApiErr]  = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    const { errors: errs, isValid } = validateUserForm({ ...form, password: form.password });
    if (!isValid) { setErrors(errs); return; }

    setLoading(true); setApiErr('');
    try {
      await register(form);
    } catch (e) {
      setApiErr(e.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-title">Get started.</div>
      <div className="auth-sub">Create your StockSense account</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Input label="First Name" name="first_name" placeholder="Alex"
          value={form.first_name} onChange={set('first_name')} error={errors.first_name} required />
        <Input label="Last Name" name="last_name" placeholder="Carter"
          value={form.last_name} onChange={set('last_name')} error={errors.last_name} required />
      </div>

      <Input label="Company / Organization" name="company" placeholder="Acme Corp"
        value={form.company} onChange={set('company')} />

      <Input label="Work Email" name="email" type="email" placeholder="alex@acmecorp.com"
        value={form.email} onChange={set('email')} error={errors.email} required />

      <Input label="Password" name="password" type="password" placeholder="Min. 8 characters"
        value={form.password} onChange={set('password')} error={errors.password} required
        hint="At least 8 characters" />

      {/* Role picker */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
          Account Role
        </div>
        <div className="role-select-group">
          {Object.values(ROLES).map((r) => (
            <button
              key={r}
              className={`role-btn${form.role === r ? ' selected' : ''}`}
              onClick={() => setForm((f) => ({ ...f, role: r }))}
              type="button"
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {apiErr && (
        <div style={{ background: 'var(--red-glow)', border: '1px solid var(--red)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: 'var(--red)', marginBottom: 14 }}>
          {apiErr}
        </div>
      )}

      <Button variant="primary" size="full" onClick={handleSubmit} loading={loading}>
        Create Account →
      </Button>

      <div className="auth-footer">
        Already have an account?{' '}
        <a href="#" onClick={(e) => { e.preventDefault(); onSwitch('login'); }}>Sign in</a>
      </div>
    </>
  );
}
