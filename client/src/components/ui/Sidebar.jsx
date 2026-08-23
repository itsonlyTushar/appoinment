import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";
import { navItems } from '../../lib/navItems';
import { RxCross2 } from "react-icons/rx";
import LogoutModal from './LogoutModal';
import logo from '../../assets/logo/logo.png';
import collapsedLogo from '../../assets/logo/collapsed.png';

const Sidebar = ({ collapsed, mobileOpen, setMobileOpen }) => {
    const [isModalOpen, setisModalOpen] = useState(false);

    return (
        <aside
            className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-body/10 bg-surface transition-all duration-200 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 w-64 ${collapsed ? 'md:w-20' : 'md:w-64'
                }`}
        >
            <div className={`flex h-16 items-center justify-between border-b border-body/10 px-4 ${collapsed ? 'md:justify-center' : 'justify-start'}`}>
                {collapsed ? (
                    <>
                        <Link to="/" className="hidden md:flex items-center justify-center">
                            <img src={collapsedLogo} alt="HealthEase" className="h-8 w-auto object-contain" />
                        </Link>
                        <Link to="/" className="flex md:hidden items-center pl-2">
                            <img src={logo} alt="HealthEase" className="h-8 w-auto object-contain" />
                        </Link>
                    </>
                ) : (
                    <Link to="/" className="flex items-center pl-2">
                        <img src={logo} alt="HealthEase" className="h-8 w-auto object-contain" />
                    </Link>
                )}

                {/* CLOSE BUTTON ON MOBILE */}
                <button
                    type="button"
                    onClick={() => setMobileOpen && setMobileOpen(false)}
                    className="md:hidden p-1.5 rounded-lg text-body hover:text-heading hover:bg-background transition-colors"
                    aria-label="Close Sidebar"
                >
                    <RxCross2 size={20} />
                </button>
            </div>

            {/* RENDER WITH NAVIGATION LINKS */}
            <nav className='flex-1 space-y-1.5 p-3 overflow-y-auto'>
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            onClick={() => setMobileOpen && setMobileOpen(false)}
                            title={collapsed ? item.label : undefined}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-xl px-2.5 py-1.5 transition-colors duration-150 text-sm font-medium min-h-[44px] ${isActive
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-body hover:text-heading hover:bg-background'
                                } ${collapsed ? 'md:justify-center md:px-0' : ''}`
                            }
                        >
                            {Icon && <Icon size={20} className="shrink-0" />}

                            <span className={`truncate ${collapsed ? 'md:hidden' : ''}`}>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* FOOTER LOG OUT OPTION WITH MODAL CONFIRMATION */}
            <div className='p-3'>
                <button
                    type="button"
                    onClick={() => setisModalOpen(true)}
                    title={collapsed ? "Logout" : undefined}
                    aria-label="Logout"
                    className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-1.5 text-sm font-medium min-h-[44px] text-danger/80 hover:text-danger hover:bg-danger/10 transition-colors duration-150 cursor-pointer ${collapsed ? 'md:justify-center md:px-0' : ''
                        }`}
                >
                    <LuLogOut size={20} className="shrink-0" />
                    <span className={collapsed ? 'md:hidden' : ''}>Logout</span>
                </button>

                {/* MODAL WHEN CLICK LOGOUT  */}
                <LogoutModal
                    isOpen={isModalOpen}
                    onClose={() => setisModalOpen(false)}
                    onAfterLogout={() => setMobileOpen && setMobileOpen(false)}
                />
            </div>
        </aside>
    );
};

export default Sidebar;