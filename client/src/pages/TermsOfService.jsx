import React from 'react';
import { Link } from 'react-router-dom';
import {
  LuScale,
  LuTriangleAlert,
  LuArrowLeft,
} from 'react-icons/lu';
import { TERMS_OF_SERVICE_SECTIONS } from '../constants/termsOfService';

const TermsOfService = () => {
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
            <LuScale className="text-sm" />
            Terms & Conditions
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-heading tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-body max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before scheduling doctor appointments or using the HealthEase healthcare management portal.
          </p>
          <p className="text-xs text-body/80 font-medium">
            Last Updated: August 2026
          </p>
        </header>

        {/* EMERGENCY CALLOUT BANNER */}
        <aside aria-label="Medical Emergency Notice" className="mb-10 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 sm:p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
            <LuTriangleAlert className="text-xl" />
          </div>
          <div className="space-y-1 text-left">
            <h2 className="text-sm sm:text-base font-semibold text-heading">
              Important Medical Emergency Notice
            </h2>
            <p className="text-xs sm:text-sm text-body leading-relaxed">
              HealthEase is an appointment booking portal and is not intended for urgent or life-threatening emergencies. If you require immediate emergency medical care, please contact your local emergency response service right away.
            </p>
          </div>
        </aside>

        {/* DETAILED CONTENT SECTIONS */}
        <div className="space-y-6 sm:space-y-8">
          {/* LOAD TERMS FROM CONSTANT FILE  */}
          {TERMS_OF_SERVICE_SECTIONS.map((section) => {
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
      </div>
    </div>
  );
};

export default TermsOfService;
