import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function DailyTip() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl p-6 mb-8 border border-blue-800/50 shadow-lg">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                    <Lightbulb size={18} className="text-yellow-400" />
                    <h3 className="text-sm font-semibold text-blue-100">Daily Productivity Tip</h3>
                </div>
                
                <p className="text-lg text-white font-medium italic mb-2">
                    "Progress is more important than perfection."
                </p>
                <p className="text-sm text-blue-300">
                    — Keep going!
                </p>
            </div>

            {/* CSS Abstract Mountains */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-950/80 to-transparent"></div>
        </div>
    );
}