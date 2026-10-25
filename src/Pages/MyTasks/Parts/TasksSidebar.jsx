import React from 'react';

const quickStats = [
    { label: 'Total Tasks', value: 12, dot: 'bg-blue-500' },
    { label: 'Completed', value: 7, dot: 'bg-emerald-500' },
    { label: 'Pending', value: 5, dot: 'bg-amber-500' },
    { label: 'Overdue', value: 0, dot: 'bg-red-500' },
];

export default function TasksSidebar() {
    return (
        <div className="hidden lg:flex flex-col gap-4 w-full">
            {/* 1. Circular Progress Card */}
            <div className="bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-5 flex flex-col items-center justify-center shadow-sm transition-colors">
                <div className="relative w-28 h-28 mb-3 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="56"
                            cy="56"
                            r="46"
                            fill="none"
                            className="stroke-slate-100 dark:stroke-gray-800"
                            strokeWidth="10"
                        />
                        <circle
                            cx="56"
                            cy="56"
                            r="46"
                            fill="none"
                            className="stroke-blue-600 dark:stroke-blue-500"
                            strokeWidth="10"
                            strokeDasharray="289"
                            strokeDashoffset="121"
                            strokeLinecap="round"
                        />
                    </svg>
                    <span className="absolute text-xl font-bold text-slate-900 dark:text-white">
                        58%
                    </span>
                </div>
                <p className="text-xs font-semibold text-slate-600 dark:text-gray-300">
                    Tasks Completed
                </p>
            </div>

            {/* 2. Quick Stats Card */}
            <div className="bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-5 shadow-sm transition-colors">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-4">
                    Quick Stats
                </h3>
                <div className="flex flex-col gap-3">
                    {quickStats.map((stat) => (
                        <div
                            key={stat.label}
                            className="flex items-center justify-between text-xs font-medium"
                        >
                            <div className="flex items-center gap-2.5 text-slate-600 dark:text-gray-300">
                                <span className={`w-2 h-2 rounded-full ${stat.dot}`} />
                                <span>{stat.label}</span>
                            </div>
                            <span className="font-bold text-slate-900 dark:text-white">
                                {stat.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Motivational Mountain Card */}
            <div className="relative overflow-hidden rounded-2xl p-5 min-h-[130px] flex flex-col justify-between border border-blue-100 dark:border-gray-800 bg-gradient-to-b from-blue-50 via-indigo-50/60 to-blue-100 dark:from-[#161b22] dark:via-[#121826] dark:to-[#0f172a] shadow-sm">
                <p className="text-xs font-semibold text-slate-700 dark:text-gray-200 relative z-10 max-w-[140px] leading-relaxed">
                    Small steps make big progress.
                </p>

                {/* Mountain Vector Graphic */}
                <svg
                    className="absolute bottom-0 left-0 right-0 w-full h-16 pointer-events-none"
                    viewBox="0 0 200 60"
                    preserveAspectRatio="none"
                >
                    <polygon
                        points="0,60 45,25 90,60"
                        className="fill-blue-300/50 dark:fill-blue-900/40"
                    />
                    <polygon
                        points="55,60 115,12 175,60"
                        className="fill-indigo-400/50 dark:fill-indigo-600/40"
                    />
                    <polygon
                        points="120,60 165,28 200,60"
                        className="fill-blue-500/40 dark:fill-blue-500/30"
                    />
                </svg>
            </div>
        </div>
    );
}