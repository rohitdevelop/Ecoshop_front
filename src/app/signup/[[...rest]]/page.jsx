 "use client";
import { SignUp } from "@clerk/nextjs";
import React from "react";
import Footer from "@/components/Footer";
const SignupPage = () => {
  return (
    <>
    <div className="min-h-screen flex items-center justify-center p-4">
      <div>
         <SignUp path="/signup" routing="path" signInUrl="/login" />
      </div>
    </div>
<Footer/>
    </>
  );
};

export default SignupPage;
