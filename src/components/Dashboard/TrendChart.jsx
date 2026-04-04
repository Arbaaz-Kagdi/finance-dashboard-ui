import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

const TrendChart = ({ transactions }) => {
  const data = useMemo(() => {
    // Group transactions by date
    const grouped = transactions.reduce((acc, curr) => {
      const dateStr = format(parseISO(curr.date), 'MMM dd');
      if (!acc[dateStr]) {
        acc[dateStr] = { date: dateStr, income: 0, expense: 0, rawDate: curr.date };
      }
      if (curr.type === 'income') acc[dateStr].income += curr.amount;
      else acc[dateStr].expense += curr.amount;
      return acc;
    }, {});

    // Sort by actual date
    return Object.values(grouped).sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate));
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass chart-tooltip" style={{ padding: '10px', borderRadius: '8px' }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
          <p style={{ margin: 0, color: 'var(--success-color)' }}>Income: ${payload[0].value}</p>
          <p style={{ margin: 0, color: 'var(--danger-color)' }}>Expense: ${payload[1].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card h-full">
      <h3 style={{ marginBottom: '1.5rem' }}>Cash Flow Trend</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--success-color)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--success-color)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--danger-color)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--danger-color)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
            <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="income" stroke="var(--success-color)" fillOpacity={1} fill="url(#colorIncome)" />
            <Area type="monotone" dataKey="expense" stroke="var(--danger-color)" fillOpacity={1} fill="url(#colorExpense)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
