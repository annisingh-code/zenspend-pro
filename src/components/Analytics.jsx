
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
      <h3 className="analytics-title">Financial Overview</h3>
      
      <div className="charts-container">
        {pieData.length > 0 ? (
          <div className="chart-wrapper">
            <h4>Expenses by Category</h4>
            <div className="chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius="50%" /* Using percentages prevents clipping on small heights */
                    outerRadius="75%"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={24} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
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
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={5} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} dx={-10} width={60} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
                <Legend verticalAlign="bottom" height={24} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
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
        .analytics-title {
          font-size: 1.25rem;
          margin: 0;
        }
        .charts-container {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }
        .chart-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-width: 0;
          width: 100%;
        }
        .chart-wrapper h4 {
          font-size: 1rem;
          color: var(--text-muted);
          font-weight: 500;
          text-align: center;
          margin: 0;
        }
        .chart {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          height: 280px;
        }
        .chart-tooltip {
          background-color: var(--surface-color);
          border: 1px solid var(--border-color);
          padding: 0.75rem;
          border-radius: var(--border-radius-sm);
          box-shadow: var(--shadow-md);
          pointer-events: none; 
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
        
        @media (max-width: 600px) {
          .analytics {
            gap: 1rem;
          }
          .analytics-title {
            font-size: 1.1rem;
          }
          .charts-container {
            gap: 1.5rem; /* Much tighter gap between charts */
          }
          .chart-wrapper {
            gap: 0.5rem; /* Tighter gap between chart title and chart */
          }
          .chart-wrapper h4 {
            font-size: 0.95rem;
          }
          .chart {
            height: 190px; /* Severely reduced height to force everything onto one screen */
          }
          .chart-tooltip {
            padding: 0.5rem; 
          }
          .tooltip-label {
            font-size: 0.85rem;
          }
          .tooltip-item {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
