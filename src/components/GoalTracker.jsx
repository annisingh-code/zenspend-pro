import React, { useState } from "react";
import { Target, Plus } from "lucide-react";

export default function GoalTracker({ goals, onAddGoal }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!title || !target) return;
    onAddGoal({ title, target: parseFloat(target) });
    setTitle("");
    setTarget("");
    setShowForm(false);
  };

  return (
    <div className="card goal-tracker">
      <div className="goal-header">
        <div className="goal-title">
          <Target size={20} className="text-green" />
          <h3>Financial Goals</h3>
        </div>
        <button className="btn-icon" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} />
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddGoal} className="add-goal-form">
          <input
            type="text"
            placeholder="Goal name (e.g., New Car)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="number"
            inputMode="decimal" /* UX Enhancement: Opens numeric keyboard directly */
            placeholder="Target Amount"
            min="1"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Add
          </button>
        </form>
      )}

      <div className="goals-list">
        {goals.map((goal) => {
          const progress = Math.min((goal.current / goal.target) * 100, 100);
          return (
            <div key={goal.id} className="goal-item">
              <div className="goal-info">
                <h4>{goal.title}</h4>
                <span className="goal-amounts">
                  {formatCurrency(goal.current)} /{" "}
                  <span className="muted">{formatCurrency(goal.target)}</span>
                </span>
              </div>
              <div className="goal-progress-container">
                <div className="goal-progress-bar">
                  <div
                    className="goal-progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="goal-percentage">{Math.round(progress)}%</span>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .goal-tracker {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .goal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .goal-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .goal-title h3 {
          font-size: 1.25rem;
          margin: 0;
        }
        .add-goal-form {
          display: flex;
          gap: 0.5rem;
          background-color: var(--bg-color);
          padding: 1rem;
          border-radius: var(--border-radius-sm);
        }
        .add-goal-form input {
          flex: 1;
          padding: 0.5rem;
        }
        .btn-sm {
          padding: 0.5rem 1rem;
        }
        .goals-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .goal-item {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .goal-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }
        .goal-info h4 {
          font-size: 1rem;
          font-weight: 500;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
        }
        .goal-amounts {
          font-size: 0.875rem;
          font-weight: 600;
          white-space: nowrap;
        }
        .goal-amounts .muted {
          color: var(--text-muted);
          font-weight: 400;
        }
        .goal-progress-container {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .goal-progress-bar {
          flex: 1;
          height: 8px;
          background-color: var(--bg-color);
          border-radius: 4px;
          overflow: hidden;
        }
        .goal-progress-fill {
          height: 100%;
          background-color: var(--accent-green);
          border-radius: 4px;
          transition: width 0.5s ease-in-out;
        }
        .goal-percentage {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
          min-width: 32px;
          text-align: right;
        }

        /* Mobile specific adjustments */
        @media (max-width: 600px) {
          .goal-tracker {
            gap: 1rem; /* Tighter overall container gap */
          }
          .goals-list {
            gap: 1rem; /* Tighter gap between individual goals */
          }
          .add-goal-form {
            flex-direction: column;
            gap: 0.75rem;
          }
          .add-goal-form input, .add-goal-form button {
            width: 100%;
          }
          .goal-amounts {
            font-size: 0.8rem; /* Slightly smaller to ensure it doesn't wrap */
          }
        }
      `}</style>
    </div>
  );
}
