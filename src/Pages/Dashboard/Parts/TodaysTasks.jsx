import React, { useMemo } from 'react';
import { CalendarDays, Check } from 'lucide-react';
import { NavLink } from "react-router-dom";
import { useTasks } from '../../../context/TaskContext';

const getCategoryBadge = (category) => {
    switch (category?.toLowerCase()) {
        case 'gdg':
            return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
        case 'academics':
            return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
        case 'personal':
            return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
        case 'sample':
            return 'bg-slate-100 text-slate-700 dark:bg-gray-800 dark:text-gray-300';
        default:
            return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400';
    }
};

const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
        case 'high':
            return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
        case 'medium':
            return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
        case 'low':
            return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
        default:
            return 'bg-slate-100 text-slate-700 dark:bg-gray-800 dark:text-gray-300';
    }
};

const getStatusBadge = (status) => {
    switch (status) {
        case 'Completed':
            return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
        case 'In Progress':
            return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
        default:
            return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
    }
};

export default function TodaysTasks() {
    const { tasks, updateTask } = useTasks();

    // Prioritize tasks due today; fill up to 5 rows so the dashboard stays informative
    const displayedTasks = useMemo(() => {
        const todayStr = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
        const todayIso = new Date().toISOString().split('T')[0];

        const isToday = (t) => t.date === todayStr || t.rawDate === todayIso;
        const todayList = tasks.filter(isToday);
        const otherList = tasks.filter((t) => !isToday(t));

        return [...todayList, ...otherList].slice(0, 5);
    }, [tasks]);

    const handleToggle = (task) => {
        const isCompleted = task.status === 'Completed';
        updateTask(task.id, {
            status: isCompleted ? 'Pending' : 'Completed',
            checked: !isCompleted,
        });
    };

    return (
        <div className="bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-gray-800 overflow-hidden transition-colors">
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                    <CalendarDays className="text-slate-400 dark:text-gray-500" size={20} />
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Today's Tasks</h3>
                        <p className="text-xs text-slate-500 dark:text-gray-400">Here's what you need to do today</p>
                    </div>
                </div>
                <NavLink
                    to="/tasks"
                    className="text-xs font-medium text-slate-700 dark:text-gray-300 bg-slate-50 dark:bg-gray-800/50 hover:bg-slate-100 dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-700 px-3 py-1.5 rounded-lg transition-colors"
                >
                    View All
                </NavLink>
            </div>

            {/* Desktop Table Headers */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-slate-100 dark:border-gray-800 text-xs font-semibold text-slate-500 dark:text-gray-400">
                <div className="col-span-5">Title</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Priority</div>
                <div className="col-span-2">Due Date</div>
                <div className="col-span-1 text-right">Status</div>
            </div>

            {/* Task List */}
            {displayedTasks.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500 dark:text-gray-400">
                    No tasks scheduled yet. Use "Add New Task" or "Import Sample Tasks" to begin.
                </div>
            ) : (
                <div className="flex flex-col">
                    {displayedTasks.map((task) => {
                        const isCompleted = task.status === 'Completed';
                        return (
                            <div
                                key={task.id}
                                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-slate-50 dark:border-gray-800/50 hover:bg-slate-50 dark:hover:bg-gray-800/20 transition-colors items-center"
                            >
                                {/* Title & Checkbox */}
                                <div className="col-span-5 flex items-start md:items-center gap-3 min-w-0">
                                    <button
                                        type="button"
                                        onClick={() => handleToggle(task)}
                                        aria-label={`Mark ${task.title} as ${isCompleted ? 'pending' : 'completed'}`}
                                        className={`mt-0.5 md:mt-0 w-5 h-5 rounded shrink-0 flex items-center justify-center border transition-colors cursor-pointer ${
                                            isCompleted
                                                ? 'bg-blue-600 border-blue-600 text-white'
                                                : 'bg-transparent border-slate-300 dark:border-gray-600 hover:border-blue-500'
                                        }`}
                                    >
                                        {isCompleted && <Check size={14} strokeWidth={3} />}
                                    </button>
                                    <span
                                        className={`text-sm font-medium truncate ${
                                            isCompleted
                                                ? 'text-slate-500 dark:text-gray-400 line-through'
                                                : 'text-slate-900 dark:text-gray-200'
                                        }`}
                                    >
                                        {task.title}
                                    </span>
                                </div>

                                {/* Metadata */}
                                <div className="col-span-1 md:col-span-7 flex flex-wrap md:grid md:grid-cols-7 gap-2 md:gap-4 items-center pl-8 md:pl-0">
                                    <div className="md:col-span-2">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${getCategoryBadge(task.category)}`}>
                                            {task.category || 'General'}
                                        </span>
                                    </div>
                                    <div className="md:col-span-2">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${getPriorityBadge(task.priority)}`}>
                                            {task.priority || 'Low'}
                                        </span>
                                    </div>
                                    <div className="md:col-span-2 text-xs text-slate-500 dark:text-gray-400 whitespace-nowrap">
                                        {task.date}
                                    </div>
                                    <div className="md:col-span-1 md:text-right">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold whitespace-nowrap ${getStatusBadge(task.status)}`}>
                                            {task.status || 'Pending'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}