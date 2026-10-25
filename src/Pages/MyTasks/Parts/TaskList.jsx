import React from 'react';
import { useTasks } from '../../../context/TaskContext';
import {
    Code2,
    Layout,
    Heart,
    BookOpen,
    Clock,
    Check,
    Pencil,
    Trash2
} from 'lucide-react';

const getCategoryStyle = (category) => {
    switch (category?.toLowerCase()) {
        case 'academics': return { Icon: BookOpen, iconBg: 'bg-blue-600 text-white' };
        case 'gdg': return { Icon: Code2, iconBg: 'bg-orange-500 text-white' };
        case 'personal': return { Icon: Heart, iconBg: 'bg-purple-600 text-white' };
        case 'sample': return { Icon: Layout, iconBg: 'bg-slate-500 text-white' };
        default: return { Icon: Layout, iconBg: 'bg-indigo-500 text-white' };
    }
};

const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
        case 'high': return { badge: 'High', style: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400 border border-red-200/60 dark:border-red-500/20', dot: 'bg-red-500' };
        case 'medium': return { badge: 'Medium', style: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border border-amber-200/60 dark:border-amber-500/20', dot: 'bg-amber-500' };
        case 'low': return { badge: 'Low', style: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20', dot: 'bg-emerald-500' };
        default: return { badge: 'Low', style: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-gray-300 border border-slate-200 dark:border-gray-700', dot: 'bg-slate-400' };
    }
};

export default function TaskList({ tasksToRender }) {
    const { tasks, updateTask, deleteTask, openTaskModal } = useTasks();
    const displayTasks = tasksToRender ?? tasks;

    if (!displayTasks || displayTasks.length === 0) {
        return (
            <div className="text-center py-12 bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl">
                <p className="text-slate-500 dark:text-gray-400 font-medium text-sm">
                    No tasks match this view. Click "Add Task" to create one.
                </p>
            </div>
        );
    }

    const toggleStatus = (task) => {
        const isCompleted = task.status === 'Completed';
        updateTask(task.id, { 
            status: isCompleted ? 'Pending' : 'Completed',
            checked: !isCompleted
        });
    };

    return (
        <div className="flex flex-col gap-3">
            {displayTasks.map((task) => {
                const { Icon, iconBg } = getCategoryStyle(task.category);
                const { badge, style: badgeStyle, dot: dotColor } = getPriorityStyle(task.priority);
                const isCompleted = task.status === 'Completed';

                return (
                    <div
                        key={task.id}
                        className={`group bg-white dark:bg-[#161b22] border rounded-2xl p-4 flex items-center justify-between gap-3 shadow-sm transition-all ${
                            isCompleted 
                                ? 'border-slate-100 dark:border-gray-800/50 opacity-60' 
                                : 'border-slate-200/90 dark:border-gray-800 hover:border-blue-400/60 dark:hover:border-gray-700'
                        }`}
                    >
                        <div className="flex items-start md:items-center gap-3.5 min-w-0 flex-1">
                            <button
                                type="button"
                                onClick={() => toggleStatus(task)}
                                aria-label={`Mark ${task.title} as ${isCompleted ? 'pending' : 'completed'}`}
                                className={`mt-1 md:mt-0 w-5 h-5 rounded flex items-center justify-center border shrink-0 transition-colors cursor-pointer ${
                                    isCompleted 
                                        ? 'bg-blue-600 border-blue-600 text-white' 
                                        : 'border-slate-300 dark:border-gray-600 bg-transparent hover:border-blue-500'
                                }`}
                            >
                                {isCompleted && <Check size={14} strokeWidth={3} />}
                            </button>

                            <div className={`hidden md:flex w-10 h-10 rounded-xl items-center justify-center shrink-0 shadow-sm ${iconBg}`}>
                                <Icon size={20} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    <span className={`md:hidden w-2.5 h-2.5 rounded-full shrink-0 ${dotColor}`} />
                                    <h3 className={`text-sm md:text-base font-semibold truncate ${
                                        isCompleted ? 'text-slate-500 dark:text-gray-500 line-through' : 'text-slate-900 dark:text-gray-100'
                                    }`}>
                                        {task.title}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-gray-400 mt-1 pl-4 md:pl-0">
                                    <Clock size={12} className="md:hidden shrink-0 text-slate-400" />
                                    <span className="truncate">
                                        {task.category} • {task.status} {task.isSample ? '• Sample' : ''}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-end md:items-center gap-1.5 md:gap-4 shrink-0">
                            <span className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide ${badgeStyle}`}>
                                {badge}
                            </span>
                            <span className="text-[11px] md:text-xs text-slate-500 dark:text-gray-400 whitespace-nowrap font-medium">
                                {task.date}
                            </span>

                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() => openTaskModal(task)}
                                    aria-label="Edit task"
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                                >
                                    <Pencil size={15} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => deleteTask(task.id)}
                                    aria-label="Delete task"
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}