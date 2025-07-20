// src/app/layout.js
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: "EcoShop",
  description: "Eco-Friendly E-Commerce Website",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <Navbar/>
        {children}
        <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}
