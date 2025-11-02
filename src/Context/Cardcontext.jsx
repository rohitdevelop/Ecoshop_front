"use client"

import { createContext, useContext, useState, useEffect } from "react";
import toast from 'react-hot-toast';

// 1. Context definition
// Renamed to CartContext for clarity, matching the intended hook name.
const CartContext = createContext(null);

// 2. Provider Component
// Renamed the component to CartProvider for clarity
const CartProvider = ({ children }) => {
    // State to hold cart items, including product details and quantity
    // Each item should look like: { id: ..., name: ..., price: ..., quantity: 1 }
    const [cart, setCart] = useState([]);

    // Load cart from localStorage on component mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('ecoShopCart'); // Use a consistent key
            if (stored) {
                setCart(JSON.parse(stored));
            }
        }
    }, []);

    // Save cart to localStorage whenever the cart state changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem("ecoShopCart", JSON.stringify(cart));
        }
    }, [cart]);

    // 3. Core Cart Functionality (Add to Cart)
    const addToCart = (product, quantity = 1) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);

            if (existingItemIndex > -1) {
                // Item exists: update quantity
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += quantity;
                toast.success(`Increased quantity of ${product.name} to ${newCart[existingItemIndex].quantity}!`);
                return newCart;
            } else {
                // Item is new: add to cart with quantity
                toast.success(`${product.name} added to cart!`);
                return [...prevCart, { ...product, quantity }];
            }
        });
    };
    
    // Optional: Function to remove an item entirely
    const removeFromCart = (productId) => {
        setCart(prevCart => {
            const itemToRemove = prevCart.find(item => item.id === productId);
            if (itemToRemove) {
                 toast.error(`${itemToRemove.name} removed from cart.`);
            }
            return prevCart.filter(item => item.id !== productId);
        });
    };


    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// 4. Custom Hook
// Correct export syntax and renamed to useCart
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// Export the Provider
export default CartProvider;