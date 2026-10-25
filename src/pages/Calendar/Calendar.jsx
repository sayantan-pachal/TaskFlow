import React, { useState } from 'react';
import CalendarHeader from './Parts/CalendarHeader';
import CalendarGrid from './Parts/CalendarGrid';
import CalendarSchedule from './Parts/CalendarSchedule';

export default function Calendar() {
    // Initialized to October 12, 2025 to match the UI showcase design
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9, 1));
    const [selectedDate, setSelectedDate] = useState(new Date(2025, 9, 12));
    const [activeView, setActiveView] = useState('Month');

    const handlePrevMonth = () => {
        setCurrentMonth(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        );
    };

    const handleNextMonth = () => {
        setCurrentMonth(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        );
    };

    const handleSelectDate = (dateObj) => {
        setSelectedDate(dateObj);
        // If user clicks a leading/trailing date from an adjacent month, switch to that month
        if (
            dateObj.getMonth() !== currentMonth.getMonth() ||
            dateObj.getFullYear() !== currentMonth.getFullYear()
        ) {
            setCurrentMonth(new Date(dateObj.getFullYear(), dateObj.getMonth(), 1));
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto pb-8">
            {/* Page Header */}
            <CalendarHeader
                activeView={activeView}
                onViewChange={setActiveView}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Interactive Calendar Grid (7 cols on desktop) */}
                <div className="lg:col-span-7">
                    <CalendarGrid
                        currentMonth={currentMonth}
                        selectedDate={selectedDate}
                        onPrevMonth={handlePrevMonth}
                        onNextMonth={handleNextMonth}
                        onSelectDate={handleSelectDate}
                    />
                </div>

                {/* Right Column: Selected Day Schedule & Upcoming (5 cols on desktop) */}
                <div className="lg:col-span-5">
                    <CalendarSchedule selectedDate={selectedDate} />
                </div>
            </div>
        </div>
    );
}