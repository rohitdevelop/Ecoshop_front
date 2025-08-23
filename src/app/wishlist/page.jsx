"use client";
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/Context/WishlistContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Heart, ShoppingBag, X } from "lucide-react";

const Wishlist = () => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/signup");
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {user?.firstName}'s Wishlist
            </h1>
            <p className="text-gray-600">Your favorite items, saved for later</p>
          </div>

          {wishlist.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart size={40} className="text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Start adding items you love to see them here
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="bg-gradient-to-r from-green-500 to-green-200 text-black px-6 py-3 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-200 font-medium"
                >
                  Start Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Wishlist Items */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                    >
                      <Heart size={18} className="text-red-500 fill-red-500" />
                    </button>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-2xl font-bold text-green-600 mb-2">
                      ${item.price}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                      {item.description}
                    </p>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gradient-to-r from-green-500 to-green-500 text-white py-2.5 px-4 rounded-xl hover:bg-green-700 transition-all duration-200 font-medium flex items-center justify-center gap-2">
                        <ShoppingBag size={16} />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => toggleWishlist(item)}
                        className="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500 p-2.5 rounded-xl transition-all duration-200 hover:shadow-md"
                        title="Remove from wishlist"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Items Count */}
          {wishlist.length > 0 && (
            <div className="text-center mt-8">
              <p className="text-gray-600">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;