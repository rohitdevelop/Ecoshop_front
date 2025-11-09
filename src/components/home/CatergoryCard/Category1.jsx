"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useWishlist } from "@/Context/WishlistContext";
import Link from "next/link";

/**
 * Skeleton Loader Component
 * Renders a placeholder card structure while data is loading.
 */
const SkeletonCard = () => (
  <div className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] bg-white rounded-2xl shadow-md p-4 animate-pulse">
    {/* Image Placeholder */}
    <div className="w-full h-48 sm:h-56 bg-gray-200 rounded-xl mb-3"></div>
    {/* Title Placeholder */}
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
    {/* Price Placeholder */}
    <div className="h-5 bg-gray-200 rounded w-1/4 mb-3"></div>
    {/* Description Placeholder */}
    <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
    {/* Button Placeholder */}
    <div className="mt-4 w-full h-10 bg-gray-300 rounded-lg"></div>
  </div>
);

const Category1 = () => {
  // Wishlist context to handle likes
  const { wishlist, toggleWishlist } = useWishlist();
  // useRef to store carousel elements for scrolling
  const carouselRef = useRef(null);

  // State to store fetched products and loading status
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch top 4 Home & Kitchen products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://ecoshop-back.onrender.com/homeKitchenProducts"
        );

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        // Parse JSON safely
        const json = await response.json();

        const productsArray = json?.data || [];
        setProducts(productsArray.slice(0, 4));
      } catch (err) {
        console.error("Error fetching products:", err);
        // Optionally keep products empty if fetch fails
        setProducts([]); 
        // alert("Could not fetch products. Please check your API.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Carousel scroll handler
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-16">
      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Home & Kitchen</h3>
        <Link href={"/products"}>
          <button className="hidden sm:flex items-center gap-2 text-green-800 font-bold hover:text-green-600 transition">
            View all <ChevronRight size={18} />
          </button>
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          
          {/* Conditional Rendering: Loader or Products */}
          {loading ? (
            // Show 4 skeleton cards while loading
            [...Array(4)].map((_, index) => <SkeletonCard key={index} />)
          ) : products.length > 0 ? (
            // Show actual products
            products.map((product) => {
              const isLiked = wishlist.some((i) => i.id === product.id);

              return (
                <Link 
                    href={`/product/${product.id}`} // Link to the product detail page
                    key={product.id}
                    className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 group"
                >
                  {/* Image */}
                  <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden">
                    {product.images && (
                      <img
                        src={
                          product.images && product.images.length > 0
                            ? product.images[0]
                            : "/placeholder-image.jpg"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => e.target.src = "/placeholder-image.jpg"}
                      />
                    )}

                    {/* Wishlist Heart */}
                    <button
                      // Prevent navigation when clicking the heart button
                      onClick={(e) => {
                        e.preventDefault(); 
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                      className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow cursor-pointer transition-transform duration-200 hover:scale-110"
                      aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart
                        size={20}
                        className={
                          isLiked ? "text-red-500 fill-red-500" : "text-gray-600"
                        }
                      />
                    </button>
                  </div>

                  {/* Product Info */}
                  <h4 className="font-semibold text-lg mt-3 truncate">{product.name}</h4>
                  <p className="text-green-600 font-bold text-lg">
                    ${product.price ? product.price.toFixed(2) : "N/A"}
                  </p>
                  <p className="text-gray-500 text-sm line-clamp-2 min-h-[2.5rem]">
                    {product.description || "Eco-friendly home essentials."}
                  </p>

                  {/* Explore Button */}
                  <div className="mt-4 w-full bg-green-600 text-white py-2 text-center rounded-lg font-medium hover:bg-green-700 transition">
                    View Details
                  </div>
                </Link>
              );
            })
          ) : (
             // Show empty state if not loading and no products are found
             <div className="w-full p-10 text-center text-gray-500 col-span-full">
                No Home & Kitchen products found.
             </div>
          )}
        </div>

        {/* Scroll Buttons */}
        <button
          onClick={() => scrollCarousel("left")}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-xl p-3 rounded-full z-10 hover:bg-gray-100 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => scrollCarousel("right")}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-xl p-3 rounded-full z-10 hover:bg-gray-100 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Mobile View All */}
      <Link href={"/products"} className="sm:hidden w-full">
        <button className="w-full mt-4 flex items-center justify-center gap-2 text-green-800 font-bold hover:text-green-600 transition">
          View all <ChevronRight size={18} />
        </button>
      </Link>
    </div>
  );
};

export default Category1;