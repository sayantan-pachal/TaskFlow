import React from 'react';

export default function TaskOverview() {
    return (
        <div className="bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-gray-800 p-5 mb-8 transition-colors flex flex-col xl:flex-row gap-8 items-center">
            
            {/* Left Side: Mock Line Chart */}
            <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Task Overview</h3>
                        <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">Your task progress at a glance</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium">
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-gray-300">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Completed
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-gray-300">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span> Pending
                        </div>
                    </div>
                </div>

                {/* SVG Mock Chart */}
                <div className="w-full h-40 relative">
                    {/* Y-Axis Labels */}
                    <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-slate-400 dark:text-gray-500">
                        <span>15</span><span>10</span><span>5</span><span>0</span>
                    </div>
                    
                    {/* Chart Area */}
                    <div className="ml-6 h-full relative">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pb-6">
                            <div className="border-t border-slate-100 dark:border-gray-800 w-full h-0"></div>
                            <div className="border-t border-slate-100 dark:border-gray-800 w-full h-0"></div>
                            <div className="border-t border-slate-100 dark:border-gray-800 w-full h-0"></div>
                            <div className="border-t border-slate-200 dark:border-gray-700 w-full h-0"></div>
                        </div>

                        {/* SVGs for the curved lines */}
                        <svg className="absolute inset-0 w-full h-[calc(100%-1.5rem)] overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                            {/* Completed Line (Emerald) */}
                            <path d="M 0,80 C 20,70 30,30 50,40 C 70,50 80,20 100,30" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                            {/* Completed Data Points */}
                            <circle cx="0" cy="80" r="3" fill="#10b981" />
                            <circle cx="50" cy="40" r="3" fill="#10b981" />
                            <circle cx="100" cy="30" r="3" fill="#10b981" />

                            {/* Pending Line (Orange) */}
                            <path d="M 0,90 C 20,85 30,60 50,65 C 70,70 80,45 100,50" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
                            {/* Pending Data Points */}
                            <circle cx="0" cy="90" r="3" fill="#f97316" />
                            <circle cx="50" cy="65" r="3" fill="#f97316" />
                            <circle cx="100" cy="50" r="3" fill="#f97316" />
                        </svg>

                        {/* X-Axis Labels */}
                        <div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px] text-slate-400 dark:text-gray-500">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Circular Progress */}
            <div className="flex flex-col items-center justify-center min-w-[120px]">
                <div className="relative w-28 h-28 mb-3 flex items-center justify-center">
                    {/* Background Circle */}
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                        <circle cx="56" cy="56" r="48" fill="none" className="stroke-slate-100 dark:stroke-gray-800" strokeWidth="12" />
                        {/* Progress Circle (58%) */}
                        <circle cx="56" cy="56" r="48" fill="none" className="stroke-blue-600 dark:stroke-blue-500" strokeWidth="12" strokeDasharray="301.59" strokeDashoffset="126.67" strokeLinecap="round" />
                    </svg>
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">58%</span>
                </div>
                <p className="text-xs font-medium text-slate-500 dark:text-gray-400">Tasks Completed</p>
            </div>
            
        </div>
    );
}