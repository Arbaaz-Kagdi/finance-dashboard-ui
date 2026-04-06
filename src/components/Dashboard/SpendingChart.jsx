import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['indigo', 'red', 'orange', 'mediumseagreen', 'dodgerblue', 'mediumpurple', 'hotpink', 'lightseagreen'];

const SpendingChart = ({ transactions }) => {
  const data = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const grouped = expenses.reduce((acc, curr) => {
      if (!acc[curr.category]) acc[curr.category] = 0;
      acc[curr.category] += curr.amount;
      return acc;
    }, {});
    
    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass chart-tooltip" style={{ padding: '8px', borderRadius: '8px' }}>
          <p style={{ margin: 0, fontWeight: '500' }}>{payload[0].name}</p>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>${payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card h-full">
      <h3 style={{ marginBottom: '1.5rem' }}>Expense Breakdown</h3>
      <div style={{ width: '100%', height: 340 }}>
        {data.length > 0 ? (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
            <p>No expenses recorded</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpendingChart;
