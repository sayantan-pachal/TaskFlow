import React from 'react';

const categories = [
    { name: 'Study', count: 4, percent: 33, color: 'bg-blue-600', dot: 'bg-blue-600' },
    { name: 'Development', count: 3, percent: 25, color: 'bg-indigo-500', dot: 'bg-indigo-500' },
    { name: 'Design', count: 2, percent: 17, color: 'bg-emerald-500', dot: 'bg-emerald-500' },
    { name: 'Personal', count: 2, percent: 17, color: 'bg-amber-500', dot: 'bg-amber-500' },
    { name: 'Others', count: 1, percent: 8, color: 'bg-slate-400', dot: 'bg-slate-400' },
];

export default function TaskBreakdown() {
    return (
        <div className="bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-5 shadow-sm transition-colors h-full">
            <div className="mb-5">
                <h2 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                    Task Breakdown
                </h2>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                    By category
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {categories.map((cat) => (
                    <div key={cat.name} className="grid grid-cols-12 items-center gap-3">
                        {/* Category Name & Colored Dot */}
                        <div className="col-span-4 flex items-center gap-2.5 min-w-0">
                            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${cat.dot}`} />
                            <span className="text-xs md:text-sm font-medium text-slate-700 dark:text-gray-200 truncate">
                                {cat.name}
                            </span>
                        </div>

                        {/* Horizontal Progress Bar */}
                        <div className="col-span-5">
                            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-gray-800 overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${cat.color}`}
                                    style={{ width: `${cat.percent * 2.2}%` }}
                                />
                            </div>
                        </div>

                        {/* Count & Percentage */}
                        <div className="col-span-3 text-right">
                            <span className="text-xs font-semibold text-slate-700 dark:text-gray-300">
                                {cat.count}{' '}
                                <span className="text-slate-400 dark:text-gray-500 font-normal">
                                    ({cat.percent}%)
                                </span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}