"use client";
import { SignIn } from "@clerk/nextjs";
import React from "react";
import Footer from "@/components/Footer";
const LoginPage = () => {
  return (
    <>
    <div className="min-h-screen flex items-center justify-center p-4">
      <div>
         <SignIn path="/login" routing="path" signUpUrl="/signup" />
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default LoginPage;
