"use client";
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Page = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/signup"); // redirect to login if not signed in
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) return null;

  return (
    <div>
      <Navbar />
      <div className="h-screen">
        <div className="text-4xl mt-24 text-center">
          This is the Add to Cart section
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
