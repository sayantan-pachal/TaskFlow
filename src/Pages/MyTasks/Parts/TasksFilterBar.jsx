import React from 'react';
import { ChevronDown } from 'lucide-react';

const filterTabs = [
    { label: 'All', active: true },
    { label: 'Today', active: false },
    { label: 'Upcoming', active: false },
    { label: 'Completed', active: false },
];

export default function TasksFilterBar() {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#161b22] p-1.5 rounded-xl border border-slate-200/80 dark:border-gray-800 w-full md:w-auto justify-between md:justify-start">
                {filterTabs.map((tab) => (
                    <button
                        key={tab.label}
                        type="button"
                        className={`flex-1 md:flex-initial px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                            tab.active
                                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                                : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-800/50'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Sort Dropdown (Desktop Only) */}
            <button
                type="button"
                className="hidden md:flex items-center gap-2 bg-white dark:bg-[#161b22] border border-slate-200 dark:border-gray-800 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-gray-300 hover:border-slate-300 dark:hover:border-gray-700 transition-colors shadow-sm"
            >
                <span className="text-slate-400 dark:text-gray-500">Sort by:</span>
                <span>Due Date</span>
                <ChevronDown size={14} className="text-slate-400" />
            </button>
        </div>
    );
}