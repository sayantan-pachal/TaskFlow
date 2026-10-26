import React from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    CalendarDays,
    Plus,
    ListTodo,
    UserRound,
} from "lucide-react";
import { useTasks } from "../../context/TaskContext";

const navItems = [
    { to: "/", label: "Home", Icon: LayoutDashboard, end: true },
    { to: "/calendar", label: "Calendar", Icon: CalendarDays },
    { to: "/tasks", label: "Tasks", Icon: ListTodo },
    { to: "/profile", label: "Profile", Icon: UserRound },
];

const NavItem = ({ to, label, Icon, end }) => (
    <NavLink
        to={to}
        end={end}
        className={({ isActive }) => `flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-1 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
            ${
                isActive
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium"
            }`
        }
    >
        {({ isActive }) => (
            <>
                <Icon
                    size={20}
                    strokeWidth={isActive ? 2.4 : 1.8}
                    aria-hidden="true"
                />
                <span className="text-[11px] leading-none">{label}</span>
            </>
        )}
    </NavLink>
);

export default function MobileBottomNav() {
    const { openTaskModal } = useTasks();

    return (
        <nav
            aria-label="Mobile navigation"
            className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/80 dark:border-gray-800 bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-xl shadow-[0_-8px_30px_rgba(15,23,42,0.08)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.35)] pb-[env(safe-area-inset-bottom)]"
        >
            <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
                {/* Left items: Home & Calendar */}
                {navItems.slice(0, 2).map((item) => (
                    <NavItem key={item.to} {...item} />
                ))}

                {/* Floating Add Task Button */}
                <div className="flex flex-1 justify-center items-center">
                    <button
                        type="button"
                        onClick={() => openTaskModal()}
                        aria-label="Add new task"
                        className="-mt-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/35 ring-4 ring-white dark:ring-[#0d1117] transition-all duration-200 hover:bg-blue-700 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                        <Plus size={24} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Right items: Tasks & Profile */}
                {navItems.slice(2).map((item) => (
                    <NavItem key={item.to} {...item} />
                ))}
            </div>
        </nav>
    );
}