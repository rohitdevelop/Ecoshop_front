"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaUser, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Mock login state
  const isLoggedIn = false;
  const userName = "Rohit";

  return (
    <nav className="bg-gradient-to-r from-green-800 to-green-600 shadow-md py-2 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="text-white text-2xl font-bold tracking-wider">
          EcoShop
        </Link>

        {/* Center Nav */}
        <div className="hidden md:flex space-x-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/Products">Products</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>

        {/* Right side icons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/wishlist" className="text-white hover:text-yellow-400 text-xl">
            <FiHeart />
          </Link>
          <Link href="/cart" className="text-white hover:text-yellow-400 text-xl">
            <FiShoppingCart />
          </Link>

          {!isLoggedIn ? (
            <>
              <Link href="/login">
                <button className="flex items-center gap-1 border border-white text-white px-3 py-1 rounded hover:bg-white hover:text-green-800 transition-all">
                  <FaUser /> Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="flex items-center gap-1 bg-yellow-400 text-green-800 px-3 py-1 rounded hover:bg-yellow-500 transition-all">
                  <FaUserPlus /> Sign Up
                </button>
              </Link>
            </>
          ) : (
            <div className="text-white font-semibold">👤 {userName}</div>
          )}
        </div>

        {/* Mobile Icon */}
        <div className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-green-700 text-white py-4 space-y-4 transition-all">
          <NavLink href="/" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink href="/Products" onClick={() => setIsOpen(false)}>Products</NavLink>
          <NavLink href="/about" onClick={() => setIsOpen(false)}>About</NavLink>
          <NavLink href="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
          <Link href="/wishlist" onClick={() => setIsOpen(false)} className="text-lg">❤️ Wishlist</Link>
          <Link href="/cart" onClick={() => setIsOpen(false)} className="text-lg">🛒 Cart</Link>

          {!isLoggedIn ? (
            <>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <button className="border border-white px-4 py-1 rounded">Login</button>
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)}>
                <button className="bg-yellow-400 px-4 py-1 rounded text-green-800 font-semibold">Sign Up</button>
              </Link>
            </>
          ) : (
            <div className="text-white font-semibold">👤 {userName}</div>
          )}
        </div>
      )}
    </nav>
  );
};

// ✅ Animated NavLink Component
const NavLink = ({ href, children, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative group font-medium pb-1 ${
        isActive ? "text-yellow-400" : "text-white"
      }`}
    >
      {children}
      <span
        className={`absolute left-0 -bottom-1 h-[2px] w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
          isActive ? "bg-yellow-400 scale-x-100" : "bg-white"
        }`}
      />
    </Link>
  );
};

export default Navbar;
