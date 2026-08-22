import { useState } from "react";
import { FcMenu } from "react-icons/fc";
import { MdMedicalServices } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { BiSupport } from "react-icons/bi";
import { LuPhone } from "react-icons/lu";
import Modal from "./Modal";

export default function Header({
    collapsed,
    setCollapsed,
    mobileOpen,
    setMobileOpen,
}) {
    const [isSupportOpen, setIsSupportOpen] = useState(false);

    return (
        <header className="h-16 bg-surface border-b border-body/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
            {/* MOBILE TOGGLE BUTTON */}
            <button
                type="button"
                onClick={() => setMobileOpen && setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-body hover:text-heading hover:bg-background transition-colors cursor-pointer"
                title={mobileOpen ? "Close menu" : "Open menu"}
                aria-label="Toggle Sidebar"
            >
                {mobileOpen ? <RxCross2 size={20} /> : <FcMenu size={20} />}
            </button>

            {/* DESKTOP COLLAPSE BUTTON */}
            <button
                type="button"
                onClick={() => setCollapsed(!collapsed)}
                className="hidden md:flex w-8 h-8 rounded-lg items-center justify-center text-body hover:text-heading hover:bg-background transition-colors cursor-pointer"
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                aria-label="Toggle Sidebar"
            >
                {collapsed ? <FcMenu size={18} /> : <RxCross2 size={18} />}
            </button>

            {/* SERVICE AND CONTACT ACTION ACTIONS */}
            <div className="flex items-center gap-3">
                <Link
                    to="/services"
                    className="flex items-center text-surface bg-primary font-medium gap-2 min-h-[40px] px-4 rounded-xl hover:bg-primary/90 transition-colors"
                    aria-label="Services"
                >
                    <MdMedicalServices size={18} className="shrink-0" />
                    <span className="text-sm font-semibold">Services</span>
                </Link>

                <button
                    type="button"
                    onClick={() => setIsSupportOpen(true)}
                    className="flex items-center text-surface bg-red-500 font-medium gap-2 min-h-[40px] px-4 rounded-xl hover:bg-red-500/90 transition-colors cursor-pointer"
                    aria-label="Support"
                    title="Help & Support"
                >
                    <BiSupport size={18} className="shrink-0" />
                </button>
            </div>

            {/* SUPPORT & HELPDESK MODAL */}
            <Modal
                isOpen={isSupportOpen}
                onClose={() => setIsSupportOpen(false)}
                ModalTitle="Help & Support Desk"
                actions={
                    <a
                        href="tel:+919327584894"
                        className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 px-4 py-2 text-sm font-medium rounded-xl transition-colors"
                    >
                        <LuPhone size={15} />
                        <span>Call Support</span>
                    </a>
                }
            >
                <div className="space-y-4 pt-1">
                    <div className="space-y-2.5">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-body/10">
                            <div className="text-xs sm:text-sm">
                                <span className="font-semibold text-heading block">
                                    Phone Helpline
                                </span>
                                <a
                                    href="tel:+919327584894"
                                    className="text-primary hover:underline font-medium"
                                >
                                    +91 93275 84894
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-body/10">
                            <div className="text-xs sm:text-sm">
                                <span className="font-semibold text-heading block">
                                    Email Support
                                </span>
                                <a
                                    href="mailto:support@healthease.com"
                                    className="text-primary hover:underline font-medium"
                                >
                                    support@healthease.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-body/10">
                            <div className="text-xs sm:text-sm">
                                <span className="font-semibold text-heading block">
                                    Operating Hours
                                </span>
                                <span className="text-body font-normal">
                                    Mon – Sat: 8:00 AM – 8:00 PM
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </header>
    );
}
