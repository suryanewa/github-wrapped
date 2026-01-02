/**
 * Developer Archetype Computation
 * Analyzes activity patterns to assign personality archetypes
 */

interface ArchetypeInput {
  totalEvents: number;
  uniqueDays: number;
  repoCount: number;
  eventsByHour: Record<number, number>;
  eventsByDay: Record<string, number>;
  weekendRatio: number;
  languageDiversity: number;
}

interface Archetype {
  name: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
}

const ARCHETYPES: Record<string, Archetype> = {
  // High activity, broad focus
  full_stack_sprinter: {
    name: 'Full-Stack Sprinter',
    description: 'High velocity across many projects',
    rarity: 'uncommon',
  },

  // High activity, deep focus
  night_owl_architect: {
    name: 'Night Owl Architect',
    description: 'Deep focus, late-night momentum',
    rarity: 'uncommon',
  },

  // Consistent weekday worker
  steady_contributor: {
    name: 'Steady Contributor',
    description: 'Reliable weekday rhythm',
    rarity: 'common',
  },

  // Weekend warrior
  weekend_builder: {
    name: 'Weekend Builder',
    description: 'Side projects on Saturday and Sunday',
    rarity: 'uncommon',
  },

  // Morning person
  early_bird_engineer: {
    name: 'Early Bird Engineer',
    description: 'Fresh code with morning coffee',
    rarity: 'uncommon',
  },

  // Focused on one project
  deep_diver: {
    name: 'Deep Diver',
    description: 'Laser focus on mastering one domain',
    rarity: 'rare',
  },

  // Multi-language explorer
  polyglot_explorer: {
    name: 'Polyglot Explorer',
    description: 'Learning through diverse languages',
    rarity: 'rare',
  },

  // Consistent high output
  consistent_craftsperson: {
    name: 'Consistent Craftsperson',
    description: 'Steady, daily craftsmanship',
    rarity: 'uncommon',
  },

  // Bursty activity
  sprint_committer: {
    name: 'Sprint Committer',
    description: 'Intense bursts of productivity',
    rarity: 'common',
  },

  // Low activity, quality focused
  precision_contributor: {
    name: 'Precision Contributor',
    description: 'Quality over quantity',
    rarity: 'common',
  },

  // The experimenter
  experimental_builder: {
    name: 'Experimental Builder',
    description: 'Exploring, learning, building when inspiration strikes',
    rarity: 'common',
  },
};

function getPeakHour(eventsByHour: Record<number, number>): number {
  let maxHour = 12;
  let maxCount = 0;

  for (const [hour, count] of Object.entries(eventsByHour)) {
    if (count > maxCount) {
      maxCount = count;
      maxHour = parseInt(hour);
    }
  }

  return maxHour;
}

function calculateConsistency(uniqueDays: number, totalDays: number = 365): number {
  return uniqueDays / totalDays;
}

function calculateBurstiness(eventsByDay: Record<string, number>): number {
  const counts = Object.values(eventsByDay);
  if (counts.length === 0) return 0;

  const mean = counts.reduce((a, b) => a + b, 0) / counts.length;
  const variance = counts.reduce((acc, count) => acc + Math.pow(count - mean, 2), 0) / counts.length;
  const stdDev = Math.sqrt(variance);

  // Coefficient of variation as burstiness measure
  return mean === 0 ? 0 : stdDev / mean;
}

export function calculateArchetype(input: ArchetypeInput): Archetype {
  const {
    totalEvents,
    uniqueDays,
    repoCount,
    eventsByHour,
    eventsByDay,
    weekendRatio,
    languageDiversity,
  } = input;

  // Handle low activity
  if (totalEvents < 50) {
    if (languageDiversity > 3) {
      return ARCHETYPES.experimental_builder;
    }
    return ARCHETYPES.precision_contributor;
  }

  const peakHour = getPeakHour(eventsByHour);
  const consistency = calculateConsistency(uniqueDays);
  const burstiness = calculateBurstiness(eventsByDay);

  // Language diversity check
  if (languageDiversity >= 5) {
    return ARCHETYPES.polyglot_explorer;
  }

  // Deep focus on one project
  if (repoCount <= 2 && totalEvents > 100) {
    return ARCHETYPES.deep_diver;
  }

  // Weekend warrior
  if (weekendRatio > 0.4) {
    return ARCHETYPES.weekend_builder;
  }

  // Night owl (peak between 10 PM and 4 AM)
  if (peakHour >= 22 || peakHour <= 4) {
    return ARCHETYPES.night_owl_architect;
  }

  // Early bird (peak between 5 AM and 9 AM)
  if (peakHour >= 5 && peakHour <= 9) {
    return ARCHETYPES.early_bird_engineer;
  }

  // High consistency (active most days)
  if (consistency > 0.7) {
    return ARCHETYPES.consistent_craftsperson;
  }

  // Bursty pattern
  if (burstiness > 1.5) {
    return ARCHETYPES.sprint_committer;
  }

  // High activity, broad repos
  if (totalEvents > 500 && repoCount > 10) {
    return ARCHETYPES.full_stack_sprinter;
  }

  // Default
  return ARCHETYPES.steady_contributor;
}
