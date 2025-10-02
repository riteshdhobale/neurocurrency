import { useState } from 'react';
import { Send, Sparkles, Info } from 'lucide-react';
import { Activity } from '../types';
import { matchActivity } from '../data/activityPresets';
import ActivityDetailsModal from './ActivityDetailsModal';

interface ActivityInputProps {
  onActivitySubmit: (activity: Activity) => void;
}

interface Message {
  id: string;
  type: 'user' | 'system';
  content: string;
  activity?: Activity;
}

export default function ActivityInput({ onActivitySubmit }: ActivityInputProps) {
  const [input, setInput] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: "👋 Hey! Tell me what you're about to do or just did. I'll show you how it affects your dopamine!"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);

    const matchedPreset = matchActivity(input);

    if (matchedPreset) {
      const activity: Activity = {
        id: Date.now().toString(),
        name: matchedPreset.name,
        type: matchedPreset.type,
        dopamineImpact: matchedPreset.dopamineImpact,
        duration: matchedPreset.duration,
        peakTime: matchedPreset.peakTime,
        crashAmount: matchedPreset.crashAmount,
        xpReward: matchedPreset.xpReward,
        timestamp: Date.now()
      };

      let systemResponse = '';

      if (activity.type === 'good') {
        systemResponse = `🎯 Nice! "${activity.name}" will boost your dopamine by +${activity.dopamineImpact} units. You'll feel the peak effects for about ${Math.round(activity.duration / 60)} hours, then gradually return to baseline. Keep it up!`;
      } else {
        systemResponse = `⚠️ Hold up! "${activity.name}" will spike your dopamine by +${activity.dopamineImpact}, but you'll crash by -${activity.crashAmount} units shortly after. This will drain your motivation and leave you below baseline.`;
      }

      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: systemResponse,
        activity
      };

      setMessages(prev => [...prev, systemMessage]);
      onActivitySubmit(activity);
    } else {
      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: "🤔 I'm not sure about that activity. Try being more specific! Examples: 'workout', 'scroll social media', 'study for 2 hours', 'play video games'"
      };

      setMessages(prev => [...prev, systemMessage]);
    }

    setInput('');
  };

  return (
    <>
      {selectedActivity && (
        <ActivityDetailsModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
      )}
      <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 p-6">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                  : 'bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-slate-200'
              }`}
            >
              {message.type === 'system' && (
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs font-semibold text-cyan-400">DopaCurrency AI</span>
                </div>
              )}
              <p className="text-sm leading-relaxed">{message.content}</p>

              {message.activity && (
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Impact:</span>
                    <span className={`font-bold ${message.activity.type === 'good' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {message.activity.type === 'good' ? '+' : ''}{message.activity.dopamineImpact} dopamine
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-slate-400">XP:</span>
                    <span className={`font-bold ${message.activity.xpReward >= 0 ? 'text-amber-400' : 'text-rose-400'}`}>
                      {message.activity.xpReward >= 0 ? '+' : ''}{message.activity.xpReward} XP
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedActivity(message.activity!)}
                    className="mt-2 w-full flex items-center justify-center space-x-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Info className="h-3 w-3" />
                    <span>View Neuroscience Details</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-slate-800 p-4 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your activity... (e.g., 'workout', 'scroll social media')"
            className="flex-1 bg-slate-800 text-white placeholder-slate-500 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white p-3 rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
    </>
  );
}
