import React, { useState } from 'react';
import { Trash2, ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react';
import { format } from 'date-fns';

export default function TransactionList({ transactions, onDelete }) {
  const [filter, setFilter] = useState('All');

  const categories = [...new Set(transactions.map(t => t.category))];
  const filterOptions = ['All', 'Income', 'Expense', ...categories];

  const filteredTransactions = filter === 'All' 
    ? transactions 
    : (filter === 'Income' || filter === 'Expense')
      ? transactions.filter(t => t.type === filter.toLowerCase())
      : transactions.filter(t => t.category === filter);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="card transaction-list-card">
      <div className="list-header">
        <h3>Recent Transactions</h3>
        <div className="filter-wrapper">
          <Filter size={16} className="text-muted" />
          <select 
            className="category-filter" 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
          >
            {filterOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="transactions">
        {filteredTransactions.length === 0 ? (
          <p className="no-data">No transactions found.</p>
        ) : (
          filteredTransactions.map(transaction => (
            <div key={transaction.id} className="transaction-item">
              <div className="tx-icon">
                {transaction.type === 'income' ? (
                  <div className="icon-circle bg-green"><ArrowUpRight size={18} /></div>
                ) : (
                  <div className="icon-circle bg-red"><ArrowDownRight size={18} /></div>
                )}
              </div>
              <div className="tx-details">
                <h4>{transaction.title}</h4>
                <p className="tx-meta">
                  {transaction.category} • {format(new Date(transaction.date), 'MMM dd, yyyy')}
                </p>
              </div>
              <div className="tx-actions">
                <span className={`tx-amount ${transaction.type === 'income' ? 'text-green' : ''}`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
                <button className="btn-icon delete-btn" onClick={() => onDelete(transaction.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .transaction-list-card {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          min-height: 400px;
        }
        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .list-header h3 {
          font-size: 1.25rem;
        }
        .filter-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--bg-color);
          padding: 0.25rem 0.5rem;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--border-color);
        }
        .category-filter {
          border: none;
          background: transparent;
          padding: 0;
          font-size: 0.875rem;
          color: var(--text-main);
          cursor: pointer;
        }
        .category-filter option {
          background-color: var(--surface-color);
          color: var(--text-main);
        }
        .category-filter:focus {
          box-shadow: none;
          outline: none;
        }
        .transactions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          overflow-y: auto;
          max-height: 500px;
          padding-right: 0.5rem;
        }
        .transactions::-webkit-scrollbar {
          width: 6px;
        }
        .transactions::-webkit-scrollbar-track {
          background: transparent;
        }
        .transactions::-webkit-scrollbar-thumb {
          background-color: var(--border-color);
          border-radius: 10px;
        }
        .transaction-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: var(--border-radius-md);
          background-color: var(--bg-color);
          transition: background-color 0.2s ease;
        }
        .transaction-item:hover {
          background-color: var(--surface-hover);
        }
        .icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-circle.bg-green {
          background-color: var(--accent-green-alpha);
          color: var(--accent-green);
        }
        .icon-circle.bg-red {
          background-color: var(--accent-red-alpha);
          color: var(--accent-red);
        }
        .tx-details {
          flex: 1;
          min-width: 0;
        }
        .tx-details h4 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
          overflow-wrap: break-word;
          word-break: keep-all;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .tx-meta {
          font-size: 0.75rem;
          color: var(--text-muted);
          overflow-wrap: break-word;
          word-break: keep-all;
        }
        .tx-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .tx-amount {
          font-weight: 600;
          font-size: 1rem;
        }
        .delete-btn {
          color: var(--text-muted);
          opacity: 0;
          transition: opacity 0.2s ease, background-color 0.2s ease;
        }
        .transaction-item:hover .delete-btn {
          opacity: 1;
        }
        .delete-btn:hover {
          color: var(--accent-red);
          background-color: var(--accent-red-alpha);
        }
        .no-data {
          text-align: center;
          color: var(--text-muted);
          padding: 2rem 0;
        }
      `}</style>
    </div>
  );
}
