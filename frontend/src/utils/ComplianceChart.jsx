import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { day: 'Mon', score: 98 },
  { day: 'Tue', score: 92 },
  { day: 'Wed', score: 85 }, // ⚠️ Dip in compliance
  { day: 'Thu', score: 95 },
  { day: 'Fri', score: 100 },
  { day: 'Sat', score: 100 },
  { day: 'Sun', score: 99 },
];

const ComplianceChart = () => {
  return (
    <div className="app-card h-[350px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-[var(--color-text-main)]">Weekly Hygiene Trend</h3>
          <p className="text-xs text-[var(--color-text-muted)] font-medium">Average Score: 95.5% (↑ 2% from last week)</p>
        </div>
        <select className="text-xs border border-[var(--color-border-subtle)] rounded-lg bg-[var(--color-surface-subtle)] font-semibold text-[var(--color-text-main)] outline-none px-2.5 py-1 cursor-pointer">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#044a42" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#044a42" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-subtle)" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: 'var(--color-text-muted)', fontSize: 12}} 
              dy={10}
            />
            <YAxis 
              domain={[0, 100]} 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: 'var(--color-text-muted)', fontSize: 12}} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border-subtle)',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                color: 'var(--color-text-main)',
                fontSize: '12px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="#044a42" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#colorScore)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComplianceChart;