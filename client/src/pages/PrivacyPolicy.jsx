import React from 'react';
import { Link } from 'react-router-dom';
import {
  LuShieldCheck,
  LuArrowLeft
} from 'react-icons/lu';
import { CONTACT_INFO } from '../constants/contactDetails';
import { PRIVACY_POLICY_SECTIONS } from '../constants/privacyPolicy';

const PrivacyPolicy = () => {
  return (
    <div className="w-full bg-background min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-body hover:text-primary transition-colors"
          >
            <LuArrowLeft className="text-base" />
            Back to Home
          </Link>
        </nav>

        {/* HERO HEADER */}
        <header className="text-center space-y-4 mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            <LuShieldCheck className="text-sm" />
            Trust & Security
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-heading tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-body max-w-2xl mx-auto leading-relaxed">
            At HealthEase, protecting your personal details and health records is our highest priority. Learn how your data is safely handled, encrypted, and stored.
          </p>
          <p className="text-xs text-body/80 font-medium">
            Last Updated: August 2026
          </p>
        </header>

        {/* DETAILED CONTENT SECTIONS */}
        <div className="space-y-6 sm:space-y-8">
          {/* LOAD PRIVACY DETAILS FROM CONSTANT FILE  */}
          {PRIVACY_POLICY_SECTIONS.map((section) => {
            const SectionIcon = section.icon;
            return (
              <article
                key={section.id}
                id={section.id}
                className="bg-surface rounded-2xl p-6 sm:p-8 border border-body/10 shadow-xs space-y-4"
              >
                <header className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <SectionIcon className="text-lg" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-heading">
                    {section.title}
                  </h2>
                </header>

                <div className="space-y-2.5 text-sm sm:text-base text-body leading-relaxed pl-0 sm:pl-12">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className={paragraph.startsWith('•') ? 'pl-2 text-sm text-heading/90 font-medium' : 'text-sm text-body'}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {/* BOTTOM CONTACT CALLOUT */}
        <aside aria-label="Privacy questions contact" className="mt-12 bg-primary/5 border border-primary/15 rounded-2xl p-6 sm:p-8 text-center space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-heading">
            Questions About Your Privacy?
          </h3>
          <p className="text-xs sm:text-sm text-body max-w-xl mx-auto leading-relaxed mr-1">
            If you have any questions or concerns regarding our privacy practices or how your healthcare data is protected, please reach out to our team at
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-primary mr-1 font-medium hover:underline">
              {CONTACT_INFO.email}
            </a>
            or call
            <a href={`tel:${CONTACT_INFO.phoneTel}`} className="text-primary ml-1 font-medium hover:underline">
              {CONTACT_INFO.phone}
            </a>
            ({CONTACT_INFO.operatingHours}).
          </p>
          <div className="pt-2">
            <Link
              to="/services"
              className="inline-flex items-center justify-center text-xs sm:text-sm font-medium bg-primary text-surface px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-xs"
            >
              Explore Our Healthcare Services
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
