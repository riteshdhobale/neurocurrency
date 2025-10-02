import { useState, useEffect } from 'react';
import { Brain, TrendingUp, Award, Target, Flame, BarChart3, ArrowLeft } from 'lucide-react';
import { dopamineEngine } from '../utils/dopamineEngine';
import { Activity, TodoItem } from '../types';
import DopamineChart from './DopamineChart';
import StatsCard from './StatsCard';
import ActivityInput from './ActivityInput';
import DailySummary from './DailySummary';
import TodoList from './TodoList';
import DopamineScoreCard from './DopamineScoreCard';

interface DashboardProps {
  onBack: () => void;
}

export default function Dashboard({ onBack }: DashboardProps) {
  const [currentDopamine, setCurrentDopamine] = useState(1000);
  const [stats, setStats] = useState(dopamineEngine.getStats());
  const [logs, setLogs] = useState(dopamineEngine.getAllLogs());
  const [todayStats, setTodayStats] = useState(dopamineEngine.getTodayStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDopamine(dopamineEngine.getCurrentDopamine());
      setLogs(dopamineEngine.getAllLogs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleActivitySubmit = (activity: Activity) => {
    dopamineEngine.addActivity(activity);
    setStats(dopamineEngine.getStats());
    setLogs(dopamineEngine.getAllLogs());
    setTodayStats(dopamineEngine.getTodayStats());
    setCurrentDopamine(dopamineEngine.getCurrentDopamine());
  };

  const handleTodoComplete = (todo: TodoItem) => {
    if (todo.activityPreset) {
      const activity: Activity = {
        id: Date.now().toString(),
        name: todo.activityPreset.name,
        type: todo.activityPreset.type,
        dopamineImpact: todo.activityPreset.dopamineImpact,
        duration: todo.activityPreset.duration,
        peakTime: todo.activityPreset.peakTime,
        crashAmount: todo.activityPreset.crashAmount,
        xpReward: todo.activityPreset.xpReward,
        timestamp: Date.now()
      };

      handleActivitySubmit(activity);
    }
  };

  const getDopamineStatus = () => {
    if (currentDopamine >= 1200) return { text: 'Excellent', color: 'text-emerald-400' };
    if (currentDopamine >= 1000) return { text: 'Optimal', color: 'text-cyan-400' };
    if (currentDopamine >= 800) return { text: 'Good', color: 'text-blue-400' };
    if (currentDopamine >= 500) return { text: 'Low', color: 'text-amber-400' };
    return { text: 'Critical', color: 'text-rose-400' };
  };

  const status = getDopamineStatus();
  const level = Math.floor(stats.totalXP / 100) + 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>

      <div className="relative">
        <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm font-medium">Back</span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-50"></div>
                  <Brain className="h-8 w-8 text-emerald-400 relative" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  DopaCurrency
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-xs text-slate-500">Level {level}</div>
                  <div className="text-sm font-bold text-amber-400">{stats.totalXP} XP</div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-r from-slate-900/80 to-slate-950/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                      {Math.round(currentDopamine)}
                      <span className="text-slate-500 text-2xl ml-2">/ 1000</span>
                    </h1>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-semibold ${status.color}`}>{status.text}</span>
                      <span className="text-slate-500 text-sm">•</span>
                      <span className="text-slate-400 text-sm">Dopamine Currency</span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className={`absolute inset-0 blur-xl opacity-50 ${
                      currentDopamine >= 1000 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}></div>
                    <Brain className={`h-16 w-16 relative ${
                      currentDopamine >= 1000 ? 'text-emerald-400' : 'text-rose-400'
                    }`} />
                  </div>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      currentDopamine >= 1000
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                        : 'bg-gradient-to-r from-rose-500 to-amber-500'
                    }`}
                    style={{ width: `${Math.min(100, (currentDopamine / 2000) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <DopamineScoreCard currentDopamine={currentDopamine} baselineDopamine={1000} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              icon={TrendingUp}
              label="Current Level"
              value={level}
              subtext={`${stats.totalXP % 100}/100 XP to next level`}
              color="emerald"
            />

            <StatsCard
              icon={Flame}
              label="Current Streak"
              value={`${stats.currentStreak} days`}
              subtext={`Best: ${stats.longestStreak} days`}
              color="amber"
            />

            <StatsCard
              icon={Target}
              label="Activities"
              value={stats.activitiesCompleted}
              subtext="Total completed"
              color="cyan"
            />

            <StatsCard
              icon={Award}
              label="Total XP"
              value={stats.totalXP}
              subtext={`Level ${level} adventurer`}
              color="blue"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <BarChart3 className="h-6 w-6 text-emerald-400" />
                  <h2 className="text-2xl font-bold text-white">Dopamine Graph</h2>
                </div>
                <div className="h-80">
                  <DopamineChart logs={logs} />
                </div>
              </div>

              <TodoList onTodoComplete={handleTodoComplete} />
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl overflow-hidden">
              <ActivityInput onActivitySubmit={handleActivitySubmit} />
            </div>
          </div>

          <DailySummary
            goodActivitiesCount={todayStats.goodActivitiesCount}
            badActivitiesCount={todayStats.badActivitiesCount}
            dopamineGained={todayStats.dopamineGained}
            dopamineLost={todayStats.dopamineLost}
            netBalance={todayStats.netBalance}
          />
        </main>
      </div>
    </div>
  );
}
