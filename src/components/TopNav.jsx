import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TopNav() {
  return (
    <div className="top-nav">
      <h1 className="logo" style={{ fontSize: '1.25rem', marginBottom: 0, letterSpacing: '2px', lineHeight: '24px', transform: 'translateY(-3px)' }}>
        YOKLEK
      </h1>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/notifications" style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
          <Bell size={24} />
        </Link>
        <Link to="/profile">
          <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="profile-pic" />
        </Link>
      </div>
    </div>
  );
}
