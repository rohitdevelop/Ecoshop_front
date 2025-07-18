"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Footer from "@/components/Footer";
import "swiper/css";
import "swiper/css/navigation";

const Home = () => {
  const [favorites, setFavorites] = useState([]);

  const categories = [
    {
      id: 1,
      name: "Home & Kitchen",
      slug: "home",
      description: "Eco-friendly household essentials",
      products: [
        { id: 101, name: "Kitchen Towels", image: "https://via.placeholder.com/400x300" },
        { id: 102, name: "Compost Bin", image: "https://via.placeholder.com/400x300" },
        { id: 103, name: "Bamboo Utensils", image: "https://via.placeholder.com/400x300" },
        { id: 104, name: "Bamboo Utensils", image: "https://via.placeholder.com/400x300" },
      ],
    },
    {
      id: 2,
      name: "Personal & Body Care",
      slug: "bodycare",
      description: "Natural and reusable personal items",
      products: [
        { id: 201, name: "Bamboo Toothbrush", image: "https://via.placeholder.com/400x300" },
        { id: 202, name: "Organic Soap", image: "https://via.placeholder.com/400x300" },
        { id: 203, name: "Natural Shampoo Bar", image: "https://via.placeholder.com/400x300" },
        { id: 204, name: "Natural Shampoo Bar", image: "https://via.placeholder.com/400x300" },
      ],
    },
    {
      id: 3,
      name: "Eco-Friendly Gifting & Lifestyle",
      slug: "lifestyle",
      description: "Sustainable gifts and lifestyle products",
      products: [
        { id: 301, name: "Plantable Notebooks", image: "https://via.placeholder.com/400x300" },
        { id: 302, name: "Upcycled Bags", image: "https://via.placeholder.com/400x300" },
        { id: 303, name: "Coconut Bowl Gift Set", image: "https://via.placeholder.com/400x300" },
        { id: 304, name: "Coconut Bowl Gift Set", image: "https://via.placeholder.com/400x300" },
      ],
    },
    {
      id: 4,
      name: "Travel Essentials",
      slug: "travel essentials",
      description: "Sustainable and compact travel-friendly products",
      products: [
        { id: 401, name: "Steel Straws", image: "https://via.placeholder.com/400x300" },
        { id: 402, name: "Eco Travel Kit", image: "https://via.placeholder.com/400x300" },
        { id: 403, name: "Collapsible Bottles", image: "https://via.placeholder.com/400x300" },
        { id: 404, name: "Collapsible Bottles", image: "https://via.placeholder.com/400x300" },
      ],
    },
    {
      id: 5,
      name: "Kids & Baby Care",
      slug: "kids",
      description: "Safe and eco-conscious products for kids",
      products: [
        { id: 501, name: "Organic Baby Wipes", image: "https://via.placeholder.com/400x300" },
        { id: 502, name: "Cloth Diapers", image: "https://via.placeholder.com/400x300" },
        { id: 503, name: "Wooden Toys", image: "https://via.placeholder.com/400x300" },
        { id: 504, name: "Wooden Toys", image: "https://via.placeholder.com/400x300" },
      ],
    },
  ];

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Slider */}
     <div className="relative w-[90vw] max-w-7xl mx-auto h-[300px] sm:h-[400px] md:h-[500px]  pt-10 md:mt-0 flex justify-center items-center">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="w-full h-full"
        >
          <SwiperSlide>
            <img
              src="https://www.granddesignsmagazine.com/wp-content/uploads/2020/06/eco-friendly-kitchen-main-company.jpg"
              className="w-full h-full object-cover rounded-xl"
              alt="Eco-Friendly Kitchen"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://www.ecobasketindia.com/cdn/shop/files/Skin_Care_EB.png?v=1667908960&width=3840"
              className="w-full h-full object-cover rounded-xl"
              alt="Eco-Friendly Skin Care"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://cdn.prod.website-files.com/637b744b358cdaf264dbff82/6721f71ca7c82c886f10e1a4_eco-friendly-home-products-on-a-bamboo-leaf.webp"
              className="w-full h-full object-cover rounded-xl"
              alt="Eco-Friendly Products"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvm9wZ6rHteek7W-2G2jjCw9P1zdWpKraVFQ&usqp=CAU"
              className="w-full h-full object-cover rounded-xl"
              alt="Eco-Friendly Living"
            />
          </SwiperSlide>
        </Swiper>

        {/* Centered Text Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 text-white px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to EcoShop
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 max-w-2xl drop-shadow-md">
            Discover eco-friendly products for every part of your life — home,
            care, and gifting.
          </p>
          <Link
            href="/products"
            className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition-all shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-10">Explore Categories</h2>

        {categories.map((cat) => (
          <div key={cat.id} className="mb-14">
            <h3 className="text-2xl font-semibold text-green-700 mb-1">{cat.name}</h3>
            <p className="text-gray-600 mb-4">{cat.description}</p>

            <div className="flex overflow-x-auto gap-5 scrollbar-hide pb-3">
              {cat.products.map((prod) => (
                <div
                  key={prod.id}
                  className="min-w-[300px] bg-white rounded-xl border hover:shadow-lg transition-shadow shadow-md overflow-hidden"
                >
                  <img src={prod.image} alt={prod.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="font-semibold text-lg text-green-800">{prod.name}</h4>
                    <div className="flex justify-between items-center mt-3">
                      <Link
                        href={`/products?category=${encodeURIComponent(cat.slug)}`}
                        className="text-sm bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                      >
                        Explore
                      </Link>
                      <span
                        onClick={() => toggleFavorite(prod.id)}
                        className="cursor-pointer text-xl"
                        title="Add to favorites"
                      >
                        {favorites.includes(prod.id) ? "❤️" : "🤍"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-green-800 via-green-600 to-green-300 py-10 text-center rounded-2xl mx-4 md:mx-auto max-w-5xl mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Join the Eco Movement
        </h2>
        <p className="text-green-100 max-w-xl mx-auto mb-6">
          Reduce waste. Choose natural. Support sustainability with every purchase.
        </p>
        <img
          src="https://storage.googleapis.com/gweb-cloudblog-publish/original_images/19662_E_waste_ChromeOS_Flex_Blog_Header_01_1.gif"
          alt="eco banner"
          className="w-full max-w-md mx-auto rounded-xl mb-6 shadow-lg"
        />
        <Link
          href="/products"
          className="bg-yellow-400 text-green-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition"
        >
          🌿 Explore Now
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
