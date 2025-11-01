import React from 'react';
import { X, Check } from 'lucide-react';
import Button from './Button';

const DayModal = ({ date, items, onClose, onToggleComplete }) => {
  if (!date) return null;

  const dateStr = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-ios max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-border flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-light text-neutral-text-primary">
              {dateStr}
            </h2>
            <p className="text-sm text-neutral-text-secondary mt-1">
              {completedCount} of {totalCount} tasks completed
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-bg-secondary rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-neutral-text-secondary" />
          </button>
        </div>

        {/* Task List */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {items.length === 0 ? (
            <div className="text-center py-12 text-neutral-text-secondary">
              <p>No tasks scheduled for this day</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`
                    p-4 rounded-lg border-2 transition-all cursor-pointer
                    ${item.completed
                      ? 'border-ios-green/30 bg-ios-green/5'
                      : 'border-neutral-border bg-white hover:border-ios-blue/30'
                    }
                  `}
                  onClick={() => onToggleComplete(item.id)}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <div
                      className={`
                        flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all
                        ${item.completed
                          ? 'bg-ios-green border-ios-green'
                          : 'border-neutral-border hover:border-ios-blue'
                        }
                      `}
                    >
                      {item.completed && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>

                    {/* Task Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{item.task.icon}</span>
                          <div>
                            <h4
                              className={`font-medium text-neutral-text-primary ${
                                item.completed ? 'line-through opacity-60' : ''
                              }`}
                            >
                              {item.task.name}
                            </h4>
                            <p className="text-sm text-neutral-text-secondary">
                              {item.task.category}
                            </p>
                          </div>
                        </div>

                        {/* Assigned Member */}
                        {item.assignedTo && (
                          <div
                            className="px-3 py-1 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: item.assignedTo.color }}
                          >
                            {item.assignedTo.name}
                          </div>
                        )}
                      </div>

                      {/* Task Details */}
                      <div className="flex items-center gap-3 mt-2 text-xs text-neutral-text-secondary">
                        <span>⏱️ {item.task.duration}</span>
                        <span>📅 {item.task.frequency}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-border flex justify-end">
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DayModal;
