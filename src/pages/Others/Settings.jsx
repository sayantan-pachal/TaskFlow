import React, { useEffect, useState } from "react";
import {
    Palette,
    Sun,
    Moon,
    Monitor,
    Bell,
    CalendarDays,
    Trash2,
    Download,
    Settings2,
    AlertTriangle,
} from "lucide-react";
import { useTasks } from "../../context/TaskContext";
import { useToast } from "../../components/Others/ToastContext";

export default function Settings() {
    const showToast = useToast();
    // Use clearAllTasks from context if available, otherwise we fallback to manual reload
    const { tasks, clearAllTasks } = useTasks();

    // UI States
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    // Theme State
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") return "system";
        return localStorage.getItem("taskflow-theme") || "system";
    });

    // Preferences State
    const [notifications, setNotifications] = useState(() => 
        JSON.parse(localStorage.getItem("taskflow_notifs") ?? "true")
    );
    const [deadlineReminders, setDeadlineReminders] = useState(() => 
        JSON.parse(localStorage.getItem("taskflow_deadlines") ?? "true")
    );
    const [weekStartsMonday, setWeekStartsMonday] = useState(() => 
        JSON.parse(localStorage.getItem("taskflow_monday_start") ?? "true")
    );

    // Sync theme with system and cross-component broadcasts
    useEffect(() => {
        const handleStorageChange = () => {
            setTheme(localStorage.getItem("taskflow-theme") || "system");
        };

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("theme-change", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("theme-change", handleStorageChange);
        };
    }, []);

    // Save preferences
    useEffect(() => localStorage.setItem("taskflow_notifs", JSON.stringify(notifications)), [notifications]);
    useEffect(() => localStorage.setItem("taskflow_deadlines", JSON.stringify(deadlineReminders)), [deadlineReminders]);
    useEffect(() => localStorage.setItem("taskflow_monday_start", JSON.stringify(weekStartsMonday)), [weekStartsMonday]);

    // Apply theme to DOM
    useEffect(() => {
        const root = document.documentElement;
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = () => {
            const isDark = theme === "dark" || (theme === "system" && systemDark.matches);
            root.classList.toggle("dark", isDark);
            root.style.colorScheme = isDark ? "dark" : "light";
        };

        localStorage.setItem("taskflow-theme", theme);
        applyTheme();
        window.dispatchEvent(new Event("theme-change"));

        if (theme !== "system") return;

        systemDark.addEventListener("change", applyTheme);
        return () => systemDark.removeEventListener("change", applyTheme);
    }, [theme]);

    const themeOptions = [
        { value: "light", label: "Light", Icon: Sun },
        { value: "dark", label: "Dark", Icon: Moon },
        { value: "system", label: "System", Icon: Monitor },
    ];

    const handleExport = () => {
        try {
            const data = localStorage.getItem("taskflow_tasks") || "[]";
            const blob = new Blob([data], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = `taskflow-backup-${new Date().toISOString().split("T")[0]}.json`;
            link.click();

            URL.revokeObjectURL(url);
            showToast("Tasks exported successfully", "success");
        } catch (error) {
            showToast("Failed to export tasks", "error");
        }
    };

    const executeClearTasks = () => {
        setShowClearConfirm(false); // Close modal
        
        if (clearAllTasks) {
            // If the context function exists, use it for a seamless UI update
            clearAllTasks();
        } else {
            // Fallback for hard reset
            localStorage.removeItem("taskflow_tasks");
            showToast("All tasks cleared from storage", "success");
            setTimeout(() => window.location.reload(), 600);
        }
    };

    return (
        <main className="mx-auto w-full max-w-4xl space-y-6 pb-8">
            <header>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                    Settings
                </h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Customize TaskFlow to work the way you prefer.
                </p>
            </header>

            {/* Appearance Section */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-gray-800 dark:bg-[#161b22] sm:p-6 shadow-sm transition-colors">
                <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        <Palette size={20} />
                    </div>
                    <div>
                        <h2 className="font-semibold text-slate-900 dark:text-white">Appearance</h2>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Choose how TaskFlow looks on your device.
                        </p>
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                    {themeOptions.map(({ value, label, Icon }) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setTheme(value)}
                            aria-pressed={theme === value}
                            className={`flex min-h-[80px] flex-col items-center justify-center gap-2 rounded-xl border p-3 text-sm font-medium transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                                theme === value
                                    ? "border-blue-500 bg-blue-50/80 text-blue-700 ring-2 ring-blue-500/20 dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500"
                                    : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-gray-700/80 dark:text-slate-300 dark:hover:bg-gray-800/50"
                            }`}
                        >
                            <Icon size={20} />
                            {label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Notifications Section */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-gray-800 dark:bg-[#161b22] sm:p-6 shadow-sm transition-colors">
                <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                        <Bell size={20} />
                    </div>
                    <div>
                        <h2 className="font-semibold text-slate-900 dark:text-white">Notifications</h2>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Manage your notification preferences.
                        </p>
                    </div>
                </div>

                <div className="mt-4 divide-y divide-slate-100 dark:divide-gray-800/80">
                    <SettingRow
                        title="Task notifications"
                        description="Enable task-related browser alerts and system notifications."
                        checked={notifications}
                        onChange={setNotifications}
                    />
                    <SettingRow
                        title="Deadline reminders"
                        description="Receive alerts for upcoming and approaching task deadlines."
                        checked={deadlineReminders}
                        onChange={setDeadlineReminders}
                    />
                </div>
            </section>

            {/* Task Preferences Section */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-gray-800 dark:bg-[#161b22] sm:p-6 shadow-sm transition-colors">
                <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                        <Settings2 size={20} />
                    </div>
                    <div>
                        <h2 className="font-semibold text-slate-900 dark:text-white">Task Preferences</h2>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Personalize your calendar and task workflow.
                        </p>
                    </div>
                </div>

                <div className="mt-4 divide-y divide-slate-100 dark:divide-gray-800/80">
                    <SettingRow
                        title="Start week on Monday"
                        description="Configure Monday as the primary starting day of the calendar week."
                        checked={weekStartsMonday}
                        onChange={setWeekStartsMonday}
                    />
                    <div className="flex items-center justify-between py-4">
                        <div>
                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                Calendar display format
                            </p>
                            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                Synchronized with your active local storage preferences.
                            </p>
                        </div>
                        <CalendarDays size={18} className="text-slate-400" />
                    </div>
                </div>
            </section>

            {/* Data & Privacy Section */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-gray-800 dark:bg-[#161b22] sm:p-6 shadow-sm transition-colors">
                <h2 className="font-semibold text-slate-900 dark:text-white">Data & Privacy</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Manage your locally stored task data.
                </p>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={handleExport}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-gray-700 dark:bg-gray-800/40 dark:text-slate-200 dark:hover:bg-gray-800 cursor-pointer"
                    >
                        <Download size={17} className="text-blue-500" />
                        Export Tasks (JSON)
                    </button>

                    <button
                        type="button"
                        onClick={() => setShowClearConfirm(true)}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/40 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100/60 dark:border-red-900/40 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 cursor-pointer"
                    >
                        <Trash2 size={17} />
                        Clear Saved Tasks
                    </button>
                </div>
            </section>

            {/* Custom Alert Modal for Clearing Tasks */}
            {showClearConfirm && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-[#161b22] border border-slate-200 dark:border-gray-800 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-500 shrink-0">
                                <AlertTriangle size={22} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                Clear All Tasks?
                            </h3>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Are you sure you want to permanently delete all your saved tasks? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowClearConfirm(false)}
                                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={executeClearTasks}
                                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 active:scale-95 text-white shadow-md shadow-red-600/20 transition-all"
                            >
                                Yes, Clear All
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

function SettingRow({ title, description, checked, onChange }) {
    return (
        <div className="flex items-center justify-between gap-4 py-4">
            <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {description}
                </p>
            </div>

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                aria-label={title}
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-7 w-12 shrink-0 rounded-full p-1 transition-colors duration-300 ease-in-out cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    checked
                        ? "bg-blue-600 shadow-sm shadow-blue-600/30"
                        : "bg-slate-200 dark:bg-gray-700"
                }`}
            >
                <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition-transform duration-300 ease-in-out ${
                        checked ? "translate-x-5" : "translate-x-0"
                    }`}
                />
            </button>
        </div>
    );
}