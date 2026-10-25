
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
    ChevronRight,
} from "lucide-react";
import ThemeToggle from "../../components/Others/ThemeToggle";

export default function Settings() {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") return "system";

        return localStorage.getItem("taskflow-theme") || "system";
    });

    const [notifications, setNotifications] = useState(true);
    const [deadlineReminders, setDeadlineReminders] = useState(true);
    const [weekStartsMonday, setWeekStartsMonday] = useState(true);

    useEffect(() => {
        const root = document.documentElement;
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = () => {
            const isDark =
                theme === "dark" ||
                (theme === "system" && systemDark.matches);

            root.classList.toggle("dark", isDark);
            root.style.colorScheme = isDark ? "dark" : "light";
        };

        localStorage.setItem("taskflow-theme", theme);
        applyTheme();

        if (theme !== "system") return;

        systemDark.addEventListener("change", applyTheme);

        return () => {
            systemDark.removeEventListener("change", applyTheme);
        };
    }, [theme]);

    const themeOptions = [
        { value: "light", label: "Light", Icon: Sun },
        { value: "dark", label: "Dark", Icon: Moon },
        { value: "system", label: "System", Icon: Monitor },
    ];

    return (
        <main className="mx-auto w-full max-w-4xl space-y-6 pb-6">
            <header>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                    Settings
                </h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Customize TaskFlow to work the way you prefer.
                </p>
            </header>

            {/* Appearance */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        <Palette size={20} />
                    </div>
                    <div>
                        <h2 className="font-semibold text-slate-900 dark:text-white">
                            Appearance
                        </h2>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Choose how TaskFlow looks on your device.
                        </p>
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                    {themeOptions.map(({ value, label, Icon }) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setTheme(value)}
                            aria-pressed={theme === value}
                            className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-xl border p-3 text-sm font-medium transition ${theme === value
                                    ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500 dark:bg-blue-500/10 dark:text-blue-400"
                                    : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                                }`}
                        >
                            <Icon size={20} />
                            {label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Notifications */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                        <Bell size={20} />
                    </div>
                    <div>
                        <h2 className="font-semibold text-slate-900 dark:text-white">
                            Notifications
                        </h2>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Manage your notification preferences.
                        </p>
                    </div>
                </div>

                <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
                    <SettingRow
                        title="Task notifications"
                        description="Enable task-related notifications."
                        checked={notifications}
                        onChange={setNotifications}
                    />
                    <SettingRow
                        title="Deadline reminders"
                        description="Receive reminders for upcoming deadlines."
                        checked={deadlineReminders}
                        onChange={setDeadlineReminders}
                    />
                </div>
            </section>

            {/* Task preferences */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                        <Settings2 size={20} />
                    </div>
                    <div>
                        <h2 className="font-semibold text-slate-900 dark:text-white">
                            Task Preferences
                        </h2>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Personalize your calendar and task workflow.
                        </p>
                    </div>
                </div>

                <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
                    <SettingRow
                        title="Start week on Monday"
                        description="Use Monday as the first day of the calendar week."
                        checked={weekStartsMonday}
                        onChange={setWeekStartsMonday}
                    />

                    <button
                        type="button"
                        className="flex w-full items-center justify-between gap-3 py-4 text-left"
                    >
                        <div>
                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                Calendar preferences
                            </p>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                Configure how tasks appear on your calendar.
                            </p>
                        </div>
                        <CalendarDays size={18} className="shrink-0 text-slate-400" />
                    </button>
                </div>
            </section>

            {/* Data management */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                <h2 className="font-semibold text-slate-900 dark:text-white">
                    Data & Privacy
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Manage your locally stored task data.
                </p>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={() => {
                            const data = localStorage.getItem("taskflow-tasks") || "[]";
                            const blob = new Blob([data], {
                                type: "application/json",
                            });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement("a");

                            link.href = url;
                            link.download = "taskflow-tasks.json";
                            link.click();

                            URL.revokeObjectURL(url);
                        }}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        <Download size={17} />
                        Export Tasks
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            const confirmed = window.confirm(
                                "Clear your saved TaskFlow tasks? This action cannot be undone."
                            );

                            if (confirmed) {
                                localStorage.removeItem("taskflow-tasks");
                                window.location.reload();
                            }
                        }}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-500/10"
                    >
                        <Trash2 size={17} />
                        Clear Saved Tasks
                    </button>
                </div>
            </section>
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
                <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {description}
                </p>
            </div>

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                aria-label={title}
                onClick={() => onChange(!checked)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
                    }`}
            >
                <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"
                        }`}
                />
            </button>
        </div>
    );
}
