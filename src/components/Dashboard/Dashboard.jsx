import React, { useMemo } from 'react';
import SummaryCards from './SummaryCards';
import TrendChart from './TrendChart';
import SpendingChart from './SpendingChart';
import Insights from './Insights';
import './Dashboard.css';

const Dashboard = ({ transactions }) => {
  // Calculate totals
  const totals = useMemo(() => {
    return transactions.reduce((acc, curr) => {
      if (curr.type === 'income') {
        acc.income += curr.amount;
        acc.balance += curr.amount;
      } else {
        acc.expense += curr.amount;
        acc.balance -= curr.amount;
      }
      return acc;
    }, { balance: 0, income: 0, expense: 0 });
  }, [transactions]);

  return (
    <div className="dashboard-container animate-fade-in">
      <SummaryCards totals={totals} />
      
      <div className="dashboard-grid">
        <div className="grid-item col-span-2">
          <TrendChart transactions={transactions} />
        </div>
        <div className="grid-item">
          <SpendingChart transactions={transactions} />
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="grid-item col-span-3">
          <Insights transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
