import React, { useMemo } from 'react';
import { Clock } from 'lucide-react';
import { useTasks } from '../../../context/TaskContext';

export default function StatsRecentActivity() {
    const { tasks } = useTasks();

    const activities = useMemo(() => {
        if (!tasks || tasks.length === 0) return [];

        const feed = [];
        const customTasks = tasks.filter((t) => !t.isSample);
        const sampleTasks = tasks.filter((t) => t.isSample);

        customTasks.slice(0, 3).forEach((task) => {
            if (task.status === 'Completed') {
                feed.push({
                    id: `stat-act-${task.id}`,
                    title: 'Task marked as completed',
                    subtitle: task.title,
                    time: task.date || 'Today',
                    dot: 'bg-emerald-500',
                });
            } else if (task.status === 'In Progress') {
                feed.push({
                    id: `stat-act-${task.id}`,
                    title: 'Task updated',
                    subtitle: task.title,
                    time: task.date || 'Today',
                    dot: 'bg-amber-500',
                });
            } else {
                feed.push({
                    id: `stat-act-${task.id}`,
                    title: 'New task added',
                    subtitle: task.title,
                    time: task.date || 'Today',
                    dot: 'bg-blue-500',
                });
            }
        });

        if (sampleTasks.length > 0) {
            feed.push({
                id: 'stat-act-samples',
                title: 'Sample tasks imported',
                subtitle: `${sampleTasks.length} tasks from DummyJSON`,
                time: 'Imported',
                dot: 'bg-purple-500',
            });
        }

        return feed.slice(0, 4);
    }, [tasks]);

    return (
        <div className="bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-5 shadow-sm transition-colors h-full">
            <div className="flex items-center gap-2 mb-5">
                <Clock size={16} className="text-blue-600 dark:text-blue-400" />
                <h2 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                    Recent Activity
                </h2>
            </div>

            {activities.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-gray-400 py-6 text-center">
                    No recent activity yet. Add or import tasks to see updates.
                </p>
            ) : (
                <div className="flex flex-col gap-4">
                    {activities.map((item) => (
                        <div key={item.id} className="flex items-start justify-between gap-3">
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
            )}
        </div>
    );
}