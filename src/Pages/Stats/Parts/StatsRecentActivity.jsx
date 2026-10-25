// src/components/Statistics/StatsRecentActivity.jsx
import React from 'react';
import { Clock } from 'lucide-react';

const activities = [
    {
        title: 'Task marked as completed',
        subtitle: 'Build TaskFlow dashboard UI',
        time: '2h ago',
        dot: 'bg-emerald-500',
    },
    {
        title: 'New task added',
        subtitle: 'Learn SQL basics',
        time: '4h ago',
        dot: 'bg-blue-500',
    },
    {
        title: 'Task updated',
        subtitle: 'Workout / Stay healthy',
        time: '5h ago',
        dot: 'bg-amber-500',
    },
    {
        title: 'Sample tasks imported',
        subtitle: '5 tasks from DummyJSON',
        time: '6h ago',
        dot: 'bg-purple-500',
    },
];

export default function StatsRecentActivity() {
    return (
        <div className="bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-5 shadow-sm transition-colors h-full">
            <div className="flex items-center gap-2 mb-5">
                <Clock size={16} className="text-blue-600 dark:text-blue-400" />
                <h2 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                    Recent Activity
                </h2>
            </div>

            <div className="flex flex-col gap-4">
                {activities.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                            <span className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${item.dot}`} />
                            <div className="min-w-0">
                                <p className="text-xs md:text-sm font-semibold text-slate-800 dark:text-gray-200 truncate">
                                    {item.title}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5 truncate">
                                    {item.subtitle}
                                </p>
                            </div>
                        </div>
                        <span className="text-[11px] font-medium text-slate-400 dark:text-gray-500 whitespace-nowrap">
                            {item.time}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}