import React from 'react';
import {
    Code2,
    Layout,
    FileText,
    Heart,
    BookOpen,
    MoreVertical,
    Clock,
} from 'lucide-react';

const tasks = [
    {
        id: 1,
        title: 'Complete web development assignment',
        subtitle: 'Study • Build project',
        date: 'Oct 25, 2025',
        badge: 'High',
        badgeStyle:
            'bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400 border border-red-200/60 dark:border-red-500/20',
        dotColor: 'bg-red-500',
        Icon: Code2,
        iconBg: 'bg-blue-600 text-white',
    },
    {
        id: 2,
        title: 'Build TaskFlow dashboard UI',
        subtitle: 'Design • Development',
        date: 'Oct 27, 2025',
        badge: 'Medium',
        badgeStyle:
            'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border border-amber-200/60 dark:border-amber-500/20',
        dotColor: 'bg-amber-500',
        Icon: Layout,
        iconBg: 'bg-orange-500 text-white',
    },
    {
        id: 3,
        title: 'Read one research paper',
        subtitle: 'Research • Academic',
        date: 'Oct 30, 2025',
        badge: 'Low',
        badgeStyle:
            'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20',
        dotColor: 'bg-emerald-500',
        Icon: FileText,
        iconBg: 'bg-emerald-500 text-white',
    },
    {
        id: 4,
        title: 'Workout / Stay healthy',
        subtitle: 'Health • Fitness',
        date: 'Oct 28, 2025',
        badge: 'Personal',
        badgeStyle:
            'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400 border border-purple-200/60 dark:border-purple-500/20',
        dotColor: 'bg-purple-500',
        Icon: Heart,
        iconBg: 'bg-purple-600 text-white',
    },
    {
        id: 5,
        title: 'Learn SQL basics',
        subtitle: 'Course • Skills',
        date: 'Oct 28, 2025',
        badge: 'In Progress',
        badgeStyle:
            'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20',
        dotColor: 'bg-blue-500',
        Icon: BookOpen,
        iconBg: 'bg-blue-500 text-white',
    },
];

export default function TaskList() {
    return (
        <div className="flex flex-col gap-3">
            {tasks.map((task) => {
                const { id, title, subtitle, date, badge, badgeStyle, dotColor, Icon, iconBg } = task;
                return (
                    <div
                        key={id}
                        className="group bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-sm hover:border-blue-400/60 dark:hover:border-gray-700 transition-all"
                    >
                        {/* Left Section: Checkbox + Icon/Dot + Text */}
                        <div className="flex items-start md:items-center gap-3.5 min-w-0 flex-1">
                            {/* Unchecked Box Template */}
                            <button
                                type="button"
                                aria-label={`Mark ${title} as completed`}
                                className="mt-1 md:mt-0 w-4 h-4 rounded border border-slate-300 dark:border-gray-600 bg-transparent hover:border-blue-500 shrink-0 transition-colors"
                            />

                            {/* Desktop Category Square Icon */}
                            <div
                                className={`hidden md:flex w-10 h-10 rounded-xl items-center justify-center shrink-0 shadow-sm ${iconBg}`}
                            >
                                <Icon size={20} />
                            </div>

                            {/* Title & Subtitle */}
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    {/* Mobile Colored Status Dot */}
                                    <span
                                        className={`md:hidden w-2.5 h-2.5 rounded-full shrink-0 ${dotColor}`}
                                    />
                                    <h3 className="text-sm md:text-base font-semibold text-slate-900 dark:text-gray-100 truncate">
                                        {title}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-gray-400 mt-1 pl-4 md:pl-0">
                                    <Clock size={12} className="md:hidden shrink-0 text-slate-400" />
                                    <span className="truncate">{subtitle}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Section: Badge, Due Date, and Desktop Menu */}
                        <div className="flex flex-col md:flex-row items-end md:items-center gap-1.5 md:gap-5 shrink-0">
                            <span
                                className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide ${badgeStyle}`}
                            >
                                {badge}
                            </span>

                            <span className="text-[11px] md:text-xs text-slate-500 dark:text-gray-400 whitespace-nowrap font-medium">
                                {date}
                            </span>

                            <button
                                type="button"
                                aria-label="Task options"
                                className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <MoreVertical size={16} />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}