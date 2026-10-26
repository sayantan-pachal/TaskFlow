import React from 'react';
import { NavLink } from 'react-router-dom';
import { Settings } from 'lucide-react';
import ThemeToggle from '../Others/ThemeToggle';
import Notification from '../Others/Notification';

export default function MobileTopBar() {
    return (
        <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-gray-800 transition-colors">
            <NavLink to="/" className="flex items-center gap-2.5 focus:outline-none">
                <img
                    src="/favicon.svg"
                    alt="TaskFlow Logo"
                    className="w-8 h-8 rounded-full shrink-0"
                />
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                    TaskFlow
                </span>
            </NavLink>

            <div className="flex items-center gap-2 shrink-0">
                <ThemeToggle />
                <Notification />

                <NavLink
                    to="/settings"
                    aria-label="Open settings"
                    className={({ isActive }) =>
                        `flex h-9 w-9 items-center justify-center rounded-full transition-colors cursor-pointer ${
                            isActive
                                ? "bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400"
                                : "bg-black/5 dark:bg-white/5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-gray-800"
                        }`
                    }
                >
                    <Settings size={18} />
                </NavLink>
            </div>
        </header>
    );
}