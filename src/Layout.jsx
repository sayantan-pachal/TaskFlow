import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import MobileTopBar from './components/Header/MobileTopBar';
import MobileBottomNav from './components/Header/MobileBottomNav';
import DashboardHeader from "./components/Header/DesktopTopHeader";
import Footer from './components/Footer/Footer';
import TaskModal from './components/Modal/AddTaskModal';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
    return (
        <div className="relative flex h-screen overflow-hidden bg-white font-sans text-slate-900 dark:bg-slate-950/80 dark:text-white">
            <Header />
            
            <div className="relative flex h-full flex-1 flex-col overflow-hidden">
                <MobileTopBar />

                {/* Primary Scrollable Viewport */}
                <main 
                    id="main-scroll-container" 
                    className="flex-1 overflow-y-auto p-4 pb-24 md:p-6 md:pb-6"
                >
                    <ScrollToTop />
                    <DashboardHeader />
                    <Outlet />
                    
                    <div className="mt-12">
                        <Footer />
                    </div>
                </main>

                <TaskModal />
                <MobileBottomNav />
            </div>
        </div>
    );
}