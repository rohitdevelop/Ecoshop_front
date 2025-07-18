 "use client";
import React, { useState } from "react";
import { Menu, LayoutDashboard, ShoppingCart, Boxes, Settings, LogOut } from "lucide-react";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-[92vh]">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-green-200 text-black transition-all duration-300 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700">
          <h1 className={`text-xl font-bold ${!isSidebarOpen && "hidden"}`}>Admin Panel</h1>
          <button onClick={toggleSidebar}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4 space-y-2 px-2">
          <SidebarItem icon={<LayoutDashboard />} label="Dashboard" isOpen={isSidebarOpen} />
          <SidebarItem icon={<Boxes />} label="Products" isOpen={isSidebarOpen} />
          <SidebarItem icon={<ShoppingCart />} label="Orders" isOpen={isSidebarOpen} />
          <SidebarItem icon={<Settings />} label="Settings" isOpen={isSidebarOpen} />
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-700">
          <SidebarItem icon={<LogOut />} label="Logout" isOpen={isSidebarOpen} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome to the Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card title="Total Products" value="40+" />
          <Card title="Orders Today" value="12" />
          <Card title="Active Categories" value="5" />
        </div>
      </div>
    </div>
  );
};

// Sidebar item component
const SidebarItem = ({ icon, label, isOpen }) => (
  <div className="flex items-center gap-4 px-3 py-2 hover:bg-white rounded cursor-pointer">
    {icon}
    {isOpen && <span>{label}</span>}
  </div>
);

// Reusable card component
const Card = ({ title, value }) => (
  <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
    <h3 className="text-gray-600 text-sm">{title}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);

export default AdminDashboard;
