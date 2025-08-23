// src/app/layout.js
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { WishlistProvider } from "@/Context/WishlistContext";

export const metadata = {
  title: "EcoShop",
  description: "Eco-Friendly E-Commerce Website",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <WishlistProvider>{children}</WishlistProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
