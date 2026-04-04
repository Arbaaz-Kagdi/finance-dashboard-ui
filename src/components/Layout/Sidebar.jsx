import { LayoutDashboard, ReceiptText, PieChart, Info, Settings, X, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import './Layout.css';

const Sidebar = ({ currentView, setCurrentView }) => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <>
      <aside className="sidebar glass">
        <div 
          className="sidebar-brand" 
          onClick={() => setCurrentView('dashboard')} 
          style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          <PieChart className="brand-icon" size={28} />
          <h2>FinDash</h2>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('dashboard')}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>
          <button 
            className={`nav-item ${currentView === 'transactions' ? 'active' : ''}`}
            onClick={() => setCurrentView('transactions')}
          >
            <ReceiptText size={20} />
            <span>Transactions</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item" onClick={() => setIsHelpOpen(true)}>
            <Info size={20} />
            <span>Help</span>
          </button>
        </div>
      </aside>

      {isHelpOpen && (
        <div className="modal-overlay" onClick={() => setIsHelpOpen(false)}>
          <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="btn-icon modal-close" onClick={() => setIsHelpOpen(false)}>
              <X size={20} />
            </button>
            
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Info className="text-primary" /> Application Guide
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
               <p style={{ marginBottom: '0.5rem' }}>
                 Welcome to FinDash! Here is a quick guide to navigating the dashboard:
               </p>
               
               <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                 <CheckCircle size={18} className="text-success" style={{ flexShrink: 0, marginTop: '2px' }}/>
                 <p style={{ margin: 0, color: 'var(--text-primary)' }}>
                   <strong>Dashboard:</strong> View financial summaries, income vs expense trends, and spending categories.
                 </p>
               </div>
               
               <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                 <CheckCircle size={18} className="text-success" style={{ flexShrink: 0, marginTop: '2px' }}/>
                 <p style={{ margin: 0, color: 'var(--text-primary)' }}>
                   <strong>Transactions:</strong> Review all transactions. You can search, filter (by type), and sort your data easily.
                 </p>
               </div>
               
               <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                 <CheckCircle size={18} className="text-success" style={{ flexShrink: 0, marginTop: '2px' }}/>
                 <p style={{ margin: 0, color: 'var(--text-primary)' }}>
                   <strong>Role Access:</strong> Switch between Admin and Viewer modes in the header. Admins can delete transactions, while Viewers have read-only access.
                 </p>
               </div>
               
               <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                 <CheckCircle size={18} className="text-success" style={{ flexShrink: 0, marginTop: '2px' }}/>
                 <p style={{ margin: 0, color: 'var(--text-primary)' }}>
                   <strong>Theme:</strong> Toggle between dark and light modes for maximum viewing comfort by clicking the sun/moon icon.
                 </p>
               </div>
            </div>
            
            <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => setIsHelpOpen(false)}>
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
