"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWishlist } from "@/Context/WishlistContext";
import {
  Heart,
  ShoppingCart,
  Menu,
  X,
  Settings,
  Leaf,
  ChevronDown,
  Phone,
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
  const { wishlist } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  // Check if user is admin
  const isAdmin =
    user?.publicMetadata?.role === "admin" ||
    user?.primaryEmailAddress?.emailAddress === "rohitdev124421@gmail.com";

  const navLinks = [
    { name: "Home", href: "/", icon: null },
    { name: "Products", href: "/products", icon: null, hasDropdown: true },
    { name: "About", href: "/about", icon: null },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  // Mock counters
  const cartItems = 3;
  const wishlistItems = 5;

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-green-600" />
          <div>
            <h1 className="text-2xl font-bold text-green-800">EcoShop</h1>
            <p className="text-xs text-green-600 -mt-1">Sustainable Living</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition ${
                pathname === link.href
                  ? "text-green-700 bg-green-50"
                  : "text-gray-700 hover:text-green-700 hover:bg-green-50"
              }`}
            >
              {link.icon && <link.icon className="w-4 h-4" />}
              {link.name}
              {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
            </Link>
          ))}

          {/* Admin Link */}
          {isAdmin && (
            <Link
              href="/admin"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition ${
                pathname === "/admin"
                  ? "text-purple-700 bg-purple-50"
                  : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
              }`}
            >
              <Settings className="w-4 h-4" />
              Admin Panel
            </Link>
          )}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/wishlist"
            className="relative p-2 text-gray-600 hover:text-red-500"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2 text-gray-600 hover:text-green-600"
          >
            <ShoppingCart className="w-5 h-5" />
            {/* replace with cart.length if you have cart context */}
            {/* {cart.length > 0 && ( */}
            {0 > 0 && ( // temporary (replace with real cart)
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {0}
              </span>
            )}
          </Link>

          {/* Auth */}
          <SignedOut>
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <button className="text-gray-600 hover:text-green-600 font-medium">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-gray-800">
                {user?.firstName || "User"}
              </p>
              {isAdmin && (
                <p className="text-xs text-purple-600 font-medium">Admin</p>
              )}
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>

        {/* Mobile Right Side (Wishlist + Cart + Menu) */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative p-2 text-gray-600 hover:text-red-500"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2 text-gray-600 hover:text-green-600"
          >
            <ShoppingCart className="w-5 h-5" />
            {0 > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {0}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 hover:text-green-600"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-md">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg ${
                  pathname === link.href
                    ? "text-green-700 bg-green-50"
                    : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Admin Link */}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg ${
                  pathname === "/admin"
                    ? "text-purple-700 bg-purple-50"
                    : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                }`}
              >
                Admin Panel
              </Link>
            )}

            {/* Auth */}
            <SignedOut>
              <div className="space-y-2">
                <SignInButton mode="modal">
                  <button className="w-full text-left px-4 py-2 border rounded-lg hover:text-green-600">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    Create Account
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-3 px-4 py-3 bg-green-50 rounded-lg">
                <UserButton afterSignOutUrl="/" />
                <div>
                  <p className="font-medium text-gray-800">
                    {user?.firstName} {user?.lastName}
                  </p>
                  {isAdmin && (
                    <p className="text-xs text-purple-600 font-medium">
                      Admin User
                    </p>
                  )}
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
