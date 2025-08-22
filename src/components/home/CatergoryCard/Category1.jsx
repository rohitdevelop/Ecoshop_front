"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Home & Kitchen",
    slug: "home",
    description: "Eco-friendly household essentials for sustainable living",
    icon: "🏠",
     products: [
      {
        id: 101,
        name: "Organic Kitchen Towels",
        price: 24.99,
        originalPrice: 34.99,
         image:
        "https://www.jiomart.com/images/product/original/491601879/my-home-scrubz-kitchen-towel-30-x-46-cm-4-pcs-product-images-o491601879-p491601879-1-202203151913.jpg?im=Resize=(420,420)",
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
         "https://5.imimg.com/data5/FQ/DH/HZ/SELLER-3591911/15-smart-composter-500x500.jpg",
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
          "https://media-uk.landmarkshops.in/cdn-cgi/image/h=550,w=550,q=85,fit=cover/homecentre/1000005388373-1000005388372_02-2100.jpg",
        rating: 4.9,
        reviews: 256,
        description: "Portable bamboo cutlery set",
      },
      {
        id: 104,
        name: "Glass Food Containers",
        price: 45.99,
        
        image:
          "https://www.jiomart.com/images/product/original/rvcovfhgk5/cutting-edge-transparent-glass-food-container-320-ml-set-of-2-product-images-orvcovfhgk5-p600849758-5-202304232338.jpg?im=Resize=(420,420)",
        rating: 4.7,
        reviews: 167,
        description: "Airtight glass storage containers",
      },
    ],
  },
];

const Category1 = () => {
  const [favorites, setFavorites] = useState([]);
  const carouselRefs = useRef({});

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const scrollCarousel = (id, direction) => {
    const carousel = carouselRefs.current[id];
    if (carousel) {
      const scrollAmount = 300;
      carousel.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id} className="mb-16">
          {/* Category Heading */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{category.icon}</span>
              <div>
                <h3 className="text-2xl font-bold">{category.name}</h3>
                <p className="text-gray-500 text-base">
                  {category.description}
                </p>
              </div>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-green-800 font-bold">
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
                  className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 group"
                >
                  {/* Image with hover scale */}
                  <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow cursor-pointer"
                    >
                      <Heart
                        size={20}
                        className={
                          favorites.includes(product.id)
                            ? "text-red-500 fill-red-500"
                            : "text-gray-600 "
                        }
                      />
                    </button>
                  </div>

                  {/* Product Info */}
                  <h4 className="font-semibold text-lg mt-3">{product.name}</h4>
                  <p className="text-green-600 font-bold text-lg">
                    ${product.price}
                  </p>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {product.description}
                  </p>

                  {/* Explore Button */}
                  <button className="mt-4 w-full bg-green-600 text-white py-2 cursor-pointer rounded-lg font-medium hover:bg-green-700 transition">
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
          <button className="sm:hidden w-full mt-4 flex items-center justify-center gap-2 text-green-800 font-bold">
            View all <ChevronRight size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Category1;
