"use client";
import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useLike } from "@/Context/LikeContext"; // ✅ make sure path is correct

const Wishlist = () => {
  const { likedItems } = useLike();

  return (
    <div>
      <Navbar />
      <div className="p-8 min-h-screen">
        <h2 className="text-3xl font-bold mb-4">❤️ Your Wishlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {likedItems.length === 0 ? (
            <p className="text-gray-500 italic">No items in wishlist.</p>
          ) : (
            likedItems.map((item) => (
              <div key={item.id} className="border p-4 rounded shadow">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-2 font-semibold">{item.name}</h3>
                <p className="text-green-700 font-medium">{item.price}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
