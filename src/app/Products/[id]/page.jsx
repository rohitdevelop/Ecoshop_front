"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Heart, Leaf, Star, ChevronLeft } from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useWishlist } from "@/Context/WishlistContext";

/**
 * ProductDetail Component
 * Displays detailed information about a single product
 * with image gallery, specifications, and purchase options
 */
export default function ProductDetail() {
  // ============================
  // ROUTING & PARAMETERS
  // ============================
  
  const params = useParams();
  const id = params?.id;

  // ============================
  // STATE MANAGEMENT
  // ============================
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Get wishlist functions from context
  const { wishlist, toggleWishlist } = useWishlist();

  // ============================
  // DATA FETCHING
  // ============================
  
  /**
   * Fetch product details from API when component mounts or ID changes
   */
  useEffect(() => {
    // Validate ID before fetching
    if (!id) {
      setLoading(false);
      setError("Invalid product ID.");
      return;
    }

    // Reset states for new product
    setProduct(null);
    setLoading(true);
    setError(null);

    const fetchProduct = async () => {
      try {
        // FIXED: Template literal was not being interpolated correctly
        const response = await fetch(
          `https://ecoshop-back.onrender.com/dumyproducts/${id}`
        );

        // Handle 404 - Product not found
        if (response.status === 404) {
          throw new Error("Product not found. It may have been removed or the ID is incorrect.");
        }

        // Handle other HTTP errors
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}. Please try again later.`);
        }

        const data = await response.json();
        const fetchedProduct = data.data;

        // Validate fetched data
        if (!fetchedProduct) {
          throw new Error("Product data is missing or empty.");
        }

        setProduct(fetchedProduct);
        
        // Set the first image as default, with fallback
        const defaultImage = 
          fetchedProduct.images && fetchedProduct.images.length > 0
            ? fetchedProduct.images[0]
            : "/placeholder-image.jpg";
        setMainImage(defaultImage);
        
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message || "Failed to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ============================
  // EVENT HANDLERS
  // ============================
  
  /**
   * Handle adding product to shopping cart
   */
  const handleAddToCart = () => {
    if (!product) return;
    
    // TODO: Implement actual cart functionality with context/state management
    console.log(`Added ${selectedQuantity}x ${product.name} to cart!`);
    
    // Optional: Show success notification
    alert(`Added ${selectedQuantity}x ${product.name} to your cart!`);
  };

  /**
   * Handle toggling product in wishlist
   */
  const handleLikeToggle = () => {
    if (!product) return;
    
    // Use context's toggleWishlist function
    if (toggleWishlist) {
      toggleWishlist(product);
    } else {
      console.error("toggleWishlist function not available from context");
    }
  };

  /**
   * Handle Buy Now action
   */
  const handleBuyNow = () => {
    if (!product) return;
    
    // TODO: Implement checkout flow
    console.log(`Initiating purchase for ${product.name}`);
    
    // Navigate to checkout page
    // router.push(`/checkout?product=${product.id}&quantity=${selectedQuantity}`);
  };

  /**
   * Check if current product is in wishlist
   */
  const isProductInWishlist = () => {
    return Array.isArray(wishlist) && wishlist.some((item) => item.id === product?.id);
  };

  // ============================
  // UTILITY FUNCTIONS
  // ============================
  
  /**
   * Render star rating visualization
   * @param {number} currentRating - Rating value (0-5)
   * @returns {JSX.Element} Star rating component
   */
  const renderStars = (currentRating) => {
    const rating = currentRating || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center" aria-label={`Rating: ${rating.toFixed(1)} out of 5 stars`}>
        {/* Full Stars */}
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className="w-4 h-4 fill-yellow-500 text-yellow-500"
          />
        ))}
        
        {/* Half Star */}
        {hasHalfStar && (
          <Star
            key="half"
            className="w-4 h-4 fill-yellow-300 text-yellow-300"
          />
        )}
        
        {/* Empty Stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            className="w-4 h-4 text-gray-300"
          />
        ))}
      </div>
    );
  };

  /**
   * Calculate discount percentage
   */
  const calculateDiscount = () => {
    if (!product?.compareAtPrice || !product?.price) return 0;
    if (product.price >= product.compareAtPrice) return 0;
    
    return Math.round(
      ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
    );
  };

  // ============================
  // RENDER: LOADING STATE
  // ============================
  
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent mb-4"></div>
            <p className="text-lg text-gray-700">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ============================
  // RENDER: ERROR STATE
  // ============================
  
  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
          <div className="text-center max-w-lg p-8 bg-white rounded-lg shadow-xl border border-red-200">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-semibold text-red-600 mb-3">
              {error || "Product not found"}
            </h2>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-all shadow-md"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ============================
  // DESTRUCTURE PRODUCT DATA
  // ============================
  
  const {
    name = "Unnamed Product",
    description = "No description available.",
    price = 0,
    compareAtPrice,
    rating = 0,
    reviews = 0,
    category = "Uncategorized",
    images = [],
    specifications = {},
    featured = false,
  } = product;

  const discount = calculateDiscount();
  const isLiked = isProductInWishlist();

  // ============================
  // RENDER: MAIN CONTENT
  // ============================
  
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
          
          {/* ============================
              BACK NAVIGATION
              ============================ */}
          <Link
            href="/products"
            className="inline-flex items-center text-gray-600 hover:text-emerald-600 mb-6 text-sm font-medium transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to All Products
          </Link>

          {/* ============================
              MAIN PRODUCT CONTAINER
              ============================ */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 grid lg:grid-cols-2 gap-6 md:gap-10 p-4 md:p-8 lg:p-12">
            
            {/* ============================
                LEFT COLUMN: IMAGE GALLERY
                ============================ */}
            <div className="flex flex-col">
              
              {/* Main Image Display */}
              <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={mainImage || "/placeholder-image.jpg"}
                  alt={name}
                  className="rounded-lg w-full h-auto max-h-[550px] object-contain shadow-md"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />

                {/* Floating Wishlist Button */}
                <button
                  onClick={handleLikeToggle}
                  className={`absolute top-3 right-3 p-3 rounded-full transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 ${
                    isLiked
                      ? "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300 scale-110"
                      : "bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white focus:ring-gray-300"
                  }`}
                  aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart
                    className={`w-6 h-6 transition-transform ${
                      isLiked ? "fill-white scale-110" : "fill-none"
                    }`}
                  />
                </button>

                {/* Featured Badge */}
                {featured && (
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full flex items-center shadow-md">
                    <Leaf className="w-3 h-3 mr-1" />
                    Eco-Certified
                  </div>
                )}
              </div>

              {/* Image Gallery Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 px-1">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(img)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md flex-shrink-0 transition-all duration-200 focus:outline-none ${
                        img === mainImage
                          ? "border-2 border-emerald-500 ring-2 ring-emerald-200 scale-105"
                          : "border border-gray-200 hover:border-emerald-300"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${name} - View ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                        onError={(e) => {
                          e.target.src = "/placeholder-image.jpg";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ============================
                RIGHT COLUMN: PRODUCT INFO
                ============================ */}
            <div className="pt-2 flex flex-col">
              
              {/* Category Badge */}
              <p className="text-sm font-medium text-emerald-600 uppercase tracking-widest mb-2">
                {category}
              </p>

              {/* Product Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {name}
              </h1>

              {/* Rating and Reviews Section */}
              <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
                {renderStars(rating)}
                <span className="text-gray-700 text-sm font-medium ml-2">
                  {rating.toFixed(1)}
                </span>
                <span className="text-gray-500 text-sm ml-3">
                  ({reviews} {reviews === 1 ? "Review" : "Reviews"})
                </span>
              </div>

              {/* Price Section */}
              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
                  Price
                </p>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-bold text-emerald-700">
                    ${price.toFixed(2)}
                  </span>
                  
                  {compareAtPrice && discount > 0 && (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        ${compareAtPrice.toFixed(2)}
                      </span>
                      <span className="text-lg font-bold text-red-500 bg-red-50 px-2 py-1 rounded">
                        {discount}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label htmlFor="quantity" className="text-sm text-gray-700 font-medium mb-2 block">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors font-semibold"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max="99"
                    value={selectedQuantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setSelectedQuantity(Math.max(1, Math.min(99, val)));
                    }}
                    className="w-16 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => setSelectedQuantity(Math.min(99, selectedQuantity + 1))}
                    className="w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors font-semibold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="sticky bottom-0 bg-white pt-4 pb-2 -mx-4 sm:m-0 sm:p-0 sm:static border-t sm:border-t-0 border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3 px-4 sm:px-0">
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center space-x-2 bg-emerald-600 text-white font-semibold py-3.5 rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>

                  {/* Buy Now Button */}
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 flex items-center justify-center space-x-2 bg-emerald-100 text-emerald-700 border-2 border-emerald-300 font-semibold py-3.5 rounded-lg hover:bg-emerald-200 transition-all duration-200 shadow-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>

              {/* ============================
                  PRODUCT DESCRIPTION
                  ============================ */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <Leaf className="w-5 h-5 mr-2 text-emerald-600" />
                  Product Details
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  {description}
                </p>
              </div>

              {/* ============================
                  SPECIFICATIONS
                  ============================ */}
              {Object.keys(specifications).length > 0 && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-emerald-600" />
                    Key Specifications
                  </h3>
                  <ul className="text-base text-gray-600 space-y-3 grid sm:grid-cols-2 gap-x-6">
                    {Object.entries(specifications).map(([key, value]) => (
                      <li key={key} className="flex items-start">
                        <span className="text-emerald-500 font-bold mr-2 mt-1">•</span>
                        <div>
                          <span className="font-medium text-gray-700">
                            {key.replace(/([A-Z])/g, " $1").trim()}:
                          </span>{" "}
                          <span className="text-gray-600">{value}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}