import React from 'react';
import { CheckCircle2, Clock, TrendingUp, CheckSquare } from 'lucide-react';

export default function StatsOverviewCards() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-5 mb-6">
            {/* 1. Total Tasks */}
            <div className="bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-4 md:p-5 shadow-sm transition-colors">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20">
                        <CheckSquare size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-500 dark:text-gray-400">
                            Total Tasks
                        </p>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                            12
                        </h3>
                        <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                            ↑ 2 today
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. Completed */}
            <div className="bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-4 md:p-5 shadow-sm transition-colors">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                        <CheckCircle2 size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-500 dark:text-gray-400">
                            Completed
                        </p>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                            7
                        </h3>
                        <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                            ↑ 58%
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. Pending */}
            <div className="bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-4 md:p-5 shadow-sm transition-colors">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
                        <Clock size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-500 dark:text-gray-400">
                            Pending
                        </p>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                            5
                        </h3>
                        <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 mt-1">
                            ↑ 42%
                        </p>
                    </div>
                </div>
            </div>

            {/* 4. Completion Rate */}
            <div className="bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-4 md:p-5 shadow-sm transition-colors flex items-center justify-between">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-600/20">
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-500 dark:text-gray-400">
                            Completion Rate
                        </p>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                            58%
                        </h3>
                    </div>
                </div>

                {/* Mini Circular Progress Ring */}
                <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 44 44">
                        <circle
                            cx="22"
                            cy="22"
                            r="17"
                            fill="none"
                            className="stroke-slate-100 dark:stroke-gray-800"
                            strokeWidth="4.5"
                        />
                        <circle
                            cx="22"
                            cy="22"
                            r="17"
                            fill="none"
                            className="stroke-blue-600 dark:stroke-blue-500"
                            strokeWidth="4.5"
                            strokeDasharray="106.8"
                            strokeDashoffset="44.8"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}