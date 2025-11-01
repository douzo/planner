import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Calendar, List } from 'lucide-react';
import Button from './Button';
import ExportModal from './ExportModal';
import ListView from './ListView';
import { getCalendarGrid, getMonthName, getScheduleForDate, getCompletionStats } from '../utils/scheduleGenerator';
import { getCompletionColor } from '../utils/colors';

const DayCell = ({ date, scheduledItems, onTaskClick, onDayClick }) => {
  if (!date) {
    return <div className="aspect-square border border-neutral-border bg-gray-50" />;
  }

  const dayNumber = date.getDate();
  const itemsForDay = scheduledItems || [];
  const completedCount = itemsForDay.filter(item => item.completed).length;
  const totalCount = itemsForDay.length;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Determine how to display tasks
  const showAbbreviations = itemsForDay.length > 2;

  return (
    <div
      className="aspect-square border border-neutral-border bg-white p-2 hover:bg-neutral-bg-secondary cursor-pointer transition-colors relative overflow-hidden"
      onClick={() => onDayClick(date)}
    >
      {/* Day Number */}
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium text-neutral-text-primary">
          {dayNumber}
        </span>
        {/* Completion Dot */}
        {totalCount > 0 && (
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: getCompletionColor(completionPercentage) }}
            title={`${completedCount}/${totalCount} completed`}
          />
        )}
      </div>

      {/* Tasks */}
      <div className="space-y-1">
        {!showAbbreviations ? (
          // Full task names for ≤2 tasks
          itemsForDay.slice(0, 2).map((item) => (
            <div
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                onTaskClick(item.id);
              }}
              className={`
                text-xs px-2 py-1 rounded text-white truncate
                ${item.completed ? 'opacity-60 line-through' : ''}
              `}
              style={{ backgroundColor: item.assignedTo?.color || '#007AFF' }}
              title={item.task.name}
            >
              {item.task.name}
            </div>
          ))
        ) : (
          // Abbreviations for >2 tasks
          <div className="flex flex-wrap gap-1">
            {itemsForDay.slice(0, 10).map((item) => (
              <div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onTaskClick(item.id);
                }}
                className={`
                  text-xs px-1.5 py-0.5 rounded font-medium text-white
                  ${item.completed ? 'opacity-60 line-through' : ''}
                `}
                style={{ backgroundColor: item.assignedTo?.color || '#007AFF' }}
                title={item.task.name}
              >
                {item.task.abbreviation}
              </div>
            ))}
            {itemsForDay.length > 10 && (
              <div className="text-xs px-1.5 py-0.5 text-neutral-text-secondary">
                +{itemsForDay.length - 10}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CalendarView = ({
  month,
  year,
  schedule,
  householdMembers,
  onMonthChange,
  onTaskComplete,
  onDayClick
}) => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const calendarGrid = useMemo(() => getCalendarGrid(month, year), [month, year]);
  const stats = useMemo(() => getCompletionStats(schedule), [schedule]);

  const scheduleByDate = useMemo(() => {
    const grouped = {};
    schedule.forEach(item => {
      const dateKey = new Date(item.date).toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(item);
    });
    return grouped;
  }, [schedule]);

  const handlePrevMonth = () => {
    if (month === 0) {
      onMonthChange(11, year - 1);
    } else {
      onMonthChange(month - 1, year);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      onMonthChange(0, year + 1);
    } else {
      onMonthChange(month + 1, year);
    }
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        {/* Title and Stats */}
        <div style={{ marginBottom: '16px' }}>
          <h1 style={{
            fontSize: 'clamp(24px, 5vw, 36px)',
            fontWeight: '300',
            color: '#1D1D1F',
            marginBottom: '8px'
          }}>
            {getMonthName(month)} {year}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 'clamp(18px, 4vw, 24px)',
              fontWeight: '600',
              color: getCompletionColor(stats.percentage)
            }}>
              {stats.percentage}% Complete
            </span>
            <span style={{ fontSize: '14px', color: '#86868B' }}>
              {stats.completed} of {stats.total} tasks
            </span>
          </div>
        </div>

        {/* Controls - Responsive */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {/* View Toggle */}
          <div style={{
            display: 'flex',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <button
              onClick={() => setViewMode('calendar')}
              style={{
                padding: '8px',
                border: 'none',
                backgroundColor: viewMode === 'calendar' ? '#007AFF' : 'white',
                color: viewMode === 'calendar' ? 'white' : '#1D1D1F',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '13px',
                fontWeight: '500',
                transition: 'all 0.2s',
                borderRight: '1px solid #E5E7EB'
              }}
              onMouseEnter={(e) => {
                if (viewMode !== 'calendar') {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                }
              }}
              onMouseLeave={(e) => {
                if (viewMode !== 'calendar') {
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
              title="Calendar View"
            >
              <Calendar style={{ width: '16px', height: '16px' }} />
              <span className="hidden sm:inline">Calendar</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '8px',
                border: 'none',
                backgroundColor: viewMode === 'list' ? '#007AFF' : 'white',
                color: viewMode === 'list' ? 'white' : '#1D1D1F',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '13px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (viewMode !== 'list') {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                }
              }}
              onMouseLeave={(e) => {
                if (viewMode !== 'list') {
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
              title="List View"
            >
              <List style={{ width: '16px', height: '16px' }} />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>

          {/* Month Navigation */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <Button
              onClick={handlePrevMonth}
              variant="secondary"
              size="sm"
              icon={<ChevronLeft style={{ width: '16px', height: '16px' }} />}
            />
            <Button
              onClick={handleNextMonth}
              variant="secondary"
              size="sm"
              icon={<ChevronRight style={{ width: '16px', height: '16px' }} />}
            />
          </div>

          {/* Export Button */}
          <Button
            onClick={() => setShowExportModal(true)}
            variant="primary"
            size="sm"
            icon={<Download style={{ width: '16px', height: '16px' }} />}
          >
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        month={month}
        year={year}
        schedule={schedule}
        householdMembers={householdMembers}
      />

      {/* Calendar or List View */}
      {viewMode === 'calendar' ? (
        <>
          {/* Calendar Grid */}
          <div className="bg-white rounded-ios border border-neutral-border overflow-hidden shadow-sm">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 bg-neutral-bg-secondary">
              {weekDays.map(day => (
                <div
                  key={day}
                  className="p-3 text-center text-sm font-medium text-neutral-text-secondary uppercase"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            {calendarGrid.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7">
                {week.map((date, dayIndex) => (
                  <DayCell
                    key={`${weekIndex}-${dayIndex}`}
                    date={date}
                    scheduledItems={date ? scheduleByDate[date.toDateString()] : []}
                    onTaskClick={onTaskComplete}
                    onDayClick={onDayClick}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Bottom Stats Bar */}
          <div className="mt-6 p-4 bg-neutral-bg-secondary rounded-lg flex items-center justify-between">
            <div className="text-sm text-neutral-text-secondary">
              Click on tasks to mark them complete, or click on a day for details
            </div>
            <div className="text-sm font-medium text-neutral-text-primary">
              {stats.incomplete} tasks remaining
            </div>
          </div>
        </>
      ) : (
        <ListView
          month={month}
          year={year}
          schedule={schedule}
          onTaskComplete={onTaskComplete}
        />
      )}
    </div>
  );
};

export default CalendarView;
