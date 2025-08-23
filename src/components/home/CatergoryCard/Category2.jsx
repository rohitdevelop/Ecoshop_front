"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useWishlist } from "@/Context/WishlistContext"; 
 
const categories = [
   {
    id: 2,
    name: "Personal & Body Care",
    slug: "bodycare",
    description: "Natural and organic personal care products",
    icon: "🌸",
      products: [
      {
        id: 201,
        name: "Bamboo Toothbrush Set",
        price: 12.99,
        image:
    "data:image/jpeg;base64,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",
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
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq0reBxWO7hPGrFCn8doTiujTEu9VHxewqhqFQ5RsHXrG8Qk_fF4Gj3CfQCItl0c6eT-E&amp;usqp=CAU",
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
        "https://www.jiomart.com/images/product/original/rvaxehx2pq/the-man-company-charcoal-detox-trio-set-for-men-charcoal-soap-bar-charcoal-body-wash-and-charcoal-shampoo-product-images-orvaxehx2pq-p596077347-1-202212051844.jpg?im=Resize=(420,420)" ,
         rating: 4.7,
        reviews: 98,
        description: "Zero-waste shampoo bars",
      },
      {
        id: 204,
        name: "Natural Deodorant",
        price: 16.99,
        image:
        "https://www.jiomart.com/images/product/original/rvvkjuj6ul/bitamin-wild-root-natural-deodorant-8-hours-odour-protection-30g-product-images-orvvkjuj6ul-p612149350-0-202508112041.png?im=Resize=(1000,1000)",
         rating: 4.4,
        reviews: 76,
        badge: "New",
        description: "Aluminum-free natural deodorant",
      },
    ],
  },
];

const Category2 = () => {
    const { wishlist, toggleWishlist } = useWishlist();
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
                  {category.products.map((product) => {
                    const isLiked = wishlist.some((i) => i.id === product.id);
                    return (
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
                            onClick={() => toggleWishlist(product)}
                            className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow cursor-pointer"
                          >
                            <Heart
                              size={20}
                              className={
                                isLiked
                                  ? "text-red-500 fill-red-500"
                                  : "text-gray-600"
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
                    );
                  })}
                </div>
    
                {/* Scroll Buttons */}
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

export default Category2;
