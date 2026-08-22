import React from "react";
import {
    LuTriangleAlert,
    LuPhoneCall,
    LuMailCheck,
    LuClipboardList,
    LuCalendarOff,
    LuInfo,
} from "react-icons/lu";
import { bookingInstructions as defaultInstructions } from "../../constants/bookingInstructions";

const INSTRUCTION_ICONS = {
    emergency: LuTriangleAlert,
    availability: LuPhoneCall,
    confirmation: LuMailCheck,
    reports: LuClipboardList,
    holidays: LuCalendarOff,
};

const BookingInstructions = ({
    instructions = defaultInstructions,
    title = "Important Booking Guidelines",
    subtitle = "Please review these key instructions before and after scheduling your visit.",
    className = "",
}) => {
    return (
        <section
            className={`w-full bg-surface rounded-2xl border border-body/10 p-6 md:p-8 space-y-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] ${className}`}
        >
            <div className="flex items-center gap-3">
                <div>
                    <h2 className="text-xl font-heading font-bold text-heading">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-body text-sm">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {instructions.map((item) => {
                    const Icon = INSTRUCTION_ICONS[item.id] || LuInfo;
                    return (
                        <div
                            key={item.id}
                            className={`p-4 rounded-xl border transition-all duration-200 ${
                                item.urgent
                                    ? "md:col-span-2 bg-red-500/5 border-red-500/20"
                                    : "bg-background/60 border-body/10 hover:border-body/20"
                            }`}
                        >
                            <div className="flex items-start gap-3.5">
                                <div
                                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                                        item.urgent
                                            ? "bg-red-500/10 text-red-600"
                                            : "bg-primary/10 text-primary"
                                    }`}
                                >
                                    <Icon size={18} />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3
                                            className={`text-sm font-semibold ${
                                                item.urgent ? "text-red-700" : "text-heading"
                                            }`}
                                        >
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p
                                        className={`text-xs sm:text-sm leading-relaxed ${
                                            item.urgent ? "text-red-800/80" : "text-body"
                                        }`}
                                    >
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default BookingInstructions;
