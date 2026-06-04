import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import profilePic from './assets/profil.jpg.jpg';
import AdminDashboard from './AdminDashboard';
import Snowfall from './Snowfall';

// UI Icons
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const DownArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const MailIcon = ({style}) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const SkillIcon = ({ name }) => {
  const normalized = name.toLowerCase();
  
  if (normalized.includes('react')) {
    return (
      <svg className="skill-logo react-spin" width="24" height="24" viewBox="-11.5 -10.23174 23 20.46348" fill="#61dafb">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    );
  } else if (normalized.includes('html')) {
    return (
      <svg className="skill-logo logo-float" width="24" height="24" viewBox="0 0 24 24" fill="#e34f26">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622H5.112l.696 8.01h9.126l-.326 3.426-2.61.734-2.606-.733-.162-1.924H6.812l.29 4.381 4.875 1.353 4.894-1.35 1.17-13.18H8.531z"/>
      </svg>
    );
  } else if (normalized.includes('css')) {
    return (
      <svg className="skill-logo logo-float" width="24" height="24" viewBox="0 0 24 24" fill="#1572b6" style={{animationDelay: '0.2s'}}>
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.41H5.113l.23 2.622h10.06l-.232 2.718H6.04l.696 8.01 5.241 1.454 5.26-1.45.69-7.75H14.5l-.16 1.924-2.363.66-2.36-.66-.162-1.924h6.05l.435-5.604z"/>
      </svg>
    );
  } else if (normalized.includes('javascript')) {
    return (
      <svg className="skill-logo logo-float" width="24" height="24" viewBox="0 0 24 24" fill="#f7df1e" style={{animationDelay: '0.4s'}}>
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.463.693-.73 1.25-.72.63.01 1.11.23 1.42.66.27.38.48.91.48.91l2.25-1.39s-.42-.71-.85-1.14c-1.07-1.09-2.58-1.53-4.14-1.4-2.55.22-4.51 1.97-4.64 4.54-.05 1.09.28 2.05.97 2.85 1.08 1.26 2.92 1.83 3.99 2.18 1.34.43 1.63.78 1.67 1.33.05.69-.58 1.24-1.28 1.25-.83.01-1.48-.3-1.84-.79-.34-.47-.57-1.12-.57-1.12l-2.42 1.4s.48 1.06 1.05 1.69c1.07 1.18 2.72 1.7 4.37 1.58 2.62-.19 4.71-2 4.79-4.82.04-1.15-.3-2.14-1.01-2.92m-9.52 1.63c-.08 1.13-.53 2.12-1.28 2.88-.8.8-1.96 1.22-3.23 1.18-1.36-.04-2.55-.58-3.32-1.47-.63-.73-.96-1.53-.96-1.53l2.29-1.47s.24.51.57.8c.45.4.98.59 1.54.55.67-.05 1.2-.42 1.39-1 .13-.39.15-.81.15-1.63V7.27h2.85v12.636z"/>
      </svg>
    );
  } else if (normalized.includes('tailwind')) {
    return (
      <svg className="skill-logo logo-float" width="24" height="24" viewBox="0 0 24 24" fill="#38bdf8" style={{animationDelay: '0.6s'}}>
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228 1.565-.89 2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228 1.565-.89 2.288-1.624C7.337 13.382 5.976 12 6.001 12z"/>
      </svg>
    );
  } else if (normalized.includes('laravel')) {
    return (
      <svg className="skill-logo logo-float" width="24" height="24" viewBox="0 0 24 24" fill="#FF2D20" style={{animationDelay: '0.8s'}}>
        <path d="M19.167 4.095H4.833a.833.833 0 0 0-.833.834v14.142a.833.833 0 0 0 .833.834h14.334a.833.833 0 0 0 .833-.834V4.929a.833.833 0 0 0-.833-.834zM7.222 17.5a.333.333 0 0 1-.333.333H5.778a.333.333 0 0 1-.333-.333v-11a.333.333 0 0 1 .333-.333h1.111c.184 0 .333.15.333.333v11zm9.333 0a.333.333 0 0 1-.333.333H14a.333.333 0 0 1-.333-.333v-1.11H10.11v1.11a.333.333 0 0 1-.333.333H8.667a.333.333 0 0 1-.333-.333V9.056c0-.185.15-.334.333-.334h3.667c1.745 0 3.166 1.42 3.166 3.167v.61c0 1.246-.723 2.338-1.789 2.872a3.166 3.166 0 0 1 2.844 3.146v.983zm-2.889-4.889h-3.555v-2.778h3.555c.767 0 1.39.622 1.39 1.389s-.623 1.389-1.39 1.389z"/>
      </svg>
    );
  }
  
  // Default icon
  return (
    <svg className="skill-logo" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
};

const CodeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const PenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
    <path d="M2 2l7.586 7.586"></path>
    <circle cx="11" cy="11" r="2"></circle>
  </svg>
);

const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.1 5.1 0 0 0 19 5.3a4.9 4.9 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.7 1.8 5.6 2.1 5.6 2.1a4.9 4.9 0 0 0-.1 3.2 5.1 5.1 0 0 0-1.5 2.5c0 5.7 3.3 6.8 6.5 7.1A4.8 4.8 0 0 0 9 18v4"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

function App() {
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAdminView, setIsAdminView] = useState(window.location.hash === '#admin');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (isAdminView) return;

    let observer;
    
    // Memberi sedikit waktu agar React selesai me-render ulang DOM
    const timer = setTimeout(() => {
      const scrollArea = document.getElementById('scroll-area');
      if (!scrollArea) return;

      const observerOptions = {
        root: scrollArea,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, observerOptions);

      const sections = document.querySelectorAll('.view-section');
      sections.forEach(sec => {
        // Paksa tampilkan section pertama (Home) sebagai fallback
        if (sec.id === 'home') sec.classList.add('is-visible');
        observer.observe(sec);
      });
    }, 250); // Timeout 250ms memastikan DOM benar-benar siap

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [isAdminView]);

  useEffect(() => {
    if (document.body.classList.contains('dark-mode')) {
      setIsDarkMode(true);
    }
    
    // Scroll Spy for Navbar
    const handleScroll = () => {
      const scrollArea = document.getElementById('scroll-area');
      if (!scrollArea) return;
      
      const sections = document.querySelectorAll('.view-section');
      let currentSection = 'home';
      
      sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        // Menentukan section aktif jika bagian atasnya mencapai setengah layar
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSection = sec.id;
        } else if (rect.top <= 100) { // Fallback jika scroll cepat
          currentSection = sec.id;
        }
      });
      
      setActiveSection(currentSection);
    };

    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollArea) scrollArea.removeEventListener('scroll', handleScroll);
    };
  }, [isAdminView]);

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resSkills, resProjects, resExperiences] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/skills'),
          axios.get('http://127.0.0.1:8000/api/projects'),
          axios.get('http://127.0.0.1:8000/api/experiences')
        ]);
        setSkills(resSkills.data);
        setProjects(resProjects.data);
        setExperiences(resExperiences.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin');
    };
    
    window.addEventListener('hashchange', handleHashChange);
    fetchData();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdminView) {
    return <AdminDashboard onExit={() => {
      window.location.hash = '';
      setIsAdminView(false);
    }} />;
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('sending');
    try {
      await axios.post('http://127.0.0.1:8000/api/messages', contactForm);
      setContactStatus('success');
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setContactStatus(''), 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      setContactStatus('error');
      setTimeout(() => setContactStatus(''), 3000);
    }
  };

  return (
    <div className="os-window fade-in">
      <Snowfall />
      <div className="nav-container">
        <nav className="window-nav-pill">
          <div className="nav-logo">PORTOFOLIOWEB</div>

          <div className="nav-links">
            {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map(link => (
              <a 
                key={link} 
                href={`#${link}`} 
                className={activeSection === link ? "active" : ""}
                onClick={() => setActiveSection(link)}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
            <a href="#admin" className="login-btn">Login</a>
          </div>

          <div className="nav-actions">
            <button className="icon-btn" aria-label="Toggle Dark Mode" onClick={toggleDarkMode}>
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </nav>
      </div>

      <div className="window-content" id="scroll-area">
        
        <section id="home" className="view-section hero-section slide-up flex-col-section">
          <div className="content-left" style={{ flex: 'none', alignItems: 'center', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div className="role-badge" style={{ margin: '0 auto 1.5rem' }}>
               <span className="pulse-dot-small"></span>
               Available for Work
            </div>
            <h1 className="hero-title">
              Digital <span className="gradient-text">Creative</span> <br/>
              Developer.
            </h1>
            <p className="hero-subtitle" style={{ margin: '0 auto 2.5rem' }}>
              Halo, saya Rafa Izza. Spesialis dalam Web Development, UI/UX, AI Content, dan Social Media Strategy. Mengubah ide menjadi realitas digital.
            </p>
            
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <a href="#projects" className="btn-primary">
                View Projects 
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '8px'}}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
            
            <div className="hero-tags" style={{ justifyContent: 'center' }}>
              <span className="tag"><CodeIcon /> Web Dev</span>
              <span className="tag"><PenIcon /> UI/UX Design</span>
              <span className="tag">🤖 AI Content</span>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        <section id="about" className="view-section about-section slide-up flex-col-section">
          <div className="content-left" style={{ flex: 'none', alignItems: 'center', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            <span className="section-meta" style={{ justifyContent: 'center' }}>GET TO KNOW ME</span>
            <h1 className="section-title">Tentang Saya</h1>
            
            <div className="description-box">
              <p>
                Saya adalah <strong>Creative Technologist</strong> yang menggabungkan kemampuan teknis dalam pengembangan web dengan sensibilitas desain modern. Saat ini saya merupakan siswa SMKN 2 Buduran Sidoarjo jurusan Rekayasa Perangkat Lunak.
              </p>
              <p style={{ marginTop: '1.5rem' }}>
                Fokus utama saya adalah membangun aplikasi web yang berkinerja tinggi, dapat diakses dengan baik, dan memberikan pengalaman digital (*digital experience*) terbaik bagi para pengguna akhir.
              </p>
            </div>

            <div className="stats-row" style={{ margin: '0 auto' }}>
              <div className="stat-item">
                <h3>1+</h3>
                <p>Tahun<br/>Pengalaman</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <h3>10+</h3>
                <p>Proyek<br/>Selesai</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <h3>100%</h3>
                <p>Dedikasi<br/>Karya</p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        <section id="skills" className="view-section split-section slide-up">
          <div className="content-left" style={{ flex: 0.8 }}>
             <span className="section-meta">TECHNICAL EXPERTISE</span>
             <h1 className="section-title">Keahlian Utama</h1>
             <p className="description-box">Saya terus mengembangkan kemampuan teknis menggunakan teknologi terbaru untuk memastikan setiap proyek dibangun dengan standar industri terkini.</p>
          </div>
          <div className="content-right skills-grid">
            {skills.length === 0 ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚙️</div>
                <p>Memuat data keahlian...</p>
              </div>
            ) : skills.map(skill => {
              return (
                <div className="skill-card" key={skill.id}>
                  <div className="skill-header">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1rem', fontWeight: '700' }}>
                      <SkillIcon name={skill.name} />
                      {skill.name}
                    </span>
                    <span className="skill-level">{skill.proficiency}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div
                      className="skill-bar-fill"
                      style={{
                        width: `${skill.proficiency}%`,
                        background: `linear-gradient(90deg, var(--accent-blue), var(--accent-purple))`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        <div className="section-divider"></div>

        <section id="experience" className="view-section split-section slide-up">
          <div className="content-left" style={{ flex: 0.8 }}>
             <span className="section-meta">CAREER JOURNEY</span>
             <h1 className="section-title">Pengalaman</h1>
             <p className="description-box">Rekam jejak pendidikan dan perjalanan karir profesional saya di industri teknologi informasi.</p>
          </div>
          <div className="content-right">
              <div className="timeline">
               {experiences.length > 0 ? experiences.map((exp, i) => (
                 <div key={i} className="timeline-item">
                   <div className={`timeline-dot ${i === 0 ? 'pulse-dot' : ''}`}></div>
                   <p className="timeline-date">
                     {new Date(exp.start_date).getFullYear()} - {exp.end_date ? new Date(exp.end_date).getFullYear() : 'Sekarang'}
                   </p>
                   <div className="timeline-card">
                     <h3 className="timeline-title">{exp.title}</h3>
                     <p className="timeline-company">{exp.company}</p>
                     <p className="timeline-desc">{exp.description}</p>
                   </div>
                 </div>
               )) : (
                 <div className="timeline-item">
                   <p>Belum ada data pengalaman kerja.</p>
                 </div>
               )}
              </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* PROJECTS SECTION */}
        <section id="projects" className="view-section flex-col-section slide-up">
          <div className="section-header-center">
            <span className="section-meta">PORTFOLIO</span>
            <h1 className="section-title">Proyek Unggulan</h1>
            <p className="description-box text-center" style={{margin: '0 auto', maxWidth: '600px'}}>Kumpulan mahakarya digital yang pernah saya rancang dan kembangkan, mencakup berbagai skala kompleksitas.</p>
          </div>
          
          <div className="projects-grid">
             {projects.length === 0 ? (
               <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem' }}>
                 <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
                 <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Memuat proyek...</p>
               </div>
             ) : projects.map((proj, i) => (
               <div key={i} className="project-card">
                 <div className="project-image-wrapper" style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={proj.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'}
                      alt={proj.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <span className="project-type-badge" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>Project</span>
                 </div>
                 <div className="project-content">
                   <h3>{proj.title}</h3>
                   <p>{proj.description}</p>
                   <a href={proj.demo_url || '#'} target="_blank" rel="noreferrer" className="project-link">
                     <LinkIcon style={{marginRight: '6px', width: '14px', height: '14px'}}/> Lihat Detail
                   </a>
                 </div>
               </div>
             ))}
          </div>

        </section>

        <div className="section-divider"></div>

        {/* CONTACT SECTION */}
        <section id="contact" className="view-section split-section slide-up">
           <div className="content-left" style={{ flex: 1, paddingRight: '2rem' }}>
             <span className="section-meta">GET IN TOUCH</span>
             <h1 className="section-title" style={{fontSize: '3.5rem', marginBottom: '1rem'}}>Mari Bekerja <br/><span className="gradient-text">Sama!</span></h1>
             <p className="description-box" style={{fontSize: '1.1rem', marginBottom: '2rem'}}>
               Punya ide proyek menarik atau butuh bantuan dalam pengembangan web? Saya selalu terbuka untuk mendiskusikan peluang kerja sama dan proyek baru.
             </p>
             
             <div className="contact-info" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
               <div className="info-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div className="info-icon" style={{ padding: '1rem', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--card-border)', color: 'var(--accent-blue)' }}>
                   <MailIcon />
                 </div>
                 <div>
                   <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '700' }}>Email</p>
                   <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>rafaizza@example.com</p>
                 </div>
               </div>
               <div className="info-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div className="info-icon" style={{ padding: '1rem', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--card-border)', color: 'var(--accent-purple)' }}>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                 </div>
                 <div>
                   <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '700' }}>Lokasi</p>
                   <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Sidoarjo, Indonesia</p>
                 </div>
               </div>
             </div>

             <div className="social-links" style={{ display: 'flex', gap: '1rem' }}>
               <a href="https://github.com/rafaizza" target="_blank" rel="noreferrer" className="social-btn">
                 <GithubIcon />
               </a>
               <a href="#" className="social-btn">
                 <LinkedinIcon />
               </a>
             </div>
           </div>

           <div className="content-right" style={{ flex: 1 }}>
             <div className="contact-box" style={{ width: '100%', padding: '3rem', textAlign: 'left' }}>
               <div className="contact-glow"></div>
               <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', fontWeight: '800' }}>Kirim Pesan Langsung</h3>
               
               <form onSubmit={handleContactSubmit} className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                 <div className="input-group">
                   <label>Nama Lengkap</label>
                   <input 
                     type="text" 
                     placeholder="John Doe" 
                     required 
                     value={contactForm.name}
                     onChange={e => setContactForm({...contactForm, name: e.target.value})}
                     className="form-input"
                   />
                 </div>
                 <div className="input-group">
                   <label>Alamat Email</label>
                   <input 
                     type="email" 
                     placeholder="john@example.com" 
                     required 
                     value={contactForm.email}
                     onChange={e => setContactForm({...contactForm, email: e.target.value})}
                     className="form-input"
                   />
                 </div>
                 <div className="input-group">
                   <label>Pesan Anda</label>
                   <textarea 
                     placeholder="Ceritakan tentang proyek Anda..." 
                     required 
                     rows="5"
                     value={contactForm.message}
                     onChange={e => setContactForm({...contactForm, message: e.target.value})}
                     className="form-input"
                   ></textarea>
                 </div>
                 <button type="submit" className="btn-primary" disabled={contactStatus === 'sending'} style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', cursor: contactStatus === 'sending' ? 'not-allowed' : 'pointer' }}>
                   {contactStatus === 'sending' ? 'Mengirim...' : <><MailIcon style={{ marginRight: '0.8rem' }} /> Kirim Pesan</>}
                 </button>
                 {contactStatus === 'success' && <div className="status-msg success">Pesan berhasil dikirim! Saya akan segera membalasnya.</div>}
                 {contactStatus === 'error' && <div className="status-msg error">Gagal mengirim pesan. Silakan coba lagi.</div>}
               </form>
             </div>
           </div>
        </section>
        
      </div>

      {/* Navigation Arrow Fixed on the Right */}
      <div className="nav-arrow" onClick={() => document.querySelector('.window-content').scrollBy({top: 500, behavior: 'smooth'})}>
        <DownArrowIcon />
      </div>
    </div>
  );
}

export default App;
