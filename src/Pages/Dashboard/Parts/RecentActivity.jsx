import React from 'react';

const activities = [
    { title: "Task marked as completed", subtext: "Workout / Stay healthy", time: "2h ago", color: "bg-emerald-500" },
    { title: "New task added", subtext: "Learn SQL basics", time: "4h ago", color: "bg-blue-500" },
    { title: "Task updated", subtext: "Build TaskFlow dashboard UI", time: "5h ago", color: "bg-orange-500" },
    { title: "Sample tasks imported", subtext: "5 tasks from DummyJSON", time: "6h ago", color: "bg-purple-500" }
];

export default function RecentActivity() {
    return (
        <div className="bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-gray-800 p-5 transition-colors">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
            
            <div className="relative pl-3 border-l border-slate-200 dark:border-gray-700 space-y-6">
                {activities.map((activity, index) => (
                    <div key={index} className="relative">
                        {/* Timeline Dot */}
                        <div className={`absolute -left-[17px] top-1 w-3 h-3 rounded-full ${activity.color} ring-4 ring-white dark:ring-[#161b22]`}></div>
                        
                        {/* Content */}
                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-gray-200">{activity.title}</p>
                                <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">{activity.subtext}</p>
                            </div>
                            <span className="text-[10px] text-slate-400 dark:text-gray-500 whitespace-nowrap">{activity.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}