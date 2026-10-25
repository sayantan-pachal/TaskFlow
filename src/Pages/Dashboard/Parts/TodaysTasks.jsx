import React from 'react';
import { CalendarDays, Check } from 'lucide-react';

const tasksData = [
    { id: 1, title: "Complete web development assignment", category: "Study", categoryColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", priority: "High", priorityColor: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", date: "Oct 25, 2025", status: "In Progress", statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", checked: true },
    { id: 2, title: "Build TaskFlow dashboard UI", category: "Design", categoryColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400", priority: "Medium", priorityColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", date: "Oct 27, 2025", status: "Pending", statusColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", checked: true },
    { id: 3, title: "Read one research paper", category: "Research", categoryColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", priority: "Low", priorityColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", date: "Oct 30, 2025", status: "Pending", statusColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", checked: false },
    { id: 4, title: "Workout / Stay healthy", category: "Health", categoryColor: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400", priority: "Medium", priorityColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", date: "Oct 26, 2025", status: "Completed", statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", checked: true },
    { id: 5, title: "Learn SQL basics", category: "Course", categoryColor: "bg-slate-100 text-slate-700 dark:bg-gray-800 dark:text-gray-300", priority: "High", priorityColor: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", date: "Oct 28, 2025", status: "In Progress", statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", checked: false }
];

export default function TodaysTasks() {
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
                <button className="text-xs font-medium text-slate-700 dark:text-gray-300 bg-slate-50 dark:bg-gray-800/50 hover:bg-slate-100 dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-700 px-3 py-1.5 rounded-lg transition-colors">
                    View All
                </button>
            </div>

            {/* Desktop Table Headers (Hidden on Mobile) */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-slate-100 dark:border-gray-800 text-xs font-semibold text-slate-500 dark:text-gray-400">
                <div className="col-span-5">Title</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Priority</div>
                <div className="col-span-2">Due Date</div>
                <div className="col-span-1 text-right">Status</div>
            </div>

            {/* Task List */}
            <div className="flex flex-col">
                {tasksData.map((task) => (
                    <div key={task.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-slate-50 dark:border-gray-800/50 hover:bg-slate-50 dark:hover:bg-gray-800/20 transition-colors items-center">
                        
                        {/* Title & Checkbox */}
                        <div className="col-span-5 flex items-start md:items-center gap-3">
                            <button className={`mt-0.5 md:mt-0 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border transition-colors ${
                                task.checked 
                                ? 'bg-blue-600 border-blue-600 text-white' 
                                : 'bg-transparent border-slate-300 dark:border-gray-600 hover:border-blue-500'
                            }`}>
                                {task.checked && <Check size={14} strokeWidth={3} />}
                            </button>
                            <span className={`text-sm font-medium ${
                                task.checked ? 'text-slate-500 dark:text-gray-400 line-through' : 'text-slate-900 dark:text-gray-200'
                            }`}>
                                {task.title}
                            </span>
                        </div>

                        {/* Metadata (Category, Priority, Date, Status) */}
                        {/* On mobile, this wraps into a flex row. On desktop, it aligns to the grid. */}
                        <div className="col-span-1 md:col-span-7 flex flex-wrap md:grid md:grid-cols-7 gap-2 md:gap-4 items-center pl-8 md:pl-0">
                            <div className="md:col-span-2">
                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${task.categoryColor}`}>
                                    {task.category}
                                </span>
                            </div>
                            <div className="md:col-span-2">
                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${task.priorityColor}`}>
                                    {task.priority}
                                </span>
                            </div>
                            <div className="md:col-span-2 text-xs text-slate-500 dark:text-gray-400 whitespace-nowrap">
                                {task.date}
                            </div>
                            <div className="md:col-span-1 md:text-right">
                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${task.statusColor}`}>
                                    {task.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}