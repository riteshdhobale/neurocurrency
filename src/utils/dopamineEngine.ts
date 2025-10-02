import { Activity, DopamineLog, UserStats } from '../types';

const BASELINE = 1000;
const DECAY_RATE = 0.5;
const RECOVERY_RATE = 2;
const MIN_DOPAMINE = 0;
const MAX_DOPAMINE = 2000;

export class DopamineEngine {
  private logs: DopamineLog[] = [];
  private stats: UserStats = {
    currentDopamine: BASELINE,
    totalXP: 0,
    currentStreak: 0,
    longestStreak: 0,
    activitiesCompleted: 0,
    lastActivityDate: new Date().toDateString()
  };

  constructor() {
    this.loadFromStorage();
    this.initializeBaseline();
  }

  private loadFromStorage() {
    const savedLogs = localStorage.getItem('dopamineLogs');
    const savedStats = localStorage.getItem('userStats');

    if (savedLogs) {
      this.logs = JSON.parse(savedLogs);
    }

    if (savedStats) {
      this.stats = JSON.parse(savedStats);
      this.updateStreak();
    }
  }

  private saveToStorage() {
    localStorage.setItem('dopamineLogs', JSON.stringify(this.logs));
    localStorage.setItem('userStats', JSON.stringify(this.stats));
  }

  private initializeBaseline() {
    if (this.logs.length === 0) {
      this.logs.push({
        timestamp: Date.now(),
        level: BASELINE,
        isDecay: false
      });
      this.saveToStorage();
    }
  }

  private updateStreak() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (this.stats.lastActivityDate === yesterday) {
      return;
    } else if (this.stats.lastActivityDate !== today) {
      this.stats.currentStreak = 0;
    }
  }

  private calculateDecay(currentLevel: number, timeSinceLastActivity: number): number {
    if (currentLevel > BASELINE) {
      const decayAmount = (currentLevel - BASELINE) * (DECAY_RATE / 100) * (timeSinceLastActivity / 60000);
      return Math.max(BASELINE, currentLevel - decayAmount);
    } else if (currentLevel < BASELINE) {
      const recoveryAmount = (BASELINE - currentLevel) * (RECOVERY_RATE / 100) * (timeSinceLastActivity / 60000);
      return Math.min(BASELINE, currentLevel + recoveryAmount);
    }
    return currentLevel;
  }

  getCurrentDopamine(): number {
    const lastLog = this.logs[this.logs.length - 1];
    const timeSinceLastLog = Date.now() - lastLog.timestamp;
    return this.calculateDecay(lastLog.level, timeSinceLastLog);
  }

  addActivity(activity: Activity): DopamineLog[] {
    const now = Date.now();
    const currentLevel = this.getCurrentDopamine();
    const newLogs: DopamineLog[] = [];

    if (activity.type === 'good') {
      const peakLevel = Math.min(MAX_DOPAMINE, currentLevel + activity.dopamineImpact);

      newLogs.push({
        timestamp: now,
        level: currentLevel,
        activity,
        isDecay: false
      });

      newLogs.push({
        timestamp: now + activity.peakTime * 60000,
        level: peakLevel,
        activity,
        isDecay: false
      });

      const decaySteps = 5;
      const decayDuration = activity.duration - activity.peakTime;
      const decayPerStep = (peakLevel - BASELINE) / decaySteps;

      for (let i = 1; i <= decaySteps; i++) {
        newLogs.push({
          timestamp: now + (activity.peakTime + (decayDuration * i / decaySteps)) * 60000,
          level: Math.max(BASELINE, peakLevel - decayPerStep * i),
          isDecay: true
        });
      }
    } else {
      const peakLevel = Math.min(MAX_DOPAMINE, currentLevel + activity.dopamineImpact);

      newLogs.push({
        timestamp: now,
        level: currentLevel,
        activity,
        isDecay: false
      });

      newLogs.push({
        timestamp: now + activity.peakTime * 60000,
        level: peakLevel,
        activity,
        isDecay: false
      });

      const crashLevel = Math.max(MIN_DOPAMINE, currentLevel - (activity.crashAmount || 0));
      const crashSteps = 3;
      const crashDuration = activity.duration - activity.peakTime;
      const crashPerStep = (peakLevel - crashLevel) / crashSteps;

      for (let i = 1; i <= crashSteps; i++) {
        newLogs.push({
          timestamp: now + (activity.peakTime + (crashDuration * i / crashSteps)) * 60000,
          level: Math.max(MIN_DOPAMINE, peakLevel - crashPerStep * i),
          isDecay: true
        });
      }
    }

    this.logs.push(...newLogs);

    this.stats.currentDopamine = newLogs[newLogs.length - 1].level;
    this.stats.totalXP += activity.xpReward;
    this.stats.activitiesCompleted += 1;

    const today = new Date().toDateString();
    if (this.stats.lastActivityDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (this.stats.lastActivityDate === yesterday) {
        this.stats.currentStreak += 1;
      } else {
        this.stats.currentStreak = 1;
      }
      this.stats.lastActivityDate = today;
    }

    if (this.stats.currentStreak > this.stats.longestStreak) {
      this.stats.longestStreak = this.stats.currentStreak;
    }

    this.saveToStorage();
    return newLogs;
  }

  getAllLogs(): DopamineLog[] {
    const currentLevel = this.getCurrentDopamine();
    const lastLog = this.logs[this.logs.length - 1];

    if (lastLog.level !== currentLevel) {
      return [...this.logs, {
        timestamp: Date.now(),
        level: currentLevel,
        isDecay: true
      }];
    }

    return this.logs;
  }

  getStats(): UserStats {
    this.stats.currentDopamine = this.getCurrentDopamine();
    return { ...this.stats };
  }

  getTodayStats() {
    const today = new Date().setHours(0, 0, 0, 0);
    const todayLogs = this.logs.filter(log => log.timestamp >= today && log.activity);

    const goodActivities = todayLogs.filter(log => log.activity?.type === 'good');
    const badActivities = todayLogs.filter(log => log.activity?.type === 'bad');

    const dopamineGained = goodActivities.reduce((sum, log) => sum + (log.activity?.dopamineImpact || 0), 0);
    const dopamineLost = badActivities.reduce((sum, log) => sum + (log.activity?.crashAmount || 0), 0);

    return {
      goodActivitiesCount: goodActivities.length,
      badActivitiesCount: badActivities.length,
      dopamineGained,
      dopamineLost,
      netBalance: dopamineGained - dopamineLost,
      totalActivities: todayLogs.length
    };
  }

  reset() {
    this.logs = [{
      timestamp: Date.now(),
      level: BASELINE,
      isDecay: false
    }];
    this.stats = {
      currentDopamine: BASELINE,
      totalXP: 0,
      currentStreak: 0,
      longestStreak: 0,
      activitiesCompleted: 0,
      lastActivityDate: new Date().toDateString()
    };
    this.saveToStorage();
  }
}

export const dopamineEngine = new DopamineEngine();
