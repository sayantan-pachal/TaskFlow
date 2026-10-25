import React from 'react';
import CustomDropdown from '../../../components/Others/CustomDropdown';

const filterTabs = ['All', 'Today', 'Upcoming', 'Completed'];

const sortOptions = [
    { label: 'Sort by: Due Date', value: 'dueDate' },
    { label: 'Sort by: Priority', value: 'priority' },
    { label: 'Sort by: Status', value: 'status' },
    { label: 'Sort by: Title (A-Z)', value: 'title' },
];

export default function TasksFilterBar({ activeFilter, onFilterChange, sortBy, onSortChange }) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            {/* Clickable Filter Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#161b22] p-1.5 rounded-xl border border-slate-200/80 dark:border-gray-800 w-full md:w-auto justify-between md:justify-start">
                {filterTabs.map((tab) => {
                    const isActive = activeFilter === tab;
                    return (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => onFilterChange(tab)}
                            className={`flex-1 md:flex-initial px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer ${
                                isActive
                                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                                    : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-800/50'
                            }`}
                        >
                            {tab}
                        </button>
                    );
                })}
            </div>

            {/* Sort Dropdown using CustomDropdown */}
            <div className="w-full sm:w-52">
                <CustomDropdown
                    name="sortBy"
                    value={sortBy}
                    options={sortOptions}
                    onChange={(e) => onSortChange(e.target.value)}
                />
            </div>
        </div>
    );
}