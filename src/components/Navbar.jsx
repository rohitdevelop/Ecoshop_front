"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiHeart, FiShoppingCart, FiSettings } from "react-icons/fi";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Rohit = usePathname();
  const { user } = useUser();

  // Check if user is admin (you can customize this logic)
  const isAdmin = user?.publicMetadata?.role === 'admin' || 
                  user?.primaryEmailAddress?.emailAddress === 'rohitdev124421@gmail.com';

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3 md:px-8">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-700">
          EcoShop
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              href={link.href}
              isActive={Rohit === link.href}
            >
              {link.name}
            </NavLink>
          ))}
          
          {/* Admin Link - Only visible to admin users */}
          {isAdmin && (
            <NavLink
              href="/admin"
              isActive={Rohit === '/admin'}
            >
              <div className="flex items-center">
                <FiSettings className="mr-1" size={16} />
                Admin
              </div>
            </NavLink>
          )}
        </div>

        {/* Right Side - Icons and Auth */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/wishlist"
            className="text-green-700 hover:text-green-900 text-xl"
          >
            <FiHeart />
          </Link>
          <Link
            href="/cart"
            className="text-green-700 hover:text-green-900 text-xl"
          >
            <FiShoppingCart />
          </Link>

          <SignedOut>
            <Link href="/login">
              <button className="text-green-700 font-medium hover:underline">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-all">
                Sign Up
              </button>
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-green-700 md:hidden text-2xl"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col items-center py-4 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                href={link.href}
                isActive={Rohit === link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

            {/* Admin Link - Mobile */}
            {isAdmin && (
              <NavLink
                href="/admin"
                isActive={Rohit === '/admin'}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <FiSettings className="mr-1" size={16} />
                  Admin Panel
                </div>
              </NavLink>
            )}

            <div className="flex gap-4 items-center">
              <Link href="/wishlist" className="text-xl">
                ❤️ Wishlist
              </Link>
              <Link href="/cart" className="text-xl">
                🛒 Cart
              </Link>
            </div>

            <SignedOut>
              <Link href="/login">
                <button className="text-green-700 font-medium hover:underline">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-all">
                  Sign Up
                </button>
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
              <p className="text-sm text-gray-700">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
              {isAdmin && (
                <p className="text-xs text-green-600 font-medium">Admin User</p>
              )}
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ href, children, isActive, onClick }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-base font-medium ${
        isActive
          ? "text-green-700 underline"
          : "text-gray-600 hover:text-green-700"
      } transition-all`}
    >
      {children}
    </Link>
  );
};

export default Navbar;