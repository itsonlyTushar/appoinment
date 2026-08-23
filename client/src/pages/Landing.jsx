import React from "react";
import { useNavigate } from "react-router-dom";
import { LuCheck, LuStethoscope } from "react-icons/lu";
import Hero from "../components/Hero";
import Carousel from "../components/ui/Carousel";
import Button from "../components/ui/Button";
import FAQ from "../components/ui/FAQ";
import { departments } from "../constants/departments";
import { carouselData } from "../constants/testimonial";
import { faq } from "../constants/faq";
import {
  QUICK_SERVICES,
  DOCTOR_IMAGE_URL,
  DEPARTMENT_ICONS,
  PRIVACY_FEATURES,
} from "../constants/landingDetails";

const Landing = () => {
  const navigate = useNavigate();

  // CALCULATE TOTAL DOCTORS DYNAMICALLY FROM DEPARTMENTS.JS
  const totalDoctors = departments.reduce(
    (acc, dept) => acc + (dept.doctors ? dept.doctors.length : 0),
    0,
  );

  return (
    <main className="w-full">
      <Hero />

      {/* HEALTHCARE ACCESS SECTION */}
      <section
        aria-labelledby="specialities-services-heading"
        className="w-full bg-surface py-16 sm:py-24 border-t border-body/10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          {/* SINGLE UNIFIED SECTION HEADER */}
          <header className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
            <h2
              id="specialities-services-heading"
              className="text-2xl sm:text-4xl md:text-5xl font-semibold text-heading tracking-tight leading-tight"
            >
              24/7 Expertise You Can Trust
            </h2>

            <p className="text-xs md:text-lg text-body max-w-2xl mx-auto leading-relaxed">
              Explore specialized medical departments and access essential
              healthcare services designed for complete patient care.
            </p>
          </header>

          {/* TWO SECTIONS SPLIT SIDE BY SIDE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* CLINICAL SPECIALITIES FROM departments.js (COMES FROM LEFT) */}
            <section
              aria-labelledby="clinical-specialities-title"
              data-aos="fade-right"
              data-aos-duration="800"
              className="lg:col-span-6 flex flex-col justify-between bg-background rounded-3xl p-6 sm:p-8 shadow-sm"
            >
              <div>
                <header className="flex items-center justify-between mb-6 pb-4 border-b border-body/10">
                  <div>
                    <h3
                      id="clinical-specialities-title"
                      className="text-xl sm:text-2xl font-bold text-heading tracking-tight"
                    >
                      Clinical Specialities
                    </h3>
                    <p className="text-xs sm:text-sm text-body mt-1">
                      Consult certified specialists by medical field
                    </p>
                  </div>
                </header>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 p-0 list-none m-0">
                  {/* MAP DEPARTMENTS  */}
                  {departments.map((dept, index) => {
                    const Icon = DEPARTMENT_ICONS[dept.name] || LuStethoscope;
                    const doctorCount = dept.doctors ? dept.doctors.length : 0;
                    const isLastOdd =
                      index === departments.length - 1 &&
                      departments.length % 2 !== 0;

                    return (
                      <li
                        key={dept.id}
                        className={`group relative rounded-2xl bg-surface p-4 sm:p-4.5 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-200 flex items-center justify-between ${
                          isLastOdd ? "sm:col-span-2" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div
                            aria-hidden="true"
                            className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-surface transition-colors duration-200"
                          >
                            <Icon className="text-xl" />
                          </div>
                          <div className="text-left min-w-0">
                            <h4 className="text-sm font-semibold text-heading truncate group-hover:text-primary transition-colors duration-200">
                              {dept.name}
                            </h4>
                            <p className="text-xs text-body truncate">
                              {doctorCount} Specialists
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>

            {/* HEALTHCARE ACCESS & QUICK SERVICES*/}
            <section
              aria-labelledby="healthcare-services-title"
              data-aos="fade-left"
              data-aos-duration="800"
              className="lg:col-span-6 flex flex-col justify-between bg-background rounded-3xl p-6 sm:p-8 shadow-xs"
            >
              <div>
                <header className="flex items-center justify-between mb-6 pb-4 border-b border-body/10">
                  <div>
                    <h3
                      id="healthcare-services-title"
                      className="text-xl sm:text-2xl font-bold text-heading tracking-tight"
                    >
                      Healthcare Services
                    </h3>
                    <p className="text-xs sm:text-sm text-body mt-1">
                      Direct access to instant consultations & care
                    </p>
                  </div>
                </header>

                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4 p-0 list-none m-0">
                  {QUICK_SERVICES.map((service) => {
                    const Icon = service.icon;
                    return (
                      <li
                        key={service.id}
                        className="group relative rounded-2xl bg-surface p-4 sm:p-5 border border-body/10 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-200 flex flex-col items-center justify-center text-center min-h-[120px] sm:min-h-[135px]"
                      >
                        <div
                          aria-hidden="true"
                          className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-surface transition-colors duration-200 shadow-xs"
                        >
                          <Icon className="text-xl sm:text-2xl" />
                        </div>
                        <h4 className="text-xs sm:text-sm font-semibold text-heading group-hover:text-primary transition-colors duration-200 leading-snug">
                          {service.title}
                        </h4>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* PRIVACY & SECURITY SECTION */}
      <section
        aria-labelledby="privacy-security-heading"
        className="w-full bg-background py-16 sm:py-24 border-t border-body/10"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          {/* SECTION HEADER */}
          <header className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
            <h2
              id="privacy-security-heading"
              className="text-2xl sm:text-4xl md:text-5xl font-semibold text-heading tracking-tight leading-tight"
            >
              Your Health Records & Personal Details Stay Completely Private
            </h2>

            <p className="text-sm md:text-lg text-body max-w-2xl mx-auto leading-relaxed">
              We prioritize patient trust above all else. Every lab report,
              appointment summary, and consultation history is protected by
              enterprise-grade healthcare security.
            </p>
          </header>

          {/* 3-COLUMN FEATURE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {PRIVACY_FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article
                  key={index}
                  className="group relative rounded-2xl bg-surface p-7 sm:p-8 border border-body/10 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-start text-left"
                >
                  <div
                    aria-hidden="true"
                    className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-surface transition-colors duration-200"
                  >
                    <Icon className="text-2xl" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-heading mb-2.5 tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-body leading-relaxed">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* INSTANT APPOINTMENT GUARANTEE SECTION */}
      <section
        aria-labelledby="instant-appointment-heading"
        className="w-full bg-surface py-14 sm:py-20 border-t border-body/10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT CONTENT */}
            <div
              data-aos="fade-up"
              data-aos-duration="800"
              className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
            >
              <h2
                id="instant-appointment-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-heading leading-[1.15] tracking-tight"
              >
                Instant appointment with doctors.
                <span className="font-bold text-heading">Guaranteed.</span>
              </h2>

              {/* HIGHLIGHTED BENEFITS */}
              <ul className="space-y-3.5 pt-2" role="list">
                <li className="flex items-center gap-3 text-base sm:text-lg text-heading/80">
                  <LuCheck
                    className="text-primary text-xl stroke-[3] shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-heading mr-1">
                      {totalDoctors}+
                    </strong>
                    Verified doctors
                  </span>
                </li>
                <li className="flex items-center gap-3 text-base sm:text-lg text-heading/80">
                  <LuCheck
                    className="text-primary text-xl stroke-[3] shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-heading mr-1">3M+</strong>
                    Patient recommendations
                  </span>
                </li>
                <li className="flex items-center gap-3 text-base sm:text-lg text-heading/80">
                  <LuCheck
                    className="text-primary text-xl stroke-[3] shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-heading mr-1">25M</strong>
                    Patients/year
                  </span>
                </li>
              </ul>

              {/* CTA ACTION BUTTON */}
              <div className="pt-3">
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 text-sm font-semibold !rounded-xl shadow-md active:scale-98"
                >
                  Find me the right doctor
                </Button>
              </div>
            </div>

            <figure
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="800"
              className="lg:col-span-5 flex justify-center lg:justify-end m-0"
            >
              <div className="relative w-full max-w-sm sm:max-w-lg">
                <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl border border-body/10 bg-background">
                  <img
                    src={DOCTOR_IMAGE_URL}
                    alt="Verified Healthcare Professional doctor"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section
        aria-label="User Testimonials"
        className="w-full bg-background py-36 sm:py-52 min-h-[550px] sm:min-h-[650px] flex items-center justify-center border-t border-body/10"
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-8 w-full">
          <Carousel
            title="What our users have to say"
            carouselData={carouselData}
          />
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQ faqs={faq} />
    </main>
  );
};

export default Landing;
