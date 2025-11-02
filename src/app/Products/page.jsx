"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  Leaf,
  Star,
  Search,
  Grid,
  List,
  CheckCircle,
  Trash2, // Icon for removal
  ArrowRight, // Icon for 'View Cart' redirection
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useWishlist } from "@/Context/WishlistContext";
import { useCart } from "@/Context/Cardcontext"; // Corrected to Cartcontext and assumed it provides removeFromCart

/**
 * ProductsPage Component
 * Displays a filterable, sortable grid/list of eco-friendly products
 */
export default function ProductsPage() {
  // ============================
  // STATE MANAGEMENT
  // ============================

  // Product data states
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter and search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  // UI states
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Contexts
  const { wishlist, toggleWishlist } = useWishlist();
  // IMPORTANT: We need all three cart functions here
  const { cart, addToCart, removeFromCart } = useCart();

  // ============================
  // DATA FETCHING
  // ============================

  /**
   * Fetch products from API on component mount
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://ecoshop-back.onrender.com/dumyproducts"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Ensure that product IDs are strings/numbers for comparison consistency
        const productData = (data.data || []).map(p => ({
            ...p,
            id: String(p.id),
            // Default rating/reviews if missing, for reliable sorting/display
            rating: p.rating || 0,
            reviews: p.reviews || 0, 
        }));

        setProducts(productData);
        setFilteredProducts(productData);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(
          "Failed to load products. Please check your internet connection and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Run only once on mount

  // ============================
  // FILTERING & SORTING LOGIC
  // ============================

  /**
   * Filter and sort products whenever dependencies change
   */
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.name?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "featured":
      default:
        // Featured items first, then by name
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (a.name || "").localeCompare(b.name || "");
        });
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, sortBy, products]);

  // ============================
  // HELPER FUNCTIONS (Context Checks)
  // ============================
    
  /**
   * Check if a product is in the wishlist
   */
  const isProductInWishlist = (productId) => {
    // Ensure both wishlist and product IDs are consistent (e.g., strings)
    return Array.isArray(wishlist) && wishlist.some((item) => String(item.id) === String(productId));
  };
  
  /**
   * Check if a product is already in the cart
   */
  const isProductInCart = (productId) => {
    // Ensure both cart and product IDs are consistent (e.g., strings)
    return Array.isArray(cart) && cart.some((item) => String(item.id) === String(productId));
  };


  /**
   * Get unique categories from products
   */
  const categories = useMemo(() => [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ], [products]);

  // ============================
  // EVENT HANDLERS (UPDATED FOR TOGGLE LOGIC)
  // ============================

  /**
   * Handle adding or removing product from cart (Toggle logic)
   */
  const handleCartToggle = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    const inCart = isProductInCart(product.id);

    if (inCart && removeFromCart) {
      // If in cart, REMOVE it
      removeFromCart(product.id);
      console.log(`Removed product ${product.name} (ID: ${product.id}) from cart.`);
    } else if (addToCart) {
      // If NOT in cart, ADD it
      // Note: Assumed quantity of 1 for quick add button
      addToCart(product, 1); 
      console.log(`Added product ${product.name} (ID: ${product.id}) to cart.`);
    }
  };

  /**
   * Handle "Buy Now" action
   */
  const handleBuyNow = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    const inCart = isProductInCart(product.id);

    if (!inCart && addToCart) {
      // 1. Add to cart if not already present
      addToCart(product, 1);
    }

    // 2. Redirect to cart/checkout page (You should use Next.js Router here)
    // Example: router.push("/cart"); 
    console.log(`Redirecting to cart/checkout...`);
    // Simple redirect for demonstration:
    window.location.href = "/cart"; 
  };

  /**
   * Handle toggling product in wishlist
   */
  const handleLikeToggle = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (toggleWishlist) {
      toggleWishlist(product);
    } else {
      console.error("toggleWishlist function not available from context");
    }
  };


  // ============================
  // RENDER: Main Content
  // ============================

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* ============================
            HERO SECTION
            ============================ */}
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
          {/* ============================
              SEARCH AND FILTER BAR
              ============================ */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-8 border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4 items-center">
              {/* Search Input */}
              <div className="col-span-2 md:col-span-4 lg:col-span-5 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  aria-label="Search products"
                />
              </div>

              {/* Category Filter */}
              <div className="col-span-1 md:col-span-3 lg:col-span-3 relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm appearance-none bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  aria-label="Filter by category"
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
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm appearance-none bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  aria-label="Sort products"
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

              {/* View Toggle Buttons */}
              <div className="col-span-2 md:col-span-2 lg:col-span-1 flex gap-2 justify-end">
                <button
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid View"
                  className={`p-2 rounded-md transition-all duration-200 ${
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
                  className={`p-2 rounded-md transition-all duration-200 ${
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
              {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          {/* ============================
              PRODUCTS DISPLAY AREA
              ============================ */}
          {loading ? (
            <div className="text-center py-20">
              <div className="border-4 border-emerald-300 border-t-emerald-600 rounded-full w-12 h-12 animate-spin mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading eco-friendly finds...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-red-50 rounded-lg shadow-md border-2 border-red-200 text-red-700">
                <p className="font-semibold text-xl mb-2">🚨 Error Loading Data</p>
                <p>{error}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl text-gray-700 mb-2 font-semibold">
                No products found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSortBy("featured");
                }}
                className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "flex flex-col gap-4"
              }
            >
              {filteredProducts.map((product) => {
                const inWishlist = isProductInWishlist(product.id);
                const inCart = isProductInCart(product.id);

                return (
                  // Link wrapper to the product detail page
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-300 ${
                      viewMode === "list" ? "flex flex-col sm:flex-row" : "block"
                    }`}
                  >
                    {/* Product Image */}
                    <div
                      className={`relative overflow-hidden bg-gray-100 ${
                        viewMode === "list"
                          ? "w-full h-48 sm:w-48 sm:h-auto flex-shrink-0"
                          : "h-64"
                      }`}
                    >
                      <img
                        src={
                          product.images && product.images[0]
                            ? product.images[0]
                            : "/placeholder-image.jpg"
                        }
                        alt={product.name || "Product"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />

                      {product.featured && (
                        <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full flex items-center shadow-md z-10">
                          <Leaf className="w-3 h-3 mr-1" /> Eco-Choice
                        </span>
                      )}

                      <button
                        onClick={(e) => handleLikeToggle(e, product)}
                        aria-label={`${inWishlist ? "Remove from" : "Add to"} wishlist`}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 z-10"
                      >
                        <Heart
                          className={`w-5 h-5 transition-all duration-200 ${
                            inWishlist
                              ? "fill-red-500 text-red-500 scale-110"
                              : "text-gray-600 hover:text-red-400"
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
                        <h2 className="text-lg font-medium text-gray-800 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-1">
                          {product.name || "Unnamed Product"}
                        </h2>

                        <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
                          {product.category || "Uncategorized"}
                        </p>

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
                          <span className="text-sm text-gray-600 ml-2 font-medium">
                            {product.rating ? product.rating.toFixed(1) : "N/A"}
                          </span>
                          {product.reviews > 0 && (
                            <span className="text-xs text-gray-400 ml-1">
                              ({product.reviews})
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price & Buttons (UPDATED SECTION) */}
                      <div
                        className={
                          viewMode === "list"
                            ? "mt-4 border-t pt-4 border-gray-100"
                            : ""
                        }
                      >
                        <div className="mb-3">
                          <p className="text-sm text-gray-500 mb-1">Price</p>
                          <p className="text-2xl font-semibold text-emerald-600">
                            ${product.price ? product.price.toFixed(2) : "0.00"}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          {/* CART TOGGLE BUTTON: ADD or REMOVE */}
                          <button
                            onClick={(e) => handleCartToggle(e, product)}
                            aria-label={inCart ? "Remove from cart" : "Add to cart"}
                            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 active:scale-[0.98] ${
                              inCart
                                // IMPROVED UI: Button for "Remove"
                                ? "bg-red-50 text-red-600 border border-red-300 hover:bg-red-100 focus:ring-red-400"
                                // IMPROVED UI: Button for "Add to Cart"
                                : "text-white bg-emerald-600 hover:bg-emerald-700 shadow-md focus:ring-emerald-500"
                            }`}
                          >
                            {inCart ? (
                              <Trash2 className="w-4 h-4" /> 
                            ) : (
                              <ShoppingCart className="w-4 h-4" />
                            )}
                            <span>
                              {inCart ? "Remove" : "Add to Cart"}
                            </span>
                          </button>

                          {/* BUY NOW / VIEW CART BUTTON */}
                          <button
                            onClick={(e) => handleBuyNow(e, product)}
                            className={`flex-1 flex items-center justify-center space-x-2 bg-emerald-100 text-emerald-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-[0.98] border border-emerald-300`}
                          >
                            {inCart ? (
                                <>
                                    <span>View Cart</span>
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </>
                            ) : (
                                <span>Buy Now</span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}