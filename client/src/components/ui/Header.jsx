import React from 'react';
import { MdMedicalServices } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="h-16 bg-surface border-b border-body/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
            <div>
                <h2 className="text-base sm:text-lg font-heading font-semibold text-heading tracking-tight">
                    Dashboard
                </h2>
            </div>

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
