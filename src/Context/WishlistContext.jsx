"use client";
import { createContext, useContext, useState, useEffect } from "react";
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (item) => {
    setWishlist((prev) => {
      if (prev.some((i) => i.id === item.id)) {
        // Remove item
        toast.error(`${item.name} removed from Wishlist`);
        // alert(`${item.name} removed from Wishlist`);
        return prev.filter((i) => i.id !== item.id);
      } else {
        // Add item
                toast.success(`${item.name} added to Wishlist`);

        // alert(`${item.name} added to Wishlist`);
        return [...prev, item];
      }
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
