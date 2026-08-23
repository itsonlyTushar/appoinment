import React from 'react';
import { Link } from 'react-router-dom';
import {
  LuShieldCheck,
  LuLock,
  LuDatabase,
  LuKeyRound,
  LuFileText,
  LuUserCheck,
  LuEyeOff,
  LuArrowLeft
} from 'react-icons/lu';
import { CONTACT_INFO } from '../constants/contactDetails';

const SECTIONS = [
  {
    id: 'information-collected',
    icon: LuUserCheck,
    title: '1. Information We Collect',
    content: [
      'To provide a seamless healthcare scheduling experience, HealthEase collects only the necessary information provided directly by you:',
      '• Account Information: Full name, email address, contact phone number, and optional profile pictures.',
      '• Appointment Details: Selected medical department, consulting doctor, appointment date and time slot (10:00 AM – 5:00 PM), and optional consultation notes.',
      '• Medical Attachments: Diagnostic files and reports that you optionally upload when booking an appointment to assist your consulting doctor.',
    ],
  },
  {
    id: 'password-security',
    icon: LuLock,
    title: '2. Password Security & Authentication',
    content: [
      'We take authentication security seriously and implement industry standard safeguards:',
      '• Password Encryption: All passwords submitted during registration are salted and hashed using one-way cryptographic algorithms (bcrypt). At no point are passwords visible in plain text or shared with anyone.',
      '• Google Authentication: When you sign in with Google, authentication is completed via secure Google OAuth 2.0 ID tokens. We receive only your verified profile details (name, email, and avatar) without gaining access to your Google account password.',
      '• Session Tokens: Authentication sessions are secured with encrypted JSON Web Tokens (JWT) with strict expiration limits.',
    ],
  },
  {
    id: 'data-storage',
    icon: LuDatabase,
    title: '3. Data Storage & Infrastructure',
    content: [
      'Your user details and appointment records are housed in secure MongoDB Atlas cloud databases, protected with modern network isolation and data encryption both at rest and in transit.',
      'Medical report attachments and user profile images are processed and stored using dedicated, secure cloud storage with authenticated secure delivery URLs.',
    ],
  },
  {
    id: 'data-usage',
    icon: LuFileText,
    title: '4. How We Use Your Information',
    content: [
      'We use the information we collect strictly for healthcare scheduling purposes:',
      '• Processing and confirming your doctor appointments across our medical departments.',
      '• Maintaining your personal appointment history for easy review and record keeping.',
      '• Allowing you to update your profile details and contact number.',
      '• Ensuring verified doctor-patient communication regarding your scheduled visits.',
    ],
  },
  {
    id: 'third-party-sharing',
    icon: LuEyeOff,
    title: '5. Zero Third-Party Sharing & Confidentiality',
    content: [
      'We respect your medical privacy. Your diagnostic reports, appointment notes, and personal contact details are shared only with the consulting medical specialists involved in your care.',
      'We never sell, rent, monetize, or trade patient data with third-party advertisers or marketing brokers.',
    ],
  },
  {
    id: 'user-rights',
    icon: LuShieldCheck,
    title: '6. Your Rights & Account Control',
    content: [
      'You maintain full control over your HealthEase account:',
      '• You can access and update your full name, contact number, and profile picture at any time from your Profile settings.',
      '• You can view past and upcoming appointment records from the My Appointments section.',
      '• You can request account assistance or data updates by reaching out to our support team.',
    ],
  },
];

const PrivacyPolicy = () => {
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

        {/* BOTTOM CONTACT CALLOUT */}
        <div className="mt-12 bg-primary/5 border border-primary/15 rounded-2xl p-6 sm:p-8 text-center space-y-3">
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
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
