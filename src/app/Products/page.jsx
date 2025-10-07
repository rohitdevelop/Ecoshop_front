"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Leaf } from "lucide-react"; // Icons for a better look

export default function ProductsPage() {
  // Use state for products, loading, and error
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/dumyproducts");
        
        if (!response.ok) {
          throw new Error("Network response was not ok. Server might be down.");
        }
        
        const data = await response.json();
        // Assuming the product array is under a 'data' key, based on your original fetch
        setProducts(data.data || []); 
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please check the backend server connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handler for Add to Cart
  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Stop navigation
    e.stopPropagation(); // Stop event bubbling up to the Link component
    console.log(`Added product ${product.name} (ID: ${product.id}) to cart!`);
    // In a real app, you'd dispatch a global state update or call an API here.
    alert(`${product.name} added to your eco-cart! 🛒`);
  };

  // Handler for Like Toggle
  const handleLikeToggle = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Toggled like for product ${product.name}`);
    // In a real app, you'd update a database or local state here.
  };

  // --- Loading and Error States ---
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="text-xl font-medium text-green-600">Loading Eco-Friendly Products... 🌿</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-red-50">
        <div className="text-xl font-medium text-red-600">Error: {error}</div>
      </div>
    );
  }

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 sm:mb-14 text-gray-800">
        <Leaf className="inline-block w-8 h-8 mr-2 text-green-600" />
        Sustainably Sourced Goods
      </h1>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        {/* Responsive grid: 2 columns on small screens (mobile), 4 on large screens */}
        <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              // Eco-theme card styling
              className="group bg-white rounded-xl overflow-hidden shadow-lg border border-green-100 hover:shadow-2xl hover:shadow-green-200 transition-all duration-300 block relative"
            >
              {/* Image and Eco Badge */}
              <div className="relative">
                <img
                  // Ensure product.images[0] exists before rendering
                  src={product.images ? product.images[0] : '/placeholder-image.jpg'} 
                  alt={product.name}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Eco-Choice Badge */}
                {product.featured && ( // Assuming 'featured' indicates an eco-friendly choice
                  <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center shadow-md">
                    <Leaf className="w-3 h-3 mr-1" />
                    Eco-Choice
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-800 truncate mb-1">
                  {product.name}
                </h2>
                <p className="text-sm text-green-600 font-medium mb-3">{product.category}</p>

                {/* Price, Rating, and Like Button */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-extrabold text-green-700">
                    {/* Format price to 2 decimal places */}
                    ${product.price ? product.price.toFixed(2) : '0.00'}
                  </span>
                  
                  <div className="flex items-center space-x-3">
                    {/* Rating */}
                    <span className="text-yellow-500 text-sm font-semibold flex items-center">
                      ⭐ {product.rating ? product.rating.toFixed(1) : 'N/A'}
                      <span className="text-gray-400 text-xs ml-1">({product.reviews || 0})</span>
                    </span>
                    
                    {/* Like Button */}
                    <button
                      onClick={(e) => handleLikeToggle(e, product)}
                      aria-label={`Like ${product.name}`}
                      className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <Heart className="w-4 h-4" fill="currentColor" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white font-semibold py-3 rounded-full hover:bg-green-600 transition-colors duration-300 shadow-lg shadow-green-200 active:scale-95 transform"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Footer CTA (Call to Action) */}
      <div className="text-center mt-16 pt-8 border-t border-green-100">
        <p className="text-lg text-gray-600">Committed to a greener planet, one purchase at a time.</p>
      </div>
    </div>
  );
}