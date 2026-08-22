import React from 'react';
import { Link } from 'react-router-dom';
import collapsed from '../assets/logo/collapsed.png';
import logo from '../assets/logo/logo.png';
import {
  QUICK_LINKS,
  OUR_CENTERS,
  LEGAL_LINKS,
  SOCIAL_LINKS,
} from '../constants/footerDetails';

const Footer = () => {
  return (
    <footer className="w-full bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 sm:gap-8">
          {/* BRAND & ABOUT */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="HealthEase"
                  className="h-10 w-auto object-contain bg-white/95 px-2.5 py-1 rounded-xl shadow-xs"
                />
              </Link>
            </div>
            <p className="text-sm text-white/80 leading-relaxed max-w-sm">
              Simplifying healthcare with seamless doctor appointments, verified specialists, and secure patient records.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              {QUICK_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="hover:text-white hover:underline transition-colors duration-150 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* OUR CENTERS */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Our Centers
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              {OUR_CENTERS.map((city, idx) => (
                <li key={idx} className="transition-colors duration-150">
                  {city}
                </li>
              ))}
            </ul>
          </div>

          {/* PRIVACY & TERMS */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Privacy & Legal
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              {LEGAL_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="hover:text-white hover:underline transition-colors duration-150 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL LINKS */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Connect With Us
            </h3>
            <p className="text-sm text-white/80">
              Follow our social channels for medical updates and announcements.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white hover:text-primary flex items-center justify-center text-white text-lg transition-all duration-200 shadow-xs"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center text-center">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center">
              <img
                src={collapsed}
                alt="HealthEase"
                className="w-auto object-contain bg-white/95 px-2.5 py-1 rounded-xl mt-10 shadow-xs"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
