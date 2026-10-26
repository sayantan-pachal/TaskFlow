import React, { useState, useEffect, useRef, useMemo } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Search, ChevronDown, UserRound, Bell, Clock, Calendar } from "lucide-react";
import ThemeToggle from "../Others/ThemeToggle";
import Notification from "../Others/Notification";
import { useTasks } from "../../context/TaskContext";

export default function DashboardHeader() {
  const { pathname } = useLocation();
  const isDashboard = pathname === "/" || pathname === "/dashboard";

  return (
    <header className="mb-6">
      <div className="flex items-center justify-between gap-3">
        {/* Greeting — Only rendered on Dashboard / Home */}
        <div className="min-w-0 flex-1">
          {isDashboard && (
            <>
              <h1 className="flex flex-wrap items-center gap-1.5 text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl lg:text-2xl">
                <span>Hello, Buddy</span>
                <span className="origin-bottom-right animate-wave">👋</span>
              </h1>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
                Stay focused. You're doing great!
              </p>
            </>
          )}
        </div>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <SearchBar />
          <Notification />
          <ThemeToggle />
          <ProfileButton />
        </div>
      </div>

      {/* Mobile search input */}
      <div className="mt-4 sm:hidden relative z-20">
        <SearchBar />
      </div>
    </header>
  );
}

function SearchBar() {
  const { tasks, openTaskModal } = useTasks();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  // Filter tasks dynamically based on title, category, or date
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return tasks
      .filter((task) => 
        (task.title && task.title.toLowerCase().includes(lowerQuery)) ||
        (task.category && task.category.toLowerCase().includes(lowerQuery)) ||
        (task.date && task.date.toLowerCase().includes(lowerQuery))
      )
      .slice(0, 5); // Limit to top 5 results to keep the UI clean
  }, [query, tasks]);

  // Handle clicking outside of the search component to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (task) => {
    openTaskModal(task);
    setIsOpen(false);
    setQuery(""); // Optional: clear search after clicking
  };

  return (
    <div ref={searchRef} className="relative w-full sm:w-56 lg:w-72">
      {/* Search Input */}
      <label className="relative block w-full">
        <Search
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          id="dashboard-search"
          type="search"
          autoComplete="off"
          placeholder="Search tasks, categories, dates..."
          aria-label="Search tasks"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="h-10 w-full rounded-3xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500"
        />
      </label>

      {/* Floating Dropdown Results */}
      {isOpen && query.trim() !== "" && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="rounded-2xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#161b22] shadow-xl overflow-hidden flex flex-col max-h-80">
            
            {searchResults.length === 0 ? (
              <div className="py-6 px-4 text-center">
                <Search size={24} className="mx-auto text-slate-300 dark:text-gray-700 mb-2" />
                <p className="text-sm font-medium text-slate-600 dark:text-gray-300">
                  No tasks found
                </p>
                <p className="text-xs text-slate-500 dark:text-gray-500 mt-1">
                  Try a different keyword or date
                </p>
              </div>
            ) : (
              <ul className="overflow-y-auto overscroll-contain divide-y divide-slate-100 dark:divide-gray-800/80">
                {searchResults.map((task) => (
                  <li key={task.id}>
                    <button
                      type="button"
                      onClick={() => handleResultClick(task)}
                      className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-gray-800/40 transition-colors flex flex-col gap-1 focus:bg-slate-50 dark:focus:bg-gray-800/40 outline-none"
                    >
                      <span className={`text-sm font-semibold truncate ${task.status === 'Completed' ? 'text-slate-500 line-through dark:text-gray-500' : 'text-slate-800 dark:text-gray-200'}`}>
                        {task.title}
                      </span>
                      <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500 dark:text-gray-400">
                        <span className="flex items-center gap-1 shrink-0">
                          <Calendar size={12} className="text-blue-500" />
                          {task.date}
                        </span>
                        <span className="flex items-center gap-1 truncate">
                          <Clock size={12} className="text-amber-500" />
                          {task.category || "General"}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

function ProfileButton() {
  return (
    <NavLink
      to="/profile"
      aria-label="Open user profile"
      className="flex h-10 shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
        <UserRound size={17} />
      </span>
      <ChevronDown size={15} className="text-slate-400" />
    </NavLink>
  );
}