// Smart Schedule Generation Algorithm

import { TASK_FREQUENCIES } from '../data/tasks';

/**
 * Generate a unique ID for a schedule item
 */
const generateScheduleId = (taskId, date) => {
  return `${taskId}-${date.getTime()}`;
};

/**
 * Get the number of days in a month
 */
const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Calculate dates for a task based on its frequency
 */
const calculateTaskDates = (frequency, month, year) => {
  const dates = [];
  const daysInMonth = getDaysInMonth(month, year);

  switch (frequency) {
    case TASK_FREQUENCIES.DAILY:
      // Every day of the month
      for (let day = 1; day <= daysInMonth; day++) {
        dates.push(new Date(year, month, day));
      }
      break;

    case TASK_FREQUENCIES.WEEKLY:
      // Once per week (approximately every 7 days)
      for (let day = 1; day <= daysInMonth; day += 7) {
        dates.push(new Date(year, month, day));
      }
      break;

    case TASK_FREQUENCIES.BI_WEEKLY:
      // Every 14 days
      for (let day = 1; day <= daysInMonth; day += 14) {
        dates.push(new Date(year, month, day));
      }
      break;

    case TASK_FREQUENCIES.MONTHLY:
      // Once in the month (on the 1st)
      dates.push(new Date(year, month, 1));
      break;

    case TASK_FREQUENCIES.QUARTERLY:
      // Only in months 1, 4, 7, 10 (Jan, Apr, Jul, Oct)
      if ([0, 3, 6, 9].includes(month)) {
        dates.push(new Date(year, month, 1));
      }
      break;

    default:
      console.warn(`Unknown frequency: ${frequency}`);
  }

  return dates;
};

/**
 * Randomly assign a task to a household member
 */
const assignRandomMember = (members) => {
  if (!members || members.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * members.length);
  return members[randomIndex];
};

/**
 * Generate a complete schedule for a month
 *
 * @param {Array} tasks - Array of task objects with their frequencies
 * @param {Array} householdMembers - Array of household member objects
 * @param {number} month - Month (0-11)
 * @param {number} year - Year (e.g., 2025)
 * @returns {Array} Array of schedule items
 */
export const generateMonthlySchedule = (tasks, householdMembers, month, year) => {
  const schedule = [];

  if (!tasks || tasks.length === 0) {
    console.warn('No tasks provided for schedule generation');
    return schedule;
  }

  if (!householdMembers || householdMembers.length === 0) {
    console.warn('No household members provided for schedule generation');
    return schedule;
  }

  // Generate schedule items for each task
  tasks.forEach(task => {
    const dates = calculateTaskDates(task.frequency, month, year);

    dates.forEach(date => {
      const scheduleItem = {
        id: generateScheduleId(task.id, date),
        taskId: task.id,
        task: task,
        date: date.toISOString(),
        completed: false,
        assignedTo: assignRandomMember(householdMembers)
      };

      schedule.push(scheduleItem);
    });
  });

  // Sort schedule by date
  schedule.sort((a, b) => new Date(a.date) - new Date(b.date));

  return schedule;
};

/**
 * Get schedule items for a specific date
 */
export const getScheduleForDate = (schedule, date) => {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  return schedule.filter(item => {
    const itemDate = new Date(item.date);
    itemDate.setHours(0, 0, 0, 0);
    return itemDate.getTime() === targetDate.getTime();
  });
};

/**
 * Get completion statistics for a schedule
 */
export const getCompletionStats = (schedule) => {
  const total = schedule.length;
  const completed = schedule.filter(item => item.completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    incomplete: total - completed,
    percentage
  };
};

/**
 * Toggle completion status of a schedule item
 */
export const toggleCompletion = (schedule, scheduleItemId) => {
  return schedule.map(item => {
    if (item.id === scheduleItemId) {
      return {
        ...item,
        completed: !item.completed
      };
    }
    return item;
  });
};

/**
 * Group schedule by date for calendar view
 */
export const groupScheduleByDate = (schedule) => {
  const grouped = {};

  schedule.forEach(item => {
    const dateKey = new Date(item.date).toDateString();
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(item);
  });

  return grouped;
};

/**
 * Get month name from number
 */
export const getMonthName = (month) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames[month];
};

/**
 * Get calendar grid data for a month
 * Returns array of weeks, each containing 7 days
 */
export const getCalendarGrid = (month, year) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday

  const weeks = [];
  let currentWeek = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    currentWeek.push(null);
  }

  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(new Date(year, month, day));

    // If week is complete (7 days), push it and start new week
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Fill remaining cells in last week
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return weeks;
};

export default {
  generateMonthlySchedule,
  getScheduleForDate,
  getCompletionStats,
  toggleCompletion,
  groupScheduleByDate,
  getMonthName,
  getCalendarGrid
};
