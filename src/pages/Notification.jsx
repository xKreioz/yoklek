import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell } from 'lucide-react';

function Notification() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h2 className="page-title">Notification</h2>
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '4rem 2rem',
        color: 'var(--text-muted)', textAlign: 'center',
      }}>
        <Bell size={48} strokeWidth={1} style={{ marginBottom: '1rem', opacity: 0.35 }} />
        <p style={{ fontSize: '0.95rem', margin: 0, fontWeight: 500 }}>No notifications yet</p>
        <p style={{ fontSize: '0.8rem', margin: '0.5rem 0 0', opacity: 0.6 }}>
          We'll let you know when something happens
        </p>
      </div>
    </div>
  );
}

export default Notification;
