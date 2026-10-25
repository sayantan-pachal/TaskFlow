import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const CustomDropdown = ({ 
    label,
    value, 
    onChange, 
    options, 
    disabled = false,
    error = null,
    required = false,
    name
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedOption = options?.find(opt => opt.value === value);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="w-full relative" ref={dropdownRef}>
            {label && (
                <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-1.5 tracking-wide">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            
            <div className="relative">
                {/* Trigger Button */}
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                        error
                            ? 'border-red-300 dark:border-red-500/50 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                            : isOpen
                            ? 'border-blue-500 ring-2 ring-blue-500/20 bg-white dark:bg-[#161b22] text-slate-900 dark:text-white'
                            : 'border-slate-200 dark:border-gray-800 bg-white dark:bg-[#161b22] text-slate-700 dark:text-gray-200 hover:border-slate-300 dark:hover:border-gray-700'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    <span className="truncate">{selectedOption?.label || 'Select an option'}</span>
                    <ChevronDown
                        size={16}
                        className={`text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-blue-500' : ''}`}
                    />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute z-50 mt-2 w-full animate-in fade-in zoom-in-95 duration-200 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#161b22] p-1.5 shadow-xl shadow-slate-200/20 dark:shadow-black/40">
                        {options?.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange({ target: { name: name || label?.toLowerCase() || 'status', value: option.value } });
                                    setIsOpen(false);
                                }}
                                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all ${
                                    value === option.value
                                        ? 'bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 font-semibold'
                                        : 'text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800/50'
                                }`}
                            >
                                <span className="text-left">{option.label}</span>
                                {value === option.value && <Check size={16} strokeWidth={3} className="shrink-0 ml-2" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {error && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1.5 font-medium">{error}</p>
            )}
        </div>
    );
};

export default CustomDropdown;