import React, { useMemo, useState } from 'react';
import { Calendar, Check, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { getCompletionStats } from '../utils/scheduleGenerator';

const ListView = ({ month, year, schedule, onTaskComplete }) => {
  const [sortBy, setSortBy] = useState('date'); // date, priority, category
  const [filterStatus, setFilterStatus] = useState('all'); // all, completed, incomplete
  const [expandedDates, setExpandedDates] = useState(new Set());

  const stats = useMemo(() => getCompletionStats(schedule), [schedule]);

  // Group tasks by date
  const groupedByDate = useMemo(() => {
    const grouped = {};
    schedule.forEach(item => {
      const date = new Date(item.date);
      const dateKey = date.toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          date: date,
          items: []
        };
      }
      grouped[dateKey].items.push(item);
    });

    // Sort items within each date
    Object.values(grouped).forEach(group => {
      group.items.sort((a, b) => {
        if (sortBy === 'priority') {
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.task.priority] - priorityOrder[b.task.priority];
        } else if (sortBy === 'category') {
          return a.task.category.localeCompare(b.task.category);
        }
        return 0;
      });
    });

    return grouped;
  }, [schedule, sortBy]);

  // Get sorted dates
  const sortedDates = useMemo(() => {
    return Object.keys(groupedByDate).sort((a, b) => {
      return new Date(a) - new Date(b);
    });
  }, [groupedByDate]);

  // Filter tasks based on status
  const filteredSchedule = useMemo(() => {
    if (filterStatus === 'all') return schedule;
    return schedule.filter(item =>
      filterStatus === 'completed' ? item.completed : !item.completed
    );
  }, [schedule, filterStatus]);

  const toggleDateExpansion = (dateKey) => {
    const newExpanded = new Set(expandedDates);
    if (newExpanded.has(dateKey)) {
      newExpanded.delete(dateKey);
    } else {
      newExpanded.add(dateKey);
    }
    setExpandedDates(newExpanded);
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      case 'low': return '#34C759';
      default: return '#86868B';
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <Calendar style={{ width: '32px', height: '32px', color: '#007AFF' }} />
          <h1 style={{
            fontSize: '32px',
            fontWeight: '300',
            color: '#1D1D1F',
            margin: 0
          }}>
            Task List View
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{
            fontSize: '20px',
            fontWeight: '600',
            color: stats.percentage === 100 ? '#34C759' : '#007AFF'
          }}>
            {stats.completed} / {stats.total} completed
          </div>
          <div style={{
            fontSize: '14px',
            color: '#86868B'
          }}>
            ({stats.percentage}%)
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {/* Sort By */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', color: '#86868B', fontWeight: '500' }}>
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer',
              backgroundColor: 'white'
            }}
          >
            <option value="date">Date</option>
            <option value="priority">Priority</option>
            <option value="category">Category</option>
          </select>
        </div>

        {/* Filter By Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter style={{ width: '16px', height: '16px', color: '#86868B' }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'incomplete', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  padding: '6px 12px',
                  border: filterStatus === status ? '2px solid #007AFF' : '1px solid #E5E7EB',
                  borderRadius: '8px',
                  backgroundColor: filterStatus === status ? '#E5F1FF' : 'white',
                  color: filterStatus === status ? '#007AFF' : '#1D1D1F',
                  fontSize: '13px',
                  fontWeight: filterStatus === status ? '500' : '400',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (filterStatus !== status) {
                    e.currentTarget.style.backgroundColor = '#F3F4F6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (filterStatus !== status) {
                    e.currentTarget.style.backgroundColor = 'white';
                  }
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {sortedDates.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '48px 24px',
            color: '#86868B'
          }}>
            <Calendar style={{ width: '48px', height: '48px', margin: '0 auto 16px', opacity: 0.3 }} />
            <p style={{ margin: 0, fontSize: '16px' }}>No tasks for this month</p>
          </div>
        ) : (
          sortedDates.map((dateKey) => {
            const group = groupedByDate[dateKey];
            const isExpanded = expandedDates.has(dateKey);
            const visibleItems = group.items.filter(item => {
              if (filterStatus === 'all') return true;
              return filterStatus === 'completed' ? item.completed : !item.completed;
            });

            if (visibleItems.length === 0) return null;

            const completedCount = visibleItems.filter(item => item.completed).length;
            const totalCount = visibleItems.length;

            return (
              <div
                key={dateKey}
                style={{
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: 'white'
                }}
              >
                {/* Date Header */}
                <button
                  onClick={() => toggleDateExpansion(dateKey)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: 'none',
                    backgroundColor: '#F9FAFB',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1D1D1F'
                    }}>
                      {formatDate(group.date)}
                    </span>
                    <span style={{
                      fontSize: '13px',
                      color: '#86868B',
                      backgroundColor: 'white',
                      padding: '4px 8px',
                      borderRadius: '6px'
                    }}>
                      {completedCount}/{totalCount}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp style={{ width: '20px', height: '20px', color: '#86868B' }} />
                  ) : (
                    <ChevronDown style={{ width: '20px', height: '20px', color: '#86868B' }} />
                  )}
                </button>

                {/* Tasks */}
                {isExpanded && (
                  <div style={{ padding: '8px' }}>
                    {visibleItems.map((item, index) => (
                      <div
                        key={item.id}
                        onClick={() => onTaskComplete(item.id)}
                        style={{
                          padding: '16px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                          backgroundColor: item.completed ? '#F9FAFB' : 'white',
                          marginBottom: index < visibleItems.length - 1 ? '4px' : 0
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = item.completed ? '#F9FAFB' : 'white'}
                      >
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                          {/* Checkbox */}
                          <div
                            style={{
                              flexShrink: 0,
                              width: '24px',
                              height: '24px',
                              border: item.completed ? 'none' : '2px solid #E5E7EB',
                              borderRadius: '6px',
                              backgroundColor: item.completed ? '#34C759' : 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.2s'
                            }}
                          >
                            {item.completed && (
                              <Check style={{ width: '16px', height: '16px', color: 'white' }} />
                            )}
                          </div>

                          {/* Task Info */}
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                              <span style={{ fontSize: '20px' }}>{item.task.icon}</span>
                              <span style={{
                                fontSize: '16px',
                                fontWeight: '500',
                                color: item.completed ? '#86868B' : '#1D1D1F',
                                textDecoration: item.completed ? 'line-through' : 'none'
                              }}>
                                {item.task.name}
                              </span>
                            </div>

                            {/* Task Details */}
                            <div style={{
                              display: 'flex',
                              gap: '12px',
                              flexWrap: 'wrap',
                              fontSize: '13px',
                              color: '#86868B'
                            }}>
                              <span style={{
                                padding: '2px 8px',
                                borderRadius: '4px',
                                backgroundColor: '#F3F4F6'
                              }}>
                                {item.task.category}
                              </span>
                              <span>⏱️ {item.task.duration}</span>
                              <span>📅 {item.task.frequency}</span>
                              {item.assignedTo && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <div
                                    style={{
                                      width: '12px',
                                      height: '12px',
                                      borderRadius: '50%',
                                      backgroundColor: item.assignedTo.color
                                    }}
                                  />
                                  <span>{item.assignedTo.name}</span>
                                </div>
                              )}
                              <div
                                style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  backgroundColor: getPriorityColor(item.task.priority),
                                  alignSelf: 'center'
                                }}
                                title={`${item.task.priority} priority`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ListView;
