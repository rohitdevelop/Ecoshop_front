"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  Leaf,
  Star,
  Filter,
  Search,
  Grid,
  List,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useWishlist } from "@/Context/WishlistContext";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  
  // Get wishlist functions from context
  const { wishlist, toggleWishlist } = useWishlist();

  // --- Fetch Products Effect ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await fetch("http://localhost:4000/dumyproducts");
        const response = await fetch(
          "https://ecoshop-back.onrender.com/dumyproducts"
        );

        const data = await response.json();
        const productData = data.data || [];
        setProducts(productData);
        setFilteredProducts(productData);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(
          "Failed to load products. Please check the backend server connection."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- Filter and Sort Products Effect ---
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort logic
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // Featured / Default
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, sortBy, products]);

  // --- Handlers ---
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Added product ${product.name} (ID: ${product.id}) to cart!`);
    // Replaced alert with a more subtle console log, but keeping the original if desired
    // alert(`${product.name} added to your cart! 🛒`);
  };

  const handleLikeToggle = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if product is already in wishlist
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      alert("error hai")
     }
  };

  // Helper function to check if product is in wishlist
  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  // --- Loading State UI ---
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent mb-4"></div>
          <p className="text-lg text-green-400">
            Loading sustainable products...
          </p>
        </div>
      </div>
    );
  }

  // --- Error State UI ---
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        <div className="text-center max-w-lg p-8 bg-white rounded-lg shadow-xl border border-red-200">
          <div className="text-5xl mb-4 text-red-500">❌</div>
          <h3 className="text-xl text-red-600 mb-2">Error Loading Products</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // --- Main Product Page UI ---
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <header className="bg-emerald-700 text-white py-16 px-4 mt-12">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Leaf className="w-10 h-10 mr-3 text-emerald-300 animate-pulse" />
              <h1 className="text-4xl sm:text-5xl font-light tracking-wider">
                Our Eco-Friendly Collection
              </h1>
            </div>
            <p className="text-lg text-emerald-200 max-w-2xl mx-auto font-extralight">
              Sustainable choices for a brighter planet.
            </p>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 -mt-8">
          {/* Search and Filter Bar - More Professional, less rounded */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-8 border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4 items-center">
              {/* Search Input */}
              <div className="col-span-2 md:col-span-4 lg:col-span-5 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                />
              </div>

              {/* Category Filter */}
              <div className="col-span-1 md:col-span-3 lg:col-span-3 relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm appearance-none bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              {/* Sort By */}
              <div className="col-span-1 md:col-span-3 lg:col-span-3 relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm appearance-none bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              {/* View Toggle */}
              <div className="col-span-2 md:col-span-2 lg:col-span-1 flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid View"
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  aria-label="List View"
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results Count */}
            <p className="mt-4 text-sm text-gray-500">
              Showing{" "}
              <span className="text-emerald-700 font-medium">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>
          </div>

          {/* Products Display Area */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <div className="text-5xl mb-3 text-gray-400">🔍</div>
              <h3 className="text-xl text-gray-700">
                No products match your criteria.
              </h3>
              <p className="text-gray-500">
                Try broadening your search or filter.
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "flex flex-col gap-4"
              }
            >
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-emerald-300 ${
                    viewMode === "list" ? "flex flex-col sm:flex-row" : "block"
                  }`}
                >
                  {/* Image Section */}
                  <div
                    className={`relative overflow-hidden ${
                      viewMode === "list"
                        ? "w-full h-48 sm:w-48 sm:h-auto flex-shrink-0"
                        : "h-64"
                    }`}
                  >
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

                    {/* Featured/Eco-Choice Badge */}
                    {product.featured && (
                      <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs px-2 py-1 rounded-full flex items-center shadow-md">
                        <Leaf className="w-3 h-3 mr-1" />
                        Eco-Choice
                      </span>
                    )}

                    {/* Like Button Overlay */}
                    <button
                      onClick={(e) => handleLikeToggle(e, product)}
                      aria-label={`Toggle like for ${product.name}`}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      <Heart
                        className={`w-5 h-5 transition-all duration-200 ${
                          isProductInWishlist(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                  </div>  

                  {/* Product Details */}
                  <div
                    className={`p-4 ${
                      viewMode === "list"
                        ? "flex-1 flex flex-col justify-between"
                        : ""
                    }`}
                  >
                    <div>
                      {/* Name */}
                      <h2 className="text-lg font-normal text-gray-800 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-1">
                        {product.name}
                      </h2>

                      {/* Category */}
                      <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
                        {product.category}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                (product.rating || 0) > i
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">
                          {product.rating ? product.rating.toFixed(1) : "N/A"}
                        </span>
                        <span className="text-xs text-gray-400 ml-2">
                          ({product.reviews || 0})
                        </span>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div
                      className={
                        viewMode === "list"
                          ? "mt-4 border-t pt-4 border-gray-100"
                          : ""
                      }
                    >
                      <div className="mb-3">
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="text-2xl font-semibold text-emerald-600">
                          ${product.price ? product.price.toFixed(2) : "0.00"}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="flex-1 flex items-center justify-center space-x-2 p-2 text-emerald-600 border border-emerald-500 rounded-md text-sm hover:bg-emerald-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-[0.98]"
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <p className="hidden sm:inline">Add to Cart</p>
                        </button>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // alert(`Proceeding to buy ${product.name} now!`);
                          }}
                          className="flex-1 bg-emerald-600 text-white p-2 rounded-md text-sm hover:bg-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-[0.98]"
                        >
                          <p>Buy Now</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}