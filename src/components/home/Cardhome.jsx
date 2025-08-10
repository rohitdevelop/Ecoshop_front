"use client";
import React, { useRef, useState } from "react";
import { ChevronRight, ChevronLeft, X, Star, Eye, Heart } from "lucide-react";
import Image from "next/image";

// ProductCard component
const ProductCard = ({ product, favorites = [], toggleFavorite, setShowQuickView }) => {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggleFavorite) {
      toggleFavorite(product.id);
    }
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (setShowQuickView) {
      setShowQuickView(product);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group w-full">
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={200}
          loading="lazy"
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {product.badge}
          </span>
        )}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors z-10 ${
            favorites.includes(product.id)
              ? "bg-red-100 text-red-600"
              : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-600"
          }`}
        >
          <Heart
            className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-current" : ""}`}
          />
        </button>
      </div>
      
      <div className="p-4">
        <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
          {product.name}
        </h4>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-green-600">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleQuickViewClick}
            className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition-colors whitespace-nowrap"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

// QuickViewModal component
const QuickViewModal = ({ product, onClose, favorites = [], toggleFavorite }) => {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggleFavorite) {
      toggleFavorite(product.id);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        <div className="relative">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={256}
            loading="lazy"
            className="w-full h-48 sm:h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Rating */}
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

          {/* Price */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-green-600">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Explore
            </button>

            {/* Favorite button */}
            <button
              onClick={handleFavoriteClick}
              className={`p-3 rounded-lg border transition-colors ${
                favorites.includes(product.id)
                  ? "bg-red-50 border-red-200 text-red-600"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${favorites.includes(product.id) ? "fill-current" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function Cardhome({ favorites = [], toggleFavorite, setShowQuickView }) {
  const carouselRefs = useRef({});

  const scrollCarousel = (id, direction) => {
    const container = carouselRefs.current[id];
    if (!container) return;
    const scrollAmount = direction === "left" ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

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

  return (
    <section className="py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Explore Our Collections
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover sustainable products that make a positive impact on our planet
          </p>
        </div>

        {categories.map((category) => (
          <div key={category.id} className="mb-8 sm:mb-12 md:mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 md:mb-8 gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <span className="text-xl sm:text-2xl md:text-3xl">{category.icon}</span>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mt-1 text-sm md:text-base">
                    {category.description}
                  </p>
                </div>
              </div>
              <button className="hidden sm:flex items-center gap-2 text-green-600 hover:text-green-700 font-medium self-start sm:self-center">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Desktop Grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
            <div className="sm:hidden relative">
              <div
                ref={(el) => (carouselRefs.current[category.id] = el)}
                className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                style={{ 
                  scrollbarWidth: "none", 
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch"
                }}
              >
                {category.products.map((product) => (
                  <div key={product.id} className="flex-none w-64 snap-start">
                    <ProductCard
                      product={product}
                      favorites={favorites}
                      toggleFavorite={toggleFavorite}
                      setShowQuickView={setShowQuickView}
                    />
                  </div>
                ))}
              </div>

              {/* Mobile Navigation */}
              <button
                onClick={() => scrollCarousel(category.id, "left")}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:shadow-xl transition-shadow"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => scrollCarousel(category.id, "right")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:shadow-xl transition-shadow"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Mobile View All Button */}
            <div className="sm:hidden mt-4">
              <button className="w-full flex items-center justify-center gap-2 text-green-600 hover:text-green-700 font-medium py-2">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export { ProductCard, QuickViewModal };
export default Cardhome;