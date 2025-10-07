"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Heart, Leaf, Star, ChevronLeft } from "lucide-react"; // Importing icons

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State to manage the currently displayed main image
  const [mainImage, setMainImage] = useState(''); 

  useEffect(() => {
    // Reset states for a new product ID
    setProduct(null);
    setLoading(true);
    setError(null);
    
    // Fetch product details
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/dumyproducts/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        const fetchedProduct = data.data;

        if (fetchedProduct) {
          setProduct(fetchedProduct);
          // Set the first image as the default main image
          setMainImage(fetchedProduct.images[0]);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // --- Loading and Error States ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-xl font-medium text-green-600">
          Loading product details... 🌿
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{error || "Product not found."}</h2>
        <Link 
          href="/products" 
          className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-all flex items-center"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Products
        </Link>
      </div>
    );
  }
  
  // Destructure product data for cleaner JSX
  const { name, description, price, compareAtPrice, rating, reviews, category, images, specifications } = product;

  // Handler for Add to Cart (Placeholder)
  const handleAddToCart = () => {
    console.log(`Added ${name} to cart!`);
    alert(`Added ${name} to your eco-cart! 🛒`);
  };

  // Handler for Like (Placeholder)
  const handleLikeToggle = () => {
    console.log(`Toggled like for ${name}`);
    // You'd update the like status here
  };
  
  // --- Main Render ---
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 font-medium transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to All Products
        </Link>
        
        <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-6 md:p-12 grid lg:grid-cols-2 gap-10">
          
          {/* Product Images & Gallery */}
          <div className="lg:sticky lg:top-10 h-max">
            {/* Main Image */}
            <img
              src={mainImage}
              alt={name}
              className="rounded-2xl w-full max-h-[500px] object-cover mb-6 shadow-lg shadow-green-100 border border-gray-100"
            />
            
            {/* Image Gallery Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {images && images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${name} thumbnail ${index + 1}`}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-200 ${
                    img === mainImage 
                      ? 'border-4 border-green-500 ring-2 ring-green-200 scale-105' 
                      : 'border-2 border-gray-200 hover:border-green-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="pt-2">
            
            {/* Category and Title */}
            <p className="text-sm font-semibold text-green-500 uppercase tracking-wider mb-2">{category}</p>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
              {name}
            </h1>
            
            {/* Rating and Reviews */}
            <div className="flex items-center mb-6">
              <span className="text-yellow-500 font-bold text-xl flex items-center mr-3">
                <Star className="w-5 h-5 fill-current mr-1" /> {rating ? rating.toFixed(1) : 'N/A'}
              </span>
              <span className="text-gray-500 text-base">
                ({reviews || 0} Reviews)
              </span>
              {product.featured && (
                  <span className="ml-4 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
                    <Leaf className="w-3 h-3 mr-1" />
                    Eco-Choice
                  </span>
                )}
            </div>
            
            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6 border-b border-gray-100 pb-6">
              {description}
            </p>

            {/* Price Section */}
            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-extrabold text-green-700">
                ${price ? price.toFixed(2) : '0.00'}
              </span>
              {compareAtPrice && (
                <span className="text-xl font-medium text-gray-400 line-through">
                  ${compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center space-x-2 bg-green-500 text-white font-semibold py-4 rounded-full hover:bg-green-600 transition-colors duration-300 shadow-lg shadow-green-200 active:scale-[0.98] transform min-w-[200px]"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Eco-Cart</span>
              </button>
              
              <button
                onClick={handleLikeToggle}
                className="flex items-center justify-center p-4 rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors duration-200 shadow-md active:scale-[0.98] transform"
                aria-label="Add to Wishlist"
              >
                <Heart className="w-6 h-6" />
              </button>
            </div>
            
            {/* Specifications */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-xl font-bold text-gray-700 mb-4">
                <Leaf className="inline w-5 h-5 mr-2 text-green-500" />
                Product Specifications
              </h3>
              <ul className="text-base text-gray-600 space-y-2 grid sm:grid-cols-2">
                {Object.entries(specifications || {}).map(([key, value]) => (
                    <li key={key} className="flex items-center">
                        <span className="text-green-500 font-semibold mr-2">•</span>
                        <span className="capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}:</span> {value}
                    </li>
                ))}
                {/* Fallback for missing or incomplete specifications */}
                {!specifications && <li>No detailed specifications available.</li>}
              </ul>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}