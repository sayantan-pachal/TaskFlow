import React, { useState, useEffect, useRef, useMemo } from "react";
import { Bell, Clock, AlertCircle, CheckCircle2, Settings2 } from "lucide-react";
import { useTasks } from "../../context/TaskContext";
import { NavLink } from "react-router-dom";

// Helper to determine how far away a task deadline is
const getDeadlineStatus = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(dateString);
    targetDate.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { label: "Overdue", color: "text-red-600 dark:text-red-400", urgent: true };
    if (diffDays === 0) return { label: "Due Today", color: "text-amber-600 dark:text-amber-400", urgent: true };
    if (diffDays === 1) return { label: "Due Tomorrow", color: "text-blue-600 dark:text-blue-400", urgent: false };
    return { label: `In ${diffDays} days`, color: "text-slate-500 dark:text-slate-400", urgent: false };
};

export default function Notification() {
    const { tasks } = useTasks();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Read settings directly when calculating notifications
    const notificationsEnabled = JSON.parse(localStorage.getItem("taskflow_notifs") ?? "true");
    const deadlinesEnabled = JSON.parse(localStorage.getItem("taskflow_deadlines") ?? "true");

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Process and sort tasks for the notification panel
    const notificationList = useMemo(() => {
        if (!notificationsEnabled || !deadlinesEnabled) return [];

        const pendingTasks = tasks.filter((t) => t.status !== "Completed");

        return pendingTasks
            .map((task) => {
                const deadlineInfo = getDeadlineStatus(task.rawDate || task.date);
                return { ...task, deadlineInfo };
            })
            // Only show tasks due within the next 3 days, or overdue
            .filter((task) => {
                const diffDays = Math.ceil((new Date(task.rawDate || task.date) - new Date()) / (1000 * 60 * 60 * 24));
                return diffDays <= 3;
            })
            // Sort by urgency (Overdue/Today first), then by Priority (High > Medium > Low)
            .sort((a, b) => {
                const dateA = new Date(a.rawDate || a.date).getTime();
                const dateB = new Date(b.rawDate || b.date).getTime();
                if (dateA !== dateB) return dateA - dateB;

                const priorityWeight = { High: 1, Medium: 2, Low: 3 };
                return (priorityWeight[a.priority] || 4) - (priorityWeight[b.priority] || 4);
            })
            .slice(0, 5); // Display top 5 urgent notifications
    }, [tasks, notificationsEnabled, deadlinesEnabled]);

    const hasUnread = notificationList.length > 0;

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open notifications"
                className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer ${
                    isOpen
                        ? "bg-slate-200 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                        : "bg-black/5 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-gray-800 text-slate-600 dark:text-slate-300"
                }`}
            >
                <Bell size={20} className={isOpen ? "fill-current text-blue-600/20" : ""} />
                
                {/* Unread Ping Indicator */}
                {hasUnread && (
                    <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 border border-white dark:border-[#161b22]"></span>
                    </span>
                )}
            </button>

            {/* Floating Dropdown Panel */}
            {isOpen && (
                <div className="absolute right-[-12px] md:right-0 mt-3 w-80 md:w-96 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="rounded-2xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#161b22] shadow-xl overflow-hidden flex flex-col max-h-112">
                        
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 dark:border-gray-800/80 bg-slate-50/50 dark:bg-[#0d1117]/50">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                Notifications
                            </h3>
                            <NavLink
                                to="/settings"
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-gray-200 transition-colors cursor-pointer"
                                aria-label="Notification settings"
                            >
                                <Settings2 size={16} />
                            </NavLink>
                        </div>

                        {/* Content Body */}
                        <div className="overflow-y-auto overscroll-contain">
                            {!notificationsEnabled ? (
                                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                                    <Bell size={32} className="text-slate-300 dark:text-gray-700 mb-3" />
                                    <p className="text-sm font-medium text-slate-600 dark:text-gray-300">
                                        Notifications are disabled
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-gray-500 mt-1">
                                        Enable them in settings to see deadline alerts.
                                    </p>
                                </div>
                            ) : notificationList.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                                    <CheckCircle2 size={32} className="text-emerald-400 dark:text-emerald-500/50 mb-3" />
                                    <p className="text-sm font-medium text-slate-600 dark:text-gray-300">
                                        You're all caught up!
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-gray-500 mt-1">
                                        No approaching deadlines.
                                    </p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100 dark:divide-gray-800/80">
                                    {notificationList.map((task) => (
                                        <div 
                                            key={task.id} 
                                            className="p-4 hover:bg-slate-50 dark:hover:bg-gray-800/30 transition-colors cursor-default"
                                        >
                                            <div className="flex gap-3">
                                                <div className={`mt-0.5 shrink-0 ${task.deadlineInfo.urgent ? 'text-red-500' : 'text-amber-500'}`}>
                                                    {task.deadlineInfo.urgent ? <AlertCircle size={18} /> : <Clock size={18} />}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-semibold text-slate-800 dark:text-gray-200 leading-snug truncate">
                                                        {task.title}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1.5">
                                                        <span className={`text-xs font-semibold ${task.deadlineInfo.color}`}>
                                                            {task.deadlineInfo.label}
                                                        </span>
                                                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-gray-600" />
                                                        <span className="text-[11px] font-medium text-slate-500 dark:text-gray-400">
                                                            Priority: {task.priority || "Low"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {notificationList.length > 0 && (
                            <div className="p-3 border-t border-slate-100 dark:border-gray-800/80 text-center bg-slate-50/50 dark:bg-[#0d1117]/50">
                                <NavLink
                                    to="/tasks"
                                    onClick={() => setIsOpen(false)}
                                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer"
                                >
                                    View all tasks
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}