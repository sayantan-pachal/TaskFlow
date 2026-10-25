// src/components/Statistics/StatsRightSidebar.jsx
import React from 'react';
import {
    Lightbulb,
    Zap,
    Plus,
    Download,
    Sparkles,
    BarChart2,
    ChevronRight,
} from 'lucide-react';

const secondaryActions = [
    { label: 'Import Sample Tasks', Icon: Download },
    { label: 'Get New Tip', Icon: Sparkles },
    { label: 'View Statistics', Icon: BarChart2 },
];

export default function StatsRightSidebar() {
    return (
        <div className="hidden xl:flex flex-col gap-6">
            {/* 1. Productivity Tips Card */}
            <div className="relative overflow-hidden rounded-2xl p-5 min-h-[175px] border border-blue-100 dark:border-gray-800 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-[#161b22] dark:via-[#172033] dark:to-[#1e1b4b] shadow-sm">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <Lightbulb size={18} className="text-amber-500 dark:text-amber-400" />
                        <h3 className="text-xs font-bold text-slate-800 dark:text-white">
                            Productivity Tips
                        </h3>
                    </div>

                    <p className="text-xs font-medium italic text-slate-700 dark:text-gray-200 leading-relaxed">
                        "Progress is more important than perfection."
                    </p>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-blue-300 mt-1.5">
                        — Keep going!
                    </p>
                </div>

                {/* Decorative Mountain Vector */}
                <svg
                    className="absolute bottom-0 left-0 right-0 w-full h-16 pointer-events-none"
                    viewBox="0 0 200 60"
                    preserveAspectRatio="none"
                >
                    <polygon
                        points="0,60 50,22 105,60"
                        className="fill-blue-300/40 dark:fill-blue-900/40"
                    />
                    <polygon
                        points="65,60 130,10 190,60"
                        className="fill-indigo-400/50 dark:fill-indigo-500/40"
                    />
                    <polygon
                        points="125,60 170,25 200,60"
                        className="fill-purple-400/40 dark:fill-purple-600/30"
                    />
                </svg>
            </div>

            {/* 2. Quick Actions Card */}
            <div className="bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-5 shadow-sm transition-colors">
                <div className="flex items-center gap-2 mb-4">
                    <Zap size={16} className="text-blue-600 dark:text-blue-400" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Quick Actions
                    </h3>
                </div>

                <div className="flex flex-col gap-2.5">
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-2.5 px-4 rounded-xl text-xs font-semibold shadow-md shadow-blue-600/20 transition-all"
                    >
                        <Plus size={16} strokeWidth={2.5} />
                        <span>Add New Task</span>
                    </button>

                    {secondaryActions.map(({ label, Icon }) => (
                        <button
                            key={label}
                            type="button"
                            className="w-full flex items-center justify-between bg-slate-50 dark:bg-gray-800/40 hover:bg-slate-100 dark:hover:bg-gray-800 border border-slate-200/80 dark:border-gray-700/80 text-slate-700 dark:text-gray-200 py-2.5 px-3.5 rounded-xl text-xs font-medium transition-colors"
                        >
                            <span className="flex items-center gap-2.5">
                                <Icon size={15} className="text-blue-600 dark:text-blue-400" />
                                <span>{label}</span>
                            </span>
                            <ChevronRight size={14} className="text-slate-400" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}