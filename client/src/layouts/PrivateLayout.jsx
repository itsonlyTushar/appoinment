import React, { useState, useEffect, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";
import Header from "../components/ui/Header";
import PageLoader from "../components/ui/PageLoader";

export default function PrivateLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    // AUTO-CLOSE MOBILE SIDEBAR DRAWER ON ROUTE CHANGE
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-background flex">
            {/* MAIN AREA SIDEBAR */}
            <Sidebar
                collapsed={collapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            <div
                className={`flex-1 flex flex-col min-h-screen transition-[margin-left] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ml-0 ${collapsed ? "md:ml-20" : "md:ml-64"
                    }`}
            >
                <Header
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                />

                <main className="flex-1 p-4 sm:p-6 md:p-8">
                    <Suspense fallback={<PageLoader />}>
                        <Outlet />
                    </Suspense>
                </main>
            </div>
        </div>
    );
}

