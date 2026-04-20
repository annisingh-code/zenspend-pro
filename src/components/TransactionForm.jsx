import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

export default function TransactionForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = {
    income: ['Salary', 'Freelance', 'Investments', 'Other'],
    expense: ['Food', 'Housing', 'Transportation', 'Utilities', 'Entertainment', 'Other']
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    onAdd({
      title,
      amount: parseFloat(amount),
      type,
      category,
      date
    });

    setTitle('');
    setAmount('');
  };

  return (
    <div className="card transaction-form">
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-row">
          <div className="form-group type-toggle">
            <button
              type="button"
              className={`toggle-btn ${type === 'income' ? 'active income' : ''}`}
              onClick={() => { setType('income'); setCategory(categories.income[0]); }}
            >
              Income
            </button>
            <button
              type="button"
              className={`toggle-btn ${type === 'expense' ? 'active expense' : ''}`}
              onClick={() => { setType('expense'); setCategory(categories.expense[0]); }}
            >
              Expense
            </button>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group flex-2">
            <label>Title</label>
            <input 
              type="text" 
              placeholder={type === 'income' ? 'e.g. Salary' : 'e.g. Groceries'} 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group flex-1">
            <label>Amount ($)</label>
            <input 
              type="number" 
              placeholder="Enter amount" 
              step="0.01"
              min="0.01"
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group flex-1">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories[type].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group flex-1">
            <label>Date</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary submit-btn">
          <PlusCircle size={18} />
          Add {type === 'income' ? 'Income' : 'Expense'}
        </button>
      </form>

      <style>{`
        .transaction-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .transaction-form h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .form-content {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-row {
          display: flex;
          gap: 1.25rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-size: 0.875rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .form-group input, .form-group select {
          width: 100%;
        }
        .flex-1 { flex: 1; }
        .flex-2 { flex: 2; }
        
        .type-toggle {
          flex-direction: row;
          background-color: var(--bg-color);
          padding: 0.25rem;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--border-color);
        }
        .toggle-btn {
          flex: 1;
          padding: 0.5rem;
          border-radius: 4px;
          font-weight: 500;
          color: var(--text-muted);
          transition: all 0.2s ease;
        }
        .toggle-btn.active.income {
          background-color: var(--accent-green-alpha);
          color: var(--accent-green);
        }
        .toggle-btn.active.expense {
          background-color: var(--accent-red-alpha);
          color: var(--accent-red);
        }
        .submit-btn {
          margin-top: 1rem;
          width: 100%;
        }
        @media (max-width: 600px) {
          .form-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
