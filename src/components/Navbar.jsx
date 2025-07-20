"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Heart, 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  User, 
  Settings, 
  Leaf, 
  Bell,
  Package,
  MapPin,
  ChevronDown,
  Phone,
  Mail,
  Gift,
  Truck
} from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState(3); // Mock cart count
  const [wishlistItems, setWishlistItems] = useState(5); // Mock wishlist count
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const pathname = usePathname();
  const { user } = useUser();

  // Check if user is admin
  const isAdmin = user?.publicMetadata?.role === 'admin' || 
                  user?.primaryEmailAddress?.emailAddress === 'rohitdev124421@gmail.com';

  const navLinks = [
    { name: "Home", href: "/", icon: null },
    { name: "Products", href: "/products", icon: Package, hasDropdown: true },
    { name: "About", href: "/about", icon: null },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const productCategories = [
    { name: "Home & Kitchen", href: "/products?category=home", icon: "🏠" },
    { name: "Personal Care", href: "/products?category=bodycare", icon: "🌸" },
    { name: "Eco Gifts", href: "/products?category=lifestyle", icon: "🎁" },
    { name: "Travel Essentials", href: "/products?category=travel", icon: "🧳" },
    { name: "Kids & Baby", href: "/products?category=kids", icon: "👶" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className={`bg-white  shadow-md fixed top-0 left-0 w-full z-50 transition-all duration-300 `}>
        <div className="max-w-7xl mx-auto px-4 py-4 ">
          <div className="flex items-center w-full gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Leaf className="w-8 h-8 text-green-600 group-hover:text-green-700 transition-colors" />
                <div className="absolute inset-0 bg-green-200 rounded-full opacity-0 group-hover:opacity-30 transition-opacity scale-150"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-800 group-hover:text-green-900 transition-colors">
                  EcoShop
                </h1>
                <p className="text-xs text-green-600 -mt-1">Sustainable Living</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      pathname === link.href
                        ? "text-green-700 bg-green-50"
                        : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                    }`}
                    onMouseEnter={() => link.hasDropdown && setIsDropdownOpen(true)}
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.name}
                    {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  
                  {/* Products Dropdown */}
                  {link.hasDropdown && isDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-4 z-50"
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <div className="px-4 pb-3 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800">Shop by Category</h3>
                      </div>
                      {productCategories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors"
                        >
                          <span className="text-lg">{category.icon}</span>
                          <span className="text-gray-700 hover:text-green-700">{category.name}</span>
                        </Link>
                      ))}
                      <div className="px-4 pt-3 border-t border-gray-100 mt-2">
                        <Link
                          href="/products"
                          className="text-green-600 hover:text-green-700 font-medium text-sm"
                        >
                          View All Products →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Admin Link */}
              {isAdmin && (
                <Link
                  href="/admin"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                    pathname === '/admin'
                      ? "text-purple-700 bg-purple-50"
                      : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Admin Panel
                </Link>
              )}
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center bg-gray-200 rounded-full px-4 py-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-500 mr-3" />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search eco-friendly products..."
                  className="bg-transparent outline-none text-sm w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                />
              </div>
            </div>

            {/* Desktop Right Side */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Notifications (for signed in users) */}
              <SignedIn>
                <button className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    2
                  </span>
                </button>
              </SignedIn>

              {/* Wishlist */}
              <Link href="/wishlist" className="relative p-2 text-gray-600 hover:text-red-500 transition-colors group">
                <Heart className="w-5 h-5" />
                 
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Wishlist
                </div>
              </Link>

              {/* Shopping Cart */}
              <Link href="/cart" className="relative p-2 text-gray-600 hover:text-green-600 transition-colors group">
                <ShoppingCart className="w-5 h-5" />
               
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Cart
                </div>
              </Link>

              {/* Authentication */}
              <SignedOut>
                <div className="flex items-center gap-3">
                  <SignInButton mode="modal">
                    <button className="text-gray-600 hover:text-green-600 font-medium transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 shadow-md">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">
                      {user?.firstName || 'User'}
                    </p>
                    {isAdmin && (
                      <p className="text-xs text-purple-600 font-medium">Admin</p>
                    )}
                  </div>
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 rounded-full border-2 border-green-200 hover:border-green-400 transition-colors"
                      }
                    }}
                  />
                </div>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-green-600 transition-colors md:hidden"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Mobile Cart */}
              <Link href="/cart" className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-green-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="md:hidden mt-4 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Search className="w-4 h-4 text-gray-500 mr-3" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent outline-none text-sm flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-6">
              {/* Navigation Links */}
              <div className="space-y-4 mb-6">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-colors ${
                        pathname === link.href
                          ? "text-green-700 bg-green-50"
                          : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon && <link.icon className="w-5 h-5" />}
                      <span className="font-medium">{link.name}</span>
                    </Link>
                    
                    {/* Mobile Products Submenu */}
                    {link.hasDropdown && (
                      <div className="ml-4 mt-2 space-y-2">
                        {productCategories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="flex items-center gap-3 py-2 px-4 text-gray-600 hover:text-green-600 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span>{category.icon}</span>
                            <span className="text-sm">{category.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Admin Link - Mobile */}
                {isAdmin && (
                  <Link
                    href="/admin"
                    className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-colors ${
                      pathname === '/admin'
                        ? "text-purple-700 bg-purple-50"
                        : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Admin Panel</span>
                  </Link>
                )}
              </div>

              {/* Mobile Actions */}
              <div className="space-y-4 border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between">
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="w-5 h-5" />
                    <span>Wishlist ({wishlistItems})</span>
                  </Link>

                  <SignedIn>
                    <button className="relative text-gray-600 hover:text-green-600 transition-colors">
                      <Bell className="w-5 h-5" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        2
                      </span>
                    </button>
                  </SignedIn>
                </div>

                {/* Mobile Authentication */}
                <SignedOut>
                  <div className="space-y-3">
                    <SignInButton mode="modal">
                      <button className="w-full text-left py-3 px-4 text-gray-700 hover:text-green-600 font-medium transition-colors border border-gray-200 rounded-lg">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                        Create Account
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>

                <SignedIn>
                  <div className="flex items-center gap-3 py-3 px-4 bg-green-50 rounded-lg">
                    <UserButton afterSignOutUrl="/" />
                    <div>
                      <p className="font-medium text-gray-800">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                      {isAdmin && (
                        <p className="text-xs text-purple-600 font-medium">Admin User</p>
                      )}
                    </div>
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </nav>
 
     </>
  );
};

export default Navbar;