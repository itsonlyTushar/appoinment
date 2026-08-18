import React from 'react';

const Loader = ({ title, className = 'py-16' }) => {
    return (
        <div className={`flex flex-col justify-center items-center gap-3 ${className}`}>
            {/* SPINNER ANIMATION */}
            <div className="three-body">
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
            </div>

            {/* LOADING TITLE */}
            {title && (
                <span className="text-sm font-medium text-body/70">{title}</span>
            )}
        </div>
    );
};

export default Loader;