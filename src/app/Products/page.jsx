"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

 function Products() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <>
    <Navbar/>
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover rounded-xl"
      />
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-600">{product.category}</p>
      <p className="text-green-600 text-xl font-semibold">₹{product.price}</p>
      <p className="mt-2">{product.description}</p>
      <p className="mt-2">Stock: {product.stock}</p>
    </div>
    <Footer />
          </>
  );
};

export default Products;
