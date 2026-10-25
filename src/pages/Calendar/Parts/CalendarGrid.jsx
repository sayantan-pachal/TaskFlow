import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

// Sample indicator dots mapped by day number to match the UI showcase
const SAMPLE_TASK_DOTS = {
    1: ['bg-blue-500'],
    2: ['bg-blue-500'],
    3: ['bg-amber-500'],
    4: ['bg-red-500'],
    8: ['bg-emerald-500'],
    9: ['bg-blue-500'],
    11: ['bg-purple-500'],
    12: ['bg-red-500', 'bg-amber-500', 'bg-blue-500'],
    13: ['bg-blue-500'],
    15: ['bg-purple-500'],
    16: ['bg-emerald-500'],
    20: ['bg-blue-500'],
    21: ['bg-amber-500'],
    22: ['bg-amber-500'],
    23: ['bg-blue-500'],
    24: ['bg-red-500'],
    26: ['bg-blue-500'],
    28: ['bg-amber-500'],
    29: ['bg-red-500', 'bg-blue-500'],
};

export default function CalendarGrid({
    currentMonth,
    selectedDate,
    onPrevMonth,
    onNextMonth,
    onSelectDate,
}) {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of the month (0 = Sunday, 6 = Saturday)
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Total days in the current month
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    // Total days in the previous month
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Build calendar cells (leading days + current month days + trailing days)
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

    // 3. Trailing days from next month to fill out complete weeks (35 or 42 cells)
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

    return (
        <div className="bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-sm transition-colors">
            {/* Month & Year Navigation Bar */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-[#0d1117]/60 border border-slate-200/70 dark:border-gray-800/80 rounded-xl px-3 py-2.5 mb-6">
                <button
                    type="button"
                    onClick={onPrevMonth}
                    aria-label="Previous month"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-gray-800 transition-colors"
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
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-gray-800 transition-colors"
                >
                    <ChevronRight size={18} />
                </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 mb-3 text-center">
                {DAYS_OF_WEEK.map((dayName) => (
                    <div
                        key={dayName}
                        className="text-xs font-semibold text-slate-400 dark:text-gray-500 py-1"
                    >
                        {dayName}
                    </div>
                ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-y-2 md:gap-y-3 text-center">
                {calendarCells.map((cell, index) => {
                    const selected = isSameDay(cell.dateObj, selectedDate);
                    const dots = cell.isCurrentMonth ? SAMPLE_TASK_DOTS[cell.day] || [] : [];

                    return (
                        <div key={index} className="flex flex-col items-center justify-center">
                            <button
                                type="button"
                                onClick={() => onSelectDate(cell.dateObj)}
                                className={`relative w-10 h-10 md:w-11 md:h-11 rounded-full flex flex-col items-center justify-center text-xs md:text-sm font-semibold transition-all ${
                                    selected
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/35'
                                        : cell.isCurrentMonth
                                        ? 'text-slate-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-800/70'
                                        : 'text-slate-300 dark:text-gray-600 hover:bg-slate-50 dark:hover:bg-gray-800/30'
                                }`}
                            >
                                <span>{cell.day}</span>

                                {/* Task Indicator Dots */}
                                {dots.length > 0 && (
                                    <span className="flex items-center gap-0.5 mt-0.5">
                                        {dots.slice(0, 2).map((dotColor, i) => (
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