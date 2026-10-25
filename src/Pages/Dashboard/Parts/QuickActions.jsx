import React from 'react';
import { Plus, Download, Lightbulb, BarChart2 } from 'lucide-react';

export default function QuickActions() {
    return (
        <div className="bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-gray-800 p-5 transition-colors mb-8">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
            
            <div className="flex flex-col gap-3">
                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-medium transition-colors">
                    <Plus size={18} />
                    Add New Task
                </button>
                
                <button className="w-full flex items-center justify-center gap-2 bg-slate-50 dark:bg-gray-800/50 hover:bg-slate-100 dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 py-2.5 rounded-xl text-sm font-medium transition-colors">
                    <Download size={18} />
                    Import Sample Tasks
                </button>

                <button className="w-full flex items-center justify-center gap-2 bg-slate-50 dark:bg-gray-800/50 hover:bg-slate-100 dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 py-2.5 rounded-xl text-sm font-medium transition-colors">
                    <Lightbulb size={18} />
                    Get New Tip
                </button>

                <button className="w-full flex items-center justify-center gap-2 bg-slate-50 dark:bg-gray-800/50 hover:bg-slate-100 dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 py-2.5 rounded-xl text-sm font-medium transition-colors">
                    <BarChart2 size={18} />
                    View Statistics
                </button>
            </div>
        </div>
    );
}