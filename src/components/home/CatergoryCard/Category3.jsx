"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

const categories = [
   {
    id: 3,
    name: "Eco-Friendly Gifts",
    slug: "lifestyle",
    description: "Sustainable gifts and lifestyle products",
    icon: "🎁",
    products: [
      {
        id: 301,
        name: "Plantable Notebook Set",
        price: 22.99,
        image:
        "https://www.jiomart.com/images/product/original/rvgyk0b51m/paper-nest-eco-friendly-stationery-gifts-gift-pack-paper-pencils-tree-free-recycled-paper-notepad-birthday-gifts-for-kids-handmade-stationery-set-of-10-product-images-orvgyk0b51m-p606031385-0-202311080050.jpg?im=Resize=(1000,1000)",
         rating: 4.6,
        reviews: 112,
        description: "Seed paper notebooks that grow plants",
      },
      {
        id: 302,
        name: "Upcycled Tote Bags",
        price: 35.99,
        image:
        "https://www.jiomart.com/images/product/original/450154712_multi/geometric-pattern-tote-bag-model-450154712_multi-0-202302061829.jpg?im=Resize=(330,410)",
         rating: 4.8,
        reviews: 189,
        badge: "Eco Choice",
        description: "Stylish bags made from recycled materials",
      },
      {
        id: 303,
        name: "Coconut Bowl Gift Set",
        price: 41.99,
        image:
         "https://www.jiomart.com/images/product/original/rvfpba25qx/thenga-hand-carved-natural-coconut-shell-bowl-for-smoothie-cereals-soup-nuts-500-ml-1-bowl-and-spoon-product-images-orvfpba25qx-p608584532-0-202403262315.jpg?im=Resize=(420,420)",
        rating: 4.7,
        reviews: 134,
        description: "Handcrafted coconut bowls with spoons",
      },
      {
        id: 304,
        name: "Sustainable Candle Collection",
        price: 54.99,
        originalPrice: 69.99,
        image:
         "https://www.jiomart.com/images/product/original/rvysyixg96/sapi-s-green-wax-scented-heart-pillar-candles-set-of-3-product-images-orvysyixg96-p598142378-0-202302060956.jpg?im=Resize=(1000,1000)",
        rating: 4.9,
        reviews: 203,
        badge: "Bestseller",
        description: "Soy wax candles in recycled containers",
      },
    ],
  },
];

const Category3 = () => {
  const [favorites, setFavorites] = useState([]);
  const carouselRefs = useRef({});

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const scrollCarousel = (id, direction) => {
    const carousel = carouselRefs.current[id];
    if (carousel) {
      const scrollAmount = 300;
      carousel.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id} className="mb-16">
          {/* Category Heading */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{category.icon}</span>
              <div>
                <h3 className="text-2xl font-bold">{category.name}</h3>
                <p className="text-gray-500 text-base">{category.description}</p>
              </div>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-green-800 font-bold">
              View all <ChevronRight size={18} />
            </button>
          </div>

          {/* Carousel */}
         <div className="relative">
                   <div
                     ref={(el) => (carouselRefs.current[category.id] = el)}
                     className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                   >
                     {category.products.map((product) => (
                       <div
                         key={product.id}
                         className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 group"
                       >
                         {/* Image with hover scale */}
                         <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden">
                           <Image
                             src={product.image}
                             alt={product.name}
                             fill
                             className="object-cover transition-transform duration-500 group-hover:scale-105"
                           />
                           <button
                             onClick={() => toggleFavorite(product.id)}
                             className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow"
                           >
                             <Heart
                               size={20}
                               className={
                                 favorites.includes(product.id)
                                   ? "text-red-500 fill-red-500"
                                   : "text-gray-600"
                               }
                             />
                           </button>
                         </div>
       
                         {/* Product Info */}
                         <h4 className="font-semibold text-lg mt-3">{product.name}</h4>
                         <p className="text-green-600 font-bold text-lg">
                           ${product.price}
                         </p>
                         <p className="text-gray-500 text-sm line-clamp-2">
                           {product.description}
                         </p>
       
                         {/* Explore Button */}
                         <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
                           Explore
                         </button>
                       </div>
                     ))}
                   </div>
       
                   {/* Scroll Buttons (Desktop only) */}
                   <button
                     onClick={() => scrollCarousel(category.id, "left")}
                     className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-3 rounded-full"
                   >
                     <ChevronLeft size={22} />
                   </button>
                   <button
                     onClick={() => scrollCarousel(category.id, "right")}
                     className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-3 rounded-full"
                   >
                     <ChevronRight size={22} />
                   </button>
                 </div>

          {/* Mobile Explore Button */}
          <button className="sm:hidden w-full mt-4 flex items-center justify-center gap-2 text-green-800 font-bold">
            View all <ChevronRight size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Category3;
