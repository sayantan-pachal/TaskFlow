import React, { useMemo, useState } from 'react';
import { useTasks } from '../../../context/TaskContext';

export default function TaskOverview() {
    const { tasks } = useTasks();
    const [hoveredIdx, setHoveredIdx] = useState(null);

    // Global Stats for the Circular Progress Ring
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const circumference = 301.59; // 2 * Math.PI * 48
    const strokeDashoffset = circumference - (circumference * completionRate) / 100;

    // Calculate real 7-day trend data
    const { chartData, maxVal } = useMemo(() => {
        const days = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            
            const iso = d.toISOString().split('T')[0];
            const displayStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            
            const dayTasks = tasks.filter((t) => t.rawDate === iso || t.date === displayStr);
            const comp = dayTasks.filter((t) => t.status === 'Completed').length;
            const pend = dayTasks.length - comp;

            days.push({
                dayShort: d.toLocaleDateString('en-US', { weekday: 'short' }),
                fullDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                comp,
                pend,
            });
        }

        // Dynamically scale Y-axis up to the max tasks in a single day (minimum 5 for visual scale)
        const highest = Math.max(5, ...days.flatMap((d) => [d.comp, d.pend]));
        return { chartData: days, maxVal: highest };
    }, [tasks]);

    // Map data to SVG coordinates (ViewBox 0 0 600 100)
    const pts = chartData.map((d, i) => {
        const x = i * 100;
        // SVG Y goes from top (0) to bottom (100). Padding top: 10, bottom: 90
        const cy = 90 - (d.comp / maxVal) * 80;
        const py = 90 - (d.pend / maxVal) * 80;
        return { ...d, x, cy, py };
    });

    // Helper function to generate a smooth Cubic Bezier curve path
    const createSmoothPath = (points, yKey) => {
        if (points.length === 0) return '';
        let path = `M ${points[0].x},${points[0][yKey]}`;
        
        for (let i = 0; i < points.length - 1; i++) {
            const current = points[i];
            const next = points[i + 1];
            // Tension determines how far the control points stretch horizontally (40 = 40% of the 100px gap)
            const tension = 40; 
            const cp1x = current.x + tension;
            const cp2x = next.x - tension;
            
            path += ` C ${cp1x},${current[yKey]} ${cp2x},${next[yKey]} ${next.x},${next[yKey]}`;
        }
        return path;
    };

    // Generate Path Strings
    const compLine = createSmoothPath(pts, 'cy');
    const pendLine = createSmoothPath(pts, 'py');
    const compArea = `${compLine} L 600,95 L 0,95 Z`;
    const pendArea = `${pendLine} L 600,95 L 0,95 Z`;

    return (
        <div className="bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-gray-800 p-5 mb-8 transition-colors flex flex-col xl:flex-row gap-8 items-center">
            {/* Left Side: Interactive Line Chart */}
            <div className="flex-1 w-full min-w-0">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Task Overview</h3>
                        <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">Your task progress at a glance</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium">
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-gray-300">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" /> 
                            Completed
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-gray-300">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" /> 
                            Pending
                        </div>
                    </div>
                </div>

                <div className="w-full h-44 relative">
                    {/* Dynamic Y-Axis Labels */}
                    <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] font-medium text-slate-400 dark:text-gray-500">
                        <span>{maxVal}</span>
                        <span>{Math.round(maxVal * 0.66)}</span>
                        <span>{Math.round(maxVal * 0.33)}</span>
                        <span>0</span>
                    </div>

                    <div className="ml-7 h-full relative">
                        {/* Horizontal Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pb-6">
                            <div className="border-t border-slate-100 dark:border-gray-800/80 w-full h-0" />
                            <div className="border-t border-slate-100 dark:border-gray-800/80 w-full h-0" />
                            <div className="border-t border-slate-100 dark:border-gray-800/80 w-full h-0" />
                            <div className="border-t border-slate-200 dark:border-gray-700 w-full h-0" />
                        </div>

                        {/* Interactive Tooltip (Hover Window) */}
                        {hoveredIdx !== null && (
                            <div
                                className="absolute z-20 pointer-events-none transition-all duration-200 ease-out"
                                style={{
                                    left: `calc(${(hoveredIdx / 6) * 100}%)`,
                                    top: '10%',
                                    transform: `translateX(${hoveredIdx === 0 ? '0%' : hoveredIdx === 6 ? '-100%' : '-50%'})`,
                                }}
                            >
                                <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl p-3 shadow-xl border border-slate-800 dark:border-slate-200 text-xs min-w-30">
                                    <p className="font-bold mb-2 border-b border-slate-700 dark:border-slate-200 pb-1.5">
                                        {pts[hoveredIdx].fullDate}
                                    </p>
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="flex items-center gap-1.5 text-emerald-400 dark:text-emerald-600 font-semibold">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Comp
                                        </span>
                                        <span className="font-bold text-sm">{pts[hoveredIdx].comp}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 mt-1.5">
                                        <span className="flex items-center gap-1.5 text-amber-400 dark:text-amber-600 font-semibold">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Pend
                                        </span>
                                        <span className="font-bold text-sm">{pts[hoveredIdx].pend}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Chart SVG */}
                        <svg className="absolute inset-0 w-full h-[calc(100%-1.5rem)] overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 100">
                            <defs>
                                <linearGradient id="compGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id="pendGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Area Fills */}
                            <path d={compArea} fill="url(#compGradient)" />
                            <path d={pendArea} fill="url(#pendGradient)" />

                            {/* Hover Vertical Crosshair */}
                            {hoveredIdx !== null && (
                                <line 
                                    x1={pts[hoveredIdx].x} 
                                    y1="0" 
                                    x2={pts[hoveredIdx].x} 
                                    y2="95" 
                                    stroke="currentColor" 
                                    className="text-slate-300 dark:text-gray-600" 
                                    strokeWidth="1" 
                                    strokeDasharray="4 4" 
                                />
                            )}

                            {/* Smooth Stroke Lines (Replaced Polyline with Path) */}
                            <path d={compLine} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d={pendLine} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                            {/* Data Points */}
                            {pts.map((p, i) => (
                                <React.Fragment key={i}>
                                    <circle cx={p.x} cy={p.cy} r={hoveredIdx === i ? "5" : "3"} fill="#10b981" className="transition-all duration-200" />
                                    <circle cx={p.x} cy={p.py} r={hoveredIdx === i ? "5" : "3"} fill="#f59e0b" className="transition-all duration-200" />
                                </React.Fragment>
                            ))}

                            {/* Invisible Interactive Hover Areas */}
                            {pts.map((p, i) => (
                                <rect
                                    key={`hover-${i}`}
                                    x={i === 0 ? 0 : p.x - 50}
                                    y="0"
                                    width={i === 0 || i === 6 ? 50 : 100}
                                    height="100"
                                    fill="transparent"
                                    onMouseEnter={() => setHoveredIdx(i)}
                                    onMouseLeave={() => setHoveredIdx(null)}
                                    className="cursor-crosshair focus:outline-none"
                                />
                            ))}
                        </svg>

                        {/* X-Axis Labels */}
                        <div className="absolute bottom-0 left-0 w-full flex justify-between text-[11px] font-medium text-slate-400 dark:text-gray-500">
                            {pts.map((p, i) => (
                                <span key={i} className={`w-8 text-center ${i === 0 ? 'text-left' : i === 6 ? 'text-right' : ''} ${hoveredIdx === i ? 'text-slate-700 dark:text-gray-200' : ''} transition-colors`}>
                                    {p.dayShort}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Circular Progress */}
            <div className="flex flex-col items-center justify-center min-w-30 shrink-0">
                <div className="relative w-28 h-28 mb-3 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                        <circle cx="56" cy="56" r="48" fill="none" className="stroke-slate-100 dark:stroke-gray-800" strokeWidth="12" />
                        <circle
                            cx="56"
                            cy="56"
                            r="48"
                            fill="none"
                            className="stroke-blue-600 dark:stroke-blue-500 transition-all duration-1000 ease-out"
                            strokeWidth="12"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                        />
                    </svg>
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{completionRate}%</span>
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-gray-400">Tasks Completed</p>
            </div>
        </div>
    );
}