"use client";
import React from "react";
import Category1 from "@/components/home/CatergoryCard/Category1";
import Category2 from "@/components/home/CatergoryCard/Category2";
import Category3 from "@/components/home/CatergoryCard/Category3";
import { Star } from "lucide-react";
import Image from "next/image";

const ratings = [
  {
    id: 1,
    name: "Eco Shopper",
    feedback: "Amazing eco-friendly products, really high quality and sustainable!",
    image:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=200&h=200&fit=crop",
    stars: 5,
  },
  {
    id: 2,
    name: "Nature Lover",
    feedback: "Love the compost bin! No smell and helps reduce waste at home.",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
    stars: 4,
  },
  {
    id: 3,
    name: "Eco Warrior",
    feedback: "The bamboo set is perfect for travel. Lightweight and reusable!",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop",
    stars: 5,
  },
  {
    id: 4,
    name: "Green Family",
    feedback: "Organic products are safe for my kids and the planet 🌍",
    image:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&h=200&fit=crop",
    stars: 5,
  },
];


const Cardhome = () => {
  return (
    <>
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Explore Our Collections
          </h2>

          <Category1 />
          <Category2 />
          <Category3 />
        </div>
      </section>









       <section className="relative h-[70vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=900&fit=crop')",
          }}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Text Content */}
        <div className="relative z-10 text-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to Our Eco-Friendly Store
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
            Sustainable shopping for a better tomorrow 🌱
          </p>
        </div>
      </section>







      {/* Ratings Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
            What Our Customers Say
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {ratings.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition"
              >
                {/* User Image */}
                <div className="w-20 h-20 relative rounded-full overflow-hidden mb-4">
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Stars */}
                <div className="flex justify-center mb-3">
                  {[...Array(r.stars)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-gray-600 text-sm mb-3">"{r.feedback}"</p>
                <h4 className="font-semibold text-gray-800">{r.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cardhome;
