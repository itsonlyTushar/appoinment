import React from 'react'
import { useState } from 'react';
import { FcMenu } from 'react-icons/fc';
import { RxCross2 } from "react-icons/rx";

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);


    return (
        <aside
            className={
                `fixed left-0 top-0 z-50 h-screen border-r border-gray-200 bg-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`
            }
        >
            <div className='flex h-16 items-center justify-between px-4'>
                {!collapsed && (
                    <h1 className='text-xl font-bold'>LOGO</h1>
                )}

                <button className='rounded-lg p-2 hover:bg-gray-100'>
                    {collapsed ? <FcMenu size={15} /> : <RxCross2 size={15} />}
                </button>
            </div>

            <nav className='space-y-1 px-3'>
                {

                }
            </nav>
        </aside>
    )
}

export default Sidebar