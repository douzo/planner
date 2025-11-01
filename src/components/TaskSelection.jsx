import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, ChevronDown, Filter, X } from 'lucide-react';
import Button from './Button';
import { PREDEFINED_TASKS, TASK_CATEGORIES, TASK_FREQUENCIES } from '../data/tasks';

const TaskCard = ({ task, isSelected, onToggle, onFrequencyChange, customFrequency }) => {
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);
  const currentFrequency = customFrequency || task.frequency;

  const frequencyLabels = {
    [TASK_FREQUENCIES.DAILY]: 'Daily',
    [TASK_FREQUENCIES.WEEKLY]: 'Weekly',
    [TASK_FREQUENCIES.BI_WEEKLY]: 'Bi-weekly',
    [TASK_FREQUENCIES.MONTHLY]: 'Monthly',
    [TASK_FREQUENCIES.QUARTERLY]: 'Quarterly'
  };

  const frequencyColors = {
    [TASK_FREQUENCIES.DAILY]: 'bg-ios-blue',
    [TASK_FREQUENCIES.WEEKLY]: 'bg-ios-green',
    [TASK_FREQUENCIES.BI_WEEKLY]: 'bg-ios-cyan',
    [TASK_FREQUENCIES.MONTHLY]: 'bg-ios-orange',
    [TASK_FREQUENCIES.QUARTERLY]: 'bg-ios-purple'
  };

  return (
    <div
      className={`
        relative p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md
        ${isSelected ? 'border-ios-blue bg-ios-blue/5' : 'border-neutral-border bg-white hover:border-ios-blue/30'}
      `}
      onClick={() => onToggle(task.id)}
    >
      {/* Selection Indicator */}
      <div className="absolute top-3 right-3">
        {isSelected && (
          <div className="w-6 h-6 bg-ios-blue rounded-full flex items-center justify-center animate-fade-in">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* Task Content */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl">{task.icon}</span>
        <div className="flex-1">
          <h4 className="font-medium text-neutral-text-primary">{task.name}</h4>
          <p className="text-sm text-neutral-text-secondary">{task.category}</p>
        </div>
      </div>

      {/* Task Info */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Frequency Badge */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowFrequencyDropdown(!showFrequencyDropdown);
            }}
            className={`
              px-2 py-1 rounded text-xs font-medium text-white flex items-center gap-1
              ${frequencyColors[currentFrequency]}
              hover:opacity-90 transition-opacity
            `}
          >
            {frequencyLabels[currentFrequency]}
            <ChevronDown className="w-3 h-3" />
          </button>

          {/* Frequency Dropdown */}
          {showFrequencyDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-neutral-border z-10 min-w-32 animate-fade-in">
              {Object.entries(TASK_FREQUENCIES).map(([key, value]) => (
                <button
                  key={value}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFrequencyChange(task.id, value);
                    setShowFrequencyDropdown(false);
                  }}
                  className={`
                    w-full px-3 py-2 text-left text-sm hover:bg-neutral-bg-secondary transition-colors
                    ${currentFrequency === value ? 'bg-ios-blue/10 text-ios-blue font-medium' : 'text-neutral-text-primary'}
                  `}
                >
                  {frequencyLabels[value]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Duration */}
        <span className="px-2 py-1 bg-neutral-bg-secondary rounded text-xs text-neutral-text-secondary">
          {task.duration}
        </span>
      </div>
    </div>
  );
};

const TaskSelection = ({ selectedTasks, onSelectedTasksChange, customFrequencies, onFrequencyChange, customTasks, onNext, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddCustomTask, setShowAddCustomTask] = useState(false);

  // Combine predefined and custom tasks
  const allTasks = [...PREDEFINED_TASKS, ...customTasks];

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return allTasks.filter(task => {
      const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allTasks, searchQuery, selectedCategory]);

  const handleTaskToggle = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      onSelectedTasksChange(selectedTasks.filter(id => id !== taskId));
    } else {
      onSelectedTasksChange([...selectedTasks, taskId]);
    }
  };

  const categories = ['All', ...Object.values(TASK_CATEGORIES)];
  const canProceed = selectedTasks.length > 0;

  return (
    <div className="max-w-6xl mx-auto p-8 animate-slide-up">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-light text-neutral-text-primary mb-2">
          Select Your Tasks
        </h1>
        <p className="text-lg text-neutral-text-secondary">
          Choose tasks you want to track, customize their frequency as needed
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-ios-blue/10 text-ios-blue rounded-full">
          <span className="font-medium">{selectedTasks.length}</span>
          <span className="text-sm">tasks selected</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-text-secondary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-12 pr-4 py-3 border border-neutral-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ios-blue focus:border-transparent transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-neutral-text-secondary flex-shrink-0" />
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${selectedCategory === category
                  ? 'bg-ios-blue text-white'
                  : 'bg-neutral-bg-secondary text-neutral-text-primary hover:bg-gray-200'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Task Grid */}
      <div className="mb-8">
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                isSelected={selectedTasks.includes(task.id)}
                onToggle={handleTaskToggle}
                onFrequencyChange={onFrequencyChange}
                customFrequency={customFrequencies[task.id]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-neutral-text-secondary">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No tasks found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Add Custom Task Button */}
      <div className="mb-8 text-center">
        <Button
          onClick={() => setShowAddCustomTask(true)}
          variant="secondary"
          icon={<Plus className="w-5 h-5" />}
        >
          Add Your Own Task
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-neutral-border">
        <Button onClick={onBack} variant="ghost">
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          size="lg"
        >
          Generate Smart Schedule
        </Button>
      </div>
    </div>
  );
};

export default TaskSelection;
