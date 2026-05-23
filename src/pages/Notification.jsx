import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

function Notification() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: 'Verify Exercise',
      date: 'Apr 23, 2026',
      desc: '"Congratulations! Your bench press skill has now been evaluated by an expert."',
    },
    {
      id: 2,
      title: 'YOKLEK',
      date: 'Apr 23, 2026',
      desc: 'Congratulations for the 24 days streaks! keep going 🔥🔥🔥',
    },
    {
      id: 3,
      title: 'YOKLEK',
      date: 'Apr 23, 2026',
      desc: 'Congrats for the 24 days streaks!',
    },
    {
      id: 4,
      title: 'YOKLEK',
      date: 'Apr 23, 2026',
      desc: 'Welcome, User001',
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h2 className="page-title">Notification</h2>
      </div>

      {/* Notification List */}
      <div>
        {notifications.map((notif) => (
          <div key={notif.id} className="notif-card">
            <div className="notif-header">
              <span className="notif-title">{notif.title}</span>
              <span className="notif-date">{notif.date}</span>
            </div>
            <p className="notif-desc">{notif.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
