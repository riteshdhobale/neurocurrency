import { TrendingUp, TrendingDown, Activity as ActivityIcon } from 'lucide-react';

interface DailySummaryProps {
  goodActivitiesCount: number;
  badActivitiesCount: number;
  dopamineGained: number;
  dopamineLost: number;
  netBalance: number;
}

export default function DailySummary({
  goodActivitiesCount,
  badActivitiesCount,
  dopamineGained,
  dopamineLost,
  netBalance
}: DailySummaryProps) {
  return (
    <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-8">
      <div className="flex items-center space-x-3 mb-6">
        <ActivityIcon className="h-6 w-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">Today's Summary</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-400 text-sm font-medium">Good Habits</span>
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">{goodActivitiesCount}</div>
          <div className="text-emerald-400 text-sm">+{dopamineGained} dopamine gained</div>
        </div>

        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-rose-400 text-sm font-medium">Bad Habits</span>
            <TrendingDown className="h-5 w-5 text-rose-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">{badActivitiesCount}</div>
          <div className="text-rose-400 text-sm">-{dopamineLost} dopamine lost</div>
        </div>
      </div>

      <div className="bg-slate-950/50 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-sm mb-1">Net Balance</div>
            <div className={`text-4xl font-bold ${netBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {netBalance >= 0 ? '+' : ''}{netBalance}
            </div>
          </div>
          <div className={`text-6xl ${netBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'} opacity-20`}>
            {netBalance >= 0 ? '↑' : '↓'}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800">
          <p className="text-slate-400 text-sm">
            {netBalance >= 100 && "Outstanding! You're building strong dopamine reserves."}
            {netBalance > 0 && netBalance < 100 && "Good work! Keep up the positive momentum."}
            {netBalance === 0 && "Balanced day. Try adding more good habits tomorrow."}
            {netBalance < 0 && netBalance > -100 && "Slight deficit. Focus on recovery activities."}
            {netBalance <= -100 && "Warning: Significant dopamine drain. Time to reset with healthy habits."}
          </p>
        </div>
      </div>
    </div>
  );
}
