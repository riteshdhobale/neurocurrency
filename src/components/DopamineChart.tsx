import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { DopamineLog } from '../types';

interface DopamineChartProps {
  logs: DopamineLog[];
}

export default function DopamineChart({ logs }: DopamineChartProps) {
  const chartData = logs.map(log => ({
    time: new Date(log.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    dopamine: Math.round(log.level),
    timestamp: log.timestamp
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const fullTime = new Date(data.timestamp).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      return (
        <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-xl p-4 shadow-2xl">
          <p className="text-slate-400 text-xs mb-2">{fullTime}</p>
          <p className="text-white font-bold text-lg">
            {data.dopamine} <span className="text-emerald-400 text-sm font-normal">units</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="dopamineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.5} />
          <XAxis
            dataKey="time"
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            domain={[0, 2000]}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={1000}
            stroke="#3b82f6"
            strokeDasharray="3 3"
            strokeWidth={2}
            label={{ value: 'Baseline', position: 'right', fill: '#3b82f6', fontSize: 12 }}
          />
          <Area
            type="monotone"
            dataKey="dopamine"
            stroke="#10b981"
            strokeWidth={3}
            fill="url(#dopamineGradient)"
            animationDuration={300}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
