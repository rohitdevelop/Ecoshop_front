"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const API = "http://localhost:4000/api/products"; // backend base URL

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API, form);
      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
      });
      fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>

      {/* Add Product Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-4">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            type="text"
            placeholder={key}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="border rounded p-2"
          />
        ))}
        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {products.map((p) => (
          <div key={p._id} className="border rounded-lg p-4 shadow">
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="font-bold mt-2">{p.title}</h2>
            <p className="text-gray-600">{p.category}</p>
            <p className="text-green-600 font-semibold">₹{p.price}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
              {/* Update button can open a modal with pre-filled form */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
