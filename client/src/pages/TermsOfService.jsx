import React from 'react';
import { Link } from 'react-router-dom';
import {
  LuScale,
  LuTriangleAlert,
  LuCalendarCheck,
  LuUserCheck,
  LuFileSpreadsheet,
  LuShieldAlert,
  LuClock,
  LuArrowLeft,
} from 'react-icons/lu';

const SECTIONS = [
  {
    id: 'acceptance-terms',
    icon: LuScale,
    title: '1. Acceptance of Terms',
    content: [
      'By accessing, registering, or scheduling appointments through HealthEase, you acknowledge and agree to comply with these Terms of Service.',
      'If you do not agree with any part of these terms, please discontinue using the platform.',
    ],
  },
  {
    id: 'medical-disclaimer',
    icon: LuShieldAlert,
    title: '2. Medical & Emergency Disclaimer',
    content: [
      '• Non-Emergency Service: HealthEase is a digital scheduling portal designed to connect patients with consulting specialists across clinical departments. It is NOT intended for immediate emergency triage.',
      '• Emergency Response: If you are experiencing a medical emergency (such as severe chest pain, shortness of breath, acute trauma, or loss of consciousness), please dial your local emergency services immediately or visit the closest emergency room.',
      '• Professional Judgment: Consultations, diagnoses, and medical advice are provided independently by medical specialists during your scheduled appointments.',
    ],
  },
  {
    id: 'account-responsibilities',
    icon: LuUserCheck,
    title: '3. User Accounts & Responsibilities',
    content: [
      '• True and Accurate Data: When registering an account or booking an appointment, you agree to provide accurate and updated information, including your full legal name and an active contact number.',
      '• Account Security: You are responsible for safeguarding your login credentials (passwords or Google authentication access). You must notify us immediately if you suspect unauthorized access to your account.',
      '• Single User Usage: Each account is intended for individual or guardian usage to maintain the integrity of patient health records.',
    ],
  },
  {
    id: 'booking-policy',
    icon: LuCalendarCheck,
    title: '4. Appointment Booking & Slot Guidelines',
    content: [
      '• Operating Hours: Appointments can be scheduled during designated operational hours between 10:00 AM and 5:00 PM.',
      '• Conflict Prevention: The platform enforces scheduling checks to prevent duplicate overlapping bookings for the same specialist or time slot.',
      '• Attendance: We ask all patients to arrive promptly or be available at their chosen consultation time to ensure all patients receive timely medical attention.',
    ],
  },
  {
    id: 'medical-documents',
    icon: LuFileSpreadsheet,
    title: '5. Uploaded Medical Reports & Attachments',
    content: [
      '• Authentic Records: When uploading diagnostic reports, lab results, or health summaries, ensure they are authentic and relevant to your consultation.',
      '• Consent for Doctor Review: By uploading medical files, you grant authorized consulting physicians permission to review the documents for diagnostic and consultation purposes.',
    ],
  },
  {
    id: 'fair-use',
    icon: LuScale,
    title: '6. Fair Platform Usage & Modifications',
    content: [
      '• Acceptable Use: Users agree not to misuse the platform, attempt unauthorized access to backend systems, or submit false booking inquiries.',
      '• Service Updates: HealthEase may update or refine platform features, available departments, or these terms to enhance user experience and adhere to medical compliance standards.',
    ],
  },
];

const TermsOfService = () => {
  return (
    <div className="w-full bg-background min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP BREADCRUMB / BACK LINK */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-body hover:text-primary transition-colors"
          >
            <LuArrowLeft className="text-base" />
            Back to Home
          </Link>
        </div>

        {/* HERO HEADER */}
        <div className="text-center space-y-4 mb-12 sm:mb-14">
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
        </div>

        {/* EMERGENCY CALLOUT BANNER */}
        <div className="mb-10 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 sm:p-6 flex items-start gap-4">
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
        </div>
        {/* DETAILED CONTENT SECTIONS */}
        <div className="space-y-6 sm:space-y-8">
          {SECTIONS.map((section) => {
            const SectionIcon = section.icon;
            return (
              <div
                key={section.id}
                id={section.id}
                className="bg-surface rounded-2xl p-6 sm:p-8 border border-body/10 shadow-xs space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <SectionIcon className="text-lg" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-heading">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-2.5 text-sm sm:text-base text-body leading-relaxed pl-0 sm:pl-12">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className={paragraph.startsWith('•') ? 'pl-2 text-sm text-heading/90 font-medium' : 'text-sm text-body'}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CALLOUT */}
        <div className="mt-12 bg-primary/5 border border-primary/15 rounded-2xl p-6 sm:p-8 text-center space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-heading">
            Need Help or Have Inquiries?
          </h3>
          <p className="text-xs sm:text-sm text-body max-w-xl mx-auto">
            Our team is available to assist you with appointment bookings, specialist inquiries, and account support.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/services"
              className="inline-flex items-center justify-center text-xs sm:text-sm font-medium bg-primary text-surface px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-xs"
            >
              Browse Medical Services
            </Link>
            <Link
              to="/privacy-policy"
              className="inline-flex items-center justify-center text-xs sm:text-sm font-medium bg-surface text-heading border border-body/20 px-5 py-2.5 rounded-xl hover:border-primary hover:text-primary transition-colors shadow-xs"
            >
              View Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
