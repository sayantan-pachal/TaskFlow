import React from 'react';
import StatsCards from './Parts/StatsCards';
import TaskOverview from './Parts/TaskOverview';
import TodaysTasks from './Parts/TodaysTasks';
import DailyTip from './Parts/DailyTip';
import QuickActions from './Parts/QuickActions';
import RecentActivity from './Parts/RecentActivity';

export default function Dashboard() {
    return (
        <div className="w-full max-w-7xl mx-auto pb-8">

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Left Column (Spans 2 columns on large screens) */}
                <div className="xl:col-span-2 flex flex-col">
                    <StatsCards />
                    <TaskOverview />
                    <TodaysTasks />
                </div>

                {/* Right Column (Sidebar Area) */}
                <div className="xl:col-span-1 flex flex-col">
                    <DailyTip />
                    <QuickActions />
                    <RecentActivity />
                </div>
                
            </div>
        </div>
    );
}