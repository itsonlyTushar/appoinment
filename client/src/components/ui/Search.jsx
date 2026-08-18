import React from 'react';
import { IoSearchOutline } from "react-icons/io5";

const Search = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}) => {
  return (
    <div className="relative flex items-center w-full">
      <IoSearchOutline className="absolute left-3.5 text-body/50 text-lg pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full h-11 pl-10 pr-4 py-2.5 text-sm rounded-lg border border-body/20 bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-heading placeholder:text-body/60 ${className}`}
      />
    </div>
  );
};

export default Search;

