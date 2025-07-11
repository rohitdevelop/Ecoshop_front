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
    slug: "home", // matches with 'home' in your /products page
    description: "Eco-friendly household essentials",
    products: [
      { id: 101, name: "Kitchen Towels", image: "https://via.placeholder.com/400x300" },
      { id: 102, name: "Compost Bin", image: "https://via.placeholder.com/400x300" },
      { id: 103, name: "Bamboo Utensils", image: "https://via.placeholder.com/400x300" },
    ],
  },
  {
    id: 2,
    name: "Personal & Body Care",
    slug: "bodycare", // exact match with your products page category
    description: "Natural and reusable personal items",
    products: [
      { id: 201, name: "Bamboo Toothbrush", image: "https://via.placeholder.com/400x300" },
      { id: 202, name: "Organic Soap", image: "https://via.placeholder.com/400x300" },
      { id: 203, name: "Natural Shampoo Bar", image: "https://via.placeholder.com/400x300" },
    ],
  },
  {
    id: 3,
    name: "Eco-Friendly Gifting & Lifestyle",
    slug: "lifestyle", // matches with products page
    description: "Sustainable gifts and lifestyle products",
    products: [
      { id: 301, name: "Plantable Notebooks", image: "https://via.placeholder.com/400x300" },
      { id: 302, name: "Upcycled Bags", image: "https://via.placeholder.com/400x300" },
      { id: 303, name: "Coconut Bowl Gift Set", image: "https://via.placeholder.com/400x300" },
    ],
  },
  {
    id: 4,
    name: "Travel Essentials",
    slug: "travel essentials", // already working correctly
    description: "Sustainable and compact travel-friendly products",
    products: [
      { id: 401, name: "Steel Straws", image: "https://via.placeholder.com/400x300" },
      { id: 402, name: "Eco Travel Kit", image: "https://via.placeholder.com/400x300" },
      { id: 403, name: "Collapsible Bottles", image: "https://via.placeholder.com/400x300" },
    ],
  },
  {
    id: 5,
    name: "Kids & Baby Care",
    slug: "kids", // exact match with product page
    description: "Safe and eco-conscious products for kids",
    products: [
      { id: 501, name: "Organic Baby Wipes", image: "https://via.placeholder.com/400x300" },
      { id: 502, name: "Cloth Diapers", image: "https://via.placeholder.com/400x300" },
      { id: 503, name: "Wooden Toys", image: "https://via.placeholder.com/400x300" },
    ],
  },
];


  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="relative w-[90vw] max-w-7xl mx-auto h-[300px] sm:h-[400px] md:h-[500px]  pt-10 mt-16 md:mt-0 flex justify-center items-center">
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

      {/* Categories Section */}
      <div className="container mx-auto px-6 pt-5">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-center text-green-800 capitalize">
            Explore Our Categories
          </h1>
        </div>
        {categories.map((category) => (
          <div key={category.id} className="mb-20">
            <h2 className="text-3xl font-bold text-green-700 mb-2">
              {category.name}
            </h2>
            <p className="text-lg text-gray-600 mb-6">{category.description}</p>

            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex justify-around items-center gap-16 w-max">
                {category.products.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-[365px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-green-800 mb-2">
                        {product.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <Link
                           href={`/products?category=${encodeURIComponent(category.slug)}`}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all"
                        >
                          Explore Now
                        </Link>
                        <p
                          onClick={() => toggleFavorite(product.id)}
                          className="cursor-pointer text-2xl"
                          style={{
                            color: favorites.includes(product.id)
                              ? "red"
                              : "gray",
                          }}
                        >
                          {favorites.includes(product.id) ? "❤️" : "🤍"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        {/* CTA Section */}
        <div className="bg-gradient-to-br from-green-800 via-green-600 to-green-300 py-5 mb-5 text-center rounded-2xl">
          <div className="max-w-xl mx-auto flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
              Join the Eco-Friendly Movement
            </h2>
            <p className="text-base sm:text-lg text-green-100 mb-6 leading-relaxed">
              Explore sustainable, reusable, and natural products for everyday
              life.
            </p>

            <img
              src="https://storage.googleapis.com/gweb-cloudblog-publish/original_images/19662_E_waste_ChromeOS_Flex_Blog_Header_01_1.gif"
              alt="Eco Movement"
              className="w-full max-w-md rounded-lg shadow-md mb-6"
            />

            <Link
              href="/products"
              className="inline-block bg-yellow-400 text-green-900 px-6 py-3 rounded-full font-semibold text-base hover:bg-yellow-500 hover:scale-105 transition-all duration-300 shadow-md"
            >
              🌿 Explore Products
            </Link>
          </div>
        </div>
      </div>
      <footer>
        <div className="">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default Home;