import { X, Brain, Zap, Activity as ActivityIcon, Info } from 'lucide-react';
import { Activity } from '../types';
import { activityPresets } from '../data/activityPresets';

interface ActivityDetailsModalProps {
  activity: Activity;
  onClose: () => void;
}

export default function ActivityDetailsModal({ activity, onClose }: ActivityDetailsModalProps) {
  const preset = activityPresets.find(p => p.name === activity.name);

  if (!preset) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl ${
              activity.type === 'good'
                ? 'bg-emerald-500/10'
                : 'bg-rose-500/10'
            }`}>
              <Brain className={`h-6 w-6 ${
                activity.type === 'good'
                  ? 'text-emerald-400'
                  : 'text-rose-400'
              }`} />
            </div>
            <h2 className="text-2xl font-bold text-white">{activity.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {preset.description && (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Info className="h-5 w-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-white">Description</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">{preset.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <div className="text-slate-400 text-sm mb-1">Dopamine Impact</div>
              <div className={`text-2xl font-bold ${
                activity.type === 'good' ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {activity.type === 'good' ? '+' : ''}{activity.dopamineImpact}
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <div className="text-slate-400 text-sm mb-1">XP Reward</div>
              <div className={`text-2xl font-bold ${
                activity.xpReward >= 0 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {activity.xpReward >= 0 ? '+' : ''}{activity.xpReward}
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <div className="text-slate-400 text-sm mb-1">Duration</div>
              <div className="text-2xl font-bold text-white">
                {Math.round(activity.duration / 60)}h
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <div className="text-slate-400 text-sm mb-1">Peak Time</div>
              <div className="text-2xl font-bold text-white">
                {activity.peakTime}m
              </div>
            </div>
          </div>

          {preset.brainRegions && (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Brain className="h-5 w-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-white">Brain Regions Affected</h3>
              </div>
              <div className="space-y-2">
                {preset.brainRegions.map((region, index) => (
                  <div
                    key={index}
                    className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-4 py-2"
                  >
                    <span className="text-cyan-300 text-sm font-medium">{region}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {preset.pathway && (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <ActivityIcon className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Neural Pathway</h3>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <span className="text-blue-300 font-medium">{preset.pathway}</span>
              </div>
            </div>
          )}

          {preset.mechanism && (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-semibold text-white">Mechanism of Action</h3>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                <p className="text-slate-300 text-sm leading-relaxed">{preset.mechanism}</p>
              </div>
            </div>
          )}

          {activity.type === 'bad' && activity.crashAmount && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-rose-400" />
                <h4 className="font-semibold text-rose-400">Warning: Dopamine Crash</h4>
              </div>
              <p className="text-slate-300 text-sm">
                This activity will cause a crash of <span className="font-bold text-rose-400">-{activity.crashAmount}</span> dopamine units,
                leaving you below baseline and reducing motivation for productive activities.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
