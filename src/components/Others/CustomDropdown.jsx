import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const CustomDropdown = ({ 
    label,
    value, 
    onChange, 
    options, 
    disabled = false,
    error = null,
    required = false 
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
        <div className="w-full" ref={dropdownRef}>
            {label && (
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
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
                            ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10'
                            : isOpen
                            ? 'border-blue-500 ring-2 ring-blue-500/20 dark:border-purple-500 dark:ring-purple-500/20 bg-white dark:bg-gray-800'
                            : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${isOpen ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}
                >
                    <span className="truncate">{selectedOption?.label || 'Select an option'}</span>
                    <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute z-50 mt-2 w-full animate-in fade-in zoom-in-95 duration-200 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-1.5 shadow-xl">
                        {options?.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange({ target: { name: label?.toLowerCase() || 'status', value: option.value } });
                                    setIsOpen(false);
                                }}
                                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all ${
                                    value === option.value
                                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/50 dark:from-purple-500 dark:to-pink-500 font-semibold'
                                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50'
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
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
        </div>
    );
};

export default CustomDropdown;