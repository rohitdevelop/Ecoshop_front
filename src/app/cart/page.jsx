"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/Context/Cardcontext";
import { XCircle, ChevronUp, ChevronDown, ShoppingCart, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- Constants for calculation (Adjust as needed) ---
const SHIPPING_RATE = 5.00;
const TAX_RATE = 0.08; // 8%

/**
 * CartPage Component
 * Displays the list of items in the cart and the order summary.
 */
export default function CartPage() {
  // IMPORTANT: Destructure all necessary functions and the cart state
  const { cart, updateQuantity, removeFromCart } = useCart();

  // ============================
  // CALCULATIONS (Memoized for performance)
  // ============================

  const { subtotal, taxAmount, grandTotal } = useMemo(() => {
    // 1. Calculate Subtotal
    const calculatedSubtotal = cart.reduce(
      (acc, item) => acc + (item.price * item.quantity),
      0
    );
    
    // 2. Calculate Tax
    const calculatedTax = calculatedSubtotal * TAX_RATE;
    
    // 3. Calculate Grand Total
    const calculatedGrandTotal = calculatedSubtotal + SHIPPING_RATE + calculatedTax;

    return {
      subtotal: calculatedSubtotal,
      taxAmount: calculatedTax,
      grandTotal: calculatedGrandTotal,
    };
  }, [cart]); // Recalculate only when the cart changes

  // ============================
  // HANDLERS
  // ============================

  const handleUpdateQuantity = (productId, newQuantity) => {
    // Ensure quantity is positive and use the context function
    if (newQuantity > 0 && updateQuantity) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    if (removeFromCart) {
      removeFromCart(productId);
    }
  };

  // ----------------------------------------------------
  // RENDER: Empty Cart State
  // ----------------------------------------------------

  if (cart.length === 0) {
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
                <Link href="/products" className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-md active:scale-95">
                    Start Shopping Now
                </Link>
            </div>
        </div>
        <Footer />
      </>
    );
  }

  // ----------------------------------------------------
  // RENDER: Full Cart State
  // ----------------------------------------------------

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-28 pb-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-8 border-b pb-4">
            Shopping Cart
          </h1>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* ============================
                CART ITEMS LIST (Left Column)
                ============================ */}
            <section aria-labelledby="cart-heading" className="lg:col-span-2">
              <ul className="divide-y divide-gray-200 border border-gray-200 rounded-xl bg-white shadow-lg">
                {cart.map((product) => (
                  <li key={product.id} className="flex py-6 px-4 sm:px-6">
                    {/* Product Image */}
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.images && product.images[0] ? product.images[0] : "/placeholder-image.jpg"}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link href={`/products/${product.id}`} className="hover:text-emerald-700 transition">
                              {product.name}
                            </Link>
                          </h3>
                          <p className="ml-4 text-lg font-semibold">${(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                            Category: {product.category || 'N/A'}
                        </p>
                      </div>

                      <div className="flex flex-1 items-end justify-between text-sm mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            {/* Decrease Button */}
                            <button
                                type="button"
                                onClick={() => handleUpdateQuantity(product.id, product.quantity - 1)}
                                disabled={product.quantity <= 1}
                                className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
                                aria-label="Decrease quantity"
                            >
                                <ChevronDown className="h-4 w-4" />
                            </button>

                            {/* Quantity Input/Display */}
                            <span className="w-10 text-center font-medium text-gray-700 border-x border-gray-300 py-1">
                                {product.quantity}
                            </span>
                            
                            {/* Increase Button */}
                            <button
                                type="button"
                                onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}
                                className="p-2 text-gray-600 hover:bg-gray-100 transition"
                                aria-label="Increase quantity"
                            >
                                <ChevronUp className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Remove Button */}
                        <div className="flex">
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
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* ============================
                ORDER SUMMARY (Right Column)
                ============================ */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 lg:mt-0 sticky top-28 h-fit"
            >
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
                <h2 id="summary-heading" className="text-xl font-bold text-gray-900 border-b pb-3 mb-4">
                  Order Summary
                </h2>

                <dl className="space-y-4">
                  <div className="flex items-center justify-between text-gray-600">
                    <dt className="text-base font-medium">Subtotal</dt>
                    <dd className="text-base">${subtotal.toFixed(2)}</dd>
                  </div>
                  
                  <div className="flex items-center justify-between border-t pt-4 text-gray-600">
                    <dt className="text-base font-medium">Shipping Estimate</dt>
                    <dd className="text-base">${SHIPPING_RATE.toFixed(2)}</dd>
                  </div>
                  
                  <div className="flex items-center justify-between border-t pt-4 text-gray-600">
                    <dt className="text-base font-medium">Tax Estimate ({TAX_RATE * 100}%)</dt>
                    <dd className="text-base">${taxAmount.toFixed(2)}</dd>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-300 pt-6">
                    <dt className="text-xl font-extrabold text-gray-900">Order Total</dt>
                    <dd className="text-xl font-extrabold text-emerald-600">${grandTotal.toFixed(2)}</dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 transition active:scale-[0.99]"
                    // NOTE: This button would typically redirect to the Next.js Checkout Page
                  >
                    Proceed to Checkout
                  </button>
                </div>
                
                <div className="mt-6 text-center text-sm">
                  <p className="text-gray-500">
                    or{' '}
                    <Link href="/products" className="font-medium text-emerald-600 hover:text-emerald-500">
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </p>
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