import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { LuCalendarCheck } from 'react-icons/lu';
import Search from './ui/Search';

const HERO_VIDEO_URL = "https://res.cloudinary.com/dartdvch1/video/upload/v1787084340/14d8f74abf_nmjb7o.mp4";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // HANDLES SEARCH SUBMISSION AND NAVIGATES TO SERVICES PAGE
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/services');
    }
  };

  // NAVIGATES DIRECTLY TO LOGIN PAGE FOR APPOINTMENT BOOKING
  const handleBookAppointment = () => {
    navigate('/login');
  };

  return (
    <section className="relative w-full min-h-[100dvh] h-screen sm:min-h-[600px] flex items-center justify-center overflow-hidden py-16 sm:py-0">
      {/* BACKGROUND VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
        Your browser does not support the video
      </video>

      {/* HERO FOREGROUND CONTENT - ALIGNED TO LEFT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full flex flex-col items-start text-left pt-12 sm:pt-0">

        {/* HEADING */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-surface mb-4 sm:mb-6 text-left leading-tight max-w-2xl">
          Looking for a test or consultation?
        </h1>

        {/* SEARCH INPUT BAR USING UI SEARCH COMPONENT */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl">
          <Search
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search from our services..."
            className="!h-11 sm:!h-12 !text-sm sm:!text-base shadow-lg !rounded-xl border border-white/60 bg-surface/95 backdrop-blur-md"
          />
        </form>

        {/* 2 ACTION OPTIONS: 'Search Services' & 'Book appointment' */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4 mt-6 sm:mt-8 w-full max-w-md">
          {/* SEARCH SERVICES */}
          <button
            type="button"
            onClick={handleSearch}
            className="w-full sm:w-auto flex-1 h-11 sm:h-12 inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-6 rounded-xl bg-surface hover:bg-surface/90 text-heading font-semibold text-sm sm:text-base shadow-md border border-white/60 hover:border-primary/50 hover:text-primary transition-all duration-200 cursor-pointer active:scale-98"
          >
            <FiSearch className="text-primary text-base sm:text-lg shrink-0" />
            <span>Search Services</span>
          </button>

          {/* BOOK APPOINTMENT */}
          <button
            type="button"
            onClick={handleBookAppointment}
            className="w-full sm:w-auto flex-1 h-11 sm:h-12 inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-6 rounded-xl bg-primary hover:bg-primary/90 text-surface font-semibold text-sm sm:text-base shadow-md border border-primary transition-all duration-200 cursor-pointer active:scale-98"
          >
            <LuCalendarCheck className="text-surface text-base sm:text-lg shrink-0" />
            <span>Book appointment</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
