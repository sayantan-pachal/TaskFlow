import React from "react";
import { useLocation } from "react-router-dom";
import {
  Search,
  ChevronDown,
  UserRound,
  Bell,
} from "lucide-react";
import ThemeToggle from "../Others/ThemeToggle";

import { NavLink } from "react-router-dom";

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
                <span>Good morning, Sayantan</span>
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

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Bell size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-slate-900" />
          </button>

          <ThemeToggle />
          <ProfileButton />
        </div>
      </div>

      {/* Mobile search input: revealed when focused from the icon */}
      <div className="mt-4 sm:hidden">
        <SearchBar />
      </div>
    </header>
  );
}

function SearchBar() {
  return (
    <label className="relative hidden md:block w-full sm:w-56 lg:w-64">
      <Search
        size={18}
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        id="dashboard-search"
        type="search"
        placeholder="Search anything..."
        aria-label="Search tasks"
        className="h-10 w-full rounded-3xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500"
      />
    </label>
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