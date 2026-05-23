import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit2, EyeOff } from 'lucide-react';

function Profile() {
  const navigate = useNavigate();
  // State for toggling edit mode
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="profile-page">
      {/* Sticky Back Button Container */}
      <div style={{ position: 'sticky', top: '1.5rem', zIndex: 100, height: 0 }}>
        <button className="profile-back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Header with Pattern */}
      <div className="profile-header">
        {/* Replace the background URL below with your actual image path if needed */}
        <div className="profile-pattern" style={{ backgroundImage: "url('/topo-pattern.png')" }}></div>
      </div>

      {/* Avatar & Title */}
      <div className="profile-info">
        <div className="profile-avatar-container">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80" alt="Avatar" className="profile-avatar" />
        </div>
        
        <div className="profile-title-container">
          <h2 className="profile-title">Profile</h2>
          <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
            <Edit2 size={18} color={isEditing ? 'var(--accent-red)' : 'var(--text-muted)'} />
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="profile-form">
        <div className="form-field">
          <label>First Name</label>
          <input type="text" defaultValue="Soda" readOnly={!isEditing} className={isEditing ? 'editable' : ''} />
        </div>

        <div className="form-field">
          <label>Last Name</label>
          <input type="text" defaultValue="Sado" readOnly={!isEditing} className={isEditing ? 'editable' : ''} />
        </div>

        <div className="form-field">
          <label>Username</label>
          <input type="text" defaultValue="SodaSado6767" readOnly={!isEditing} className={isEditing ? 'editable' : ''} />
        </div>

        <div className="form-field">
          <label>Email</label>
          <input type="email" defaultValue="SodaSado6767@gmail.com" readOnly={!isEditing} className={isEditing ? 'editable' : ''} />
        </div>

        <div className="form-field">
          <label>Password</label>
          <div className="input-with-icon">
            <input type="password" defaultValue="****************" readOnly={!isEditing} className={isEditing ? 'editable' : ''} />
            <EyeOff size={18} className="input-icon" />
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="form-row">
          <div className="form-field">
            <label>Birth</label>
            <input 
              type="date" 
              defaultValue="2000-12-23" 
              readOnly={!isEditing} 
              className={isEditing ? 'editable' : ''} 
            />
          </div>
          <div className="form-field">
            <label>Gender</label>
            <select 
              defaultValue="male" 
              disabled={!isEditing} 
              className={isEditing ? 'editable' : ''}
              style={{ opacity: isEditing ? 1 : 0.8 }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Weight</label>
            <div className="input-with-text">
              <input type="text" defaultValue="82" readOnly={!isEditing} className={isEditing ? 'editable' : ''} />
              <span className="input-suffix">kg.</span>
            </div>
          </div>
          <div className="form-field">
            <label>Height</label>
            <div className="input-with-text">
              <input type="text" defaultValue="172" readOnly={!isEditing} className={isEditing ? 'editable' : ''} />
              <span className="input-suffix">cm.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
