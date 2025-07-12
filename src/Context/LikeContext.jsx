// src/Context/LikeContext.js
"use client";
import { createContext, useContext, useState } from "react";

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likedItems, setLikedItems] = useState([]);

  const toggleLike = (item) => {
    setLikedItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id) // remove
        : [...prev, item] // add
    );
  };

  return (
    <LikeContext.Provider value={{ likedItems, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = () => useContext(LikeContext);
