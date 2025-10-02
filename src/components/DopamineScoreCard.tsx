import { TrendingUp, TrendingDown, Minus, Brain } from 'lucide-react';
import { DopamineScore } from '../types';

interface DopamineScoreCardProps {
  currentDopamine: number;
  baselineDopamine?: number;
}

export default function DopamineScoreCard({ currentDopamine, baselineDopamine = 1000 }: DopamineScoreCardProps) {
  const calculateScore = (): DopamineScore => {
    const percentage = (currentDopamine / baselineDopamine) * 100;

    if (percentage >= 120) {
      return {
        score: percentage,
        rating: 'Excellent',
        color: 'emerald',
        message: 'Your dopamine levels are optimal! You\'re primed for peak performance and motivation.'
      };
    } else if (percentage >= 100) {
      return {
        score: percentage,
        rating: 'Good',
        color: 'cyan',
        message: 'You\'re at a healthy baseline. Maintain your positive habits to stay balanced.'
      };
    } else if (percentage >= 80) {
      return {
        score: percentage,
        rating: 'Fair',
        color: 'blue',
        message: 'Slightly below baseline. Consider engaging in mood-boosting activities.'
      };
    } else if (percentage >= 50) {
      return {
        score: percentage,
        rating: 'Poor',
        color: 'amber',
        message: 'Dopamine levels are low. Time to reset with healthy habits and avoid quick fixes.'
      };
    } else {
      return {
        score: percentage,
        rating: 'Critical',
        color: 'rose',
        message: 'Critical dopamine deficit. Focus on recovery: rest, nutrition, and avoid stimulation.'
      };
    }
  };

  const score = calculateScore();

  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      gradient: 'from-emerald-500 to-cyan-500'
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      gradient: 'from-cyan-500 to-blue-500'
    },
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      gradient: 'from-blue-500 to-cyan-500'
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      gradient: 'from-amber-500 to-orange-500'
    },
    rose: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      text: 'text-rose-400',
      gradient: 'from-rose-500 to-red-500'
    }
  };

  const colors = colorClasses[score.color as keyof typeof colorClasses];

  const getIcon = () => {
    if (score.score >= 100) return <TrendingUp className={`h-8 w-8 ${colors.text}`} />;
    if (score.score >= 80) return <Minus className={`h-8 w-8 ${colors.text}`} />;
    return <TrendingDown className={`h-8 w-8 ${colors.text}`} />;
  };

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-3xl p-6`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`${colors.bg} p-3 rounded-xl border ${colors.border}`}>
            <Brain className={`h-6 w-6 ${colors.text}`} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Dopamine Score</h3>
            <p className="text-slate-400 text-sm">Today's Neural Currency Rating</p>
          </div>
        </div>
        {getIcon()}
      </div>

      <div className="mb-4">
        <div className="flex items-baseline space-x-2 mb-2">
          <span className={`text-5xl font-bold ${colors.text}`}>
            {Math.round(score.score)}
          </span>
          <span className="text-slate-400 text-xl">/100</span>
        </div>
        <div className={`inline-block px-4 py-1 rounded-full ${colors.bg} border ${colors.border}`}>
          <span className={`${colors.text} font-semibold text-sm`}>{score.rating}</span>
        </div>
      </div>

      <div className="w-full bg-slate-800 rounded-full h-3 mb-4 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${colors.gradient} transition-all duration-500`}
          style={{ width: `${Math.min(100, score.score)}%` }}
        ></div>
      </div>

      <p className="text-slate-300 text-sm leading-relaxed">
        {score.message}
      </p>

      <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-2 gap-4">
        <div>
          <div className="text-slate-500 text-xs mb-1">Current Level</div>
          <div className="text-white font-semibold">{Math.round(currentDopamine)}</div>
        </div>
        <div>
          <div className="text-slate-500 text-xs mb-1">Baseline</div>
          <div className="text-white font-semibold">{baselineDopamine}</div>
        </div>
      </div>
    </div>
  );
}
