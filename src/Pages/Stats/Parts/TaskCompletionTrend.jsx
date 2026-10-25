import React, { useMemo } from 'react';
import { useTasks } from '../../../context/TaskContext';

export default function TaskCompletionTrend() {
    const { tasks } = useTasks();

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    // Donut circumference for r=46 is 2 * Math.PI * 46 ≈ 289
    const donutCircumference = 289;
    const donutOffset = donutCircumference - (donutCircumference * completionRate) / 100;

    // Build 7-day window ending today and compute SVG coordinates
    const { daysData, completedPoints, pendingPoints, completedArea, pendingArea } = useMemo(() => {
        const days = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);

            const iso = d.toISOString().split('T')[0];
            const displayStr = d.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            });
            const fullLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const shortLabel = i === 6 ? fullLabel : String(d.getDate());

            const dayTasks = tasks.filter((t) => t.rawDate === iso || t.date === displayStr);
            const compCount = dayTasks.filter((t) => t.status === 'Completed').length;
            const pendCount = dayTasks.length - compCount;

            days.push({
                full: fullLabel,
                short: shortLabel,
                completed: compCount,
                pending: pendCount,
            });
        }

        // Convert count (0-15 scale) to SVG Y coordinate (height 120, top pad 10, bottom 110)
        const toY = (count) => Math.max(10, Math.min(110, 110 - (count / 15) * 100));

        const cPts = days.map((d, idx) => [idx * 100, toY(d.completed)]);
        const pPts = days.map((d, idx) => [idx * 100, toY(d.pending)]);

        const cLine = cPts.map(([x, y]) => `${x},${y}`).join(' ');
        const pLine = pPts.map(([x, y]) => `${x},${y}`).join(' ');

        const cArea = `M ${cPts.map(([x, y]) => `${x},${y}`).join(' L ')} L 600,120 L 0,120 Z`;
        const pArea = `M ${pPts.map(([x, y]) => `${x},${y}`).join(' L ')} L 600,120 L 0,120 Z`;

        return {
            daysData: days,
            completedPoints: { raw: cPts, str: cLine },
            pendingPoints: { raw: pPts, str: pLine },
            completedArea: cArea,
            pendingArea: pArea,
        };
    }, [tasks]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: 7-Day Line Chart Card */}
            <div className="lg:col-span-8 bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-5 shadow-sm transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-5">
                    <div>
                        <h2 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                            Task Completion Trend
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                            Your task progress over the last 7 days
                        </p>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-4 text-xs font-medium">
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-gray-300">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            <span>Completed</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-gray-300">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            <span>Pending</span>
                        </div>
                    </div>
                </div>

                {/* SVG Chart Container */}
                <div className="relative h-44 w-full">
                    {/* Y-Axis Labels */}
                    <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[11px] font-medium text-slate-400 dark:text-gray-500">
                        <span>15</span>
                        <span>10</span>
                        <span>5</span>
                        <span>0</span>
                    </div>

                    {/* Chart Plot Area */}
                    <div className="ml-7 h-full relative">
                        {/* Horizontal Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pb-6">
                            <div className="border-t border-slate-100 dark:border-gray-800/80 w-full" />
                            <div className="border-t border-slate-100 dark:border-gray-800/80 w-full" />
                            <div className="border-t border-slate-100 dark:border-gray-800/80 w-full" />
                            <div className="border-t border-slate-200 dark:border-gray-700 w-full" />
                        </div>

                        {/* SVG Paths & Points */}
                        <svg
                            className="absolute inset-0 w-full h-[calc(100%-1.5rem)] overflow-visible"
                            viewBox="0 0 600 120"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient id="emeraldArea" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                                </linearGradient>
                                <linearGradient id="amberArea" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.22" />
                                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                                </linearGradient>
                            </defs>

                            {/* Completed Area Fill */}
                            <path d={completedArea} fill="url(#emeraldArea)" />
                            {/* Pending Area Fill */}
                            <path d={pendingArea} fill="url(#amberArea)" />

                            {/* Completed Stroke Line */}
                            <polyline
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points={completedPoints.str}
                            />
                            {/* Pending Stroke Line */}
                            <polyline
                                fill="none"
                                stroke="#f59e0b"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points={pendingPoints.str}
                            />

                            {/* Completed Data Dots */}
                            {completedPoints.raw.map(([cx, cy], idx) => (
                                <circle key={`c-${idx}`} cx={cx} cy={cy} r="4" fill="#10b981" />
                            ))}

                            {/* Pending Data Dots */}
                            {pendingPoints.raw.map(([cx, cy], idx) => (
                                <circle key={`p-${idx}`} cx={cx} cy={cy} r="4" fill="#f59e0b" />
                            ))}
                        </svg>

                        {/* X-Axis Labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[11px] font-medium text-slate-400 dark:text-gray-500">
                            {daysData.map((item) => (
                                <span key={item.full}>
                                    <span className="hidden sm:inline">{item.full}</span>
                                    <span className="sm:hidden">{item.short}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Desktop Tasks Completed Donut Card */}
            <div className="hidden lg:flex lg:col-span-4 bg-white dark:bg-[#161b22] border border-slate-200/90 dark:border-gray-800 rounded-2xl p-5 flex-col items-center justify-center shadow-sm transition-colors">
                <div className="relative w-36 h-36 mb-3 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                        <defs>
                            <linearGradient id="donutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#2563eb" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="60"
                            cy="60"
                            r="46"
                            fill="none"
                            className="stroke-slate-100 dark:stroke-gray-800"
                            strokeWidth="12"
                        />
                        <circle
                            cx="60"
                            cy="60"
                            r="46"
                            fill="none"
                            stroke="url(#donutGrad)"
                            strokeWidth="12"
                            strokeDasharray={donutCircumference}
                            strokeDashoffset={donutOffset}
                            strokeLinecap="round"
                            className="transition-all duration-700 ease-out"
                        />
                    </svg>
                    <span className="absolute text-2xl font-bold text-slate-900 dark:text-white">
                        {completionRate}%
                    </span>
                </div>
                <p className="text-xs font-semibold text-slate-600 dark:text-gray-300">
                    Tasks Completed
                </p>
            </div>
        </div>
    );
}