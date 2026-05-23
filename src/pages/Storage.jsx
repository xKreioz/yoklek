import { useState } from 'react';
import { Search, CheckCircle2, Play, AlertTriangle, X } from 'lucide-react';
import { Input } from '../components/Input';

const exercises = [
  {
    id: 1,
    title: 'หัตถ์เทวะ',
    subtitle: 'ท่าที่สืบทอดจากคุณปู่ของเอ็นโด',
    category: 'Arm',
    verified: true,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop',
    description: 'กำหมัดให้แน่นรวมจิตจากหัวใจสู่หมัดหมุนมุมกล้อง 360องศารอสายฟ้าขึ้นชูมือขึ้นและปล่อยมือไปข้างหน้า',
    warnings: [
      'ฝึกต่อยยางรถให้ครบ8ปีก่อน',
      'อย่าใช้รับท่าเกรด3',
      'อย่าใช้รับท่าผสาน',
      'เจอเทโคคุให้ใช้ท่าอื่นดีกว่า'
    ]
  },
  {
    id: 2,
    title: 'หัตถ์เทวะ',
    subtitle: 'ท่าที่สืบทอดจากคุณปู่ของเอ็นโด',
    category: 'Arm',
    verified: false,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop',
    description: 'กำหมัดให้แน่นรวมจิตจากหัวใจสู่หมัดหมุนมุมกล้อง 360องศารอสายฟ้าขึ้นชูมือขึ้นและปล่อยมือไปข้างหน้า',
    warnings: [
      'ฝึกต่อยยางรถให้ครบ8ปีก่อน'
    ]
  },
  {
    id: 3,
    title: 'หัตถ์เทวะ',
    subtitle: 'ท่าที่สืบทอดจากคุณปู่ของเอ็นโด',
    category: 'Arm',
    verified: true,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop',
    description: 'กำหมัดให้แน่นรวมจิตจากหัวใจสู่หมัดหมุนมุมกล้อง 360องศารอสายฟ้าขึ้นชูมือขึ้นและปล่อยมือไปข้างหน้า',
    warnings: []
  },
  {
    id: 4,
    title: 'หัตถ์เทวะ',
    subtitle: 'ท่าที่สืบทอดจากคุณปู่ของเอ็นโด',
    category: 'Arm',
    verified: false,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop',
    description: 'กำหมัดให้แน่นรวมจิตจากหัวใจสู่หมัดหมุนมุมกล้อง 360องศารอสายฟ้าขึ้นชูมือขึ้นและปล่อยมือไปข้างหน้า',
    warnings: []
  },
  {
    id: 5,
    title: 'หัตถ์เทวะ',
    subtitle: 'ท่าที่สืบทอดจากคุณปู่ของเอ็นโด',
    category: 'Arm',
    verified: false,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop',
    description: 'กำหมัดให้แน่นรวมจิตจากหัวใจสู่หมัดหมุนมุมกล้อง 360องศารอสายฟ้าขึ้นชูมือขึ้นและปล่อยมือไปข้างหน้า',
    warnings: []
  }
];

const categories = ['All', 'Arm', 'Chest', 'Leg', 'Back', 'Sholder'];

function Storage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);

  const filteredExercises = exercises.filter(ex => {
    if (verifiedOnly && !ex.verified) return false;
    if (activeCategory !== 'All' && ex.category !== activeCategory) return false;
    if (searchQuery && !ex.title.includes(searchQuery) && !ex.subtitle.includes(searchQuery)) return false;
    return true;
  });

  return (
    <div className="storage-page" style={{ paddingBottom: '2rem' }}>
      {/* Search Input */}
      <div className="search-container">
        <Search size={20} className="search-icon" />
        <Input 
          placeholder="What posture do you want to do?" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ paddingLeft: '2.8rem', backgroundColor: '#fff', color: '#000' }}
        />
      </div>

      {/* Categories */}
      <div className="category-scroll-container">
        {categories.map(cat => (
          <button 
            key={cat}
            className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Verified Filter */}
      <div className="verified-filter" onClick={() => setVerifiedOnly(!verifiedOnly)}>
        <div className={`custom-checkbox ${verifiedOnly ? 'checked' : ''}`}>
          {verifiedOnly && <CheckCircle2 size={14} color="#fff" />}
        </div>
        <span>verified only</span>
      </div>

      {/* Exercise List */}
      <div className="exercise-list">
        {filteredExercises.map(ex => (
          <div key={ex.id} className="exercise-card" onClick={() => setSelectedExercise(ex)}>
            <img src={ex.image} alt={ex.title} className="exercise-image" />
            <div className="exercise-info">
              <h3 className="exercise-title">{ex.title}</h3>
              <p className="exercise-subtitle">{ex.subtitle}</p>
              <div className="exercise-tags">
                <span className="tag category-tag">{ex.category}</span>
                {ex.verified && (
                  <span className="tag verified-tag">
                    verified <CheckCircle2 size={12} />
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Modal */}
      {selectedExercise && (
        <div className="full-screen-modal">
          <div className="modal-header">
            <h2 className="modal-title">{selectedExercise.title}</h2>
            <button className="close-btn" onClick={() => setSelectedExercise(null)}>
              <X size={24} />
            </button>
          </div>

          <div className="modal-content-scroll">
            {/* Video Placeholder */}
            <div className="video-placeholder">
              <Play size={48} className="play-icon" />
              <span>ดูวิดีโอสาธิต</span>
            </div>

            {/* Tags */}
            <div className="modal-tags">
              <span className="modal-category-tag">แขน</span> {/* Hardcoded for UI match or map from category */}
              {selectedExercise.verified && (
                <span className="modal-verified-tag">
                  verified <CheckCircle2 size={14} />
                </span>
              )}
            </div>

            {/* Instructions */}
            <div className="instructions-section">
              <h3>วิธีเล่น</h3>
              <p>{selectedExercise.description}</p>
            </div>

            {/* Warnings */}
            {selectedExercise.warnings && selectedExercise.warnings.length > 0 && (
              <div className="warnings-section">
                <h3 className="warnings-title">
                  <AlertTriangle size={16} />
                  คำเตือนเพื่อป้องกันการบาดเจ็บ
                </h3>
                <ul className="warnings-list">
                  {selectedExercise.warnings.map((warning, idx) => (
                    <li key={idx}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Storage;
