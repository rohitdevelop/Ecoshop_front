"use client";
import React, {useEffect} from "react";
import { useUser } from "@clerk/nextjs"; // or your auth hook
import { useRouter } from "next/navigation";
 
const Wishlist = () => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/signup"); // redirect to login if not signed in
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) return null; // or loading spinner

  return (
    <div>
      
      <h1 className="text-3xl text-center my-6">Hello, {user?.firstName}'s Wishlist</h1>
      {/* Show wishlist items here */}
      </div>
  );
};

export default Wishlist;
