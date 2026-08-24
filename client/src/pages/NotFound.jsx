import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuHouse, LuArrowLeft, LuSearch, LuCalendar } from 'react-icons/lu';

// KEEP IMAGE REFERENCE AT TOP.
const NOT_FOUND_IMAGE =
  'https://res.cloudinary.com/dartdvch1/image/upload/v1787079008/doctor-appointment/reports/arbsmssgpm051zxhbia5.png';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '404 - Page Not Found | HealthEase';
  }, []);

  return (
    <div className=" flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div
        className="max-w-xl w-full text-center"
        data-aos="fade-up"
      >

        <div className="relative mb-6 flex justify-center">
          <img
            src={NOT_FOUND_IMAGE}
            alt="404 Page Not Found"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto object-contain"
            loading="eager"
          />
        </div>

        {/* HEADINGS WITH MESSAGE */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading font-heading mb-3 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-body text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
          Oops! The page you are looking for might not exist.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-body/20 bg-surface text-heading font-medium text-sm hover:bg-background hover:border-body/30 transition-all duration-200 shadow-sm cursor-pointer"
          >
            <LuArrowLeft className="w-4 h-4 text-body" />
            <span>Go Back</span>
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-surface font-medium text-sm hover:bg-primary/90 transition-all duration-200 shadow-sm shadow-primary/25 cursor-pointer"
          >
            <LuHouse className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
