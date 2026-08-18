import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LuLogOut } from "react-icons/lu";
import { toast } from 'react-toastify';
import { navItems } from '../../constants/navItems';
import { userLogout } from '../../features/actions/authActions';
import Modal from './Modal';
import Button from './Button';
import logo from '../../assets/logo/logo.png';
import collapsedLogo from '../../assets/logo/collapsed.png';

const Sidebar = ({ collapsed }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setisModalOpen] = useState(false);

    // CONFIRM LOGOUT AND SHOW TOAST AFTERWARDS 
    const handleConfirmLogout = () => {
        setisModalOpen(false);
        dispatch(userLogout());
        toast.success("Logged out successfully!");
        navigate('/');
    };

    return (
        <aside
            className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-body/10 bg-surface transition-[width] duration-200 ${collapsed ? 'w-20' : 'w-64'
                }`}
        >
            <div className={`flex h-16 items-center border-b border-body/10 px-4 ${collapsed ? 'justify-center' : 'justify-start'}`}>
                {collapsed ? (
                    <Link to="/" className="flex items-center justify-center">
                        <img src={collapsedLogo} alt="HealthEase" className="h-8 w-auto object-contain" />
                    </Link>
                ) : (
                    <Link to="/" className="flex items-center pl-2">
                        <img src={logo} alt="HealthEase" className="h-8 w-auto object-contain" />
                    </Link>
                )}
            </div>

            {/* RENDER WITH NAVIGATION LINKS */}
            <nav className='flex-1 space-y-1.5 p-3 overflow-y-auto'>
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            title={collapsed ? item.label : undefined}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-xl px-2.5 py-1.5 transition-colors duration-150 text-sm font-medium min-h-[44px] ${isActive
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-body hover:text-heading hover:bg-background'
                                } ${collapsed ? 'justify-center px-0' : ''}`
                            }
                        >
                            {Icon && <Icon size={20} className="shrink-0" />}

                            {!collapsed && (
                                <span className="truncate">{item.label}</span>
                            )}
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
                    className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-1.5 text-sm font-medium min-h-[44px] text-danger/80 hover:text-danger hover:bg-danger/10 transition-colors duration-150 cursor-pointer ${collapsed ? 'justify-center px-0' : ''
                        }`}
                >
                    <LuLogOut size={20} className="shrink-0" />
                    {!collapsed && (
                        <span>Logout</span>
                    )}
                </button>

                {/* MODAL WHEN CLICK LOGOUT  */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setisModalOpen(false)}
                    ModalTitle="Confirm Logout"
                    actions={
                        <Button
                            type="button"
                            variant="primary"
                            onClick={handleConfirmLogout}
                            className="px-4 py-2 text-sm"
                        >
                            Logout
                        </Button>
                    }
                >
                    <p className="text-body text-sm">
                        Are you sure you want to log out of your account?
                    </p>
                </Modal>
            </div>
        </aside>
    );
};

export default Sidebar;