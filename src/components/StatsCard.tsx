import { Video as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtext?: string;
  color: 'emerald' | 'cyan' | 'amber' | 'rose' | 'blue';
}

const colorClasses = {
  emerald: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
    glow: 'shadow-emerald-500/20'
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/20',
    glow: 'shadow-cyan-500/20'
  },
  amber: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
    glow: 'shadow-amber-500/20'
  },
  rose: {
    bg: 'bg-rose-500/10',
    text: 'text-rose-400',
    border: 'border-rose-500/20',
    glow: 'shadow-rose-500/20'
  },
  blue: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
    glow: 'shadow-blue-500/20'
  }
};

export default function StatsCard({ icon: Icon, label, value, subtext, color }: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <div className={`bg-slate-900/50 backdrop-blur-sm border ${colors.border} rounded-2xl p-6 shadow-xl ${colors.glow} hover:scale-105 transition-transform duration-300`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`${colors.bg} p-3 rounded-xl`}>
          <Icon className={`h-6 w-6 ${colors.text}`} />
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-slate-400 text-sm font-medium">{label}</div>
        <div className={`text-3xl font-bold ${colors.text}`}>{value}</div>
        {subtext && <div className="text-slate-500 text-xs">{subtext}</div>}
      </div>
    </div>
  );
}
