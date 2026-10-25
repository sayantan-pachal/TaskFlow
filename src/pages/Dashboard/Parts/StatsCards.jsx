import React from 'react';
import { ListTodo, CheckCircle2, Clock, Activity } from 'lucide-react';
import { useTasks } from '../../../context/TaskContext';

export default function StatsCards() {
    const { tasks } = useTasks();

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    const pendingRate = totalTasks === 0 ? 0 : 100 - completionRate;

    const todayStr = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
    const todayIso = new Date().toISOString().split('T')[0];
    const todayCount = tasks.filter((t) => t.date === todayStr || t.rawDate === todayIso).length;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Tasks */}
            <div className="bg-white dark:bg-[#161b22] p-4 rounded-2xl border border-slate-200 dark:border-gray-800 flex items-center gap-4 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500 shrink-0">
                    <ListTodo size={24} />
                </div>
                <div>
                    <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">Total Tasks</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{totalTasks}</h3>
                    <p className="text-[10px] text-emerald-500 font-medium">↑ {todayCount} today</p>
                </div>
            </div>

            {/* Completed */}
            <div className="bg-white dark:bg-[#161b22] p-4 rounded-2xl border border-slate-200 dark:border-gray-800 flex items-center gap-4 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 shrink-0">
                    <CheckCircle2 size={24} />
                </div>
                <div>
                    <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">Completed</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{completedTasks}</h3>
                    <p className="text-[10px] text-emerald-500 font-medium">{completionRate}%</p>
                </div>
            </div>

            {/* Pending */}
            <div className="bg-white dark:bg-[#161b22] p-4 rounded-2xl border border-slate-200 dark:border-gray-800 flex items-center gap-4 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                    <Clock size={24} />
                </div>
                <div>
                    <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">Pending</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{pendingTasks}</h3>
                    <p className="text-[10px] text-orange-500 font-medium">{pendingRate}%</p>
                </div>
            </div>

            {/* Completion Rate */}
            <div className="bg-white dark:bg-[#161b22] p-4 rounded-2xl border border-slate-200 dark:border-gray-800 flex items-center gap-4 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                    <Activity size={24} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 dark:text-gray-400 font-medium truncate">Completion Rate</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{completionRate}%</h3>
                    <div className="w-full bg-slate-100 dark:bg-gray-800 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div
                            className="bg-purple-500 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${completionRate}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}