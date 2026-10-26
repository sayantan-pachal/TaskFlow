import React, { useMemo, useState } from 'react';
import { useTasks } from '../../../context/TaskContext';

export default function TaskCompletionTrend() {
    const { tasks } = useTasks();
    const [hoveredIdx, setHoveredIdx] = useState(null);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    // Donut circumference for r=46 is 2 * Math.PI * 46 ≈ 289
    const donutCircumference = 289;
    const donutOffset = donutCircumference - (donutCircumference * completionRate) / 100;

    // Calculate real 7-day trend data
    const { chartData, maxVal } = useMemo(() => {
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
            const comp = dayTasks.filter((t) => t.status === 'Completed').length;
            const pend = dayTasks.length - comp;

            days.push({
                full: fullLabel,
                short: shortLabel,
                comp,
                pend,
            });
        }

        // Dynamically scale Y-axis up to the max tasks in a single day (minimum 5 for visual scale)
        const highest = Math.max(5, ...days.flatMap((d) => [d.comp, d.pend]));
        return { chartData: days, maxVal: highest };
    }, [tasks]);

    // Map data to SVG coordinates (ViewBox 0 0 600 120)
    const pts = chartData.map((d, i) => {
        const x = i * 100;
        // SVG Y goes from top (0) to bottom (120). Padding top: 10, bottom: 110. Range: 100.
        const cy = 110 - (d.comp / maxVal) * 100;
        const py = 110 - (d.pend / maxVal) * 100;
        return { ...d, x, cy, py };
    });

    // Helper to generate a smooth Cubic Bezier curve path
    const createSmoothPath = (points, yKey) => {
        if (points.length === 0) return '';
        let path = `M ${points[0].x},${points[0][yKey]}`;
        for (let i = 0; i < points.length - 1; i++) {
            const current = points[i];
            const next = points[i + 1];
            const tension = 40; 
            path += ` C ${current.x + tension},${current[yKey]} ${next.x - tension},${next[yKey]} ${next.x},${next[yKey]}`;
        }
        return path;
    };

    // Generate Smooth Path Strings
    const compLine = createSmoothPath(pts, 'cy');
    const pendLine = createSmoothPath(pts, 'py');
    const compArea = `${compLine} L 600,120 L 0,120 Z`;
    const pendArea = `${pendLine} L 600,120 L 0,120 Z`;

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
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                            <span>Completed</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-gray-300">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
                            <span>Pending</span>
                        </div>
                    </div>
                </div>

                {/* SVG Chart Container */}
                <div className="relative h-44 w-full">
                    {/* Dynamic Y-Axis Labels */}
                    <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[11px] font-medium text-slate-400 dark:text-gray-500">
                        <span>{maxVal}</span>
                        <span>{Math.round(maxVal * 0.66)}</span>
                        <span>{Math.round(maxVal * 0.33)}</span>
                        <span>0</span>
                    </div>

                    <div className="ml-7 h-full relative">
                        {/* Horizontal Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pb-6">
                            <div className="border-t border-slate-100 dark:border-gray-800/80 w-full" />
                            <div className="border-t border-slate-100 dark:border-gray-800/80 w-full" />
                            <div className="border-t border-slate-100 dark:border-gray-800/80 w-full" />
                            <div className="border-t border-slate-200 dark:border-gray-700 w-full" />
                        </div>

                        {/* Interactive Tooltip (Hover Window) */}
                        {hoveredIdx !== null && (
                            <div
                                className="absolute z-20 pointer-events-none transition-all duration-200 ease-out"
                                style={{
                                    left: `calc(${(hoveredIdx / 6) * 100}%)`,
                                    top: '5%',
                                    transform: `translateX(${hoveredIdx === 0 ? '0%' : hoveredIdx === 6 ? '-100%' : '-50%'})`,
                                }}
                            >
                                <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl p-3 shadow-xl border border-slate-800 dark:border-slate-200 text-xs min-w-[120px]">
                                    <p className="font-bold mb-2 border-b border-slate-700 dark:border-slate-200 pb-1.5">
                                        {pts[hoveredIdx].full}
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

                            {/* Completed & Pending Area Fills */}
                            <path d={compArea} fill="url(#emeraldArea)" />
                            <path d={pendArea} fill="url(#amberArea)" />

                            {/* Hover Vertical Crosshair */}
                            {hoveredIdx !== null && (
                                <line 
                                    x1={pts[hoveredIdx].x} 
                                    y1="0" 
                                    x2={pts[hoveredIdx].x} 
                                    y2="120" 
                                    stroke="currentColor" 
                                    className="text-slate-300 dark:text-gray-600" 
                                    strokeWidth="1" 
                                    strokeDasharray="4 4" 
                                />
                            )}

                            {/* Smooth Stroke Lines */}
                            <path d={compLine} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d={pendLine} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                            {/* Data Dots */}
                            {pts.map((p, idx) => (
                                <React.Fragment key={idx}>
                                    <circle cx={p.x} cy={p.cy} r={hoveredIdx === idx ? "5" : "3"} fill="#10b981" className="transition-all duration-200" />
                                    <circle cx={p.x} cy={p.py} r={hoveredIdx === idx ? "5" : "3"} fill="#f59e0b" className="transition-all duration-200" />
                                </React.Fragment>
                            ))}

                            {/* Invisible Interactive Hover Areas */}
                            {pts.map((p, i) => (
                                <rect
                                    key={`hover-${i}`}
                                    x={i === 0 ? 0 : p.x - 50}
                                    y="0"
                                    width={i === 0 || i === 6 ? 50 : 100}
                                    height="120"
                                    fill="transparent"
                                    onMouseEnter={() => setHoveredIdx(i)}
                                    onMouseLeave={() => setHoveredIdx(null)}
                                    className="cursor-crosshair focus:outline-none"
                                />
                            ))}
                        </svg>

                        {/* X-Axis Labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[11px] font-medium text-slate-400 dark:text-gray-500">
                            {pts.map((p, i) => (
                                <span key={p.full} className={`w-10 text-center ${i === 0 ? 'text-left' : i === 6 ? 'text-right' : ''} ${hoveredIdx === i ? 'text-slate-700 dark:text-gray-200' : ''} transition-colors`}>
                                    <span className="hidden sm:inline">{p.full}</span>
                                    <span className="sm:hidden">{p.short}</span>
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
                            className="transition-all duration-1000 ease-out"
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