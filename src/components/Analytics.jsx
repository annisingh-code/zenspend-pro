import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format, parseISO } from 'date-fns';

export default function Analytics({ transactions }) {
  // Process data for Pie Chart (Expenses by Category)
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieData = Object.keys(expensesByCategory).map(category => ({
    name: category,
    value: expensesByCategory[category]
  })).sort((a, b) => b.value - a.value);

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#ef4444'];

  // Process data for Bar Chart (Monthly Trends)
  // Group by month
  const monthlyDataMap = transactions.reduce((acc, t) => {
    const month = format(parseISO(t.date), 'MMM yy');
    if (!acc[month]) {
      acc[month] = { name: month, Income: 0, Expense: 0 };
    }
    if (t.type === 'income') {
      acc[month].Income += t.amount;
    } else {
      acc[month].Expense += t.amount;
    }
    return acc;
  }, {});

  // Since we have dummy data only for April 2026, let's just make it look like a trend
  // If only one month is present, we just show it. 
  // In a real app we would ensure chronological order and fill missing months.
  const barData = Object.values(monthlyDataMap);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-item" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card analytics">
      <h3>Financial Overview</h3>
      
      <div className="charts-container">
        {pieData.length > 0 ? (
          <div className="chart-wrapper">
            <h4>Expenses by Category</h4>
            <div className="chart">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="chart-wrapper no-data">
            <p>Add some expenses to see the category breakdown.</p>
          </div>
        )}

        <div className="chart-wrapper">
          <h4>Income vs Expenses</h4>
          <div className="chart">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} dx={-10} width={60} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                <Bar dataKey="Income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <style>{`
        .analytics {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .analytics h3 {
          font-size: 1.25rem;
        }
        .charts-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .chart-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .chart-wrapper h4 {
          font-size: 1rem;
          color: var(--text-muted);
          font-weight: 500;
          text-align: center;
        }
        .chart {
          width: 100%;
          height: 250px;
        }
        .chart-tooltip {
          background-color: var(--surface-color);
          border: 1px solid var(--border-color);
          padding: 0.75rem;
          border-radius: var(--border-radius-sm);
          box-shadow: var(--shadow-md);
        }
        .tooltip-label {
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: var(--text-main);
        }
        .tooltip-item {
          font-size: 0.875rem;
          margin: 0.25rem 0;
        }
        .no-data {
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          background-color: var(--bg-color);
          border-radius: var(--border-radius-md);
          border: 1px dashed var(--border-color);
        }
      `}</style>
    </div>
  );
}
