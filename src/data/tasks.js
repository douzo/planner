// Task Library - 35+ predefined tasks organized by category

export const TASK_CATEGORIES = {
  PERSONAL_CARE: 'Personal Care',
  CLEANING: 'Cleaning',
  KITCHEN: 'Kitchen',
  BEDROOM: 'Bedroom',
  SHOPPING: 'Shopping',
  VEHICLE: 'Vehicle',
  HEALTH: 'Health',
  ADMINISTRATIVE: 'Administrative',
  SOCIAL: 'Social',
  HOME_GARDEN: 'Home & Garden',
  PET_CARE: 'Pet Care',
  FINANCIAL: 'Financial',
  SAFETY: 'Safety',
  ORGANIZATION: 'Home Organization',
  WORK_OTHER: 'Work/Other'
};

export const TASK_FREQUENCIES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  BI_WEEKLY: 'bi-weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly'
};

export const TASK_DURATIONS = [
  '5 min',
  '10 min',
  '15 min',
  '20 min',
  '30 min',
  '45 min',
  '60 min',
  '90 min',
  '120 min'
];

export const TASK_PRIORITIES = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};

// Predefined tasks library
export const PREDEFINED_TASKS = [
  // Daily Tasks
  {
    id: 1,
    name: 'Water plants',
    category: TASK_CATEGORIES.HOME_GARDEN,
    frequency: TASK_FREQUENCIES.DAILY,
    duration: '5 min',
    icon: '🌱',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'WAT'
  },
  {
    id: 2,
    name: 'Make bed',
    category: TASK_CATEGORIES.BEDROOM,
    frequency: TASK_FREQUENCIES.DAILY,
    duration: '5 min',
    icon: '🛏️',
    priority: TASK_PRIORITIES.LOW,
    abbreviation: 'BED'
  },
  {
    id: 3,
    name: 'Check emails',
    category: TASK_CATEGORIES.ADMINISTRATIVE,
    frequency: TASK_FREQUENCIES.DAILY,
    duration: '15 min',
    icon: '📧',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'EML'
  },
  {
    id: 4,
    name: 'Take vitamins',
    category: TASK_CATEGORIES.HEALTH,
    frequency: TASK_FREQUENCIES.DAILY,
    duration: '5 min',
    icon: '💊',
    priority: TASK_PRIORITIES.HIGH,
    abbreviation: 'VIT'
  },
  {
    id: 5,
    name: 'Feed pets',
    category: TASK_CATEGORIES.PET_CARE,
    frequency: TASK_FREQUENCIES.DAILY,
    duration: '10 min',
    icon: '🐕',
    priority: TASK_PRIORITIES.HIGH,
    abbreviation: 'PET'
  },

  // Weekly Tasks
  {
    id: 6,
    name: 'Clean bathroom',
    category: TASK_CATEGORIES.CLEANING,
    frequency: TASK_FREQUENCIES.WEEKLY,
    duration: '30 min',
    icon: '🚿',
    priority: TASK_PRIORITIES.HIGH,
    abbreviation: 'BTH'
  },
  {
    id: 7,
    name: 'Do laundry',
    category: TASK_CATEGORIES.CLEANING,
    frequency: TASK_FREQUENCIES.WEEKLY,
    duration: '60 min',
    icon: '👕',
    priority: TASK_PRIORITIES.HIGH,
    abbreviation: 'LAU'
  },
  {
    id: 8,
    name: 'Vacuum house',
    category: TASK_CATEGORIES.CLEANING,
    frequency: TASK_FREQUENCIES.WEEKLY,
    duration: '30 min',
    icon: '🧹',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'VAC'
  },
  {
    id: 9,
    name: 'Grocery shopping',
    category: TASK_CATEGORIES.SHOPPING,
    frequency: TASK_FREQUENCIES.WEEKLY,
    duration: '60 min',
    icon: '🛒',
    priority: TASK_PRIORITIES.HIGH,
    abbreviation: 'GRO'
  },
  {
    id: 10,
    name: 'Clean kitchen deep',
    category: TASK_CATEGORIES.KITCHEN,
    frequency: TASK_FREQUENCIES.WEEKLY,
    duration: '45 min',
    icon: '🍽️',
    priority: TASK_PRIORITIES.HIGH,
    abbreviation: 'KIT'
  },
  {
    id: 11,
    name: 'Mop floors',
    category: TASK_CATEGORIES.CLEANING,
    frequency: TASK_FREQUENCIES.WEEKLY,
    duration: '30 min',
    icon: '🧽',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'MOP'
  },
  {
    id: 12,
    name: 'Change bed sheets',
    category: TASK_CATEGORIES.BEDROOM,
    frequency: TASK_FREQUENCIES.WEEKLY,
    duration: '15 min',
    icon: '🛏️',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'SHT'
  },
  {
    id: 13,
    name: 'Take out trash',
    category: TASK_CATEGORIES.CLEANING,
    frequency: TASK_FREQUENCIES.WEEKLY,
    duration: '5 min',
    icon: '🗑️',
    priority: TASK_PRIORITIES.HIGH,
    abbreviation: 'TRS'
  },
  {
    id: 14,
    name: 'Water plants deeply',
    category: TASK_CATEGORIES.HOME_GARDEN,
    frequency: TASK_FREQUENCIES.WEEKLY,
    duration: '15 min',
    icon: '💧',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'WTR'
  },
  {
    id: 15,
    name: 'Call parents/family',
    category: TASK_CATEGORIES.SOCIAL,
    frequency: TASK_FREQUENCIES.WEEKLY,
    duration: '30 min',
    icon: '📞',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'CAL'
  },

  // Bi-Weekly Tasks
  {
    id: 16,
    name: 'Cut nails',
    category: TASK_CATEGORIES.PERSONAL_CARE,
    frequency: TASK_FREQUENCIES.BI_WEEKLY,
    duration: '15 min',
    icon: '💅',
    priority: TASK_PRIORITIES.LOW,
    abbreviation: 'NAI'
  },
  {
    id: 17,
    name: 'Deep clean car',
    category: TASK_CATEGORIES.VEHICLE,
    frequency: TASK_FREQUENCIES.BI_WEEKLY,
    duration: '60 min',
    icon: '🚗',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'CAR'
  },
  {
    id: 18,
    name: 'Organize wardrobe',
    category: TASK_CATEGORIES.ORGANIZATION,
    frequency: TASK_FREQUENCIES.BI_WEEKLY,
    duration: '45 min',
    icon: '👔',
    priority: TASK_PRIORITIES.LOW,
    abbreviation: 'WAR'
  },

  // Monthly Tasks
  {
    id: 19,
    name: 'Pay bills',
    category: TASK_CATEGORIES.FINANCIAL,
    frequency: TASK_FREQUENCIES.MONTHLY,
    duration: '30 min',
    icon: '💳',
    priority: TASK_PRIORITIES.HIGH,
    abbreviation: 'BIL'
  },
  {
    id: 20,
    name: 'Car service/check',
    category: TASK_CATEGORIES.VEHICLE,
    frequency: TASK_FREQUENCIES.MONTHLY,
    duration: '120 min',
    icon: '🔧',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'SRV'
  },
  {
    id: 21,
    name: 'Buy toiletries',
    category: TASK_CATEGORIES.SHOPPING,
    frequency: TASK_FREQUENCIES.MONTHLY,
    duration: '30 min',
    icon: '🧴',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'TOI'
  },
  {
    id: 22,
    name: 'Buy household essentials',
    category: TASK_CATEGORIES.SHOPPING,
    frequency: TASK_FREQUENCIES.MONTHLY,
    duration: '30 min',
    icon: '🧽',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'ESS'
  },
  {
    id: 23,
    name: 'Deep clean refrigerator',
    category: TASK_CATEGORIES.KITCHEN,
    frequency: TASK_FREQUENCIES.MONTHLY,
    duration: '45 min',
    icon: '❄️',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'FRG'
  },
  {
    id: 24,
    name: 'Check mailbox thoroughly',
    category: TASK_CATEGORIES.ADMINISTRATIVE,
    frequency: TASK_FREQUENCIES.MONTHLY,
    duration: '15 min',
    icon: '📮',
    priority: TASK_PRIORITIES.LOW,
    abbreviation: 'MAI'
  },
  {
    id: 25,
    name: 'Haircut',
    category: TASK_CATEGORIES.PERSONAL_CARE,
    frequency: TASK_FREQUENCIES.MONTHLY,
    duration: '60 min',
    icon: '✂️',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'HAR'
  },
  {
    id: 26,
    name: 'Replace toothbrush',
    category: TASK_CATEGORIES.PERSONAL_CARE,
    frequency: TASK_FREQUENCIES.MONTHLY,
    duration: '5 min',
    icon: '🪥',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'TBR'
  },
  {
    id: 27,
    name: 'Clean mirrors & windows',
    category: TASK_CATEGORIES.CLEANING,
    frequency: TASK_FREQUENCIES.MONTHLY,
    duration: '30 min',
    icon: '🪟',
    priority: TASK_PRIORITIES.LOW,
    abbreviation: 'MIR'
  },
  {
    id: 28,
    name: 'Organize digital photos',
    category: TASK_CATEGORIES.ADMINISTRATIVE,
    frequency: TASK_FREQUENCIES.MONTHLY,
    duration: '45 min',
    icon: '📸',
    priority: TASK_PRIORITIES.LOW,
    abbreviation: 'PHO'
  },
  {
    id: 29,
    name: 'Check tire pressure',
    category: TASK_CATEGORIES.VEHICLE,
    frequency: TASK_FREQUENCIES.MONTHLY,
    duration: '15 min',
    icon: '🛞',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'TIR'
  },

  // Quarterly Tasks
  {
    id: 30,
    name: 'Deep clean mattress',
    category: TASK_CATEGORIES.BEDROOM,
    frequency: TASK_FREQUENCIES.QUARTERLY,
    duration: '90 min',
    icon: '🛌',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'MAT'
  },
  {
    id: 31,
    name: 'Organize closet seasonally',
    category: TASK_CATEGORIES.ORGANIZATION,
    frequency: TASK_FREQUENCIES.QUARTERLY,
    duration: '120 min',
    icon: '🧥',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'CLO'
  },
  {
    id: 32,
    name: 'Check smoke detectors',
    category: TASK_CATEGORIES.SAFETY,
    frequency: TASK_FREQUENCIES.QUARTERLY,
    duration: '20 min',
    icon: '🚨',
    priority: TASK_PRIORITIES.HIGH,
    abbreviation: 'SMO'
  },
  {
    id: 33,
    name: 'Deep clean oven',
    category: TASK_CATEGORIES.KITCHEN,
    frequency: TASK_FREQUENCIES.QUARTERLY,
    duration: '90 min',
    icon: '🔥',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'OVN'
  },
  {
    id: 34,
    name: 'Declutter storage areas',
    category: TASK_CATEGORIES.ORGANIZATION,
    frequency: TASK_FREQUENCIES.QUARTERLY,
    duration: '120 min',
    icon: '📦',
    priority: TASK_PRIORITIES.LOW,
    abbreviation: 'DEC'
  },
  {
    id: 35,
    name: 'HVAC filter replacement',
    category: TASK_CATEGORIES.SAFETY,
    frequency: TASK_FREQUENCIES.QUARTERLY,
    duration: '15 min',
    icon: '🌡️',
    priority: TASK_PRIORITIES.MEDIUM,
    abbreviation: 'HVA'
  }
];

// Helper function to get tasks by category
export const getTasksByCategory = (category) => {
  return PREDEFINED_TASKS.filter(task => task.category === category);
};

// Helper function to get tasks by frequency
export const getTasksByFrequency = (frequency) => {
  return PREDEFINED_TASKS.filter(task => task.frequency === frequency);
};

// Helper function to generate abbreviation from task name
export const generateAbbreviation = (taskName) => {
  const words = taskName.split(' ');
  if (words.length >= 3) {
    return words.slice(0, 3).map(w => w[0].toUpperCase()).join('');
  } else if (words.length === 2) {
    return (words[0][0] + words[0][1] + words[1][0]).toUpperCase();
  } else {
    return words[0].slice(0, 3).toUpperCase();
  }
};
