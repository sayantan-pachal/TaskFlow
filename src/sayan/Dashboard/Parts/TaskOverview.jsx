import React from 'react';
import { useTasks } from '../../../context/TaskContext';

export default function TaskOverview() {
    const { tasks } = useTasks();

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    // Circumference for r=48 is 2 * Math.PI * 48 ≈ 301.59
    const circumference = 301.59;
    const strokeDashoffset = circumference - (circumference * completionRate) / 100;

    // Scale SVG Y coordinates (0 is top, 100 is bottom) based on current task counts (max 15)
    const clampY = (count) => Math.max(10, Math.min(92, 95 - (count / 15) * 80));
    const endCompletedY = clampY(completedTasks);
    const midCompletedY = clampY(Math.round(completedTasks * 0.6));
    const endPendingY = clampY(pendingTasks);
    const midPendingY = clampY(Math.round(pendingTasks * 0.6));

    return (
        <div className="bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-gray-800 p-5 mb-8 transition-colors flex flex-col xl:flex-row gap-8 items-center">
            {/* Left Side: Line Chart */}
            <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Task Overview</h3>
                        <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">Your task progress at a glance</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium">
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-gray-300">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Completed
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-gray-300">
                            <span className="w-2 h-2 rounded-full bg-orange-500" /> Pending
                        </div>
                    </div>
                </div>

                <div className="w-full h-40 relative">
                    <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-slate-400 dark:text-gray-500">
                        <span>15</span><span>10</span><span>5</span><span>0</span>
                    </div>
                    
                    <div className="ml-6 h-full relative">
                        <div className="absolute inset-0 flex flex-col justify-between pb-6">
                            <div className="border-t border-slate-100 dark:border-gray-800 w-full h-0" />
                            <div className="border-t border-slate-100 dark:border-gray-800 w-full h-0" />
                            <div className="border-t border-slate-100 dark:border-gray-800 w-full h-0" />
                            <div className="border-t border-slate-200 dark:border-gray-700 w-full h-0" />
                        </div>

                        <svg className="absolute inset-0 w-full h-[calc(100%-1.5rem)] overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                            {/* Completed Line (Emerald) */}
                            <path
                                d={`M 0,85 C 25,75 35,${midCompletedY} 50,${midCompletedY} C 70,${midCompletedY} 80,${endCompletedY} 100,${endCompletedY}`}
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                            <circle cx="0" cy="85" r="3" fill="#10b981" />
                            <circle cx="50" cy={midCompletedY} r="3" fill="#10b981" />
                            <circle cx="100" cy={endCompletedY} r="3" fill="#10b981" />

                            {/* Pending Line (Orange) */}
                            <path
                                d={`M 0,90 C 25,85 35,${midPendingY} 50,${midPendingY} C 70,${midPendingY} 80,${endPendingY} 100,${endPendingY}`}
                                fill="none"
                                stroke="#f97316"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                            <circle cx="0" cy="90" r="3" fill="#f97316" />
                            <circle cx="50" cy={midPendingY} r="3" fill="#f97316" />
                            <circle cx="100" cy={endPendingY} r="3" fill="#f97316" />
                        </svg>

                        <div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px] text-slate-400 dark:text-gray-500">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Circular Progress */}
            <div className="flex flex-col items-center justify-center min-w-30">
                <div className="relative w-28 h-28 mb-3 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                        <circle cx="56" cy="56" r="48" fill="none" className="stroke-slate-100 dark:stroke-gray-800" strokeWidth="12" />
                        <circle
                            cx="56"
                            cy="56"
                            r="48"
                            fill="none"
                            className="stroke-blue-600 dark:stroke-blue-500 transition-all duration-700 ease-out"
                            strokeWidth="12"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                        />
                    </svg>
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{completionRate}%</span>
                </div>
                <p className="text-xs font-medium text-slate-500 dark:text-gray-400">Tasks Completed</p>
            </div>
        </div>
    );
}