"use client";
import React from "react";
 import  Category1 from "@/components/home/CatergoryCard/Category1";
import  Category2 from "@/components/home/CatergoryCard/Category2";
import  Category3 from "@/components/home/CatergoryCard/Category3";
 
 
const Cardhome = () => {
 
  return (
    <>
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Explore Our Collections
        </h2>

<Category1/>
<Category2/>
<Category3/>
        
      </div>

    {/* <section>

<bgimg>

</bgimg>

<ratting>

</ratting> */}
    {/* </section> */}
    </section>
    </>
  );
};

export default Cardhome;
