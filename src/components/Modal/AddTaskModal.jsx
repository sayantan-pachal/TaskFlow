import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import CustomDropdown from '../Others/CustomDropdown';

const CATEGORY_OPTIONS = [
    { label: 'GDG', value: 'GDG' },
    { label: 'Academics', value: 'Academics' },
    { label: 'Personal', value: 'Personal' },
];

const PRIORITY_OPTIONS = [
    { label: 'High Priority', value: 'High' },
    { label: 'Medium Priority', value: 'Medium' },
    { label: 'Low Priority', value: 'Low' },
];

const STATUS_OPTIONS = [
    { label: 'Pending', value: 'Pending' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Completed', value: 'Completed' },
];

const getTodayInputString = () => new Date().toISOString().split('T')[0];

const formatDisplayDate = (isoDateString) => {
    const [year, month, day] = isoDateString.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

export default function AddTaskModal() {
    const { isTaskModalOpen, editingTask, closeTaskModal, addTask, updateTask } = useTasks();

    const [formData, setFormData] = useState({
        title: '',
        category: 'Academics',
        priority: 'Medium',
        status: 'Pending',
        rawDate: getTodayInputString(),
    });
    const [error, setError] = useState('');

    // Safely determine if this is an actual edit vs a pre-filled new task (from calendar)
    const isEditMode = Boolean(editingTask?.id);

    useEffect(() => {
        if (editingTask) {
            // This handles BOTH genuine edits AND pre-filled new tasks (from Calendar)
            const parsedCategory = (editingTask.category === 'Sample' || editingTask.category === 'User Sample') 
                ? 'Personal' 
                : (editingTask.category || 'Academics');

            setFormData({
                title: editingTask.title || '',
                category: parsedCategory,
                priority: editingTask.priority || 'Medium',
                status: editingTask.status || 'Pending',
                rawDate: editingTask.rawDate || getTodayInputString(),
            });
        } else {
            // Completely fresh task
            setFormData({
                title: '',
                category: 'Academics',
                priority: 'Medium',
                status: 'Pending',
                rawDate: getTodayInputString(),
            });
        }
        setError('');
    }, [editingTask, isTaskModalOpen]);

    if (!isTaskModalOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === 'title' && error) setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            setError('Task title is required');
            return;
        }

        const payload = {
            title: formData.title.trim(),
            category: formData.category,
            priority: formData.priority,
            status: formData.status,
            rawDate: formData.rawDate,
            date: formatDisplayDate(formData.rawDate),
            checked: formData.status === 'Completed',
        };

        // STRICT CHECK: Only update if it actually has an ID
        if (isEditMode) {
            updateTask(editingTask.id, payload);
        } else {
            addTask(payload);
        }

        closeTaskModal();
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#161b22] border border-slate-200 dark:border-gray-800 p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {isEditMode ? 'Edit Task' : 'Add New Task'}
                    </h2>
                    <button
                        type="button"
                        onClick={closeTaskModal}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-1.5 tracking-wide">
                            Task Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Complete web development assignment"
                            className="w-full rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        />
                        {error && <p className="text-red-500 text-xs mt-1.5 font-medium">{error}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <CustomDropdown
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            options={CATEGORY_OPTIONS}
                            required
                        />

                        <CustomDropdown
                            label="Priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            options={PRIORITY_OPTIONS}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <CustomDropdown
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            options={STATUS_OPTIONS}
                            required
                        />

                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-1.5 tracking-wide">
                                Due Date <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    name="rawDate"
                                    value={formData.rawDate}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#161b22] px-4 py-3 text-sm font-medium text-slate-700 dark:text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-gray-800">
                        <button
                            type="button"
                            onClick={closeTaskModal}
                            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                        >
                            {isEditMode ? 'Save Changes' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}