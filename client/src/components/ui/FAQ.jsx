import { useState } from "react";
import { LuChevronDown, LuCircleHelp } from "react-icons/lu";
import { faq as defaultFaq } from "../../constants/faq";

function FAQ({
    faqs = defaultFaq,
    title = "Frequently Asked Questions",
    subtitle = "Everything you need to know about scheduling appointments, specialized doctors, and patient care.",
}) {
    const [openId, setOpenId] = useState(null);

    const handleToggle = (id) => {
        setOpenId((prevId) => (prevId === id ? null : id));
    };

    return (
        <section id="faq" className="w-full bg-surface py-16 sm:py-24 border-t border-body/10 overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12">
                {/* SECTION HEADER */}
                <div
                    data-aos="fade-up"
                    data-aos-duration="800"
                    className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16"
                >
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-heading tracking-tight leading-tight">
                        {title}
                    </h2>

                    <p className="text-sm sm:text-base md:text-lg text-body max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                {/* ACCORDION ITEMS */}
                <div className="space-y-4 max-w-3xl mx-auto">
                    {faqs.map((item, index) => {
                        const isOpen = openId === item.id;
                        return (
                            <div
                                key={item.id}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                data-aos-duration="800"
                                className="rounded-2xl bg-background border border-body/10 shadow-xs hover:border-primary/30 transition-all duration-200 overflow-hidden"
                            >
                                <button
                                    type="button"
                                    onClick={() => handleToggle(item.id)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer group focus:outline-none"
                                >
                                    <span className="text-base sm:text-lg font-semibold text-heading group-hover:text-primary transition-colors duration-200 pr-4">
                                        {item.question}
                                    </span>

                                    <div
                                        className={`w-9 h-9 flex items-center justify-center text-body shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""
                                            }`}
                                    >
                                        <LuChevronDown className="text-lg" />
                                    </div>
                                </button>

                                {isOpen && (
                                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1">
                                        <p className="text-sm sm:text-base text-body leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FAQ;