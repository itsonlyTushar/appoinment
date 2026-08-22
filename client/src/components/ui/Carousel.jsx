import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";

const Carousel = ({ title, carouselData = [] }) => {
    const [currentSlide, setCurrentSlide] = useState(1);
    const [animate, setAnimate] = useState(false);

    // HANDLING NEXT SLIDE CHANGE WITH CAROUSEL DATA
    const goToNext = (id) => {
        setAnimate(true);
        setTimeout(() => {
            setCurrentSlide(id);
            setAnimate(false);
        }, 500);
    };

    // AUTO CHANGING SLIDE AFTER SOME DELAY
    useEffect(() => {
        if (!carouselData || carouselData.length === 0) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => {
                const nextSlide = (prev % carouselData.length) + 1;
                goToNext(nextSlide);
                return nextSlide;
            });
        }, 8000);

        return () => clearInterval(timer);
    }, [carouselData]);

    return (
        <div className="w-full flex flex-col items-center">
            {/* HEADING */}
            {title && (
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-heading tracking-tight mb-8 sm:mb-12 text-center">
                    {title}
                </h2>
            )}

            <div className="relative min-h-[220px] sm:min-h-[180px] w-full flex items-center justify-center">
                <div className="flex flex-col justify-center items-center text-center">
                    {/* MAP DATA FOR CAROUSEL FROM PROPS */}
                    {carouselData
                        .filter((slide) => slide.id === currentSlide)
                        .map((detail) => (
                            <div
                                key={detail.id}
                                className={`transition-opacity duration-500 ease-in-out px-4 text-center ${animate ? "opacity-0" : "opacity-100"
                                    }`}
                            >
                                <blockquote className="text-xl sm:text-2xl md:text-3xl max-w-4xl text-heading font-medium leading-relaxed">
                                    {detail.quote}
                                </blockquote>
                                <div className="pt-6 flex items-center justify-center gap-3">
                                    {detail.image && (
                                        <img
                                            src={detail.image}
                                            alt={detail.name}
                                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-primary/20 shadow-sm shrink-0"
                                        />
                                    )}
                                    <p className="text-sm   font-bold text-primary">
                                        {detail.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className="flex justify-center items-center gap-1.5 mt-6">
                {carouselData.map((detail) => (
                    <button
                        key={detail.id}
                        type="button"
                        aria-label={`Go to slide ${detail.id}`}
                        className={`p-1 text-xl transition-all duration-200 cursor-pointer ${detail.id === currentSlide
                            ? "text-primary scale-125"
                            : "text-body/30 hover:text-body/60"
                            }`}
                        onClick={() => goToNext(detail.id)}
                    >
                        <GoDotFill />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;