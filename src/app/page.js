"use client"; // Only if you're using App Router (Next.js 13+)

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import Loder from "@/components/Loader";
// import Footer from "@/components/Footer";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Loader will show for 3 seconds

    return () => clearTimeout(timer); // Clean-up
  }, []);

  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <>
          <Navbar />
          <Home />
          {/* <Footer /> */}
        </>
      )}
    </>
  );
}
