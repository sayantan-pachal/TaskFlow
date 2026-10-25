import React, { useMemo } from 'react';
import { useTasks } from '../../../context/TaskContext';

export default function RecentActivity() {
    const { tasks } = useTasks();

    const activities = useMemo(() => {
        if (!tasks || tasks.length === 0) return [];

        const feed = [];
        const customTasks = tasks.filter((t) => !t.isSample);
        const sampleTasks = tasks.filter((t) => t.isSample);

        customTasks.slice(0, 3).forEach((task) => {
            if (task.status === 'Completed') {
                feed.push({
                    id: `act-${task.id}`,
                    title: 'Task marked as completed',
                    subtext: task.title,
                    time: task.date || 'Today',
                    color: 'bg-emerald-500',
                });
            } else if (task.status === 'In Progress') {
                feed.push({
                    id: `act-${task.id}`,
                    title: 'Task in progress',
                    subtext: task.title,
                    time: task.date || 'Today',
                    color: 'bg-orange-500',
                });
            } else {
                feed.push({
                    id: `act-${task.id}`,
                    title: 'New task added',
                    subtext: task.title,
                    time: task.date || 'Today',
                    color: 'bg-blue-500',
                });
            }
        });

        if (sampleTasks.length > 0) {
            feed.push({
                id: 'act-samples',
                title: 'Sample tasks imported',
                subtext: `${sampleTasks.length} tasks from DummyJSON`,
                time: 'Imported',
                color: 'bg-purple-500',
            });
        }

        return feed.slice(0, 4);
    }, [tasks]);

    return (
        <div className="bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-gray-800 p-5 transition-colors">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
            
            {activities.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-gray-400 py-4 text-center">
                    No recent activity yet.
                </p>
            ) : (
                <div className="relative pl-3 border-l border-slate-200 dark:border-gray-700 space-y-6">
                    {activities.map((activity) => (
                        <div key={activity.id} className="relative">
                            <div className={`absolute -left-4.25 top-1 w-3 h-3 rounded-full ${activity.color} ring-4 ring-white dark:ring-[#161b22]`} />
                            
                            <div className="flex justify-between items-start gap-4">
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-slate-900 dark:text-gray-200 truncate">
                                        {activity.title}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5 truncate">
                                        {activity.subtext}
                                    </p>
                                </div>
                                <span className="text-[10px] text-slate-400 dark:text-gray-500 whitespace-nowrap">
                                    {activity.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}