"use client";
import { SignIn } from "@clerk/nextjs";
import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-black via-purple-950 to-black p-4">
      <div className="shadow-xl rounded-xl p-6 sm:p-10 w-full max-w-md">
         <SignIn path="/login" routing="path" signUpUrl="/signup" />
      </div>
    </div>
  );
};

export default LoginPage;
