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
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-[350px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Weekly Hygiene Trend</h3>
          <p className="text-xs text-slate-500 font-medium">Average Score: 95.5% (↑ 2% from last week)</p>
        </div>
        <select className="text-xs border-slate-200 rounded-md bg-slate-50 font-semibold text-slate-600 outline-none p-1">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 12}} 
              dy={10}
            />
            <YAxis 
              domain={[0, 100]} 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 12}} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="#10b981" 
              strokeWidth={3}
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