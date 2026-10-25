import React from 'react';
import { Search, UserRound } from 'lucide-react';

const viewOptions = ['Month', 'Week', 'Day'];

export default function CalendarHeader({ activeView, onViewChange }) {
    return (
        <div className="flex items-start md:items-center justify-between gap-4 mb-6">
            {/* Title & Subtitle */}
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                    Calendar
                </h1>
                <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400 mt-0.5 md:mt-1">
                    View and manage your tasks by date.
                </p>
            </div>

            {/* Mobile Right Icons (Search & Profile Avatar) */}
            <div className="flex md:hidden items-center gap-2.5 shrink-0">
                <button
                    type="button"
                    aria-label="Search"
                    className="w-9 h-9 rounded-full bg-white dark:bg-[#161b22] border border-slate-200 dark:border-gray-800 flex items-center justify-center text-slate-600 dark:text-gray-300 shadow-sm"
                >
                    <Search size={16} />
                </button>
                <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <UserRound size={18} />
                </div>
            </div>

            {/* Desktop Right View Switcher (Month / Week / Day) */}
            <div className="hidden md:flex items-center bg-slate-100 dark:bg-[#161b22] p-1 rounded-xl border border-slate-200/80 dark:border-gray-800">
                {viewOptions.map((view) => (
                    <button
                        key={view}
                        type="button"
                        onClick={() => onViewChange(view)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            activeView === view
                                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                                : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-200'
                        }`}
                    >
                        {view}
                    </button>
                ))}
            </div>
        </div>
    );
}