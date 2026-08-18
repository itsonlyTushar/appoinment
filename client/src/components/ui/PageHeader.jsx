import React from 'react';

const PageHeader = ({ title, description, className = '' }) => {
    return (
        <div className={`space-y-1 ${className}`}>
            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-heading">{title}</h1>
            {description && (
                <p className="text-sm text-body">{description}</p>
            )}
        </div>
    );
};

export default PageHeader;