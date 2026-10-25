import React from 'react'
import Header from './components/Header/Header'
import MobileTopBar from './components/Header/MobileTopBar'
import MobileBottomNav from './components/Header/MobileBottomNav'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <div className="flex h-screen bg-white dark:bg-slate-950/80 text-white font-sans overflow-hidden relative">
            {/* Desktop Sidebar (Hidden on mobile devices) */}
            <Header />
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                
                {/* Mobile Top Header (Hidden on desktop devices) */}
                <MobileTopBar />

                {/* Scrollable Main Content Area */}
                {/* Added bottom padding on mobile so content isn't hidden behind the bottom nav */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6">
                    <Outlet />
                    
                    {/* Footer sits at the bottom of the scrollable content */}
                    <div className="mt-12">
                        <Footer />
                    </div>
                </main>

                {/* Mobile Bottom Navigation (Hidden on desktop devices) */}
                <MobileBottomNav />
                
            </div>
        </div>
    )
}

export default Layout