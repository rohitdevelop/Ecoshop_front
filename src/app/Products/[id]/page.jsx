"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams(); // get product ID from URL
  const [product, setProduct] = useState(null);//http://localhost:4000/
  const [address, setAddress] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:4000/api/products/${id}`)
      .then((res) => setProduct(res.data.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleBuy = () => {
    if (!address.trim()) return alert("Please enter your address.");
    // Handle payment or order logic
    alert("Order placed successfully!");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <img
          src={product.productImage}
          alt={product.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h1 className="text-3xl font-bold text-green-800">{product.title}</h1>
        <p className="text-lg text-gray-700 my-2">{product.description}</p>
        <p className="text-xl font-semibold text-green-600">{product.price} Rs</p>

        <div className="mt-6">
          <label className="block font-semibold mb-1">Delivery Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            rows={3}
            placeholder="Enter your address..."
          />
          <button
            onClick={handleBuy}
            className="mt-4 bg-green-700 text-white px-5 py-2 rounded hover:bg-green-800 transition-all"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
