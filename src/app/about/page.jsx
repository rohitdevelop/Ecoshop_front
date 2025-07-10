import Image from "next/image";
import Navbar from "@/components/heropage/Navbar";

export default function AboutPage() {
  return (
    <>
    <Navbar />
    <div className="bg-white text-green-900 min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-100 to-green-200 py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-800">
          Welcome to EcoShop 🌱
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl">
          Your trusted destination for eco-friendly and sustainable products.
        </p>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-green-700">Who We Are</h2>
          <p className="text-lg text-gray-700">
            At EcoShop, we believe in a greener future. Our mission is to offer sustainable alternatives that reduce waste, protect the environment, and improve everyday living.
          </p>
        </div>
        <div>
          <Image
            src="https://storage.googleapis.com/gweb-cloudblog-publish/original_images/19662_E_waste_ChromeOS_Flex_Blog_Header_01_1.gif"
            alt="Eco friendly products"
            width={500}
            height={300}
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-green-50 py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-12">Why Choose EcoShop?</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            { title: "🌿 100% Eco-friendly", desc: "All our products are biodegradable or made from recycled materials." },
            { title: "📦 Sustainable Packaging", desc: "We use plastic-free and recyclable packaging for all deliveries." },
            { title: "🤝 Community Driven", desc: "We support local artisans and eco-conscious businesses." },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-3 text-green-800">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20 bg-green-700 text-white px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Go Green?</h2>
        <p className="text-lg mb-8 max-w-xl mx-auto">
          Join our eco movement today and make the planet cleaner with every purchase!
        </p>
        <a
          href="/products"
          className="inline-block bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-100 transition"
        >
          Explore Products
        </a>
      </section>
    </div>
                </>
  );
}
