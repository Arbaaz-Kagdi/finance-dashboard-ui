import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import './Dashboard.css';

const SummaryCards = ({ totals }) => {
  const formatCurrency = (value) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <div className="summary-cards">
      <div className="card summary-card">
        <div className="summary-icon bg-primary">
          <Wallet size={24} />
        </div>
        <div className="summary-info">
          <p>Total Balance</p>
          <h3>{formatCurrency(totals.balance)}</h3>
        </div>
      </div>
      
      <div className="card summary-card">
        <div className="summary-icon bg-success">
          <TrendingUp size={24} />
        </div>
        <div className="summary-info">
          <p>Total Income</p>
          <h3>{formatCurrency(totals.income)}</h3>
        </div>
      </div>
      
      <div className="card summary-card">
        <div className="summary-icon bg-danger">
          <TrendingDown size={24} />
        </div>
        <div className="summary-info">
          <p>Total Expenses</p>
          <h3>{formatCurrency(totals.expense)}</h3>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
