import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/ui/Sidebar';
import Header from '../components/ui/Header';

export default function PrivateLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-background flex">
            {/* MAIN AREA SIDEBAR + TOP BAR */}
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div
                className={`flex-1 flex flex-col min-h-screen transition-[margin-left] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${collapsed ? 'ml-20' : 'ml-64'
                    }`}
            >
                <Header />

                <main className="flex-1 p-6 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
