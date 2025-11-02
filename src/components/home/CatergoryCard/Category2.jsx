"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useWishlist } from "@/Context/WishlistContext";
import Link from "next/link";
 
const Category2 = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const carouselRef = useRef(null);
  const [products, setProducts] = useState([]); // ✅ holds fetched products

  // ✅ Fetch only 4 products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          // "http://localhost:4000/personalBodyCareProducts"
          "https://ecoshop-back.onrender.com/personalBodyCareProducts"
        );

        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const json = await res.json();
        const productsArray = json?.data || [];
        setProducts(productsArray.slice(0, 4)); // just in case you get more than 4
      } catch (err) {
        console.error("Error fetching products:", err);
        alert("Could not fetch products. Please check your API.");
      }
    };

    fetchProducts();
  }, []);

  // ✅ Scroll function for carousel
  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollAmount = 300;
      carousel.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-16">
      {/* ✅ Section Heading */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🧴</span>
          <div>
            <h3 className="text-2xl font-bold">Personal & Body Care</h3>
            <p className="text-gray-500 text-base">
              Refresh your daily essentials with our personal care collection.
            </p>
          </div>
        </div>
        <Link href={"/products"}>
          <button className="hidden sm:flex items-center gap-2 text-green-800 font-bold">
            View all <ChevronRight size={18} />
          </button>
        </Link>
      </div>

      {/* ✅ Carousel Section */}
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {products.map((product) => {
            const isLiked = wishlist.some((i) => i.id === product.id);
            return (
              <div
                key={product.id}
                className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 group"
              >
                {/* ✅ Product Image */}
                <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden">
                  <img
                    src={
                      product.images
                        ? product.images[0]
                        : "/placeholder-image.jpg"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow cursor-pointer"
                  >
                    <Heart
                      size={20}
                      className={
                        isLiked ? "text-red-500 fill-red-500" : "text-gray-600"
                      }
                    />
                  </button>
                </div>

                {/* ✅ Product Info */}
                <h4 className="font-semibold text-lg mt-3">{product.name}</h4>
                <p className="text-green-600 font-bold text-lg">
                  ${product.price}
                </p>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {product.description}
                </p>

                {/* ✅ Explore Button */}
                <Link href={"/products"}>
                  <button className="mt-4 w-full bg-green-600 text-white py-2 cursor-pointer rounded-lg font-medium hover:bg-green-700 transition">
                    Explore
                  </button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* ✅ Scroll Buttons */}
        <button
          onClick={() => scrollCarousel("left")}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-3 rounded-full"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => scrollCarousel("right")}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-3 rounded-full"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* ✅ Mobile View All Button */}
      <button className="sm:hidden w-full mt-4 flex items-center justify-center gap-2 text-green-800 font-bold">
        View all <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Category2;
