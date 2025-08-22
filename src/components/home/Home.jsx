"use client";
import Cardhome from "./Cardhome";

import React, { useState, useEffect } from "react";
import {
  Truck,
  Shield,
  Leaf,
  Award,
  ChevronRight,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";

const Home = () => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

const heroSlides = [
  {
    id: 1,
    image:
      "https://aqomi.com/wp-content/uploads/2024/02/Aqomi_Embracing_Eco-Friendly_Design_in_Your_Brand_s_Aesthetics_3.webp",
    title: "Sustainable Living Starts Here",
    subtitle:
      "Discover eco-friendly products that make a difference for our planet",
    cta: "Shop Collection",
    overlay: "from-green-900/70 to-green-700/50",
  },
  {
    id: 2,
    image:
      "https://images.stockcake.com/public/7/3/e/73ec666a-38df-436f-a1a1-560a999473a8_large/eco-friendly-beauty-products-stockcake.jpg",
    title: "Zero Waste Kitchen Essentials",
    subtitle:
      "Transform your kitchen into an eco paradise with our sustainable products",
    cta: "Explore Kitchen",
    overlay: "from-emerald-900/70 to-emerald-700/50",
  },
  {
    id: 3,
    image:
      "https://www.benz-packaging.com/BenzPackagingBackEndImg/BlogImage/sustainable-packaging-what-you-need-to-know-about-green-packaging-2.jpg",
    title: "Natural Beauty & Wellness",
    subtitle:
      "Pamper yourself with nature's finest ingredients and organic products",
    cta: "Shop Beauty",
    overlay: "from-teal-900/70 to-teal-700/50",
  },
  {
    id: 4,
    image:
      "https://cdn.prod.website-files.com/5a009403519aa50001480224/6595e229c0ef4ccfa2f2a601_Plasticfreestore.jpeg",
    title: "Eco-Friendly Home Solutions",
    subtitle:
      "Create a sustainable home with our carefully curated green products",
    cta: "Discover More",
    overlay: "from-green-900/70 to-emerald-700/50",
  },
];


  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Shipping",
      description: "On orders over $50",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "100% Organic",
      description: "Certified eco-friendly",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Carbon Neutral",
      description: "Zero carbon footprint",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Award Winning",
      description: "Recognized for sustainability",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  // Preload images
  useEffect(() => {
    heroSlides.forEach((slide, index) => {
      const img = new window.Image();
      img.onload = () => {
        setImageLoaded((prev) => ({
          ...prev,
          [index]: true,
        }));
      };
      img.src = slide.image;
    });
  }, [heroSlides]);

  const goToPrevious = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <>
      <div className="bg-white text-gray-900 min-h-screen">
        ChevronRight
        {/* Hero Slider */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
          {/* Image Container */}
          <div className="relative w-full h-full">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                {/* Background Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    style={{
                      filter: imageLoaded[index] ? "none" : "blur(5px)",
                      transition: "filter 0.3s ease-in-out",
                    }}
                    priority={index === 0}
                    sizes="100vw"
                  />
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${slide.overlay}`}
                  ></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div
                    className={`text-center text-white px-4 max-w-5xl transform transition-all duration-1000 ${
                      index === currentSlide
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90 drop-shadow-md max-w-3xl mx-auto leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <button className="bg-white text-gray-900 hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 mx-auto">
                      {slide.cta}
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all hover:scale-110 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:transform group-hover:-translate-x-1 transition-transform" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all hover:scale-110 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:transform group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 z-20">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative overflow-hidden transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 md:w-12 h-2 md:h-3 bg-white"
                    : "w-2 md:w-3 h-2 md:h-3 bg-white/50 hover:bg-white/70"
                } rounded-full`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentSlide && (
                  <div
                    className="absolute inset-0 bg-green-400 rounded-full animate-pulse"
                    style={{
                      animation: "progressFill 4s linear forwards",
                    }}
                  ></div>
                )}
              </button>
            ))}
          </div>
        </section>
        {/* Features */}
        <section className="py-8 md:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-4 md:p-6 bg-white hover:bg-green-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <div className="text-green-600 flex justify-center mb-3 md:mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Categories */}
        <Cardhome />
      </div>
      <style>
        {`
@keyframes progressFill {
  from { width: 0%; }
  to { width: 100%; }
}
`}
      </style>
    </>
  );
};

export default Home;
