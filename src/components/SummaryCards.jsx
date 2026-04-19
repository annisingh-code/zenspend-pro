import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, Target } from 'lucide-react';

export default function SummaryCards({ balance, income, expenses, budget, updateBudget }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const budgetRemaining = budget - expenses;
  const budgetPercentage = budget > 0 ? Math.min((expenses / budget) * 100, 100) : 0;

  return (
    <div className="summary-cards">
      <div className="card summary-card balance">
        <div className="card-header">
          <h3>Total Balance</h3>
          <div className="icon-wrapper"><DollarSign size={20} /></div>
        </div>
        <p className="amount">{formatCurrency(balance)}</p>
      </div>

      <div className="card summary-card income">
        <div className="card-header">
          <h3>Total Income</h3>
          <div className="icon-wrapper bg-green"><ArrowUpRight size={20} /></div>
        </div>
        <p className="amount text-green">{formatCurrency(income)}</p>
      </div>

      <div className="card summary-card expense">
        <div className="card-header">
          <h3>Total Expenses</h3>
          <div className="icon-wrapper bg-red"><ArrowDownRight size={20} /></div>
        </div>
        <p className="amount text-red">{formatCurrency(expenses)}</p>
      </div>

      <div className="card summary-card budget">
        <div className="card-header">
          <h3>Monthly Budget</h3>
          <div className="icon-wrapper"><Target size={20} /></div>
        </div>
        <div className="budget-info">
          <p className="amount">{formatCurrency(budgetRemaining)} <span className="muted">remaining</span></p>
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${budgetPercentage}%`,
                  backgroundColor: budgetPercentage > 90 ? 'var(--accent-red)' : 'var(--accent-green)'
                }}
              ></div>
            </div>
            <span className="percentage">{Math.round(budgetPercentage)}%</span>
          </div>
        </div>
      </div>

      <style>{`
        .summary-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }
        .summary-card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .card-header h3 {
          font-size: 0.875rem;
          color: var(--text-muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .icon-wrapper {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--surface-hover);
          color: var(--text-main);
        }
        .icon-wrapper.bg-green {
          background-color: var(--accent-green-alpha);
          color: var(--accent-green);
        }
        .icon-wrapper.bg-red {
          background-color: var(--accent-red-alpha);
          color: var(--accent-red);
        }
        .amount {
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        .muted {
          font-size: 1rem;
          font-weight: 400;
          color: var(--text-muted);
        }
        .budget-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .progress-container {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .progress-bar {
          flex: 1;
          height: 6px;
          background-color: var(--surface-hover);
          border-radius: 3px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.5s ease-in-out, background-color 0.3s ease;
        }
        .percentage {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
