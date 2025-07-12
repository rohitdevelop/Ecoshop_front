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
import { LikeProvider } from "@/Context/LikeContext";

export const metadata = {
  title: "EcoShop",
  description: "Eco-Friendly E-Commerce Website",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          {/* Optional header - you can move this into a Navbar component */}
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>

          {/* Like context wrapper */}
          <LikeProvider>{children}</LikeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
