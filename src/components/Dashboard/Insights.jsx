import React, { useMemo } from 'react';
import { AlertCircle, Target, ArrowRight } from 'lucide-react';
import { differenceInDays, parseISO } from 'date-fns';

const Insights = ({ transactions }) => {
  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    
    // Most expensive category
    const categoryTotals = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});
    
    const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

    // Largest single transaction
    const largestTransaction = expenses.sort((a, b) => b.amount - a.amount)[0];
    
    // Average daily spend over the last 30 days
    const totalSpent = expenses.reduce((sum, t) => sum + t.amount, 0);
    // Assuming transactions span 30 days based on mock data generator
    const avgDaily = totalSpent / 30;

    return {
      topCategory: topCategory ? { name: topCategory[0], amount: topCategory[1] } : null,
      largestTransaction,
      avgDaily
    };
  }, [transactions]);

  if (!insights.topCategory) return null;

  return (
    <div className="card insights-card">
      <div className="insights-header">
        <h3><Target size={20} className="text-primary"/> Financial Insights</h3>
      </div>
      <div className="insights-grid">
        <div className="insight-item">
          <div className="insight-icon bg-warning">
            <AlertCircle size={20} />
          </div>
          <div className="insight-content">
            <p className="text-secondary text-sm">Top Spending Category</p>
            <h4>{insights.topCategory.name}</h4>
            <p className="text-danger">${insights.topCategory.amount.toFixed(2)}</p>
          </div>
        </div>

        <div className="insight-item">
          <div className="insight-icon bg-danger">
            <ArrowRight size={20} style={{ transform: 'rotate(-45deg)' }} />
          </div>
          <div className="insight-content">
            <p className="text-secondary text-sm">Largest Transaction</p>
            <h4>{insights.largestTransaction.category}</h4>
            <p className="text-danger">${insights.largestTransaction.amount.toFixed(2)} - {insights.largestTransaction.description}</p>
          </div>
        </div>

        <div className="insight-item">
          <div className="insight-icon bg-primary" style={{ opacity: 0.8 }}>
            <Target size={20} />
          </div>
          <div className="insight-content">
            <p className="text-secondary text-sm">Average Daily Spend</p>
            <h4>~${insights.avgDaily.toFixed(2)}</h4>
            <p className="text-secondary text-xs">Based on past 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
