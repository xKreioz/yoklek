import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, UserCheck, FileText, ShieldAlert, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './admin.css';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { to: '/admin/expert',    label: 'Expert',    icon: <UserCheck size={18} /> },
  { to: '/admin/user',      label: 'User',      icon: <Users size={18} /> },
  { to: '/admin/content',   label: 'Content',   icon: <FileText size={18} /> },
  { to: '/admin/moderation',label: 'Moderation',icon: <ShieldAlert size={18} /> },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="adm-root">
      {/* Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-logo">YOKLEK</div>
        <nav className="adm-nav">
          {navItems.map(({ to, label, icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `adm-nav-item ${isActive ? 'active' : ''}`}>
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="adm-main">
        {/* Top bar */}
        <header className="adm-topbar">
          <div />
          <div className="adm-topbar-right">
            <button className="adm-icon-btn"><Bell size={20} /></button>
            <div className="adm-avatar" onClick={handleLogout} title="Logout">
              {user?.firstName?.charAt(0) || 'A'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="adm-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
