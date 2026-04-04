import { Sun, Moon, UserCircle, Shield, Eye, X, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Layout.css';

const Header = ({ theme, toggleTheme, role, toggleRole, currentView, roleChangedAt }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    // Only update the timer if the modal is actually open
    if (!isProfileOpen) return;
    
    // Initial compute
    setTimeElapsed(Math.floor((Date.now() - roleChangedAt) / 1000));
    
    const interval = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - roleChangedAt) / 1000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isProfileOpen, roleChangedAt]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  const getTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Dashboard Overview';
      case 'transactions': return 'Transactions Management';
      default: return 'Overview';
    }
  };

  return (
    <>
      <header className="header glass">
        <div className="header-title">
          <h1>{getTitle()}</h1>
        </div>

        <div className="header-actions">
          {/* Role Toggler */}
          <button 
            className="role-toggler btn glass" 
            onClick={toggleRole}
            title={`Switch role. Current: ${role}`}
          >
            {role === 'Admin' ? (
              <><Shield size={16} className="text-primary" /> Admin View</>
            ) : (
              <><Eye size={16} className="text-secondary" /> Viewer View</>
            )}
          </button>

          <div className="divider"></div>

          {/* Theme Toggler */}
          <button className="btn-icon" onClick={toggleTheme} style={{ color: 'white' }}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User Profile */}
          <button className="btn-icon" onClick={() => setIsProfileOpen(true)}>
            <UserCircle size={24} />
          </button>
        </div>
      </header>

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="modal-overlay" onClick={() => setIsProfileOpen(false)}>
          <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="btn-icon modal-close" onClick={() => setIsProfileOpen(false)}>
              <X size={20} />
            </button>
            
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserCircle className="text-primary" size={28} /> User Profile
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: 'var(--bg-color)', padding: '1.5rem', borderRadius: '8px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <span style={{ color: 'var(--text-secondary)' }}>Full Name</span>
                 <strong>Arbaaz Kagdi</strong>
               </div>
               
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <span style={{ color: 'var(--text-secondary)' }}>Current Role</span>
                 <strong style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                   {role === 'Admin' ? <Shield size={16} className="text-primary"/> : <Eye size={16} className="text-secondary"/>}
                   {role}
                 </strong>
               </div>

               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <span style={{ color: 'var(--text-secondary)' }}>Time in Role</span>
                 <strong style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--warning-color)' }}>
                   <Clock size={16} />
                   {formatTime(timeElapsed)}
                 </strong>
               </div>
            </div>
            
            <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => setIsProfileOpen(false)}>
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
