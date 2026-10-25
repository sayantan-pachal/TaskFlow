import React from 'react';
import { Clock } from 'lucide-react';

const scheduledTasks = [
    {
        id: 1,
        title: 'Complete web development assignment',
        category: 'Study • Build project',
        time: '09:00 AM',
        badge: 'High',
        badgeStyle:
            'bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400 border border-red-200/60 dark:border-red-500/20',
        dotColor: 'bg-red-500',
    },
    {
        id: 2,
        title: 'Build TaskFlow dashboard UI',
        category: 'Design • Development',
        time: '02:00 PM',
        badge: 'Medium',
        badgeStyle:
            'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border border-amber-200/60 dark:border-amber-500/20',
        dotColor: 'bg-amber-500',
    },
    {
        id: 3,
        title: 'Learn SQL basics',
        category: 'Course • Skills',
        time: '06:00 PM',
        badge: 'In Progress',
        badgeStyle:
            'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20',
        dotColor: 'bg-blue-500',
    },
];

const upcomingTasks = [
    {
        id: 4,
        title: 'Read one research paper',
        category: 'Research • Academic',
        time: '10:00 AM',
        badge: 'Low',
        badgeStyle:
            'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20',
        dotColor: 'bg-emerald-500',
    },
];

export default function CalendarSchedule({ selectedDate }) {
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className="flex flex-col gap-5">
            {/* Selected Date Tasks Card */}
            <div className="bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-5 shadow-sm transition-colors">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                        Today, {formattedDate}
                    </h3>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20">
                        {scheduledTasks.length} tasks
                    </span>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-gray-800/80">
                    {scheduledTasks.map((task) => (
                        <div
                            key={task.id}
                            className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3"
                        >
                            {/* Left Side: Status Dot + Task Details */}
                            <div className="flex items-start gap-3 min-w-0">
                                <span
                                    className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${task.dotColor}`}
                                />
                                <div className="min-w-0">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-gray-100 leading-snug">
                                        {task.title}
                                    </h4>
                                    <p className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 dark:text-gray-400 mt-1">
                                        <Clock size={12} className="text-slate-400 shrink-0" />
                                        <span>{task.category}</span>
                                    </p>
                                    <p className="flex md:hidden items-center gap-1 text-xs text-slate-500 dark:text-gray-400 mt-1">
                                        <Clock size={12} className="text-slate-400 shrink-0" />
                                        <span>{task.time}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Right Side: Priority/Status Badge + Desktop Time */}
                            <div className="flex flex-col items-end gap-1.5 shrink-0">
                                <span
                                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${task.badgeStyle}`}
                                >
                                    {task.badge}
                                </span>
                                <span className="hidden md:block text-[11px] text-slate-400 dark:text-gray-500 font-medium">
                                    {task.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upcoming Tasks Card (Desktop View) */}
            <div className="hidden md:block bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-5 shadow-sm transition-colors">
                <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white mb-4">
                    Upcoming
                </h3>

                <div className="divide-y divide-slate-100 dark:divide-gray-800/80">
                    {upcomingTasks.map((task) => (
                        <div
                            key={task.id}
                            className="py-2 first:pt-0 last:pb-0 flex items-start justify-between gap-3"
                        >
                            <div className="flex items-start gap-3 min-w-0">
                                <span
                                    className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${task.dotColor}`}
                                />
                                <div className="min-w-0">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-gray-100">
                                        {task.title}
                                    </h4>
                                    <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-gray-400 mt-1">
                                        <Clock size={12} className="text-slate-400 shrink-0" />
                                        <span>{task.category}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-1.5 shrink-0">
                                <span
                                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${task.badgeStyle}`}
                                >
                                    {task.badge}
                                </span>
                                <span className="text-[11px] text-slate-400 dark:text-gray-500 font-medium">
                                    {task.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}