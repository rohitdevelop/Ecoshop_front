// src/app/layout.js
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { WishlistProvider } from "@/Context/WishlistContext";
import  CartProvider from "@/Context/Cardcontext.jsx";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "EcoShop",
  description: "Eco-Friendly E-Commerce Website",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
 
<html lang="en">
    <body className="antialiased">
       
        <CartProvider>
            <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
        <Toaster position="top-right" reverseOrder={false} />
    </body>
</html>
    </ClerkProvider>
  );
}
