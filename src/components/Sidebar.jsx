import React from 'react';
import { 
  LayoutDashboard, 
  Code, 
  Calculator, 
  BookOpen, 
  FolderHeart 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'dsa', label: 'DSA Academy', icon: Code },
    { id: 'aptitude', label: 'Aptitude Coach', icon: Calculator },
    { id: 'verbal', label: 'Verbal Trainer', icon: BookOpen },
    { id: 'projects', label: 'Resume Projects', icon: FolderHeart }
  ];

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <div className="logo-icon">🚀</div>
        <h1>Placement Hero</h1>
      </div>
      
      <nav className="nav-links">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-btn \${activeTab === item.id ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span className="nav-text">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="sidebar-footer">
        <p>E-4 Placement Coach</p>
        <p style={{ fontSize: '0.7rem', marginTop: '4px' }}>v1.0.0</p>
      </div>
    </aside>
  );
}
