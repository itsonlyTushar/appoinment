import React from 'react';
import { NavLink } from 'react-router-dom';
import { FcMenu } from 'react-icons/fc';
import { RxCross2 } from "react-icons/rx";
import { navItems } from '../../constants/navItems';

const Sidebar = ({ collapsed, setCollapsed }) => {
    return (
        <aside
            className={`fixed left-0 top-0 z-50 h-screen border-r border-body/10 bg-surface transition-[width] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                collapsed ? 'w-20' : 'w-64'
            }`}
        >
            {/* Header / Brand area */}
            <div className={`flex h-16 items-center border-b border-body/10 px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
                {!collapsed && (
                    <div className="flex items-center gap-2 pl-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-base">
                            M
                        </div>
                        <h1 className='text-lg font-heading font-bold text-heading tracking-tight'>
                            Medicare
                        </h1>
                    </div>
                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className='w-10 h-10 rounded-lg flex items-center justify-center text-body hover:text-heading hover:bg-background transition-colors active:scale-95 duration-150'
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    aria-label="Toggle Sidebar"
                >
                    {collapsed ? <FcMenu size={20} /> : <RxCross2 size={20} />}
                </button>
            </div>

            {/* Navigation links */}
            <nav className='space-y-1.5 p-3'>
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            title={collapsed ? item.label : undefined}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-colors duration-150 text-sm font-medium min-h-[44px] active:scale-[0.98] ${
                                    isActive
                                        ? 'bg-primary/10 text-primary font-semibold'
                                        : 'text-body hover:text-heading hover:bg-background'
                                } ${collapsed ? 'justify-center px-0' : ''}`
                            }
                        >
                            {Icon && <Icon size={22} className="shrink-0" />}

                            {!collapsed && (
                                <span className="truncate">{item.label}</span>
                            )}
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;