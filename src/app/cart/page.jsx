"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/Context/Cardcontext";
import { XCircle, ChevronUp, ChevronDown, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SHIPPING_RATE = 5.0;
const TAX_RATE = 0.08; // 8%

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [localCart, setLocalCart] = useState([]);

  // initialize localCart from context
  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  // ✅ Calculate totals
  const { subtotal, taxAmount, grandTotal } = useMemo(() => {
    const calculatedSubtotal = localCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const calculatedTax = calculatedSubtotal * TAX_RATE;
    const calculatedGrandTotal =
      calculatedSubtotal + SHIPPING_RATE + calculatedTax;

    return {
      subtotal: calculatedSubtotal,
      taxAmount: calculatedTax,
      grandTotal: calculatedGrandTotal,
    };
  }, [localCart]);

  // ✅ Increase / Decrease Quantity
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) return;

    const updatedCart = localCart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );

    setLocalCart(updatedCart);

    // optional: update global context too
    if (updateQuantity) updateQuantity(productId, newQuantity);
  };

  // ✅ Remove item
  const handleRemoveItem = (productId) => {
    const updatedCart = localCart.filter((item) => item.id !== productId);
    setLocalCart(updatedCart);

    if (removeFromCart) removeFromCart(productId);
  };

  // ✅ Empty cart case
  if (localCart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-28 pb-10 bg-gray-50 flex items-start justify-center">
          <div className="max-w-4xl w-full bg-white p-10 rounded-xl shadow-lg border border-gray-200 text-center">
            <ShoppingCart className="w-16 h-16 text-emerald-500 mx-auto mb-6 opacity-70" />
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              Your Cart is Empty
            </h1>
            <p className="text-lg text-gray-500 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-md active:scale-95"
            >
              Start Shopping Now
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ✅ Render full cart
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-28 pb-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-8 border-b pb-4">
            Shopping Cart
          </h1>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CART ITEMS */}
            <section className="lg:col-span-2">
              <ul className="divide-y divide-gray-200 border border-gray-200 rounded-xl bg-white shadow-lg">
                {localCart.map((product) => (
                  <li key={product.id} className="flex py-6 px-4 sm:px-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={
                          product.images && product.images[0]
                            ? product.images[0]
                            : "/placeholder-image.jpg"
                        }
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link
                              href={`/products/${product.id}`}
                              className="hover:text-emerald-700 transition"
                            >
                              {product.name}
                            </Link>
                          </h3>
                          <p className="ml-4 text-lg font-semibold">
                            ${(product.price * product.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Category: {product.category || "N/A"}
                        </p>
                      </div>

                      <div className="flex flex-1 items-end justify-between text-sm mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateQuantity(
                                product.id,
                                product.quantity - 1
                              )
                            }
                            disabled={product.quantity <= 1}
                            className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </button>

                          <span className="w-10 text-center font-medium text-gray-700 border-x border-gray-300 py-1">
                            {product.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateQuantity(
                                product.id,
                                product.quantity + 1
                              )
                            }
                            className="p-2 text-gray-600 hover:bg-gray-100 transition"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(product.id)}
                          className="flex items-center font-medium text-red-600 hover:text-red-800 transition-colors"
                        >
                          <XCircle className="h-5 w-5 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* ORDER SUMMARY */}
            <section className="mt-16 lg:mt-0 sticky top-28 h-fit">
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 border-b pb-3 mb-4">
                  Order Summary
                </h2>

                <dl className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <dt>Subtotal</dt>
                    <dd>${subtotal.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between border-t pt-4 text-gray-600">
                    <dt>Shipping</dt>
                    <dd>${SHIPPING_RATE.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between border-t pt-4 text-gray-600">
                    <dt>Tax ({TAX_RATE * 100}%)</dt>
                    <dd>${taxAmount.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between border-t pt-6">
                    <dt className="text-xl font-extrabold text-gray-900">
                      Total
                    </dt>
                    <dd className="text-xl font-extrabold text-emerald-600">
                      ${grandTotal.toFixed(2)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <button className="w-full flex items-center justify-center rounded-md bg-emerald-600 px-4 py-3 text-base font-medium text-white hover:bg-emerald-700 transition active:scale-[0.99]">
                    Proceed to Checkout
                  </button>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                  or{" "}
                  <Link
                    href="/products"
                    className="font-medium text-emerald-600 hover:text-emerald-500"
                  >
                    Continue Shopping →
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
