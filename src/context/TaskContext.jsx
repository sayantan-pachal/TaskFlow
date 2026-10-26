import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { StorageAPI, ExternalAPI } from '../utils/api';
import { useToast } from '../components/Others/ToastContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const showToast = useToast();
    
    const [tasks, setTasks] = useState(() => StorageAPI.getTasks());
    const [isImporting, setIsImporting] = useState(false);

    // Global Add/Edit Task Modal State
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        StorageAPI.saveTasks(tasks);
    }, [tasks]);

    const openTaskModal = useCallback((taskToEdit = null) => {
        setEditingTask(taskToEdit);
        setIsTaskModalOpen(true);
    }, []);

    const closeTaskModal = useCallback(() => {
        setEditingTask(null);
        setIsTaskModalOpen(false);
    }, []);

    const addTask = useCallback((taskData) => {
        const newTask = {
            id: crypto.randomUUID(),
            ...taskData,
            checked: taskData.status === 'Completed',
            isSample: false
        };
        setTasks(prev => [newTask, ...prev]);
        showToast("Task created successfully", "success");
    }, [showToast]);

    const updateTask = useCallback((id, updatedData) => {
        setTasks(prev => prev.map(task => 
            task.id === id ? { ...task, ...updatedData } : task
        ));
    }, []);

    const deleteTask = useCallback((id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
        showToast("Task deleted", "success");
    }, [showToast]);

    const clearCompleted = useCallback(() => {
        setTasks(prev => prev.filter(task => task.status !== 'Completed'));
        showToast("Completed tasks cleared", "success");
    }, [showToast]);

    const clearAllTasks = useCallback(() => {
        setTasks([]);
        showToast("All tasks cleared from storage", "success");
    }, [showToast]);

    // NEW: Function to import tasks from a user-provided JSON file
    const importUserTasks = useCallback((importedTasks) => {
        if (!Array.isArray(importedTasks)) {
            showToast("Invalid format. Expected a JSON array.", "error");
            return;
        }
        
        const processedTasks = importedTasks.map(task => ({
            ...task,
            id: crypto.randomUUID(), // Prevent ID collisions with existing tasks
            category: task.category === 'Sample' ? 'User Sample' : (task.category || 'Imported'),
            status: task.status || 'Pending',
            isSample: false
        }));

        setTasks(prev => [...processedTasks, ...prev]);
        showToast(`${processedTasks.length} tasks imported successfully`, "success");
    }, [showToast]);

    const importSampleTasks = async () => {
        if (isImporting) return;
        
        setIsImporting(true);
        try {
            const sampleTasks = await ExternalAPI.fetchSampleTasks(5);
            setTasks(prev => [...prev, ...sampleTasks]);
            showToast("Sample tasks imported", "success");
        } catch (error) {
            showToast(error.message || "Failed to fetch sample tasks", "error");
        } finally {
            setIsImporting(false);
        }
    };

    return (
        <TaskContext.Provider value={{ 
            tasks, 
            isImporting,
            isTaskModalOpen,
            editingTask,
            openTaskModal,
            closeTaskModal,
            addTask, 
            updateTask, 
            deleteTask, 
            clearCompleted,
            clearAllTasks,
            importSampleTasks,
            importUserTasks
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);