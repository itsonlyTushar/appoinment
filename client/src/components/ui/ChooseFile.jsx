import React, { forwardRef } from "react";

const ChooseFile = forwardRef(function ChooseFile(
    {
        label = "Upload File",
        id = "file-upload",
        className = "",
        error,
        disabled = false,
        accept = "image/*",
        ...props
    },
    ref,
) {
    return (
        <div className={`grid w-full items-center gap-1.5 ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-heading leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {label}
                </label>
            )}
            <input
                ref={ref}
                id={id}
                type="file"
                accept={accept}
                disabled={disabled}
                className={`
                    flex w-full cursor-pointer rounded-lg border bg-background text-sm text-body transition-all duration-200
                    file:mr-4 file:cursor-pointer file:border-0 file:bg-primary file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-surface hover:file:bg-primary/90 file:transition-colors
                    focus:bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none
                    disabled:cursor-not-allowed disabled:opacity-60
                    ${error ? "border-red-500" : "border-body/20"}
                `}
                {...props}
            />
        </div>
    );
});

export default ChooseFile;
