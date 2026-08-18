import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import Button from "./Button";

const Modal = ({
  isOpen,
  onClose,
  ModalTitle,
  actions,
  children,
}) => {
  // KEYBOARD FRIENDLY CONTROLS
  useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 transition-opacity animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-md min-w-[320px] rounded-2xl bg-surface p-6 shadow-xl border border-body/10 transition-all transform animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-body/10">
          <h2
            id="modal-title"
            className="text-lg font-heading font-semibold text-heading tracking-tight"
          >
            {ModalTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-body hover:text-heading hover:bg-background transition-colors duration-150 cursor-pointer"
          >
            <RxCross2 size={18} />
          </button>
        </div>

        {/* BODY OR MESSAGE WILL BE DISPLAYED HERE */}
        <div className="text-body text-sm font-normal">
          {children}
        </div>

        {/* FOOTER - DISPLAY ACTIONS */}
        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-body/10">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            aria-label="Close modal"
            className="px-4 py-2 text-sm"
          >
            Cancel
          </Button>
          {actions}
        </div>
      </div>
    </div>
  );
};

export default Modal;

