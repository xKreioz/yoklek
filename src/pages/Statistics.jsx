import { useState } from 'react';
import { Activity, Flame, Weight, Target, CheckCircle2, Award, ChevronsDown, ChevronDown, ChevronUp } from 'lucide-react';

function Statistics() {
  const [activeTab, setActiveTab] = useState('statistics');
  const [expandedHistoryItems, setExpandedHistoryItems] = useState({});

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const toggleHistoryItem = (index) => {
    setExpandedHistoryItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const historyData = [
    { title: 'Benchpress', date: 'Apr 23, 2026 17:30' },
    { title: 'Benchpress', date: 'Apr 23, 2026 17:30' },
    { title: 'Benchpress', date: 'Apr 23, 2026 17:30' },
    { title: 'Benchpress', date: 'Apr 23, 2026 17:30' },
    { title: 'Benchpress', date: 'Apr 23, 2026 17:30' },
    { title: 'Benchpress', date: 'Apr 23, 2026 17:30' },
    { title: 'Benchpress', date: 'Apr 23, 2026 17:30' }
  ];

  return (
    <div className="statistics-page">
      <div className="verify-tabs">
        <button 
          className={`verify-tab ${activeTab === 'statistics' ? 'active' : ''}`}
          onClick={() => handleTabChange('statistics')}
        >
          Statistics
        </button>
        <button 
          className={`verify-tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => handleTabChange('history')}
        >
          History
        </button>
      </div>

      {activeTab === 'statistics' && (
        <>
          {/* Top 4 Stats Grid */}
          <div className="stats-grid-4">
            <div className="stat-box">
              <div className="stat-icon-container" style={{ backgroundColor: 'rgba(245, 127, 23, 0.15)' }}>
                <Activity size={24} color="#FBC02D" />
              </div>
              <div className="stat-info">
                <span className="stat-value">124</span>
                <span className="stat-label">Total Workouts</span>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon-container" style={{ backgroundColor: 'rgba(211, 47, 47, 0.15)' }}>
                <Flame size={24} color="#d32f2f" />
              </div>
              <div className="stat-info">
                <span className="stat-value">24</span>
                <span className="stat-label">day Streaks</span>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon-container" style={{ backgroundColor: 'rgba(25, 118, 210, 0.15)' }}>
                <Weight size={24} color="#1976D2" />
              </div>
              <div className="stat-info">
                <span className="stat-value">2080</span>
                <span className="stat-label">kg. Total Weight</span>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon-container" style={{ backgroundColor: 'rgba(56, 142, 60, 0.15)' }}>
                <Target size={24} color="#4CAF50" />
              </div>
              <div className="stat-info">
                <span className="stat-value">120</span>
                <span className="stat-label">Total Set</span>
              </div>
            </div>
          </div>

          {/* Verified Badge Section */}
          <div className="verified-badge-section">
            <div className="section-header" style={{ color: '#fff' }}>
              <CheckCircle2 size={20} color="#d32f2f" />
              <span>Verified badge</span>
            </div>

            <div className="badge-grid">
              <div className="badge-card">
                <div className="badge-card-top">
                  <Award size={18} color="#fff" />
                  <span className="badge-name">Bench Press</span>
                </div>
                <span className="badge-date">Sep 1, 2026</span>
              </div>

              <div className="badge-card">
                <div className="badge-card-top">
                  <Award size={18} color="#fff" />
                  <span className="badge-name">Shoulder Press</span>
                </div>
                <span className="badge-date">Sep 1, 2026</span>
              </div>

              <div className="badge-card">
                <div className="badge-card-top">
                  <Award size={18} color="#fff" />
                  <span className="badge-name">Incline Bench<br/>Press</span>
                </div>
                <span className="badge-date">Sep 1, 2026</span>
              </div>

              <div className="badge-card">
                <div className="badge-card-top">
                  <Award size={18} color="#fff" />
                  <span className="badge-name">One Arm Press</span>
                </div>
                <span className="badge-date">Sep 1, 2026</span>
              </div>
            </div>

            <button className="expand-btn">
              <ChevronsDown size={24} />
            </button>
          </div>

          {/* History List Section */}
          <div className="history-list-section">
            <div className="history-list-item">
              <div className="history-image-placeholder"></div>
              <div className="history-item-info">
                <span className="history-item-title">Bench Press</span>
                <span className="history-item-date">Apr 23, 2026</span>
              </div>
              <div className="history-item-stats">
                <div className="history-item-weight">100 <span>kg</span></div>
                <div className="history-item-reps">8 Sets<br/>10 Reps</div>
              </div>
            </div>

            <div className="history-list-item">
              <div className="history-image-placeholder"></div>
              <div className="history-item-info">
                <span className="history-item-title">Shoulder Press</span>
                <span className="history-item-date">Apr 23, 2026</span>
              </div>
              <div className="history-item-stats">
                <div className="history-item-weight">80 <span>kg</span></div>
                <div className="history-item-reps">8 Sets<br/>10 Reps</div>
              </div>
            </div>

            <button className="expand-btn">
              <ChevronsDown size={24} />
            </button>
          </div>

          {/* Days Progress Section */}
          <div className="days-section">
            <div className="days-title">Days</div>
            <div className="days-progress-header">
              <span className="days-progress-value">289</span>
              <span className="days-progress-total">/ 480</span>
              <span className="days-progress-percent">60%</span>
            </div>
            <div className="days-progress-bar-bg">
              <div className="days-progress-bar-fill" style={{ width: '60%' }}></div>
            </div>
            
            <button className="expand-btn" style={{ marginTop: '0.5rem', width: '100%' }}>
              <ChevronsDown size={24} />
            </button>
          </div>
        </>
      )}

      {activeTab === 'history' && (
        <div className="history-tab-list">
          {historyData.map((item, index) => {
            const isExpanded = expandedHistoryItems[index];
            return (
              <div key={index} className="history-card-container">
                <div className="history-card-main" onClick={() => toggleHistoryItem(index)}>
                  <div className="history-card-left">
                    <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=100&q=80" alt="exercise" className="history-card-img" />
                    <div className="history-card-info">
                      <h3 className="history-card-title">{item.title}</h3>
                      <p className="history-card-date">{item.date}</p>
                    </div>
                  </div>
                  <div className="history-card-icon">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="history-details-container">
                    <div className="history-detail-row">
                      <span>set 1</span>
                      <span>60kg</span>
                      <span>x12</span>
                    </div>
                    <div className="history-detail-row">
                      <span>set 2</span>
                      <span>60kg</span>
                      <span>x12</span>
                    </div>
                    <div className="history-detail-row">
                      <span>set 3</span>
                      <span>60kg</span>
                      <span>x12</span>
                    </div>
                    <div className="history-detail-row">
                      <span>set 4</span>
                      <span>60kg</span>
                      <span>x12</span>
                    </div>
                    <div className="history-detail-row total">
                      <span>Total</span>
                      <span>x64</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Statistics;
