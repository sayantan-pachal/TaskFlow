import React from 'react';
import { ListTodo, CheckCircle2, Clock, Activity } from 'lucide-react';

export default function StatsCards() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Tasks */}
            <div className="bg-white dark:bg-[#161b22] p-4 rounded-2xl border border-slate-200 dark:border-gray-800 flex items-center gap-4 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500">
                    <ListTodo size={24} />
                </div>
                <div>
                    <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">Total Tasks</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">12</h3>
                    <p className="text-[10px] text-emerald-500 font-medium">↑ 2 today</p>
                </div>
            </div>

            {/* Completed */}
            <div className="bg-white dark:bg-[#161b22] p-4 rounded-2xl border border-slate-200 dark:border-gray-800 flex items-center gap-4 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500">
                    <CheckCircle2 size={24} />
                </div>
                <div>
                    <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">Completed</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">7</h3>
                    <p className="text-[10px] text-emerald-500 font-medium">58%</p>
                </div>
            </div>

            {/* Pending */}
            <div className="bg-white dark:bg-[#161b22] p-4 rounded-2xl border border-slate-200 dark:border-gray-800 flex items-center gap-4 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
                    <Clock size={24} />
                </div>
                <div>
                    <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">Pending</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">5</h3>
                    <p className="text-[10px] text-orange-500 font-medium">42%</p>
                </div>
            </div>

            {/* Completion Rate */}
            <div className="bg-white dark:bg-[#161b22] p-4 rounded-2xl border border-slate-200 dark:border-gray-800 flex items-center gap-4 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Activity size={24} />
                </div>
                <div>
                    <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">Completion Rate</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">58%</h3>
                    <div className="w-full bg-slate-100 dark:bg-gray-800 rounded-full h-1.5 mt-1">
                        <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '58%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}