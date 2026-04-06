import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { validateEmail, validatePassword } from '../../utils/validators';
import '../../styles/components/auth.css';

export default function LoginPage({ onSwitch }) {
  const { login } = useAuth();
  const [form,    setForm]    = useState({ email: '', password: '' });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [apiErr,  setApiErr]  = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    const emailErr = validateEmail(form.email);
    const passErr  = validatePassword(form.password);
    if (emailErr || passErr) { setErrors({ email: emailErr, password: passErr }); return; }

    setLoading(true); setApiErr('');
    try {
      await login(form.email, form.password);
    } catch (e) {
      setApiErr(e.response?.data?.detail || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === 'Enter') handleSubmit(); };

  return (
    <>
      <div className="auth-title">Welcome back.</div>
      <div className="auth-sub">Sign in to your StockSense workspace</div>

      <Input
        label="Email Address" name="email" type="email"
        placeholder="admin@company.com"
        value={form.email} onChange={set('email')}
        error={errors.email} required
        onKeyDown={handleKey}
      />
      <Input
        label="Password" name="password" type="password"
        placeholder="••••••••••"
        value={form.password} onChange={set('password')}
        error={errors.password} required
        onKeyDown={handleKey}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text2)', cursor: 'pointer' }}>
          <input type="checkbox" style={{ accentColor: 'var(--amber)' }} />
          Remember me
        </label>
        <a href="#" style={{ fontSize: 13, color: 'var(--amber)', fontWeight: 600 }}>
          Forgot password?
        </a>
      </div>

      {apiErr && (
        <div style={{ background: 'var(--red-glow)', border: '1px solid var(--red)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: 'var(--red)', marginBottom: 14 }}>
          {apiErr}
        </div>
      )}

      <Button variant="primary" size="full" onClick={handleSubmit} loading={loading}>
        Sign In to Dashboard →
      </Button>

      <div className="auth-demo-hint">Demo: use any email + password</div>

      <div className="auth-footer">
        Don't have an account?{' '}
        <a href="#" onClick={(e) => { e.preventDefault(); onSwitch('signup'); }}>Create one</a>
      </div>
    </>
  );
}
