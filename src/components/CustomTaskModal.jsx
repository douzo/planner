import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from './Button';
import { TASK_CATEGORIES, TASK_FREQUENCIES, TASK_DURATIONS, TASK_PRIORITIES, generateAbbreviation } from '../data/tasks';

// Common emoji options for tasks
const EMOJI_OPTIONS = [
  '📝', '🏠', '🧹', '🛒', '💊', '📞', '💻', '🚗', '🌱', '🍽️',
  '👕', '📧', '💳', '✂️', '🧴', '🔧', '📦', '🎯', '⭐', '🔥',
  '🏃', '📚', '🎨', '🎵', '🎮', '🍔', '☕', '🌟', '💪', '🧘',
  '🐕', '🐱', '🐠', '🌺', '🌸', '🎁', '🎉', '🎈', '🔑', '🪴',
  '🧽', '🪟', '🛏️', '🚿', '🧼', '🪥', '🧴', '💅', '🪮', '👗'
];

const CustomTaskModal = ({ isOpen, onClose, onSave }) => {
  const [taskName, setTaskName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(Object.values(TASK_CATEGORIES)[0]);
  const [selectedFrequency, setSelectedFrequency] = useState(TASK_FREQUENCIES.WEEKLY);
  const [selectedDuration, setSelectedDuration] = useState('30 min');
  const [selectedIcon, setSelectedIcon] = useState('📝');
  const [selectedPriority, setSelectedPriority] = useState(TASK_PRIORITIES.MEDIUM);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!taskName.trim()) {
      newErrors.taskName = 'Task name is required';
    } else if (taskName.length > 50) {
      newErrors.taskName = 'Task name must be less than 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const newTask = {
      id: Date.now(),
      name: taskName.trim(),
      category: selectedCategory,
      frequency: selectedFrequency,
      duration: selectedDuration,
      icon: selectedIcon,
      priority: selectedPriority,
      abbreviation: generateAbbreviation(taskName.trim()),
      isCustom: true
    };

    onSave(newTask);
    handleClose();
  };

  const handleClose = () => {
    // Reset form
    setTaskName('');
    setSelectedCategory(Object.values(TASK_CATEGORIES)[0]);
    setSelectedFrequency(TASK_FREQUENCIES.WEEKLY);
    setSelectedDuration('30 min');
    setSelectedIcon('📝');
    setSelectedPriority(TASK_PRIORITIES.MEDIUM);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-ios max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slide-up"
        style={{ borderRadius: '12px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '300',
              color: '#1D1D1F',
              margin: 0
            }}>
              Create Custom Task
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#86868B',
              marginTop: '4px',
              marginBottom: 0
            }}>
              Add a personalized task to your planner
            </p>
          </div>
          <button
            onClick={handleClose}
            style={{
              padding: '8px',
              background: 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X style={{ width: '24px', height: '24px', color: '#86868B' }} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', overflowY: 'auto', maxHeight: 'calc(90vh - 180px)' }}>
          {/* Task Name */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#1D1D1F',
              marginBottom: '8px'
            }}>
              Task Name *
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => {
                setTaskName(e.target.value);
                setErrors({ ...errors, taskName: '' });
              }}
              placeholder="e.g., Feed fish, Water succulents"
              maxLength={50}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: errors.taskName ? '2px solid #FF3B30' : '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                if (!errors.taskName) {
                  e.target.style.borderColor = '#007AFF';
                  e.target.style.borderWidth = '2px';
                }
              }}
              onBlur={(e) => {
                if (!errors.taskName) {
                  e.target.style.borderColor = '#E5E7EB';
                  e.target.style.borderWidth = '1px';
                }
              }}
            />
            {errors.taskName && (
              <p style={{ color: '#FF3B30', fontSize: '14px', marginTop: '4px' }}>
                {errors.taskName}
              </p>
            )}
          </div>

          {/* Emoji Picker */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#1D1D1F',
              marginBottom: '8px'
            }}>
              Icon
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))',
              gap: '8px',
              maxHeight: '200px',
              overflowY: 'auto',
              padding: '12px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px'
            }}>
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedIcon(emoji)}
                  style={{
                    fontSize: '24px',
                    padding: '8px',
                    border: selectedIcon === emoji ? '2px solid #007AFF' : '1px solid #E5E7EB',
                    borderRadius: '8px',
                    background: selectedIcon === emoji ? '#E5F1FF' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedIcon !== emoji) {
                      e.currentTarget.style.backgroundColor = '#F3F4F6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedIcon !== emoji) {
                      e.currentTarget.style.backgroundColor = 'white';
                    }
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#1D1D1F',
              marginBottom: '8px'
            }}>
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
            >
              {Object.values(TASK_CATEGORIES).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Frequency */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#1D1D1F',
              marginBottom: '8px'
            }}>
              Frequency
            </label>
            <select
              value={selectedFrequency}
              onChange={(e) => setSelectedFrequency(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
            >
              <option value={TASK_FREQUENCIES.DAILY}>Daily</option>
              <option value={TASK_FREQUENCIES.WEEKLY}>Weekly</option>
              <option value={TASK_FREQUENCIES.BI_WEEKLY}>Bi-weekly</option>
              <option value={TASK_FREQUENCIES.MONTHLY}>Monthly</option>
              <option value={TASK_FREQUENCIES.QUARTERLY}>Quarterly</option>
            </select>
          </div>

          {/* Duration */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#1D1D1F',
              marginBottom: '8px'
            }}>
              Estimated Duration
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
            >
              {TASK_DURATIONS.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#1D1D1F',
              marginBottom: '8px'
            }}>
              Priority
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {Object.entries(TASK_PRIORITIES).map(([key, value]) => (
                <button
                  key={value}
                  onClick={() => setSelectedPriority(value)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: selectedPriority === value ? '2px solid #007AFF' : '1px solid #E5E7EB',
                    borderRadius: '8px',
                    background: selectedPriority === value ? '#E5F1FF' : 'white',
                    color: selectedPriority === value ? '#007AFF' : '#1D1D1F',
                    fontWeight: selectedPriority === value ? '500' : '400',
                    cursor: 'pointer',
                    fontSize: '14px',
                    textTransform: 'capitalize',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedPriority !== value) {
                      e.currentTarget.style.backgroundColor = '#F3F4F6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedPriority !== value) {
                      e.currentTarget.style.backgroundColor = 'white';
                    }
                  }}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '24px',
          borderTop: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <Button onClick={handleClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Add Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomTaskModal;
