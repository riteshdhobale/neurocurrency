import { TrendingUp, Zap, Brain, Target, Award, LineChart } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>

      <div className="relative">
        <nav className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-50"></div>
                <Brain className="h-10 w-10 text-emerald-400 relative" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                DopaCurrency
              </span>
            </div>
          </div>
        </nav>

        <section className="container mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-2 mb-8">
              <Zap className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Neuroscience-Backed Habit Tracking</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Your Brain Runs on
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Dopamine Currency
              </span>
            </h1>

            <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Every action you take either deposits or withdraws from your dopamine account.
              Track your neural currency in real-time and watch how your habits shape your motivation.
            </p>

            <button
              onClick={onGetStarted}
              className="group relative inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105"
            >
              <span>Start Tracking Today</span>
              <TrendingUp className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
                <div className="bg-emerald-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <TrendingUp className="h-7 w-7 text-emerald-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Baseline: 1000</h3>
                <p className="text-slate-400 text-sm">Your natural dopamine state. Good habits elevate you above baseline for hours.</p>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-rose-500/30 transition-all duration-300">
                <div className="bg-rose-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Zap className="h-7 w-7 text-rose-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Spike & Crash</h3>
                <p className="text-slate-400 text-sm">Bad habits create instant spikes but drain you below baseline fast.</p>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300">
                <div className="bg-cyan-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Target className="h-7 w-7 text-cyan-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Recovery Mode</h3>
                <p className="text-slate-400 text-sm">Leave your dopamine alone and it naturally recovers back to baseline.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
              <p className="text-slate-400 text-lg">Understanding your brain's reward system</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-950/30 backdrop-blur-sm border border-emerald-500/20 rounded-3xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-emerald-500/20 p-3 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Good Habits</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-emerald-500 rounded-full p-1 mt-1">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-slate-300">Steady increase above baseline (1000 → 1150)</p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-emerald-500 rounded-full p-1 mt-1">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-slate-300">Sustained motivation for 2-3 hours</p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-emerald-500 rounded-full p-1 mt-1">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-slate-300">Gradual return to baseline</p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-emerald-500 rounded-full p-1 mt-1">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-slate-300">Earn XP and build streaks</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-emerald-500/20">
                  <div className="text-sm text-emerald-400 font-medium mb-2">Examples:</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-emerald-500/10 text-emerald-300 px-3 py-1 rounded-full text-sm">Workout</span>
                    <span className="bg-emerald-500/10 text-emerald-300 px-3 py-1 rounded-full text-sm">Meditation</span>
                    <span className="bg-emerald-500/10 text-emerald-300 px-3 py-1 rounded-full text-sm">Deep Work</span>
                    <span className="bg-emerald-500/10 text-emerald-300 px-3 py-1 rounded-full text-sm">Reading</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-rose-900/30 to-rose-950/30 backdrop-blur-sm border border-rose-500/20 rounded-3xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-rose-500/20 p-3 rounded-xl">
                    <Zap className="h-6 w-6 text-rose-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Bad Habits</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-rose-500 rounded-full p-1 mt-1">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-slate-300">Instant massive spike (1000 → 1200+)</p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-rose-500 rounded-full p-1 mt-1">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-slate-300">Short-lived pleasure (5-10 minutes)</p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-rose-500 rounded-full p-1 mt-1">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-slate-300">Rapid crash below baseline (900 → 700 → 300)</p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-rose-500 rounded-full p-1 mt-1">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-slate-300">Lose XP and feel unmotivated</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-rose-500/20">
                  <div className="text-sm text-rose-400 font-medium mb-2">Examples:</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-rose-500/10 text-rose-300 px-3 py-1 rounded-full text-sm">Social Media</span>
                    <span className="bg-rose-500/10 text-rose-300 px-3 py-1 rounded-full text-sm">Junk Food</span>
                    <span className="bg-rose-500/10 text-rose-300 px-3 py-1 rounded-full text-sm">Gaming</span>
                    <span className="bg-rose-500/10 text-rose-300 px-3 py-1 rounded-full text-sm">Binging</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-20">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-12 text-center">
            <Award className="h-16 w-16 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">Gamified Progress Tracking</h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Earn XP for good habits, build daily streaks, and watch your dopamine balance grow.
              See real-time graphs of your neural currency and get instant feedback on every action.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-slate-950/50 rounded-2xl p-6">
                <LineChart className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">Real-time</div>
                <div className="text-slate-400 text-sm">Dopamine Graphs</div>
              </div>

              <div className="bg-slate-950/50 rounded-2xl p-6">
                <Target className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">Daily</div>
                <div className="text-slate-400 text-sm">Streak Tracking</div>
              </div>

              <div className="bg-slate-950/50 rounded-2xl p-6">
                <Award className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">XP & Levels</div>
                <div className="text-slate-400 text-sm">Progress System</div>
              </div>
            </div>

            <button
              onClick={onGetStarted}
              className="mt-12 group relative inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-10 py-5 rounded-xl font-semibold text-lg shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105"
            >
              <span>Begin Your Journey</span>
              <Brain className="h-5 w-5 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </section>

        <footer className="container mx-auto px-6 py-12 border-t border-slate-800">
          <div className="text-center text-slate-500 text-sm">
            <p>Built with neuroscience-backed principles for optimal habit formation</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
