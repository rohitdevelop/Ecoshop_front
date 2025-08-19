"use client";
import React, { useRef, useState } from "react";
import { ChevronRight, ChevronLeft, Heart } from "lucide-react";
import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Home & Kitchen",
    slug: "home",
    description: "Eco-friendly household essentials for sustainable living",
    icon: "🏠",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    products: [
      {
        id: 101,
        name: "Organic Kitchen Towels",
        price: 24.99,
        originalPrice: 34.99,
        image:
          "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
        rating: 4.8,
        reviews: 124,
        badge: "Bestseller",
        description: "100% organic cotton kitchen towels",
      },
      {
        id: 102,
        name: "Smart Compost Bin",
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
        rating: 4.6,
        reviews: 89,
        badge: "New",
        description: "Odor-free composting solution",
      },
      {
        id: 103,
        name: "Bamboo Utensil Set",
        price: 19.99,
        image:
          "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
        rating: 4.9,
        reviews: 256,
        description: "Portable bamboo cutlery set",
      },
      {
        id: 104,
        name: "Glass Food Containers",
        price: 45.99,
        image:
          "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop",
    products: [
      {
        id: 201,
        name: "Bamboo Toothbrush Set",
        price: 12.99,
        image:
          "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=300&fit=crop",
        rating: 4.5,
        reviews: 201,
        description: "Biodegradable bamboo toothbrushes",
      },
      {
        id: 202,
        name: "Organic Soap Collection",
        price: 32.99,
        originalPrice: 42.99,
        image:
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
        rating: 4.8,
        reviews: 145,
        badge: "Popular",
        description: "Handcrafted organic soap bars",
      },
      {
        id: 203,
        name: "Shampoo Bar Trio",
        price: 28.99,
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        rating: 4.7,
        reviews: 98,
        description: "Zero-waste shampoo bars",
      },
      {
        id: 204,
        name: "Natural Deodorant",
        price: 16.99,
        image:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
    products: [
      {
        id: 301,
        name: "Plantable Notebook Set",
        price: 22.99,
        image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
        rating: 4.6,
        reviews: 112,
        description: "Seed paper notebooks that grow into plants",
      },
      {
        id: 302,
        name: "Upcycled Tote Bags",
        price: 35.99,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        rating: 4.8,
        reviews: 189,
        badge: "Eco Choice",
        description: "Stylish bags made from recycled materials",
      },
      {
        id: 303,
        name: "Coconut Bowl Gift Set",
        price: 41.99,
        image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
        rating: 4.7,
        reviews: 134,
        description: "Handcrafted coconut bowls with spoons",
      },
      {
        id: 304,
        name: "Sustainable Candle Collection",
        price: 54.99,
        originalPrice: 69.99,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        rating: 4.9,
        reviews: 203,
        badge: "Bestseller",
        description: "Soy wax candles in recycled containers",
      },
    ],
  },
];
const Cardhome = () => {
  const [favorites, setFavorites] = useState([]);
  const carouselRefs = useRef({});

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const scrollCarousel = (id, direction) => {
    const container = carouselRefs.current[id];
    if (!container) return;
    const scrollAmount = direction === "left" ? -250 : 250;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Explore Our Collections
        </h2>

        {categories.map((category) => (
  <div key={category.id} className="mb-16">
    {/* Category Heading */}
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{category.icon}</span>
        <div>
          <h3 className="text-2xl font-bold">{category.name}</h3>
          <p className="text-gray-500 text-base">{category.description}</p>
        </div>
      </div>
      <button className="hidden sm:flex items-center gap-2   text-green-800 font-bold  ">
        View all <ChevronRight size={18} />
      </button>
    </div>

    {/* Carousel */}
    <div className="relative">
      <div
        ref={(el) => (carouselRefs.current[category.id] = el)}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        {category.products.map((product) => (
          <div
            key={product.id}
            className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4"
          >
            <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow"
              >
                <Heart
                  size={20}
                  className={
                    favorites.includes(product.id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-600"
                  }
                />
              </button>
            </div>
            <h4 className="font-semibold text-lg mt-3">{product.name}</h4>
            <p className="text-green-600 font-bold text-lg">${product.price}</p>
            <p className="text-gray-500 text-sm line-clamp-2">
              {product.description}
            </p>

            {/* Explore Button on Card */}
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
              Explore
            </button>
          </div>
        ))}
      </div>

      {/* Scroll Buttons (Desktop only) */}
      <button
        onClick={() => scrollCarousel(category.id, "left")}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-3 rounded-full"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={() => scrollCarousel(category.id, "right")}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-3 rounded-full"
      >
        <ChevronRight size={22} />
      </button>
    </div>

    {/* Mobile Explore Button */}
    <button className="sm:hidden w-full mt-4 flex items-center justify-center gap-2   text-green-800 font-bold">
      View all <ChevronRight size={18} />
    </button>
  </div>
))}

      </div>
    </section>
  );
};

export default Cardhome;
