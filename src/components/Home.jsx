"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  ShoppingCart,
  Search,
  Menu,
  X,
  Star,
  Truck,
  Shield,
  Leaf,
  Award,
  Eye,
  Filter,
  ChevronRight,
  ArrowRight,
  ChevronLeft,
  Play,
  Pause
} from "lucide-react";
import Image from "next/image";

const Home = () => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showQuickView, setShowQuickView] = useState(null);
  
  // Refs for mobile carousels
  const carouselRefs = useRef({});

  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&h=800&fit=crop&crop=center",
      title: "Sustainable Living Starts Here",
      subtitle: "Discover eco-friendly products that make a difference for our planet",
      cta: "Shop Collection",
      overlay: "from-green-900/70 to-green-700/50",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=800&fit=crop&crop=center",
      title: "Zero Waste Kitchen Essentials",
      subtitle: "Transform your kitchen into an eco paradise with our sustainable products",
      cta: "Explore Kitchen",
      overlay: "from-emerald-900/70 to-emerald-700/50",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1920&h=800&fit=crop&crop=center",
      title: "Natural Beauty & Wellness",
      subtitle: "Pamper yourself with nature's finest ingredients and organic products",
      cta: "Shop Beauty",
      overlay: "from-teal-900/70 to-teal-700/50",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=800&fit=crop&crop=center",
      title: "Eco-Friendly Home Solutions",
      subtitle: "Create a sustainable home with our carefully curated green products",
      cta: "Discover More",
      overlay: "from-green-900/70 to-emerald-700/50",
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Home & Kitchen",
      slug: "home",
      description: "Eco-friendly household essentials for sustainable living",
      icon: "🏠",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      products: [
        {
          id: 101,
          name: "Organic Kitchen Towels",
          price: 24.99,
          originalPrice: 34.99,
          image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
          rating: 4.8,
          reviews: 124,
          badge: "Bestseller",
          description: "100% organic cotton kitchen towels",
        },
        {
          id: 102,
          name: "Smart Compost Bin",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
          rating: 4.6,
          reviews: 89,
          badge: "New",
          description: "Odor-free composting solution",
        },
        {
          id: 103,
          name: "Bamboo Utensil Set",
          price: 19.99,
          image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
          rating: 4.9,
          reviews: 256,
          description: "Portable bamboo cutlery set",
        },
        {
          id: 104,
          name: "Glass Food Containers",
          price: 45.99,
          image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
          rating: 4.7,
          reviews: 167,
          description: "Airtight glass storage containers",
        },
      ],
    },
    {
      id: 2,
      name: "Personal & Body Care",
      slug: "bodycare",
      description: "Natural and organic personal care products",
      icon: "🌸",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop",
      products: [
        {
          id: 201,
          name: "Bamboo Toothbrush Set",
          price: 12.99,
          image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=300&fit=crop",
          rating: 4.5,
          reviews: 201,
          description: "Biodegradable bamboo toothbrushes",
        },
        {
          id: 202,
          name: "Organic Soap Collection",
          price: 32.99,
          originalPrice: 42.99,
          image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
          rating: 4.8,
          reviews: 145,
          badge: "Popular",
          description: "Handcrafted organic soap bars",
        },
        {
          id: 203,
          name: "Shampoo Bar Trio",
          price: 28.99,
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
          rating: 4.7,
          reviews: 98,
          description: "Zero-waste shampoo bars",
        },
        {
          id: 204,
          name: "Natural Deodorant",
          price: 16.99,
          image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
          rating: 4.4,
          reviews: 76,
          badge: "New",
          description: "Aluminum-free natural deodorant",
        },
      ],
    },
    {
      id: 3,
      name: "Eco-Friendly Gifts",
      slug: "lifestyle",
      description: "Sustainable gifts and lifestyle products",
      icon: "🎁",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
      products: [
        {
          id: 301,
          name: "Plantable Notebook Set",
          price: 22.99,
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
          rating: 4.6,
          reviews: 112,
          description: "Seed paper notebooks that grow into plants",
        },
        {
          id: 302,
          name: "Upcycled Tote Bags",
          price: 35.99,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
          rating: 4.8,
          reviews: 189,
          badge: "Eco Choice",
          description: "Stylish bags made from recycled materials",
        },
        {
          id: 303,
          name: "Coconut Bowl Gift Set",
          price: 41.99,
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
          rating: 4.7,
          reviews: 134,
          description: "Handcrafted coconut bowls with spoons",
        },
        {
          id: 304,
          name: "Sustainable Candle Collection",
          price: 54.99,
          originalPrice: 69.99,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
          rating: 4.9,
          reviews: 203,
          badge: "Bestseller",
          description: "Soy wax candles in recycled containers",
        },
      ],
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
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  // Preload images
  useEffect(() => {
    heroSlides.forEach((slide, index) => {
      const img = new window.Image();
      img.onload = () => {
        setImageLoaded(prev => ({
          ...prev,
          [index]: true
        }));
      };
      img.src = slide.image;
    });
  }, [heroSlides]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  // Mobile carousel scroll functions
  const scrollCarousel = (categoryId, direction) => {
    const carousel = carouselRefs.current[categoryId];
    if (carousel) {
      const scrollAmount = 300;
      carousel.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const QuickViewModal = ({ product, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={256}
            className="w-full h-64 object-cover rounded-t-2xl"
            priority
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviews} reviews)
            </span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-green-600">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                // Handle explore functionality
                onClose();
              }}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Explore
            </button>
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`p-3 rounded-lg border transition-colors ${
                favorites.includes(product.id)
                  ? "bg-red-50 border-red-200 text-red-600"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${
                  favorites.includes(product.id) ? "fill-current" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
        {/* Image Container */}
        <div className="relative w-full h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
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
                    filter: imageLoaded[index] ? 'none' : 'blur(5px)',
                    transition: 'filter 0.3s ease-in-out'
                  }}
                  priority={index === 0}
                  sizes="100vw"
                />
                
                {/* Loading Placeholder */}
                {!imageLoaded[index] && (
                  <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                  </div>
                )}
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.overlay}`}></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div 
                  className={`text-center text-white px-4 max-w-5xl transform transition-all duration-1000 ${
                    index === currentSlide 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-8 opacity-0'
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
                  ? 'w-8 md:w-12 h-2 md:h-3 bg-white' 
                  : 'w-2 md:w-3 h-2 md:h-3 bg-white/50 hover:bg-white/70'
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentSlide && (
                <div 
                  className="absolute inset-0 bg-green-400 rounded-full animate-pulse"
                  style={{
                    animation: 'slideProgress 5s linear infinite'
                  }}
                ></div>
              )}
            </button>
          ))}
        </div>

        {/* Auto-play Control */}
        <button
          onClick={toggleAutoPlay}
          className="absolute bottom-4 md:bottom-6 right-4 md:right-6 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all hover:scale-110"
          aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isAutoPlaying ? (
            <Pause className="w-3 h-3 md:w-4 md:h-4" />
          ) : (
            <Play className="w-3 h-3 md:w-4 md:h-4" />
          )}
        </button>
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
                <p className="text-xs md:text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Explore Our Collections
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover sustainable products that make a positive impact on our planet
            </p>
          </div>

          {categories.map((category) => (
            <div key={category.id} className="mb-12 md:mb-16">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="text-2xl md:text-3xl">{category.icon}</span>
                  <div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mt-1 text-sm md:text-base">{category.description}</p>
                  </div>
                </div>
                <button className="hidden md:flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    setShowQuickView={setShowQuickView}
                  />
                ))}
              </div>

              {/* Mobile Carousel */}
              <div className="md:hidden relative">
                <div
                  ref={(el) => carouselRefs.current[category.id] = el}
                  className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {category.products.map((product) => (
                    <div key={product.id} className="flex-shrink-0 w-72 snap-start">
                      <ProductCard
                        product={product}
                        favorites={favorites}
                        toggleFavorite={toggleFavorite}
                        setShowQuickView={setShowQuickView}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Mobile Carousel Navigation */}
                <button
                  onClick={() => scrollCarousel(category.id, 'left')}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => scrollCarousel(category.id, 'right')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-green-600 to-green-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            Join Our Eco Community
          </h2>
          <p className="text-green-100 text-base md:text-lg mb-6 md:mb-8">
            Get exclusive offers, sustainability tips, and product updates delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white rounded-lg border-none outline-none text-gray-900"
            />
            <button className="bg-yellow-400 hover:bg-yellow-500 text-green-900 px-6 py-3 rounded-lg font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal
          product={showQuickView}
          onClose={() => setShowQuickView(null)}
        />
      )}

      <style jsx>{`
        @keyframes slideProgress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, favorites, toggleFavorite, setShowQuickView }) => (
  <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
    <div className="relative overflow-hidden">
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={192}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
      {product.badge && (
        <span className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          {product.badge}
        </span>
      )}
      <button
        onClick={() => setShowQuickView(product)}
        className="absolute top-3 right-3 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
      >
        <Eye className="w-4 h-4 text-gray-700" />
      </button>
      <button
        onClick={() => toggleFavorite(product.id)}
        className="absolute bottom-3 right-3 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
      >
        <Heart
          className={`w-4 h-4 ${
            favorites.includes(product.id)
              ? "text-red-500 fill-current"
              : "text-gray-700"
          }`}
        />
      </button>
    </div>

    <div className="p-5">
      <h4 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
        {product.name}
      </h4>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {product.description}
      </p>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          ({product.reviews})
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-green-600">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        <button
          onClick={() => {
            // Handle explore functionality
            console.log('Exploring product:', product.name);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Explore
        </button>
      </div>
    </div>
  </div>
);

export default Home;