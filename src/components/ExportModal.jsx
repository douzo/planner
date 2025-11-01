import React, { useState, useRef } from 'react';
import { X, Download, Printer, FileImage } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import Button from './Button';
import { getMonthName, getCompletionStats, getCalendarGrid } from '../utils/scheduleGenerator';
import { getCompletionColor } from '../utils/colors';

const ExportModal = ({ isOpen, onClose, month, year, schedule, householdMembers }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportStatus, setExportStatus] = useState(null);
  const exportRef = useRef(null);

  if (!isOpen) return null;

  const stats = getCompletionStats(schedule);
  const calendarGrid = getCalendarGrid(month, year);

  // Group schedule by date
  const scheduleByDate = {};
  schedule.forEach(item => {
    const dateKey = new Date(item.date).toDateString();
    if (!scheduleByDate[dateKey]) {
      scheduleByDate[dateKey] = [];
    }
    scheduleByDate[dateKey].push(item);
  });

  // Get abbreviation legend (unique abbreviations)
  const abbreviationMap = {};
  schedule.forEach(item => {
    if (!abbreviationMap[item.task.abbreviation]) {
      abbreviationMap[item.task.abbreviation] = item.task.name;
    }
  });

  const handlePDFExport = async () => {
    setIsGenerating(true);
    setExportStatus('Generating PDF...');

    try {
      const element = exportRef.current;
      const opt = {
        margin: [5, 5],
        filename: `${getMonthName(month)}-${year}-Life-Planner.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a3', orientation: 'landscape' }
      };

      await html2pdf().set(opt).from(element).save();
      setExportStatus('PDF downloaded successfully!');
      setTimeout(() => setExportStatus(null), 3000);
    } catch (error) {
      console.error('PDF export failed:', error);
      setExportStatus('PDF export failed. Please try again.');
      setTimeout(() => setExportStatus(null), 3000);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePNGExport = async () => {
    setIsGenerating(true);
    setExportStatus('Generating PNG...');

    try {
      const element = exportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${getMonthName(month)}-${year}-Life-Planner.png`;
        link.click();
        URL.revokeObjectURL(url);
        setExportStatus('PNG downloaded successfully!');
        setTimeout(() => setExportStatus(null), 3000);
        setIsGenerating(false);
      });
    } catch (error) {
      console.error('PNG export failed:', error);
      setExportStatus('PNG export failed. Please try again.');
      setTimeout(() => setExportStatus(null), 3000);
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in no-print"
        onClick={onClose}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            maxWidth: '1400px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}
          className="animate-slide-up"
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
                Export Calendar
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#86868B',
                marginTop: '4px',
                marginBottom: 0
              }}>
                Preview and download your planner
              </p>
            </div>
            <button
              onClick={onClose}
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

          {/* Preview Area */}
          <div style={{
            padding: '24px',
            overflowY: 'auto',
            maxHeight: 'calc(90vh - 240px)',
            backgroundColor: '#F3F4F6'
          }}>
            <div
              ref={exportRef}
              id="calendar-export"
              style={{
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '1200px',
                margin: '0 auto'
              }}
            >
              {/* Export Header */}
              <div style={{
                textAlign: 'center',
                marginBottom: '30px',
                paddingBottom: '20px',
                borderBottom: '2px solid #E5E7EB'
              }}>
                <h1 style={{
                  fontSize: '36px',
                  fontWeight: '300',
                  color: '#1D1D1F',
                  margin: '0 0 10px 0'
                }}>
                  {getMonthName(month)} {year}
                </h1>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: getCompletionColor(stats.percentage),
                  marginBottom: '5px'
                }}>
                  {stats.percentage}% Complete
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#86868B'
                }}>
                  {stats.completed} of {stats.total} tasks completed
                </div>
              </div>

              {/* Calendar Grid */}
              <div style={{
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '30px'
              }}>
                {/* Weekday Headers */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  backgroundColor: '#F3F4F6',
                  borderBottom: '1px solid #E5E7EB'
                }}>
                  {weekDays.map(day => (
                    <div
                      key={day}
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#86868B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                {calendarGrid.map((week, weekIndex) => (
                  <div
                    key={weekIndex}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(7, 1fr)',
                      borderBottom: weekIndex < calendarGrid.length - 1 ? '1px solid #E5E7EB' : 'none'
                    }}
                  >
                    {week.map((date, dayIndex) => {
                      const items = date ? scheduleByDate[date.toDateString()] || [] : [];
                      const completed = items.filter(item => item.completed).length;
                      const total = items.length;
                      const completionPercentage = total > 0 ? (completed / total) * 100 : 0;

                      return (
                        <div
                          key={dayIndex}
                          style={{
                            minHeight: '80px',
                            padding: '8px',
                            borderRight: dayIndex < 6 ? '1px solid #E5E7EB' : 'none',
                            backgroundColor: date ? 'white' : '#F9FAFB'
                          }}
                        >
                          {date && (
                            <>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '6px'
                              }}>
                                <span style={{
                                  fontSize: '14px',
                                  fontWeight: '500',
                                  color: '#1D1D1F'
                                }}>
                                  {date.getDate()}
                                </span>
                                {total > 0 && (
                                  <div
                                    style={{
                                      width: '8px',
                                      height: '8px',
                                      borderRadius: '50%',
                                      backgroundColor: getCompletionColor(completionPercentage)
                                    }}
                                  />
                                )}
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                                {items.slice(0, 10).map((item) => (
                                  <span
                                    key={item.id}
                                    style={{
                                      fontSize: '9px',
                                      padding: '2px 4px',
                                      borderRadius: '3px',
                                      backgroundColor: item.assignedTo?.color || '#007AFF',
                                      color: 'white',
                                      fontWeight: '600',
                                      opacity: item.completed ? 0.6 : 1,
                                      textDecoration: item.completed ? 'line-through' : 'none'
                                    }}
                                  >
                                    {item.task.abbreviation}
                                  </span>
                                ))}
                                {items.length > 10 && (
                                  <span style={{
                                    fontSize: '9px',
                                    color: '#86868B',
                                    fontWeight: '500'
                                  }}>
                                    +{items.length - 10}
                                  </span>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1D1D1F',
                  marginBottom: '12px'
                }}>
                  Task Legend
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                  gap: '8px'
                }}>
                  {Object.entries(abbreviationMap).map(([abbr, name]) => (
                    <div
                      key={abbr}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '11px'
                      }}
                    >
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: '#E5E7EB',
                        fontWeight: '600',
                        color: '#1D1D1F'
                      }}>
                        {abbr}
                      </span>
                      <span style={{ color: '#86868B' }}>{name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Household Members */}
              {householdMembers.length > 0 && (
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1D1D1F',
                    marginBottom: '12px'
                  }}>
                    Household Members
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {householdMembers.map((member) => (
                      <div
                        key={member.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <div
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: member.color
                          }}
                        />
                        <span style={{ fontSize: '12px', color: '#1D1D1F' }}>
                          {member.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div style={{
                marginTop: '30px',
                paddingTop: '20px',
                borderTop: '1px solid #E5E7EB',
                textAlign: 'center',
                fontSize: '11px',
                color: '#86868B'
              }}>
                Generated on {new Date().toLocaleDateString()} • Smart Life Planner
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{
            padding: '24px',
            borderTop: '1px solid #E5E7EB',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '14px', color: '#86868B' }}>
              {exportStatus || 'Choose an export format'}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button
                onClick={handlePrint}
                variant="secondary"
                icon={<Printer style={{ width: '18px', height: '18px' }} />}
                disabled={isGenerating}
              >
                Print
              </Button>
              <Button
                onClick={handlePNGExport}
                variant="secondary"
                icon={<FileImage style={{ width: '18px', height: '18px' }} />}
                disabled={isGenerating}
              >
                PNG
              </Button>
              <Button
                onClick={handlePDFExport}
                icon={<Download style={{ width: '18px', height: '18px' }} />}
                disabled={isGenerating}
              >
                PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Print-specific styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #calendar-export, #calendar-export * {
            visibility: visible;
          }
          #calendar-export {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default ExportModal;
