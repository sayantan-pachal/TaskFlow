import React, { useState, useMemo } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import TasksFilterBar from './Parts/TasksFilterBar';
import TaskList from './Parts/TaskList';
import TasksSidebar from './Parts/TasksSidebar';

const PRIORITY_WEIGHT = { High: 1, Medium: 2, Low: 3 };

const isSameDay = (dateA, dateB) =>
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate();

export default function MyTasks() {
    const { tasks, openTaskModal, clearCompleted } = useTasks();
    const [activeFilter, setActiveFilter] = useState('All');
    const [sortBy, setSortBy] = useState('dueDate');

    const hasCompletedTasks = tasks.some((t) => t.status === 'Completed');

    // Filter and sort tasks dynamically
    const filteredAndSortedTasks = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filtered = tasks.filter((task) => {
            const taskDate = new Date(task.rawDate || task.date);
            taskDate.setHours(0, 0, 0, 0);

            if (activeFilter === 'Completed') return task.status === 'Completed';
            if (activeFilter === 'Today') return isSameDay(taskDate, today);
            if (activeFilter === 'Upcoming') return taskDate > today && task.status !== 'Completed';
            return true; // 'All'
        });

        return [...filtered].sort((a, b) => {
            if (sortBy === 'priority') {
                return (PRIORITY_WEIGHT[a.priority] || 4) - (PRIORITY_WEIGHT[b.priority] || 4);
            }
            if (sortBy === 'status') {
                return (a.status || '').localeCompare(b.status || '');
            }
            if (sortBy === 'title') {
                return (a.title || '').localeCompare(b.title || '');
            }
            // Default: 'dueDate'
            return new Date(a.rawDate || a.date) - new Date(b.rawDate || b.date);
        });
    }, [tasks, activeFilter, sortBy]);

    return (
        <div className="w-full max-w-7xl mx-auto pb-8">
            <div className="mb-6">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            My Tasks
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
                            Manage your tasks and stay productive.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        {hasCompletedTasks && (
                            <button
                                type="button"
                                onClick={clearCompleted}
                                className="flex items-center gap-1.5 border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all"
                            >
                                <Trash2 size={16} />
                                <span className="hidden sm:inline">Clear Completed</span>
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => openTaskModal()}
                            className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                        >
                            <Plus size={18} strokeWidth={2.5} />
                            <span>Add Task</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                <div className="lg:col-span-3 flex flex-col">
                    <TasksFilterBar
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                    />
                    <TaskList tasksToRender={filteredAndSortedTasks} />
                </div>

                <div className="lg:col-span-1">
                    <TasksSidebar />
                </div>
            </div>
        </div>
    );
}