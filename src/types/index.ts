export interface Activity {
  id: string;
  name: string;
  type: 'good' | 'bad';
  dopamineImpact: number;
  duration: number;
  peakTime: number;
  crashAmount?: number;
  xpReward: number;
  timestamp: number;
}

export interface DopamineLog {
  timestamp: number;
  level: number;
  activity?: Activity;
  isDecay: boolean;
}

export interface UserStats {
  currentDopamine: number;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  activitiesCompleted: number;
  lastActivityDate: string;
}

export interface ActivityPreset {
  name: string;
  type: 'good' | 'bad';
  dopamineImpact: number;
  duration: number;
  peakTime: number;
  crashAmount?: number;
  xpReward: number;
  category: string;
  keywords: string[];
  brainRegions?: string[];
  pathway?: string;
  mechanism?: string;
  description?: string;
}

export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  activityPreset?: ActivityPreset;
  estimatedDopamineImpact?: number;
  createdAt: number;
  completedAt?: number;
  scheduledTime?: string;
}

export interface DopamineScore {
  score: number;
  rating: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
  color: string;
  message: string;
}
