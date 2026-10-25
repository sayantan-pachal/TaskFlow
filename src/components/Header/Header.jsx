import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    ListTodo,
    CalendarDays,
    BarChart2,
    Settings,
    Lightbulb
} from 'lucide-react';

// Navigation items array for easy management and scalability
const navItems = [
    { name: 'Dashboard', path: '/', Icon: LayoutDashboard },
    { name: 'My Tasks', path: '/tasks', Icon: ListTodo },
    { name: 'Calendar', path: '/calendar', Icon: CalendarDays },
    { name: 'Statistics', path: '/statistics', Icon: BarChart2 },
    { name: 'Settings', path: '/settings', Icon: Settings },
];

// Individual NavItem component for cleaner code and reusability
const NavItem = ({ name, path, Icon }) => (
    <NavLink
        to={path}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 border ${isActive
                ? 'bg-blue-50 border-blue-200 text-blue-600 font-medium dark:bg-blue-600/10 dark:border-blue-500/20 dark:text-blue-500'
                : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-200'
            }`
        }
    >
        <Icon size={20} />
        <span>{name}</span>
    </NavLink>
);

export default function Header() {
    return (
        <aside className="hidden md:flex w-64 flex-col justify-between h-full p-4 bg-slate-50 border-r border-slate-200 dark:bg-[#161b22] dark:border-gray-800 transition-colors duration-300">

            {/* Logo Section */}
            <div>
                <div className="flex items-center gap-2 px-2 mb-8 mt-2">
                    <img
                        src="/favicon.svg"
                        alt="TaskFlow Logo"
                        className="w-8 h-8 rounded-xl shadow-sm"
                    />
                    <span className="text-xl font-bold tracking-wide text-slate-900 dark:text-white">
                        TaskFlow
                    </span>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <NavItem key={item.name} {...item} />
                    ))}
                </nav>
            </div>

            {/* Bottom Motivational Widget */}
            <div className="mt-auto pt-6">
                <div className="relative overflow-hidden rounded-2xl p-4 border bg-linear-to-b from-blue-50 to-white border-blue-100 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 transition-colors duration-300">

                    {/* Top right glow effect */}
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl bg-blue-500/10"></div>
                    <Lightbulb size={24} className="mb-3 text-yellow-500 dark:text-yellow-400 relative z-10" />

                    <p className="text-sm font-medium relative z-10 text-slate-700 dark:text-gray-200">
                        Action is the foundational key to all success.
                    </p>
                    <p className="text-xs font-medium relative z-10 text-slate-500 dark:text-gray-400 mt-1 ml-10">
                        — Pablo Picasso
                    </p>

                    {/* Mountain Vector Graphic */}
                    <svg
                        className="absolute bottom-0 left-0 right-0 w-full h-16 pointer-events-none"
                        viewBox="0 0 200 60"
                        preserveAspectRatio="none"
                    >
                        <polygon
                            points="0,60 45,25 90,60"
                            className="fill-blue-300/50 dark:fill-blue-900/40"
                        />
                        <polygon
                            points="55,60 115,12 175,60"
                            className="fill-indigo-400/50 dark:fill-indigo-600/40"
                        />
                        <polygon
                            points="120,60 165,28 200,60"
                            className="fill-blue-500/40 dark:fill-blue-500/30"
                        />
                    </svg>
                    {/* Abstract wave decoration */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-blue-100/50 dark:from-blue-900/40 to-transparent"></div>
                </div>
            </div>

        </aside>
    );
}