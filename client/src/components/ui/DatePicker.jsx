import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";

const DatePicker = ({
  value,
  onChange,
  placeholder = "Select date",
  error,
}) => {
  const selectedDate = value ? new Date(value) : null;

  const handleDateChange = (date) => {
    if (!date) {
      onChange?.("");
      return;
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    onChange?.(`${year}-${month}-${day}`);
  };

  return (
    <div className="relative w-full">
      <ReactDatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={new Date()}
        placeholderText={placeholder}
        dateFormat="dd MMM yyyy"
        wrapperClassName="w-full"
        className={`flex h-11 w-full rounded-lg border bg-background px-3.5 pr-10 text-sm text-heading placeholder:text-body/60 transition-all duration-200 focus:bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer ${
          error ? "border-red-500" : "border-body/20"
        }`}
      />
      <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-body/60">
        <FiCalendar className="text-lg" />
      </div>
    </div>
  );
};

export default DatePicker;
