import React from 'react';
import { FcMenu } from 'react-icons/fc';
import { MdMedicalServices } from "react-icons/md";
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';

export default function Header({ collapsed, setCollapsed }) {
    return (
        <header className="h-16 bg-surface border-b border-body/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
            <button
                onClick={() => setCollapsed(!collapsed)}
                className='w-8 h-8 rounded-lg flex items-center justify-center text-body hover:text-heading hover:bg-background transition-colors'
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                aria-label="Toggle Sidebar"
            >
                {collapsed ? <FcMenu size={18} /> : <RxCross2 size={18} />}
            </button>
            <Link
                to="/services"
                className="flex items-center text-surface bg-primary font-medium gap-2 min-h-[40px] px-4 rounded-xl transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-primary/90 active:scale-[0.97] shadow-[0_1px_2px_rgba(79,107,254,0.2)]"
                aria-label="Services"
            >
                <MdMedicalServices size={18} className="shrink-0" />
                <span className="text-sm font-semibold">Services</span>
            </Link>
        </header>
    );
}
