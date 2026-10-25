import React from 'react';
import StatsOverviewCards from './Parts/StatsOverviewCards';
import TaskCompletionTrend from './Parts/TaskCompletionTrend';
import TaskBreakdown from './Parts/TaskBreakdown';
import StatsRecentActivity from './Parts/StatsRecentActivity';
import StatsRightSidebar from './Parts/StatsRightSidebar';

import { CalendarDays, ChevronDown } from 'lucide-react';

export default function Statistics() {
    return (
        <div className="w-full max-w-7xl mx-auto pb-8">
            
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                    Statistics
                </h1>
                <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400 mt-0.5 md:mt-1">
                    Track your productivity and get insights into your work habits.
                </p>
            </div>

            {/* Date Range Dropdown Pill */}
            <button
                type="button"
                className="flex items-center justify-between sm:justify-start gap-2.5 w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 text-xs font-semibold text-slate-700 dark:text-gray-200 shadow-sm hover:border-blue-400/60 dark:hover:border-gray-700 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <CalendarDays size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Oct 20, 2025 - Oct 26, 2025</span>
                </div>
                <ChevronDown size={15} className="text-slate-400 shrink-0" />
            </button>
        </div>

            {/* Top 4 Overview Cards */}
            <StatsOverviewCards />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                {/* Left/Center Content (Spans 9 columns on XL screens) */}
                <div className="xl:col-span-9 flex flex-col gap-6">
                    {/* Middle Row: 7-Day Trend Chart + 58% Donut Card */}
                    <TaskCompletionTrend />

                    {/* Bottom Row: Task Breakdown + Recent Activity */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-7">
                            <TaskBreakdown />
                        </div>
                        <div className="md:col-span-5">
                            <StatsRecentActivity />
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Productivity Tips & Quick Actions (Spans 3 columns on XL screens) */}
                <div className="xl:col-span-3">
                    <StatsRightSidebar />
                </div>
            </div>
        </div>
    );
}