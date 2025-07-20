"use client";
import React from "react";
import Link from "next/link";
import { Leaf} from "lucide-react";
const Footer = () => {
  return (
   <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Leaf className="w-8 h-8 text-green-400" />
                <h3 className="text-2xl font-bold">EcoShop</h3>
              </div>
              <p className="text-gray-400">
                Your trusted partner for sustainable living. Making eco-friendly choices easier and more accessible.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Customer Care</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pinterest</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EcoShop. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;