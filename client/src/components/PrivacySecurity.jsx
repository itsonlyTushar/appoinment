import React from 'react';
import { LuShieldCheck, LuLock, LuUserCheck, LuFileCheck, LuBadgeCheck } from 'react-icons/lu';

const PRIVACY_FEATURES = [
  {
    icon: LuLock,
    title: "256-Bit SSL Encryption",
    description:
      "All medical reports, personal records, and consultations are encrypted in transit and at rest with bank-grade security.",
  },
  {
    icon: LuUserCheck,
    title: "Doctor-Only Access",
    description:
      "Your confidential diagnostic files and health history are accessible strictly by you and your authorized consulting doctors.",
  },
  {
    icon: LuShieldCheck,
    title: "Zero Third-Party Sharing",
    description:
      "We adhere to strict confidentiality policies. Your personal details and medical history are never sold or shared with advertisers.",
  },
];

const PrivacySecurity = () => {
  return (
    <section className="w-full bg-background py-16 sm:py-24 border-t border-body/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* SECTION HEADER */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-heading tracking-tight leading-tight">
            Your Health Records & Personal Details Stay Completely Private
          </h2>

          <p className="text-sm   md:text-lg text-body max-w-2xl mx-auto leading-relaxed">
            We prioritize patient trust above all else. Every lab report, appointment summary, and consultation history is protected by enterprise-grade healthcare security.
          </p>
        </div>

        {/* 3-COLUMN FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PRIVACY_FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl bg-surface p-7 sm:p-8 border border-body/10 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-start text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-surface transition-colors duration-200">
                  <Icon className="text-2xl" />
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-heading mb-2.5 tracking-tight">
                  {feature.title}
                </h3>

                <p className="text-sm   text-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PrivacySecurity;
