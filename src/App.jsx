import React, { useState, useEffect } from 'react';
import HouseholdSetup from './components/HouseholdSetup';
import TaskSelection from './components/TaskSelection';
import CalendarView from './components/CalendarView';
import DayModal from './components/DayModal';
import Logo from './components/Logo';
import {
  getHouseholdMembers,
  saveHouseholdMembers,
  getSelectedTasks,
  saveSelectedTasks,
  getTaskFrequencies,
  saveTaskFrequencies,
  getGeneratedSchedule,
  saveGeneratedSchedule,
  getCustomTasks,
  saveCustomTasks,
  getCurrentMonth,
  getCurrentYear,
  saveCurrentMonth,
  saveCurrentYear
} from './utils/storage';
import { generateMonthlySchedule, getScheduleForDate, toggleCompletion } from './utils/scheduleGenerator';
import { PREDEFINED_TASKS } from './data/tasks';

const STEPS = {
  HOUSEHOLD: 'household',
  TASKS: 'tasks',
  CALENDAR: 'calendar'
};

function App() {
  // State
  const [currentStep, setCurrentStep] = useState(STEPS.HOUSEHOLD);
  const [householdMembers, setHouseholdMembers] = useState([]);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [customFrequencies, setCustomFrequencies] = useState({});
  const [customTasks, setCustomTasks] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDayModal, setShowDayModal] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedMembers = getHouseholdMembers();
    const savedTasks = getSelectedTasks();
    const savedFrequencies = getTaskFrequencies();
    const savedCustomTasks = getCustomTasks();
    const savedSchedule = getGeneratedSchedule();
    const savedMonth = getCurrentMonth();
    const savedYear = getCurrentYear();

    if (savedMembers.length > 0) {
      setHouseholdMembers(savedMembers);
    }

    if (savedTasks.length > 0) {
      setSelectedTaskIds(savedTasks);
    }

    if (Object.keys(savedFrequencies).length > 0) {
      setCustomFrequencies(savedFrequencies);
    }

    if (savedCustomTasks.length > 0) {
      setCustomTasks(savedCustomTasks);
    }

    if (savedSchedule.length > 0) {
      setSchedule(savedSchedule);
      setCurrentStep(STEPS.CALENDAR);
    } else if (savedMembers.length > 0 && savedTasks.length > 0) {
      setCurrentStep(STEPS.TASKS);
    }

    setCurrentMonth(savedMonth);
    setCurrentYear(savedYear);
  }, []);

  // Handlers
  const handleMembersChange = (members) => {
    setHouseholdMembers(members);
    saveHouseholdMembers(members);
  };

  const handleSelectedTasksChange = (taskIds) => {
    setSelectedTaskIds(taskIds);
    saveSelectedTasks(taskIds);
  };

  const handleFrequencyChange = (taskId, frequency) => {
    const newFrequencies = { ...customFrequencies, [taskId]: frequency };
    setCustomFrequencies(newFrequencies);
    saveTaskFrequencies(newFrequencies);
  };

  const handleGenerateSchedule = () => {
    // Get all tasks (predefined + custom) that are selected
    const allTasks = [...PREDEFINED_TASKS, ...customTasks];
    const tasksToSchedule = allTasks
      .filter(task => selectedTaskIds.includes(task.id))
      .map(task => ({
        ...task,
        frequency: customFrequencies[task.id] || task.frequency
      }));

    // Generate schedule
    const newSchedule = generateMonthlySchedule(
      tasksToSchedule,
      householdMembers,
      currentMonth,
      currentYear
    );

    setSchedule(newSchedule);
    saveGeneratedSchedule(newSchedule);
    setCurrentStep(STEPS.CALENDAR);
  };

  const handleMonthChange = (month, year) => {
    setCurrentMonth(month);
    setCurrentYear(year);
    saveCurrentMonth(month);
    saveCurrentYear(year);

    // Regenerate schedule for new month
    const allTasks = [...PREDEFINED_TASKS, ...customTasks];
    const tasksToSchedule = allTasks
      .filter(task => selectedTaskIds.includes(task.id))
      .map(task => ({
        ...task,
        frequency: customFrequencies[task.id] || task.frequency
      }));

    const newSchedule = generateMonthlySchedule(
      tasksToSchedule,
      householdMembers,
      month,
      year
    );

    setSchedule(newSchedule);
    saveGeneratedSchedule(newSchedule);
  };

  const handleTaskComplete = (scheduleItemId) => {
    const newSchedule = toggleCompletion(schedule, scheduleItemId);
    setSchedule(newSchedule);
    saveGeneratedSchedule(newSchedule);
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setShowDayModal(true);
  };

  const handleCustomTaskAdd = (newTask) => {
    const updatedCustomTasks = [...customTasks, newTask];
    setCustomTasks(updatedCustomTasks);
    saveCustomTasks(updatedCustomTasks);
  };

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case STEPS.HOUSEHOLD:
        return (
          <HouseholdSetup
            members={householdMembers}
            onMembersChange={handleMembersChange}
            onNext={() => setCurrentStep(STEPS.TASKS)}
          />
        );

      case STEPS.TASKS:
        return (
          <TaskSelection
            selectedTasks={selectedTaskIds}
            onSelectedTasksChange={handleSelectedTasksChange}
            customFrequencies={customFrequencies}
            onFrequencyChange={handleFrequencyChange}
            customTasks={customTasks}
            onCustomTaskAdd={handleCustomTaskAdd}
            onNext={handleGenerateSchedule}
            onBack={() => setCurrentStep(STEPS.HOUSEHOLD)}
          />
        );

      case STEPS.CALENDAR:
        return (
          <>
            <CalendarView
              month={currentMonth}
              year={currentYear}
              schedule={schedule}
              householdMembers={householdMembers}
              onMonthChange={handleMonthChange}
              onTaskComplete={handleTaskComplete}
              onDayClick={handleDayClick}
            />
            {showDayModal && selectedDate && (
              <DayModal
                date={selectedDate}
                items={getScheduleForDate(schedule, selectedDate)}
                onClose={() => setShowDayModal(false)}
                onToggleComplete={handleTaskComplete}
              />
            )}
          </>
        );

      default:
        return null;
    }
  };

  const handleHomeClick = () => {
    if (currentStep !== STEPS.HOUSEHOLD) {
      const message = schedule.length > 0
        ? 'Go to home? Your current schedule will be saved.'
        : 'Go to home?';
      if (window.confirm(message)) {
        setCurrentStep(STEPS.HOUSEHOLD);
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-bg">
      {/* Header */}
      <header className="bg-white border-b border-neutral-border py-4 px-4 md:px-8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={handleHomeClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            aria-label="Go to home"
          >
            <Logo size={32} />
            <h1 style={{
              fontSize: '20px',
              fontWeight: '300',
              color: '#1D1D1F',
              margin: 0
            }}
            className="hidden sm:block"
            >
              Smart Life Planner
            </h1>
          </button>
          {currentStep === STEPS.CALENDAR && (
            <button
              onClick={() => {
                if (window.confirm('Start over? Your current schedule will be saved.')) {
                  setCurrentStep(STEPS.HOUSEHOLD);
                }
              }}
              style={{
                fontSize: '14px',
                color: '#007AFF',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 12px',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Edit Setup
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-73px)]">
        {renderStep()}
      </main>
    </div>
  );
}

export default App;
