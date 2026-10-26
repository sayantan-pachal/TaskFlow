import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTasks } from '../../../context/TaskContext';

const DAYS_SUN_START = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_MON_START = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

const toLocalIso = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const toDisplayDate = (d) =>
    d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

const getTaskDotColor = (task) => {
    if (task.status === 'Completed') return 'bg-emerald-500';
    switch (task.priority?.toLowerCase()) {
        case 'high':
            return 'bg-red-500';
        case 'medium':
            return 'bg-amber-500';
        case 'low':
            return 'bg-blue-500';
        default:
            return 'bg-purple-500';
    }
};

export default function CalendarGrid({
    currentMonth,
    selectedDate,
    activeView = 'Month',
    onPrevMonth,
    onNextMonth,
    onSelectDate,
}) {
    const { tasks } = useTasks();

    const weekStartsMonday = useMemo(() => {
        try {
            return JSON.parse(localStorage.getItem('taskflow_monday_start') ?? 'true');
        } catch {
            return true;
        }
    }, []);

    const daysOfWeek = weekStartsMonday ? DAYS_MON_START : DAYS_SUN_START;

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Map tasks by local YYYY-MM-DD and formatted display date for fast lookup
    const dotsByDate = useMemo(() => {
        const map = {};
        tasks.forEach((task) => {
            const key = task.rawDate || task.date;
            if (!key) return;
            if (!map[key]) map[key] = [];
            map[key].push(getTaskDotColor(task));
        });
        return map;
    }, [tasks]);

    const rawFirstDay = new Date(year, month, 1).getDay();
    const firstDayIndex = weekStartsMonday ? (rawFirstDay + 6) % 7 : rawFirstDay;
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const calendarCells = [];

    // 1. Leading days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
        calendarCells.push({
            day: daysInPrevMonth - i,
            isCurrentMonth: false,
            dateObj: new Date(year, month - 1, daysInPrevMonth - i),
        });
    }

    // 2. Days in current month
    for (let day = 1; day <= daysInCurrentMonth; day++) {
        calendarCells.push({
            day,
            isCurrentMonth: true,
            dateObj: new Date(year, month, day),
        });
    }

    // 3. Trailing days from next month
    const totalSlots = calendarCells.length > 35 ? 42 : 35;
    const trailingDaysCount = totalSlots - calendarCells.length;
    for (let day = 1; day <= trailingDaysCount; day++) {
        calendarCells.push({
            day,
            isCurrentMonth: false,
            dateObj: new Date(year, month + 1, day),
        });
    }

    const isSameDay = (d1, d2) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    // Filter visible cells based on Month / Week / Day view
    const visibleCells = useMemo(() => {
        if (activeView === 'Day') {
            return [
                {
                    day: selectedDate.getDate(),
                    isCurrentMonth: selectedDate.getMonth() === month,
                    dateObj: selectedDate,
                },
            ];
        }
        if (activeView === 'Week') {
            const selectedIdx = calendarCells.findIndex((c) =>
                isSameDay(c.dateObj, selectedDate)
            );
            if (selectedIdx !== -1) {
                const weekStart = Math.floor(selectedIdx / 7) * 7;
                return calendarCells.slice(weekStart, weekStart + 7);
            }
        }
        return calendarCells;
    }, [activeView, calendarCells, selectedDate, month]);

    const today = new Date();

    return (
        <div className="bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-sm transition-colors">
            {/* Month & Year Navigation Bar */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-[#0d1117]/60 border border-slate-200/70 dark:border-gray-800/80 rounded-xl px-3 py-2.5 mb-6">
                <button
                    type="button"
                    onClick={onPrevMonth}
                    aria-label="Previous month"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                    <ChevronLeft size={18} />
                </button>

                <h2 className="text-sm md:text-base font-bold text-slate-900 dark:text-white tracking-wide">
                    {MONTH_NAMES[month]} {year}
                </h2>

                <button
                    type="button"
                    onClick={onNextMonth}
                    aria-label="Next month"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                    <ChevronRight size={18} />
                </button>
            </div>

            {/* Days of Week Header */}
            {activeView !== 'Day' && (
                <div className="grid grid-cols-7 mb-3 text-center">
                    {daysOfWeek.map((dayName) => (
                        <div
                            key={dayName}
                            className="text-xs font-semibold text-slate-400 dark:text-gray-500 py-1"
                        >
                            {dayName}
                        </div>
                    ))}
                </div>
            )}

            {/* Calendar Days Grid */}
            <div
                className={`grid ${
                    activeView === 'Day' ? 'grid-cols-1 py-4' : 'grid-cols-7'
                } gap-y-2 md:gap-y-3 text-center`}
            >
                {visibleCells.map((cell, index) => {
                    const selected = isSameDay(cell.dateObj, selectedDate);
                    const isToday = isSameDay(cell.dateObj, today);
                    const isoKey = toLocalIso(cell.dateObj);
                    const displayKey = toDisplayDate(cell.dateObj);
                    const dots = [
                        ...(dotsByDate[isoKey] || []),
                        ...(dotsByDate[displayKey] && !dotsByDate[isoKey]
                            ? dotsByDate[displayKey]
                            : []),
                    ];

                    return (
                        <div key={index} className="flex flex-col items-center justify-center">
                            <button
                                type="button"
                                onClick={() => onSelectDate(cell.dateObj)}
                                className={`relative w-10 h-10 md:w-11 md:h-11 rounded-full flex flex-col items-center justify-center text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                                    selected
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/35'
                                        : isToday
                                        ? 'border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10'
                                        : cell.isCurrentMonth
                                        ? 'text-slate-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-800/70'
                                        : 'text-slate-300 dark:text-gray-600 hover:bg-slate-50 dark:hover:bg-gray-800/30'
                                }`}
                            >
                                <span>{cell.day}</span>

                                {/* Task Indicator Dots */}
                                {dots.length > 0 && (
                                    <span className="flex items-center gap-0.5 mt-0.5">
                                        {dots.slice(0, 3).map((dotColor, i) => (
                                            <span
                                                key={i}
                                                className={`w-1 h-1 rounded-full ${
                                                    selected ? 'bg-white' : dotColor
                                                }`}
                                            />
                                        ))}
                                    </span>
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}