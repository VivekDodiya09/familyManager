import React, { useState } from 'react';
import { loginAuthority } from '../services/api';

export default function GovernmentLogin({ onLogin }) {
  const [email, setEmail] = useState('authority@beneficiary360.gov.in');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const session = await loginAuthority(email, password);
      localStorage.setItem('beneficiary360_session', JSON.stringify(session));
      onLogin(session.authority);
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-brand-mark">B<span>360</span></div>
        <div className="login-kicker">SECURE GOVERNMENT ACCESS</div>
        <h1>Government Authority Login</h1>
        <p className="login-intro">Sign in to access the unified beneficiary command center and protected citizen records.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="authority-email">Official email</label>
          <input id="authority-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" required />
          <label htmlFor="authority-password">Password</label>
          <input id="authority-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
          {error && <div className="login-error" role="alert">{error}</div>}
          <button className="btn btn-primary login-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Verifying access...' : 'Sign in to command center'}
          </button>
        </form>
        <div className="login-security-note"><span>🔒</span><span>Authorized personnel only. Activity is recorded for administrative audit.</span></div>
      </section>
      <aside className="login-aside">
        <div className="login-aside-content">
          <span className="badge badge-info">BENEFICIARY 360°</span>
          <h2>One authority view for every citizen journey.</h2>
          <p>Coordinate schemes, applications, grievances, and last-mile delivery from a single operational record.</p>
          <div className="login-stats"><div><strong>33</strong><span>districts connected</span></div><div><strong>98.4%</strong><span>DBT success rate</span></div></div>
        </div>
      </aside>
    </main>
  );
}