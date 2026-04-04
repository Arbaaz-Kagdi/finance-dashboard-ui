import React, { useState, useMemo } from 'react';
import { Search, Filter, Trash2, ArrowUpDown } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import './Transactions.css';

const Transactions = ({ transactions, role, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, income, expense
  const [sortOrder, setSortOrder] = useState('newest'); // newest, oldest, highest, lowest

  const filteredAndSorted = useMemo(() => {
    let result = transactions;

    // Search
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(t => 
        t.description.toLowerCase().includes(lowerSearch) || 
        t.category.toLowerCase().includes(lowerSearch)
      );
    }

    // Filter
    if (filterType !== 'all') {
      result = result.filter(t => t.type === filterType);
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortOrder) {
        case 'newest': return new Date(b.date) - new Date(a.date);
        case 'oldest': return new Date(a.date) - new Date(b.date);
        case 'highest': return b.amount - a.amount;
        case 'lowest': return a.amount - b.amount;
        default: return 0;
      }
    });

    return result;
  }, [transactions, searchTerm, filterType, sortOrder]);

  return (
    <div className="transactions-container animate-fade-in">
      <div className="card controls-card">
        <div className="search-box">
          <Search size={20} className="text-secondary" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="input-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={18} className="text-secondary" />
            <select 
              className="select-base" 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="filter-group">
            <ArrowUpDown size={18} className="text-secondary" />
            <select 
              className="select-base" 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              {role === 'Admin' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.length > 0 ? (
              filteredAndSorted.map(t => (
                <tr key={t.id}>
                  <td>{format(parseISO(t.date), 'MMM dd, yyyy')}</td>
                  <td className="fw-500">{t.description}</td>
                  <td>
                    <span className="category-badge">{t.category}</span>
                  </td>
                  <td className={t.type === 'income' ? 'text-success' : 'text-danger'}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                  </td>
                  {role === 'Admin' && (
                    <td>
                      <button 
                        className="btn-icon text-danger" 
                        onClick={() => onDelete(t.id)}
                        title="Delete transaction"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === 'Admin' ? 5 : 4} className="text-center py-4">
                  No transactions found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
