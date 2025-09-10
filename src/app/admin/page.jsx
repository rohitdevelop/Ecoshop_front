"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Menu,
  LayoutDashboard,
  Boxes,
  LogOut,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  DollarSign,
  TrendingUp,
} from "lucide-react";

// Helper: handle both MongoDB's _id and simple id
const getId = (p) => (p && (p._id ?? p.id));

const sampleProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99.99,
    stock: 25,
    status: "Active",
    image: "🎧",
    description: "High-quality wireless headphones with noise cancellation",
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Sports",
    price: 129.99,
    stock: 15,
    status: "Active",
    image: "👟",
    description: "Comfortable running shoes for daily workouts",
  },
  {
    id: 3,
    name: "Coffee Maker",
    category: "Kitchen",
    price: 199.99,
    stock: 8,
    status: "Active",
    image: "☕",
    description: "Premium coffee maker with programmable settings",
  },
  {
    id: 4,
    name: "Yoga Mat",
    category: "Sports",
    price: 29.99,
    stock: 0,
    status: "Out of Stock",
    image: "🧘",
    description: "Non-slip yoga mat for all types of exercises",
  },
];

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "Active",
    image: "",
    description: "",
  });

  const categories = ["Electronics", "Sports", "Kitchen", "Fashion", "Books"];

  useEffect(() => {
    // Try to fetch from backend; fall back to sampleProducts if fetch fails
    const load = async () => {
      try {
        const res = await fetch("/api/products"); // adjust path if needed
        if (!res.ok) throw new Error("Network response not ok");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.warn("Failed to load products from backend, using sample data:", err.message);
        setProducts(sampleProducts);
      }
    };
    load();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const filteredProducts = products.filter((product) => {
    const name = (product.name || "").toLowerCase();
    const category = (product.category || "").toLowerCase();
    const q = searchTerm.toLowerCase();
    const matchesSearch = name.includes(q) || category.includes(q);
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openModal = (type, product = null) => {
    setModalType(type);
    setSelectedProduct(product);
    if (product && type !== "view") {
      // convert numeric fields to string to bind to inputs
      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: String(product.price ?? ""),
        stock: String(product.stock ?? ""),
        status: product.status || "Active",
        image: product.image || "",
        description: product.description || "",
      });
    } else if (type === "add") {
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        status: "Active",
        image: "",
        description: "",
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      status: "Active",
      image: "",
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock) || 0,
    };

    try {
      if (modalType === "add") {
        await fetch(`/api/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else if (modalType === "edit" && selectedProduct) {
        const id = getId(selectedProduct);
        await fetch(`/api/products/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      // reload list
      const res = await fetch(`/api/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } else {
        // if backend isn't available, update client-side state optimistically
        if (modalType === "add") {
          setProducts((prev) => [
            ...prev,
            { ...payload, id: prev.length + 1 },
          ]);
        } else if (modalType === "edit" && selectedProduct) {
          setProducts((prev) =>
            prev.map((p) => (getId(p) === getId(selectedProduct) ? { ...payload, id: getId(selectedProduct) } : p))
          );
        }
      }
    } catch (err) {
      console.error("Failed to save product:", err);
    }

    closeModal();
  };

  const deleteProduct = async (idOrProduct) => {
    const id = typeof idOrProduct === "object" ? getId(idOrProduct) : idOrProduct;
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => getId(p) !== id));
      } else {
        // fallback: remove from local state
        setProducts((prev) => prev.filter((p) => getId(p) !== id));
      }
    } catch (err) {
      console.warn("Delete failed, removing locally:", err.message);
      setProducts((prev) => prev.filter((p) => getId(p) !== id));
    }
  };

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter((p) => p.status === "Active").length,
    outOfStock: products.filter((p) => (p.stock ?? 0) === 0).length,
    totalValue: products.reduce((sum, p) => sum + (p.price ?? 0) * (p.stock ?? 0), 0),
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-gray-50 mt-20">
        {/* Sidebar */}
        <div
          className={`${isSidebarOpen ? "w-64" : "w-16"} bg-white shadow-lg transition-all duration-300 flex flex-col relative z-20`}
        >
          <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
            <h1 className={`text-xl font-bold text-gray-800 ${!isSidebarOpen && "hidden"}`}>
              Admin Panel
            </h1>
            <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 mt-4 space-y-1 px-2">
            <SidebarItem
              icon={<LayoutDashboard />}
              label="Dashboard"
              isOpen={isSidebarOpen}
              isActive={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <SidebarItem
              icon={<Boxes />}
              label="Products"
              isOpen={isSidebarOpen}
              isActive={activeTab === "products"}
              onClick={() => setActiveTab("products")}
            />
          </nav>

          <div className="px-4 py-4 border-t border-gray-200">
            <SidebarItem icon={<LogOut />} label="Logout" isOpen={isSidebarOpen} />
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-4 lg:p-6">
            {activeTab === "dashboard" && <DashboardContent stats={stats} products={products} />}

            {activeTab === "products" && (
              <ProductsContent
                products={filteredProducts}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
                openModal={openModal}
                deleteProduct={deleteProduct}
              />
            )}
          </div>
        </div>

        {showModal && (
          <Modal
            type={modalType}
            product={selectedProduct}
            formData={formData}
            setFormData={setFormData}
            categories={categories}
            onSubmit={handleSubmit}
            onClose={closeModal}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, label, isOpen, isActive, onClick }) => (
  <div
    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
      isActive ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600" : "text-gray-700 hover:bg-gray-100"
    }`}
    onClick={onClick ?? (() => {})}
  >
    <div className="w-5 h-5 flex-shrink-0">{icon}</div>
    {isOpen && <span className="font-medium">{label}</span>}
  </div>
);

// Dashboard Content
const DashboardContent = ({ stats, products }) => (
  <div>
    <div className="mb-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
      <StatCard title="Total Products" value={stats.totalProducts} icon={<Boxes className="w-6 h-6" />} color="blue" />
      <StatCard title="Active Products" value={stats.activeProducts} icon={<TrendingUp className="w-6 h-6" />} color="green" />
      <StatCard title="Out of Stock" value={stats.outOfStock} icon={<Eye className="w-6 h-6" />} color="red" />
      <StatCard title="Total Value" value={`$${stats.totalValue.toFixed(2)}`} icon={<DollarSign className="w-6 h-6" />} color="purple" />
    </div>

    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Products</h3>
      <div className="space-y-4">
        {products.slice(0, 3).map((product) => (
          <div key={getId(product) ?? product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{product.image}</span>
              <div>
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">${product.price}</p>
              <p className="text-sm text-gray-600">{product.stock} in stock</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Products Content
const ProductsContent = ({ products, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories, openModal, deleteProduct }) => (
  <div>
    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">Manage your product inventory</p>
      </div>
      <button onClick={() => openModal("add")} className="mt-4 lg:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
        <Plus className="w-4 h-4" />
        Add Product
      </button>
    </div>

    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={getId(product) ?? product.id} product={product} onView={() => openModal("view", product)} onEdit={() => openModal("edit", product)} onDelete={() => deleteProduct(product)} />
      ))}
    </div>

    {products.length === 0 && (
      <div className="text-center py-12">
        <Boxes className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your search or filters</p>
      </div>
    )}
  </div>
);

// Product Card
const ProductCard = ({ product, onView, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <div className="p-4">
      <div className="text-center mb-4">
        <span className="text-4xl">{product.image}</span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
      <div className="flex justify-between items-center mb-3">
        <span className="text-lg font-bold text-gray-900">${product.price}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {product.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-4">Stock: {product.stock}</p>

      <div className="flex gap-2">
        <button onClick={onView} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"><Eye className="w-4 h-4" /></button>
        <button onClick={onEdit} className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"><Edit className="w-4 h-4" /></button>
        <button onClick={onDelete} className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"><Trash2 className="w-4 h-4" /></button>
      </div>
    </div>
  </div>
);

// Modal Component
const Modal = ({ type, product, formData, setFormData, categories, onSubmit, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between p-6 border-b">
        <h3 className="text-lg font-semibold text-gray-900">{type === "add" ? "Add Product" : type === "edit" ? "Edit Product" : "Product Details"}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
      </div>

      {type === "view" ? (
        <div className="p-6">
          <div className="text-center mb-4">
            <span className="text-6xl">{product?.image}</span>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <p className="text-gray-900">{product?.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <p className="text-gray-900">{product?.category}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Price</label>
              <p className="text-gray-900">${product?.price}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Stock</label>
              <p className="text-gray-900">{product?.stock}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <p className="text-gray-900">{product?.status}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <p className="text-gray-900">{product?.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select category</option>
                {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="3" />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"><Save className="w-4 h-4" />{type === "add" ? "Add Product" : "Save Changes"}</button>
          </div>
        </form>
      )}
    </div>
  </div>
);

// Stat Card
const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4">
      <div className={`p-3 rounded-lg ${colorClasses[color] || colorClasses.blue}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
