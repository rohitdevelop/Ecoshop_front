"use client";
import { useEffect, useState } from "react";

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

  const fetchProducts = () => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:4000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ title: "", description: "", price: "", category: "", image: "", stock: "" });
    fetchProducts();
  };

  // Delete product
  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
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
        <button className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Add Product
        </button>
      </form>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {products.map((p) => (
          <div key={p._id} className="border rounded-lg p-4 shadow">
            <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded" />
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
