import React, { forwardRef } from "react";

const ChooseFile = forwardRef(function ChooseFile(
    {
        label = "Upload File",
        id = "file-upload",
        className = "",
        error,
        disabled = false,
        accept = "image/*",
        hideLabel = false,
        ...props
    },
    ref,
) {
    return (
        <div className={`grid w-full items-center gap-1.5 ${className}`}>
            {label && !hideLabel && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-heading leading-none"
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
                    flex h-11 w-full items-center cursor-pointer rounded-lg border bg-background text-sm text-body transition-all duration-200
                    file:mr-4 file:h-full file:cursor-pointer file:border-0 file:bg-primary file:px-4 file:text-sm file:font-medium file:text-surface hover:file:bg-primary/90 file:transition-colors
                    focus:bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none
                    disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-body/5 file:disabled:opacity-60 file:disabled:cursor-not-allowed file:disabled:bg-body/30
                    ${error ? "border-red-500" : "border-body/20"}
                `}
                {...props}
            />
        </div>
    );
});

export default ChooseFile;
