import { ActivityPreset } from '../types';

export const activityPresets: ActivityPreset[] = [
  {
    name: 'Workout',
    type: 'good',
    dopamineImpact: 150,
    duration: 180,
    peakTime: 30,
    xpReward: 100,
    category: 'Exercise',
    keywords: ['workout', 'exercise', 'gym', 'run', 'jog', 'fitness', 'training'],
    brainRegions: ['Ventral Tegmental Area (VTA)', 'Nucleus Accumbens', 'Prefrontal Cortex'],
    pathway: 'Mesolimbic & Mesocortical Pathways',
    mechanism: 'Exercise increases dopamine receptor availability and promotes neuroplasticity',
    description: 'Physical exercise naturally elevates dopamine levels and improves receptor sensitivity, leading to sustained motivation and mood enhancement.'
  },
  {
    name: 'Meditation',
    type: 'good',
    dopamineImpact: 120,
    duration: 240,
    peakTime: 60,
    xpReward: 80,
    category: 'Mindfulness',
    keywords: ['meditate', 'meditation', 'mindfulness', 'breathe', 'zen'],
    brainRegions: ['Prefrontal Cortex', 'Anterior Cingulate Cortex', 'Insula'],
    pathway: 'Default Mode Network',
    mechanism: 'Meditation enhances dopamine regulation and strengthens prefrontal control over limbic responses',
    description: 'Mindfulness practices promote balanced dopamine function and improve emotional regulation through enhanced neural connectivity.'
  },
  {
    name: 'Deep Work',
    type: 'good',
    dopamineImpact: 130,
    duration: 200,
    peakTime: 45,
    xpReward: 120,
    category: 'Productivity',
    keywords: ['study', 'work', 'deep work', 'focus', 'reading', 'learning', 'coding', 'writing'],
    brainRegions: ['Dorsolateral Prefrontal Cortex', 'Anterior Cingulate', 'Basal Ganglia'],
    pathway: 'Mesocortical Pathway',
    mechanism: 'Focused cognitive work activates reward circuits through accomplishment and mastery',
    description: 'Deep focused work creates sustained dopamine release through progressive goal achievement and skill development.'
  },
  {
    name: 'Cold Shower',
    type: 'good',
    dopamineImpact: 100,
    duration: 150,
    peakTime: 20,
    xpReward: 70,
    category: 'Wellness',
    keywords: ['cold shower', 'ice bath', 'cold plunge']
  },
  {
    name: 'Healthy Meal',
    type: 'good',
    dopamineImpact: 80,
    duration: 120,
    peakTime: 30,
    xpReward: 50,
    category: 'Nutrition',
    keywords: ['healthy meal', 'vegetables', 'protein', 'nutritious', 'salad']
  },
  {
    name: 'Social Connection',
    type: 'good',
    dopamineImpact: 110,
    duration: 180,
    peakTime: 40,
    xpReward: 90,
    category: 'Social',
    keywords: ['friends', 'family', 'social', 'conversation', 'hangout', 'quality time']
  },
  {
    name: 'Social Media Scrolling',
    type: 'bad',
    dopamineImpact: 180,
    duration: 60,
    peakTime: 5,
    crashAmount: 250,
    xpReward: -50,
    category: 'Digital',
    keywords: ['scroll', 'social media', 'instagram', 'tiktok', 'twitter', 'facebook', 'feed'],
    brainRegions: ['Nucleus Accumbens', 'Amygdala', 'Ventral Striatum'],
    pathway: 'Mesolimbic Pathway (Overstimulation)',
    mechanism: 'Rapid variable rewards cause dopamine spikes followed by receptor downregulation',
    description: 'Infinite scroll and variable reward patterns create unsustainable dopamine surges, leading to tolerance and reduced baseline motivation.'
  },
  {
    name: 'Video Games',
    type: 'bad',
    dopamineImpact: 200,
    duration: 45,
    peakTime: 10,
    crashAmount: 300,
    xpReward: -80,
    category: 'Entertainment',
    keywords: ['game', 'gaming', 'video game', 'play', 'xbox', 'playstation', 'pc game'],
    brainRegions: ['Nucleus Accumbens', 'Striatum', 'Prefrontal Cortex'],
    pathway: 'Reward Circuit (Hyperactivation)',
    mechanism: 'Gaming triggers rapid dopamine release through frequent rewards, leading to tolerance',
    description: 'Video games provide intense but artificial reward signals that can dysregulate natural dopamine responses and reduce real-world motivation.'
  },
  {
    name: 'Junk Food',
    type: 'bad',
    dopamineImpact: 150,
    duration: 40,
    peakTime: 5,
    crashAmount: 200,
    xpReward: -40,
    category: 'Food',
    keywords: ['junk food', 'fast food', 'chips', 'candy', 'soda', 'sugar', 'sweets', 'pizza', 'burger']
  },
  {
    name: 'Binge Watching',
    type: 'bad',
    dopamineImpact: 170,
    duration: 50,
    peakTime: 8,
    crashAmount: 280,
    xpReward: -70,
    category: 'Entertainment',
    keywords: ['binge', 'netflix', 'tv show', 'series', 'movie marathon', 'watch']
  },
  {
    name: 'Pornography',
    type: 'bad',
    dopamineImpact: 250,
    duration: 30,
    peakTime: 5,
    crashAmount: 400,
    xpReward: -120,
    category: 'Digital',
    keywords: ['porn', 'pornography', 'adult content']
  },
  {
    name: 'Online Shopping Spree',
    type: 'bad',
    dopamineImpact: 160,
    duration: 55,
    peakTime: 10,
    crashAmount: 220,
    xpReward: -60,
    category: 'Consumption',
    keywords: ['shopping', 'online shopping', 'buying', 'purchase', 'impulse buy']
  }
];

export const matchActivity = (input: string): ActivityPreset | null => {
  const lowerInput = input.toLowerCase();

  for (const preset of activityPresets) {
    for (const keyword of preset.keywords) {
      if (lowerInput.includes(keyword)) {
        return preset;
      }
    }
  }

  return null;
};
