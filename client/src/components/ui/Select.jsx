import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const Select = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  label,
  disabled = false,
  className = "",
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const selectedOption = options.find((option) => option.value === value);

  // CLOSE WHEN CLICKED OUTSIDE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    if (option.disabled) return;

    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={`relative w-full ${className}`}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-heading">
          {label}
        </label>
      )}

      {/* MAIN TRIGGER */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          flex w-full items-center justify-between
          rounded-lg border bg-background px-4 py-2.5
          text-sm transition-all duration-200 cursor-pointer
          focus:bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20
          outline-none
          disabled:cursor-not-allowed disabled:opacity-60
          ${error ? "border-red-500" : "border-body/20"}
        `}
      >
        <span className={selectedOption ? "text-heading" : "text-body/60"}>
          {selectedOption?.label || placeholder}
        </span>

        <FiChevronDown
          size={16}
          className={`
            text-body/60 transition-transform duration-200
            ${isOpen ? "rotate-180 text-primary" : ""}
          `}
        />
      </button>

      {/* DROPDOWN DIV */}
      {isOpen && (
        <div
          className="absolute z-50 mt-1.5 max-h-60 w-full overflow-auto rounded-lg border border-body/10 bg-surface p-1 shadow-lg
          "
        >
          {options.length === 0 ? (
            <div className="px-3 py-2 text-sm text-body/60">
              No options available
            </div>
          ) : (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                disabled={option.disabled}
                onClick={() => handleSelect(option)}
                className={`
                  w-full rounded-md
                  px-3 py-2
                  text-left text-sm
                  transition-colors cursor-pointer
                  ${option.value === value
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-heading hover:bg-background"
                  }
                  ${option.disabled ? "cursor-not-allowed opacity-50" : ""}
                `}
              >
                {option.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
