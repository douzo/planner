// Local Storage utilities for data persistence

const STORAGE_KEYS = {
  HOUSEHOLD_MEMBERS: 'householdMembers',
  SELECTED_TASKS: 'selectedTasks',
  TASK_FREQUENCIES: 'taskFrequencies',
  GENERATED_SCHEDULE: 'generatedSchedule',
  CUSTOM_TASKS: 'customTasks',
  CURRENT_MONTH: 'currentMonth',
  CURRENT_YEAR: 'currentYear'
};

// Generic storage functions
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage: ${error}`);
    return false;
  }
};

export const getItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage: ${error}`);
    return defaultValue;
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage: ${error}`);
    return false;
  }
};

export const clearAll = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error(`Error clearing localStorage: ${error}`);
    return false;
  }
};

// Household Members
export const saveHouseholdMembers = (members) => {
  return setItem(STORAGE_KEYS.HOUSEHOLD_MEMBERS, members);
};

export const getHouseholdMembers = () => {
  return getItem(STORAGE_KEYS.HOUSEHOLD_MEMBERS, []);
};

// Selected Tasks
export const saveSelectedTasks = (taskIds) => {
  return setItem(STORAGE_KEYS.SELECTED_TASKS, taskIds);
};

export const getSelectedTasks = () => {
  return getItem(STORAGE_KEYS.SELECTED_TASKS, []);
};

// Task Frequencies (custom overrides)
export const saveTaskFrequencies = (frequencies) => {
  return setItem(STORAGE_KEYS.TASK_FREQUENCIES, frequencies);
};

export const getTaskFrequencies = () => {
  return getItem(STORAGE_KEYS.TASK_FREQUENCIES, {});
};

// Generated Schedule
export const saveGeneratedSchedule = (schedule) => {
  return setItem(STORAGE_KEYS.GENERATED_SCHEDULE, schedule);
};

export const getGeneratedSchedule = () => {
  return getItem(STORAGE_KEYS.GENERATED_SCHEDULE, []);
};

// Custom Tasks
export const saveCustomTasks = (tasks) => {
  return setItem(STORAGE_KEYS.CUSTOM_TASKS, tasks);
};

export const getCustomTasks = () => {
  return getItem(STORAGE_KEYS.CUSTOM_TASKS, []);
};

// Current Month/Year
export const saveCurrentMonth = (month) => {
  return setItem(STORAGE_KEYS.CURRENT_MONTH, month);
};

export const getCurrentMonth = () => {
  return getItem(STORAGE_KEYS.CURRENT_MONTH, new Date().getMonth());
};

export const saveCurrentYear = (year) => {
  return setItem(STORAGE_KEYS.CURRENT_YEAR, year);
};

export const getCurrentYear = () => {
  return getItem(STORAGE_KEYS.CURRENT_YEAR, new Date().getFullYear());
};

// Check if storage is available and has space
export const checkStorageAvailability = () => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

// Get approximate storage usage
export const getStorageUsage = () => {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return {
    used: total,
    usedKB: (total / 1024).toFixed(2),
    usedMB: (total / 1024 / 1024).toFixed(2)
  };
};

export default {
  saveHouseholdMembers,
  getHouseholdMembers,
  saveSelectedTasks,
  getSelectedTasks,
  saveTaskFrequencies,
  getTaskFrequencies,
  saveGeneratedSchedule,
  getGeneratedSchedule,
  saveCustomTasks,
  getCustomTasks,
  saveCurrentMonth,
  getCurrentMonth,
  saveCurrentYear,
  getCurrentYear,
  clearAll,
  checkStorageAvailability,
  getStorageUsage
};
