import React, { useState, useEffect } from 'react';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import GoalTracker from './components/GoalTracker';
import Analytics from './components/Analytics';
import './index.css';
import { Wallet } from 'lucide-react';

const INITIAL_TRANSACTIONS = [
  { id: '1', title: 'Monthly Salary', amount: 5000, type: 'income', category: 'Salary', date: '2026-04-01' },
  { id: '2', title: 'Apartment Rent', amount: 1500, type: 'expense', category: 'Housing', date: '2026-04-02' },
  { id: '3', title: 'Grocery Shopping', amount: 350, type: 'expense', category: 'Food', date: '2026-04-05' },
  { id: '4', title: 'Internet Bill', amount: 60, type: 'expense', category: 'Utilities', date: '2026-04-10' },
  { id: '5', title: 'Freelance Project', amount: 800, type: 'income', category: 'Freelance', date: '2026-04-15' },
  { id: '6', title: 'Restaurant', amount: 85, type: 'expense', category: 'Food', date: '2026-04-16' },
];

const INITIAL_GOALS = [
  { id: '1', title: 'Emergency Fund', target: 10000, current: 4500 },
  { id: '2', title: 'Summer Vacation', target: 2000, current: 800 },
];

function App() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const [budget, setBudget] = useState(2500);

  // Derived state
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  const addTransaction = (transaction) => {
    setTransactions([{ ...transaction, id: Date.now().toString() }, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const addGoal = (goal) => {
    setGoals([...goals, { ...goal, id: Date.now().toString(), current: 0 }]);
  };

  const updateBudget = (newBudget) => {
    setBudget(newBudget);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <div className="logo">
            <Wallet className="logo-icon" size={32} />
            <h1>ZenSpend Pro</h1>
          </div>
          <p className="app-subtitle">Track. Plan. Grow your finances.</p>
        </div>
      </header>

      <main className="dashboard-grid">
        <div className="summary-section">
          <SummaryCards 
            balance={balance} 
            income={totalIncome} 
            expenses={totalExpenses} 
            budget={budget} 
            updateBudget={updateBudget}
          />
        </div>

        <div className="main-content flex gap-6">
          <div className="left-column">
            <TransactionForm onAdd={addTransaction} />
            <TransactionList transactions={transactions} onDelete={deleteTransaction} />
          </div>
          
          <div className="right-column">
            <GoalTracker goals={goals} onAddGoal={addGoal} />
            <Analytics transactions={transactions} />
          </div>
        </div>
      </main>

      <style>{`
        .app-container {
          min-height: 100vh;
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }
        .app-header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        .logo-container {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .logo-icon {
          color: var(--accent-green);
        }
        .logo h1 {
          font-size: 1.75rem;
          letter-spacing: -0.5px;
          margin: 0;
        }
        .app-subtitle {
          color: var(--text-muted);
          font-size: 0.875rem;
          margin-left: 3rem;
        }
        .dashboard-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          min-width: 0;
        }
        .main-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: start;
          min-width: 0;
        }
        .left-column, .right-column {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          min-width: 0;
        }
        @media (max-width: 992px) {
          .main-content {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .app-container {
            padding: 1rem;
          }
          .dashboard-grid {
            gap: 1.5rem;
          }
          .main-content {
            gap: 1.5rem;
          }
          .left-column, .right-column {
            gap: 1.5rem;
          }
          .logo h1 {
            font-size: 1.5rem;
          }
          .app-subtitle {
            margin-left: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
