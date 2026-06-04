import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import './Admin.css';

// Removed ParticleBackground to simplify UI

// ─── Icons ──────────────────────────────────────────────────────────────────────
const Icons = {
  messages: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  projects: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  skills: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  experiences: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  sun: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  moon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  eye: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  eyeOff: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  logout: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  menu: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  refresh: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  trash: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  check: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
};

// ─── Stat Card ──────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, color, icon }) => (
  <div className="stat-card" style={{ '--accent': color }}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-info">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
    <div className="stat-glow" />
  </div>
);

// ─── Main Component ─────────────────────────────────────────────────────────────
const AdminDashboard = ({ onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [isRegistering, setIsRegistering] = useState(false);
  const [authForm, setAuthForm] = useState({
    name: '',
    email: localStorage.getItem('admin_remember_email') || '',
    password: '',
    remember: !!localStorage.getItem('admin_remember_email'),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('messages');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [data, setData] = useState({ projects: [], skills: [], experiences: [], messages: [] });
  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('dark-mode'));
  const [loadingData, setLoadingData] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (token) { setIsAuthenticated(true); fetchData(); }
  }, [token]);

  const getAuthConfig = useCallback(() => ({
    headers: { Authorization: `Bearer ${token}` }
  }), [token]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [rP, rS, rE, rM] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/projects'),
        axios.get('http://127.0.0.1:8000/api/skills'),
        axios.get('http://127.0.0.1:8000/api/experiences'),
        axios.get('http://127.0.0.1:8000/api/messages', getAuthConfig()),
      ]);
      setData({ projects: rP.data, skills: rS.data, experiences: rE.data, messages: rM.data });
    } catch (err) {
      if (err.response?.status === 401) handleLogout();
    } finally {
      setLoadingData(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoginError('');
    setAuthSuccess('');
    setLoginLoading(true);
    try {
      const endpoint = isRegistering ? 'http://127.0.0.1:8000/api/register' : 'http://127.0.0.1:8000/api/login';
      const payload = isRegistering 
        ? { name: authForm.name, email: authForm.email, password: authForm.password }
        : { email: authForm.email, password: authForm.password };
        
      const res = await axios.post(endpoint, payload);
      
      if (isRegistering) {
        setAuthSuccess('Registrasi berhasil! Silakan login dengan akun baru Anda.');
        setIsRegistering(false);
        setAuthForm(prev => ({ ...prev, password: '', name: '' }));
      } else {
        const userToken = res.data.token;
        
        if (authForm.remember) {
          localStorage.setItem('admin_remember_email', authForm.email);
        } else {
          localStorage.removeItem('admin_remember_email');
        }
        
        localStorage.setItem('admin_token', userToken);
        setToken(userToken);
        setIsAuthenticated(true);
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat().join(' ');
        setLoginError(errorMessages);
      } else {
        setLoginError(isRegistering ? 'Gagal mendaftar. Email mungkin sudah terdaftar.' : 'Email atau password salah. Silakan coba lagi.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
    setIsAuthenticated(false);
    showToast('Berhasil keluar dari sesi.', 'info');
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Yakin ingin menghapus data ini?`)) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/${type}/${id}`, getAuthConfig());
      showToast('Data berhasil dihapus.', 'success');
      fetchData();
    } catch {
      showToast('Gagal menghapus data.', 'error');
    }
  };

  // ── LOGIN PAGE ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="login-page">

        <div className="login-center">
          <h1 className="login-title">{isRegistering ? 'Admin Register' : 'Admin Login'}</h1>
          <p className="login-subtitle">{isRegistering ? 'Buat akun admin baru' : 'Masukkan kredensial untuk mengakses dashboard'}</p>

          {loginError && (
            <div className="login-error-alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {loginError}
            </div>
          )}

          {authSuccess && (
            <div className="login-error-alert" style={{ background: 'rgba(52, 211, 153, 0.1)', color: '#34d399', borderColor: 'rgba(52, 211, 153, 0.2)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              {authSuccess}
            </div>
          )}

          <form onSubmit={handleAuth} className="login-form">
            {isRegistering && (
              <div className="form-field">
                <label htmlFor="admin-name">Nama Lengkap</label>
                <div className="input-wrap">
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input
                    id="admin-name"
                    type="text"
                    className="login-input"
                    placeholder="Nama Admin"
                    required={isRegistering}
                    value={authForm.name}
                    onChange={e => setAuthForm({ ...authForm, name: e.target.value })}
                  />
                </div>
              </div>
            )}
            
            <div className="form-field">
              <label htmlFor="admin-email">Email</label>
              <div className="input-wrap">
                <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input
                  id="admin-email"
                  type="email"
                  className="login-input"
                  placeholder="rafaizzaul@gmail.com"
                  required
                  value={authForm.email}
                  onChange={e => setAuthForm({ ...authForm, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="admin-password">Password</label>
              <div className="input-wrap">
                <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  className="login-input"
                  placeholder="••••••••"
                  required
                  value={authForm.password}
                  onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                />
                <button type="button" className="pw-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? Icons.eyeOff : Icons.eye}
                </button>
              </div>
            </div>

            <div className="login-options">
              {!isRegistering && (
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={authForm.remember}
                    onChange={e => setAuthForm({ ...authForm, remember: e.target.checked })}
                  />
                  <span className="custom-checkbox">{authForm.remember && Icons.check}</span>
                  Ingat saya
                </label>
              )}
            </div>

            <button type="submit" className="btn-login" disabled={loginLoading}>
              {loginLoading ? (
                <><span className="spinner" /> Memproses...</>
              ) : (
                <>{isRegistering ? 'Register' : 'Login'}</>
              )}
            </button>
            
            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {isRegistering ? 'Sudah punya akun? ' : 'Belum punya akun? '}
              <button 
                type="button" 
                style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', fontWeight: 'bold', cursor: 'pointer' }}
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setLoginError('');
                  setAuthSuccess('');
                }}
              >
                {isRegistering ? 'Login di sini' : 'Daftar di sini'}
              </button>
            </p>
          </form>

          <button className="login-back-btn" onClick={onExit}>
            ← Kembali ke Portfolio
          </button>
        </div>
      </div>
    );
  }

  // ── DASHBOARD PAGE ─────────────────────────────────────────────────────────
  const tabLabels = { messages: 'Messages', projects: 'Projects', skills: 'Skills', experiences: 'Experiences' };
  const counts = { messages: data.messages.length, projects: data.projects.length, skills: data.skills.length, experiences: data.experiences.length };

  return (
    <div className="admin-page">
      {/* Toast */}
      {toast && (
        <div className={`admin-toast admin-toast--${toast.type}`}>
          {toast.type === 'success' && Icons.check}
          {toast.msg}
        </div>
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">
          <div className="admin-brand">
            <span className="brand-icon">MHB</span>
            {sidebarOpen && <span className="brand-text">Admin</span>}
          </div>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? Icons.close : Icons.menu}
          </button>
        </div>

        <nav className="sidebar-nav">
          {Object.entries(tabLabels).map(([key, label]) => (
            <button
              key={key}
              className={`nav-tab ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
              title={label}
            >
              <span className="tab-icon">{Icons[key]}</span>
              {sidebarOpen && <span className="tab-label">{label}</span>}
              {sidebarOpen && <span className="tab-count">{counts[key]}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-action-btn" onClick={toggleDarkMode} title="Toggle theme">
            {isDarkMode ? Icons.sun : Icons.moon}
            {sidebarOpen && <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          <button className="sidebar-action-btn" onClick={onExit} title="View website">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            {sidebarOpen && <span>View Website</span>}
          </button>
          <button className="sidebar-action-btn logout" onClick={handleLogout} title="Logout">
            {Icons.logout}
            {sidebarOpen && <span>Keluar Sesi</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-topbar">
          <div>
            <h1 className="admin-page-title">{tabLabels[activeTab]}</h1>
            <p className="admin-page-sub">{counts[activeTab]} data tersimpan</p>
          </div>
          <div className="topbar-actions">
            <button className="btn-refresh" onClick={fetchData} disabled={loadingData} title="Refresh data">
              <span className={loadingData ? 'spin' : ''}>{Icons.refresh}</span>
              Refresh
            </button>
          </div>
        </header>

        {/* Stats row */}
        <div className="stats-row-admin">
          <StatCard label="Messages" value={counts.messages} color="#38bdf8" icon={Icons.messages} />
          <StatCard label="Projects" value={counts.projects} color="#8b5cf6" icon={Icons.projects} />
          <StatCard label="Skills" value={counts.skills} color="#34d399" icon={Icons.skills} />
          <StatCard label="Experiences" value={counts.experiences} color="#f59e0b" icon={Icons.experiences} />
        </div>

        {/* Table Panel */}
        <div className="glass-panel">
          {loadingData ? (
            <div className="loading-state">
              <span className="spinner-lg" />
              <p>Memuat data...</p>
            </div>
          ) : data[activeTab].length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">{Icons[activeTab]}</div>
              <p>Belum ada data yang tersimpan di sini.</p>
            </div>
          ) : (
            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{activeTab === 'messages' ? 'Pengirim' : 'Judul / Nama'}</th>
                    {activeTab === 'messages' && <th>Email</th>}
                    {activeTab === 'messages' && <th>Pesan</th>}
                    {activeTab === 'skills' && <th>Proficiency</th>}
                    {activeTab === 'experiences' && <th>Perusahaan</th>}
                    {activeTab === 'projects' && <th>Deskripsi</th>}
                    <th style={{ textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data[activeTab].map((item, idx) => (
                    <tr key={item.id}>
                      <td className="td-id">#{idx + 1}</td>
                      <td><strong>{item.name || item.title}</strong></td>
                      {activeTab === 'messages' && <td className="td-muted">{item.email}</td>}
                      {activeTab === 'messages' && (
                        <td className="td-truncate">{item.message}</td>
                      )}
                      {activeTab === 'skills' && (
                        <td>
                          <div className="progress-bar-wrap">
                            <div className="progress-bar" style={{ width: `${item.proficiency}%` }} />
                            <span>{item.proficiency}%</span>
                          </div>
                        </td>
                      )}
                      {activeTab === 'experiences' && <td className="td-muted">{item.company}</td>}
                      {activeTab === 'projects' && <td className="td-truncate">{item.description}</td>}
                      <td className="td-actions">
                        <button className="btn-danger" onClick={() => handleDelete(activeTab, item.id)}>
                          {Icons.trash} Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
