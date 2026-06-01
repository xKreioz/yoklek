import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function TopNav() {
  const { user } = useAuth();
  const initial = user?.firstName?.charAt(0)?.toUpperCase() || '?';

  return (
    <div className="top-nav">
      <h1 className="logo" style={{ fontSize: '1.25rem', marginBottom: 0, letterSpacing: '2px', lineHeight: '24px' }}>
        YOKLEK
      </h1>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/notifications" style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
          <Bell size={24} />
        </Link>
        <Link to="/profile" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="top-nav-avatar">{initial}</div>
        </Link>
      </div>
    </div>
  );
}
