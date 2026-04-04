import { useState, useEffect } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Transactions from './components/Transactions/Transactions';
import { MOCK_TRANSACTIONS } from './data/mockData';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [role, setRole] = useState('Viewer');
  const [currentView, setCurrentView] = useState('dashboard');
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const [roleChangedAt, setRoleChangedAt] = useState(Date.now());

  const toggleRole = () => {
    setRole(prev => prev === 'Admin' ? 'Viewer' : 'Admin');
    setRoleChangedAt(Date.now());
  };

  const handleDeleteTransaction = (id) => {
    if (role !== 'Admin') return;
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="app-container">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="main-content">
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          role={role} 
          toggleRole={toggleRole}
          currentView={currentView}
          roleChangedAt={roleChangedAt}
        />
        
        <div className="content-area">
          {currentView === 'dashboard' ? (
            <Dashboard transactions={transactions} />
          ) : (
            <Transactions 
              transactions={transactions} 
              role={role}
              onDelete={handleDeleteTransaction}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
