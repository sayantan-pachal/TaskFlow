import React, { useMemo } from 'react';
import { Clock, Plus } from 'lucide-react';
import { useTasks } from '../../../context/TaskContext';

const toLocalIso = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getTaskVisuals = (task) => {
    if (task.status === 'Completed') {
        return {
            badge: 'Completed',
            badgeStyle:
                'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20',
            dotColor: 'bg-emerald-500',
        };
    }
    if (task.status === 'In Progress') {
        return {
            badge: 'In Progress',
            badgeStyle:
                'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20',
            dotColor: 'bg-blue-500',
        };
    }

    switch (task.priority?.toLowerCase()) {
        case 'high':
            return {
                badge: 'High',
                badgeStyle:
                    'bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400 border border-red-200/60 dark:border-red-500/20',
                dotColor: 'bg-red-500',
            };
        case 'medium':
            return {
                badge: 'Medium',
                badgeStyle:
                    'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border border-amber-200/60 dark:border-amber-500/20',
                dotColor: 'bg-amber-500',
            };
        default:
            return {
                badge: task.priority || 'Low',
                badgeStyle:
                    'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20',
                dotColor: 'bg-emerald-500',
            };
    }
};

export default function CalendarSchedule({ selectedDate }) {
    const { tasks, openTaskModal } = useTasks();

    const formattedDate = selectedDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    const selectedIso = toLocalIso(selectedDate);
    const todayIso = toLocalIso(new Date());
    const isSelectedToday = selectedIso === todayIso;

    const dayPrefix = isSelectedToday
        ? 'Today'
        : selectedDate.toLocaleDateString('en-US', { weekday: 'short' });

    const { scheduledTasks, upcomingTasks } = useMemo(() => {
        const selectedStart = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate()
        );

        const scheduled = tasks.filter(
            (t) => t.rawDate === selectedIso || t.date === formattedDate
        );

        const upcoming = tasks
            .filter((t) => {
                if (t.status === 'Completed') return false;
                if (t.rawDate === selectedIso || t.date === formattedDate) return false;
                const taskDate = new Date(t.rawDate || t.date);
                taskDate.setHours(0, 0, 0, 0);
                return taskDate > selectedStart;
            })
            .sort((a, b) => new Date(a.rawDate || a.date) - new Date(b.rawDate || b.date))
            .slice(0, 4);

        return { scheduledTasks: scheduled, upcomingTasks: upcoming };
    }, [tasks, selectedDate, selectedIso, formattedDate]);

    return (
        <div className="flex flex-col gap-5">
            {/* Selected Date Tasks Card */}
            <div className="bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-5 shadow-sm transition-colors">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                        {dayPrefix}, {formattedDate}
                    </h3>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20">
                        {scheduledTasks.length} {scheduledTasks.length === 1 ? 'task' : 'tasks'}
                    </span>
                </div>

                {scheduledTasks.length === 0 ? (
                    <div className="py-6 text-center">
                        <p className="text-xs text-slate-500 dark:text-gray-400 mb-3">
                            No tasks scheduled for this date.
                        </p>
                        <button
                            type="button"
                            onClick={() =>
                                openTaskModal({
                                    title: '',
                                    category: 'Academics',
                                    priority: 'Medium',
                                    status: 'Pending',
                                    rawDate: selectedIso,
                                })
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 transition-colors cursor-pointer"
                        >
                            <Plus size={14} />
                            <span>Schedule Task</span>
                        </button>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100 dark:divide-gray-800/80">
                        {scheduledTasks.map((task) => {
                            const { badge, badgeStyle, dotColor } = getTaskVisuals(task);
                            return (
                                <div
                                    key={task.id}
                                    onClick={() => openTaskModal(task)}
                                    className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    <div className="flex items-start gap-3 min-w-0">
                                        <span
                                            className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${dotColor}`}
                                        />
                                        <div className="min-w-0">
                                            <h4
                                                className={`text-sm font-semibold leading-snug truncate ${
                                                    task.status === 'Completed'
                                                        ? 'text-slate-400 dark:text-gray-500 line-through'
                                                        : 'text-slate-900 dark:text-gray-100'
                                                }`}
                                            >
                                                {task.title}
                                            </h4>
                                            <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-gray-400 mt-1">
                                                <Clock size={12} className="text-slate-400 shrink-0" />
                                                <span>
                                                    {task.category || 'General'} • {task.status || 'Pending'}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                                        <span
                                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${badgeStyle}`}
                                        >
                                            {badge}
                                        </span>
                                        <span className="hidden md:block text-[11px] text-slate-400 dark:text-gray-500 font-medium">
                                            {task.date}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Upcoming Tasks Card (Desktop View) */}
            <div className="hidden md:block bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-5 shadow-sm transition-colors">
                <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white mb-4">
                    Upcoming
                </h3>

                {upcomingTasks.length === 0 ? (
                    <p className="text-xs text-slate-500 dark:text-gray-400 py-3 text-center">
                        No upcoming tasks after this date.
                    </p>
                ) : (
                    <div className="divide-y divide-slate-100 dark:divide-gray-800/80">
                        {upcomingTasks.map((task) => {
                            const { badge, badgeStyle, dotColor } = getTaskVisuals(task);
                            return (
                                <div
                                    key={task.id}
                                    onClick={() => openTaskModal(task)}
                                    className="py-2.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    <div className="flex items-start gap-3 min-w-0">
                                        <span
                                            className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${dotColor}`}
                                        />
                                        <div className="min-w-0">
                                            <h4 className="text-sm font-semibold text-slate-900 dark:text-gray-100 truncate">
                                                {task.title}
                                            </h4>
                                            <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-gray-400 mt-1">
                                                <Clock size={12} className="text-slate-400 shrink-0" />
                                                <span>{task.category || 'General'}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                                        <span
                                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${badgeStyle}`}
                                        >
                                            {badge}
                                        </span>
                                        <span className="text-[11px] text-slate-400 dark:text-gray-500 font-medium">
                                            {task.date}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}