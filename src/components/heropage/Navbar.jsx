'use client';
import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUser, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-green-800 to-green-600 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-white text-3xl font-bold tracking-wide">
          <Link href="/">EcoShop</Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/menu">Menu</NavLink>

          <Link href="/shineup">
            <button className="flex items-center gap-2 bg-yellow-400 text-green-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300">
              <FaUserPlus /> Sign Up
            </button>
          </Link>

          <Link href="/login">
            <button className="flex items-center gap-2 border border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-green-800 transition-all duration-300">
              <FaUser /> Login
            </button>
          </Link>

          <NavLink href="/card">
            <button className="bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition">
              🛒 Cart
            </button>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white text-3xl">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-700 text-white flex flex-col items-center py-4 space-y-4 transition-all duration-300">
          <NavLink href="/" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink href="/menu" onClick={() => setIsOpen(false)}>Menu</NavLink>

          <Link href="/shineup" onClick={() => setIsOpen(false)}>
            <button className="flex items-center gap-2 bg-yellow-400 text-green-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500">
              <FaUserPlus /> Sign Up
            </button>
          </Link>

          <Link href="/login" onClick={() => setIsOpen(false)}>
            <button className="flex items-center gap-2 border border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-green-800">
              <FaUser /> Login
            </button>
          </Link>

          <NavLink href="/card" onClick={() => setIsOpen(false)}>
            <button className="bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400">
              🛒 Cart
            </button>
          </NavLink>
        </div>
      )}
    </nav>
  );
};

// Reusable NavLink
const NavLink = ({ href, children, onClick }) => (
  <Link href={href} onClick={onClick} className="text-white text-lg font-medium hover:text-yellow-300">
    {children}
  </Link>
);

export default Navbar;
