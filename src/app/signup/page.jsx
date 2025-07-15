 "use client";
import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-black via-purple-950 to-black p-4">
      <div className="shadow-xl rounded-xl p-6 sm:p-10 w-full max-w-md">
         <SignUp path="/signup" routing="path" signInUrl="/login" />
      </div>
    </div>
  );
};

export default SignupPage;
