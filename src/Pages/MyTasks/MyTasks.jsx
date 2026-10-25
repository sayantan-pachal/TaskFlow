import React from 'react';
import { Plus } from 'lucide-react';
import TasksFilterBar from './Parts/TasksFilterBar';
import TaskList from './Parts/TaskList';
import TasksSidebar from './Parts/TasksSidebar';

export default function MyTasks() {
    return (
        <div className="w-full max-w-7xl mx-auto pb-8">
        <div className="mb-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        My Tasks
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
                        Manage your tasks and stay productive.
                    </p>
                </div>

                <button
                    type="button"
                    className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-md shadow-blue-600/20 transition-all"
                >
                    <Plus size={18} strokeWidth={2.5} />
                    <span>Add Task</span>
                </button>
            </div>
        </div>


            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

                <div className="lg:col-span-3 flex flex-col">
                    <TasksFilterBar />
                    <TaskList />
                </div>

                <div className="lg:col-span-1">
                    <TasksSidebar />
                </div>
            </div>
        </div>
    );
}