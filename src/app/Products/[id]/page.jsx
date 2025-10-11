"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Heart, Leaf, Star, ChevronLeft } from "lucide-react";

export default function ProductDetail() {
  // Use a placeholder ID if useParams returns undefined (for local development stability)
  const params = useParams();
  const id = params?.id; 

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(''); 
  const [isLiked, setIsLiked] = useState(false); // New state for like status

  useEffect(() => {
    // Reset states and exit if no ID is present
    if (!id) {
        setLoading(false);
        setError("Invalid product ID.");
        return;
    }
    
    setProduct(null);
    setLoading(true);
    setError(null);
    
    const fetchProduct = async () => {
      try {
        // NOTE: Ensure your backend is running at this address
        // const response = await fetch(`http://localhost:4000/dumyproducts/${id}`);
        const response = await fetch("https://ecoshop-back.onrender.com/dumyproducts/${id}")
        
        if (response.status === 404) {
             throw new Error("Product not found.");
        }
        if (!response.ok) {
          throw new Error("Server error or network issue.");
        }
        
        const data = await response.json();
        const fetchedProduct = data.data;

        if (fetchedProduct) {
          setProduct(fetchedProduct);
          // Set the first image as the default main image
          setMainImage(fetchedProduct.images ? fetchedProduct.images[0] : '/placeholder.jpg'); 
        } else {
          setError("Product data is missing or empty.");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message || "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // --- Handlers ---
  const handleAddToCart = () => {
    // Actual implementation would involve global state management (e.g., Redux, Context)
    console.log(`Added ${product.name} to cart!`);
    alert(`Added ${product.name} to your cart!`);
  };

  const handleLikeToggle = () => {
    setIsLiked(prev => !prev);
    console.log(`Toggled like for ${product.name}`);
  };

  // --- Loading and Error States ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-t-4 border-green-500 border-t-transparent mb-3"></div>
          <p className="text-base text-green-400">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-6">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">⚠️ {error || "Product not found."}</h2>
        <Link 
          href="/products" 
          className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-green-700 transition-all flex items-center shadow-md"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>
      </div>
    );
  }
  
  // Destructure product data for cleaner JSX
  const { name, description, price, compareAtPrice, rating, reviews, category, images, specifications } = product;

  // Render Star Icons based on rating
  const renderStars = (currentRating) => {
    const fullStars = Math.floor(currentRating);
    const hasHalfStar = currentRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
        <div className="flex items-center">
            {/* Full Stars */}
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            ))}
            {/* Half Star (approximation, since lucide doesn't have a half star) */}
            {hasHalfStar && <Star key="half" className="w-4 h-4 fill-yellow-300 text-yellow-300" />}
            {/* Empty Stars */}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
            ))}
        </div>
    );
  };
  
  // --- Main Render ---
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center text-gray-600 hover:text-green-600 mb-4 text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to All Products
        </Link>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 grid lg:grid-cols-2 gap-6 md:gap-10 p-4 md:p-8 lg:p-12">
          
          {/* LEFT COLUMN: Product Images & Gallery */}
          <div className="flex flex-col">
            {/* Main Image Container */}
            <div className="relative mb-4">
              <img
                src={mainImage}
                alt={name}
                className="rounded-lg w-full h-auto max-h-[550px] object-cover shadow-md border border-gray-100"
              />
              
              {/* Floating Like Button */}
              <button
                onClick={handleLikeToggle}
                className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-200 shadow-lg focus:outline-none focus:ring-2 ${
                    isLiked 
                        ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300' 
                        : 'bg-white text-gray-500 hover:bg-gray-100 focus:ring-gray-300'
                }`}
                aria-label="Add to Wishlist"
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-white' : 'fill-none'}`} />
              </button>
            </div>
            
            {/* Image Gallery Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2 px-1">
              {images && images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md flex-shrink-0 cursor-pointer transition-all duration-200 ${
                    img === mainImage 
                      ? 'border-2 border-green-500 ring-2 ring-green-200' 
                      : 'border border-gray-200 hover:border-green-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Product Info & Actions */}
          <div className="pt-2">
            
            {/* Category and Title */}
            <p className="text-sm font-medium text-green-600 uppercase tracking-widest mb-1">{category}</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              {name}
            </h1>
            
            {/* Rating and Reviews */}
            <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
              {renderStars(rating || 0)}
              <span className="text-gray-700 text-sm ml-2">
                 {rating ? rating.toFixed(1) : '0.0'}
              </span>
              <span className="text-gray-500 text-sm ml-3">
                | {reviews || 0} Ratings
              </span>
              {product.featured && (
                <span className="ml-4 bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full flex items-center hidden sm:flex">
                  <Leaf className="w-3 h-3 mr-1" />
                  Eco-Certified
                </span>
              )}
            </div>
            
            {/* Price Section - Highlighted */}
            <div className="mb-6">
              <p className="text-lg text-gray-500 mb-1">Selling Price</p>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-extrabold text-green-700">
                  ${price ? price.toFixed(2) : '0.00'}
                </span>
                {compareAtPrice && price < compareAtPrice && (
                  <span className="text-xl font-normal text-gray-400 line-through">
                    ${compareAtPrice.toFixed(2)}
                  </span>
                )}
                {compareAtPrice && price < compareAtPrice && (
                    <span className="text-xl font-bold text-red-500">
                       ({Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}% OFF)
                    </span>
                )}
              </div>
            </div>

            {/* Action Buttons (Scroll-friendly on mobile) */}
            <div className="sticky bottom-0 bg-white pt-4 pb-2 -mx-4 sm:m-0 sm:p-0 sm:static border-t sm:border-t-0 border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4 px-4 sm:px-0">
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white font-semibold py-3.5 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md active:scale-[0.99] transform"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <p>Add to Eco-Cart</p>
                    </button>
                    
                    <button
                        // Placeholder for a Buy Now action
                        className="flex-1 flex items-center justify-center space-x-2 bg-emerald-100 text-emerald-700 border border-emerald-300 font-semibold py-3.5 rounded-lg hover:bg-emerald-200 transition-colors duration-200 shadow-sm active:scale-[0.99] transform"
                    >
                        <p>Buy Now</p>
                    </button>
                </div>
            </div>
            
            {/* Description */}
            <div className="mt-8 border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Product Details</h2>
                <p className="text-gray-600 text-base leading-relaxed">
                    {description}
                </p>
            </div>
            
            {/* Specifications */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                <Leaf className="inline w-5 h-5 mr-2 text-green-600" />
                Key Specifications
              </h3>
              <ul className="text-base text-gray-600 space-y-2 grid sm:grid-cols-2 gap-x-6">
                {Object.entries(specifications || {}).map(([key, value]) => (
                  <li key={key} className="flex">
                    <span className="text-green-500 font-bold mr-2">•</span>
                    <span className="font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}:</span> 
                    <span className="ml-1">{value}</span>
                  </li>
                ))}
                {!specifications && 
                    <li className="text-gray-500">No detailed specifications available.</li>
                }
              </ul>
            </div>
            
          </div> {/* End of Product Info Column */}

        </div> {/* End of Main Grid */}
      </div>
    </div>
  );
}