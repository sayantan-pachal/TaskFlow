import React from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    CalendarDays,
    Plus,
    ListTodo,
    UserRound,
} from "lucide-react";

const navItems = [
    { to: "/", label: "Home", Icon: LayoutDashboard, end: true },
    { to: "/calendar", label: "Calendar", Icon: CalendarDays },
    { to: "/tasks", label: "Tasks", Icon: ListTodo },
    { to: "/profile", label: "Profile", Icon: UserRound },
];

// Extracted reusable component to eliminate code duplication
const NavItem = ({ to, label, Icon, end }) => (
    <NavLink
        to={to}
        end={end}
        className={({ isActive }) => `flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
            ${
                isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`
        }
    >
        {({ isActive }) => (
            <>
                <Icon
                    size={21}
                    strokeWidth={isActive ? 2.4 : 1.8}
                    aria-hidden="true"
                />
                <span className="text-[11px] font-medium">{label}</span>
            </>
        )}
    </NavLink>
);

export default function MobileBottomNav({ onAddTask }) {
    return (
        <nav
            aria-label="Mobile navigation"
            className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-[0_-8px_30px_rgba(15,23,42,0.08)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.25)] pb-[env(safe-area-inset-bottom)]">
            <div className="mx-auto flex h-17 max-w-lg items-center justify-around px-2">
                
                {/* Left side items */}
                {navItems.slice(0, 2).map((item) => (
                    <NavItem key={item.to} {...item} />
                ))}

                {/* Center Add Task Button */}
                <button
                    type="button"
                    onClick={onAddTask}
                    aria-label="Add new task"
                    className=" -mt-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/25 transition duration-200 hover:bg-blue-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950">
                    <Plus size={25} strokeWidth={2.4} />
                </button>

                {/* Right side items */}
                {navItems.slice(2).map((item) => (
                    <NavItem key={item.to} {...item} />
                ))}
                
            </div>
        </nav>
    );
}