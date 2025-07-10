"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/heropage/Navbar";

const Products = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const categoriesList = [
    "skincare",
    "makeup",
    "haircare",
    "bodycare",
    "home",
    "lifestyle",
    "travel essentials",
    "kids",
  ];

  const categories = ["all", ...categoriesList];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const router = useRouter();

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    router.push(`/Products?category=${encodeURIComponent(cat)}`);
  };

  // Set selected category from URL
  useEffect(() => {
    if (categoryParam && categoriesList.includes(categoryParam.toLowerCase())) {
      setSelectedCategory(categoryParam.toLowerCase());
    }
  }, [categoryParam]);

  // Mock product list
  const products = categoriesList.flatMap((category, catIndex) =>
    Array.from({ length: 8 }, (_, i) => ({
      id: `${category}-${i + 1}`,
      name: `${category.charAt(0).toUpperCase() + category.slice(1)} Product ${
        i + 1
      }`,
      category,
      price: `$${(10 + i * 2).toFixed(2)}`,
      image: `https://via.placeholder.com/400x300?text=${encodeURIComponent(
        category
      )}+${i + 1}`,
    }))
  );

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      <Navbar />
      <div className="bg-white text-gray-800 py-12 px-4 sm:px-6 overflow-x-hidden pt-24">
        {/* Title */}
        <h1 className="text-4xl font-bold text-green-900 text-center mb-8">
          Our Beauty Products
        </h1>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded-full font-semibold transition-all text-sm sm:text-base ${
                selectedCategory === cat
                  ? "bg-yellow-400 text-green-900"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-green-900">
                    {product.name}
                  </h3>
                  <p className="text-green-700 mb-4">{product.price}</p>
                </div>
                <div className="mt-auto flex flex-col gap-2">
                  <button className="bg-yellow-400 text-green-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-all">
                    Add to Cart
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
