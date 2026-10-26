import React, { useState } from 'react';
import CalendarHeader from './Parts/CalendarHeader';
import CalendarGrid from './Parts/CalendarGrid';
import CalendarSchedule from './Parts/CalendarSchedule';

export default function Calendar() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
    );
    const [selectedDate, setSelectedDate] = useState(today);
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
        if (
            dateObj.getMonth() !== currentMonth.getMonth() ||
            dateObj.getFullYear() !== currentMonth.getFullYear()
        ) {
            setCurrentMonth(new Date(dateObj.getFullYear(), dateObj.getMonth(), 1));
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto pb-8">
            <CalendarHeader
                activeView={activeView}
                onViewChange={setActiveView}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7">
                    <CalendarGrid
                        currentMonth={currentMonth}
                        selectedDate={selectedDate}
                        activeView={activeView}
                        onPrevMonth={handlePrevMonth}
                        onNextMonth={handleNextMonth}
                        onSelectDate={handleSelectDate}
                    />
                </div>

                <div className="lg:col-span-5">
                    <CalendarSchedule selectedDate={selectedDate} />
                </div>
            </div>
        </div>
    );
}