import { useState } from 'react';
import { Upload, Video, CheckCircle2, Clock, AlertCircle, Lock } from 'lucide-react';

function Verify() {
  const [activeTab, setActiveTab] = useState('submit');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'submit') {
      setIsRegistering(false);
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-tabs">
        <button 
          className={`verify-tab ${activeTab === 'submit' ? 'active' : ''}`}
          onClick={() => handleTabChange('submit')}
        >
          Submit
        </button>
        <button 
          className={`verify-tab ${activeTab === 'review' ? 'active' : ''}`}
          onClick={() => handleTabChange('review')}
        >
          Review
        </button>
      </div>

      {activeTab === 'submit' ? (
        // Submit View
        <>
          <div className="verify-header">
            <h2 className="title" style={{ marginBottom: '0.2rem', fontSize: '1.4rem', marginTop: 0 }}>Expert Form Verification</h2>
            <p className="subtitle" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.4', marginTop: 0 }}>
              Submit your video for an expert review.<br />
              Get results within 3 days
            </p>
          </div>

          <div className="form-card">
            <select className="verify-select" defaultValue="">
              <option value="" disabled hidden>Select Exercise</option>
              <option value="benchpress">Benchpress</option>
              <option value="squat">Squat</option>
              <option value="deadlift">Deadlift</option>
            </select>

            <div className="upload-dropzone">
              <Upload size={24} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
              <span>Upload Video or Pictures</span>
            </div>

            <input type="text" className="verify-input" placeholder="Url Link" />

            <button className="btn btn-primary" style={{ marginTop: '1rem', padding: '1rem', fontSize: '1rem' }}>Submit</button>
          </div>

          <h3 className="section-title">Verification History</h3>

          <div className="history-list">
            {/* Verified Card */}
            <div className="history-card">
              <div className="history-card-header">
                <div className="history-icon-wrapper">
                  <Video size={20} color="var(--text-muted)" />
                </div>
                <div className="history-info">
                  <h4>Benchpress</h4>
                  <span>sent Apr 23, 2026</span>
                </div>
                <div className="status-badge verified">
                  <CheckCircle2 size={12} /> Verified
                </div>
              </div>
              <div className="expert-comment">
                comment from expert
              </div>
            </div>

            {/* Pending Card */}
            <div className="history-card">
              <div className="history-card-header">
                <div className="history-icon-wrapper">
                  <Video size={20} color="var(--text-muted)" />
                </div>
                <div className="history-info">
                  <h4>Benchpress</h4>
                  <span>sent Apr 23, 2026</span>
                </div>
                <div className="status-badge pending">
                  <Clock size={12} /> Pending
                </div>
              </div>
            </div>

            {/* Denied Card */}
            <div className="history-card">
              <div className="history-card-header">
                <div className="history-icon-wrapper">
                  <Video size={20} color="var(--text-muted)" />
                </div>
                <div className="history-info">
                  <h4>Benchpress</h4>
                  <span>sent Apr 23, 2026</span>
                </div>
                <div className="status-badge denied">
                  <AlertCircle size={12} /> Denied
                </div>
              </div>
              <div className="expert-comment">
                comment from expert
              </div>
            </div>
          </div>
        </>
      ) : (
        // Review View
        <>
          {!isRegistering ? (
            <div className="review-view-container">
              <div className="lock-icon-wrapper">
                <Lock size={140} color="var(--text-muted)" strokeWidth={1} />
              </div>
              <h2 className="review-title">Expert Only</h2>
              <p className="review-subtitle">
                Register expert to review exercise<br />
                submissions for the community
              </p>
              <button className="btn review-btn" onClick={() => setIsRegistering(true)}>
                Register Expert
              </button>
            </div>
          ) : (
            <div className="form-card" style={{ marginTop: '0' }}>
              <h2 className="title" style={{ marginBottom: '0.2rem', fontSize: '1.4rem', marginTop: 0 }}>Proof of Expertise</h2>
              <p className="subtitle" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.4', marginTop: 0 }}>
                Upload your weight training certification or<br />
                proof of experience.
              </p>

              <div className="upload-dropzone">
                <Upload size={24} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
                <span>Upload Video or Pictures</span>
              </div>

              <input type="text" className="verify-input" placeholder="Url Link" />

              <button className="btn btn-primary" style={{ marginTop: '1rem', padding: '1rem', fontSize: '1rem' }}>Submit</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Verify;
