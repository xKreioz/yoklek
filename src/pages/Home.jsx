import { Bell, Settings, Award, CheckCircle2 } from 'lucide-react';
import { Logo } from '../components/Logo';

function Home() {
  const weekDays = [
    { day: 'M', date: '25', active: false, checked: true },
    { day: 'T', date: '26', active: false, checked: true },
    { day: 'W', date: '27', active: false, checked: true },
    { day: 'T', date: '28', active: false, checked: true },
    { day: 'F', date: '29', active: true, checked: false },
    { day: 'S', date: '30', active: false, checked: false },
    { day: 'S', date: '31', active: false, checked: false },
  ];

  return (
    <div>
      {/* Streak Section */}
      <div className="streak-container" style={{ marginTop: '1rem' }}>
        <div className="streak-badge">
          {/* A simple flame using Lucide or an emoji/custom svg. Let's use a large styled emoji for the flame for now */}
          <span style={{ fontSize: '4rem', filter: 'drop-shadow(0 0 10px rgba(255, 100, 0, 0.8))' }}>🔥</span>
        </div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>100 days streak</h2>
      </div>

      {/* Weekly Calendar */}
      <div className="weekly-cal">
        {weekDays.map((d, i) => (
          <div key={i} className={`cal-day ${d.active ? 'active' : ''}`}>
            <span style={{ fontWeight: 600 }}>{d.day}</span>
            {d.checked ? (
              <CheckCircle2 size={20} color="var(--text-main)" />
            ) : (
              <span style={{ fontWeight: d.active ? 700 : 400 }}>{d.date}</span>
            )}
          </div>
        ))}
      </div>

      {/* Stats Card */}
      <div className="stats-card">
        <span className="stats-header">Your stats</span>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Workouts</span>
            <span className="stat-value">24</span>
          </div>
          <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
          <div className="stat-item">
            <span className="stat-label">Volume</span>
            <span className="stat-value">25</span>
          </div>
          <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
          <div className="stat-item">
            <span className="stat-label">Max Streak</span>
            <span className="stat-value">100</span>
          </div>
        </div>
      </div>

      {/* PR Card */}
      <div className="pr-card">
        <div className="pr-title">
          <span>Personal Record (PR)</span>
          <Settings size={16} />
        </div>
        
        <div style={{ marginTop: '1rem' }}>
          <span style={{ fontSize: '0.85rem' }}>Benchpress</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '0.5rem' }}>
            <div>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>60</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>/ 100 kg</span>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>60%</span>
          </div>
          
          <div className="progress-container">
            <div className="progress-bar" style={{ width: '60%' }}></div>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', color: 'var(--text-muted)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>

      {/* Mini Cards Container */}
      <div className="pr-card">
        <div className="pr-title">
          <span>Verified</span>
        </div>
        
        <div className="mini-card-container" style={{ marginTop: 0 }}>
          <div className="mini-card" style={{ backgroundColor: '#333' }}>
            <Award size={20} color="var(--text-muted)" />
            <div className="mini-card-info">
              <span className="mini-card-title">Bench Press</span>
              <span className="mini-card-date">Sep 1, 2026</span>
            </div>
          </div>
          <div className="mini-card" style={{ backgroundColor: '#333' }}>
            <Award size={20} color="var(--text-muted)" />
            <div className="mini-card-info">
              <span className="mini-card-title">Shoulder Press</span>
              <span className="mini-card-date">Sep 1, 2026</span>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', color: 'var(--text-muted)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
    </div>
  );
}

export default Home;
