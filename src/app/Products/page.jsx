"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/api"; // Axios setup
import ProductsCards from "@/components/ProductsCards";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => {
      setProducts(res.data.data);
    });
  }, []);

  return (
    <>
    
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        All Products
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductsCards key={product._id} product={product} />
        ))}
      </div>
    </div>
          </>
  );
};

export default Products;
