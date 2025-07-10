import React from 'react'
import Footer from "@/components/heropage/Footer";
import Navbar from "@/components/heropage/Navbar";

const page = () => {
  return (
    <div>
      <Navbar/>
       <div className="h-screen">
        <div className="text-4xl mt-24 text-center">
        thise is a heart and like section
        </div>
       </div>
      
      <Footer/>
    </div>
  )
}

export default page
