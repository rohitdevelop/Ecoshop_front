"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Leaf,
  Heart,
  Users,
  Award,
  Truck,
  Shield,
  Recycle,
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Target,
  Eye,
  TreePine,
  Factory,
  Handshake,
} from "lucide-react";

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <TreePine className="w-8 h-8" />,
      title: "100% Eco-Friendly",
      description:
        "All our products are biodegradable, sustainable, or made from recycled materials with zero harmful chemicals.",
      color: "green",
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Sustainable Packaging",
      description:
        "We use plastic-free, recyclable, and compostable packaging for all deliveries. Zero waste approach.",
      color: "blue",
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Community Driven",
      description:
        "We support local artisans, fair trade practices, and eco-conscious businesses worldwide.",
      color: "purple",
    },
  ];

  const stats = [
    {
      number: "10,000+",
      label: "Happy Customers",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "500+",
      label: "Eco Products",
      icon: <Leaf className="w-6 h-6" />,
    },
    {
      number: "50+",
      label: "Partner Brands",
      icon: <Handshake className="w-6 h-6" />,
    },
    {
      number: "99%",
      label: "Customer Satisfaction",
      icon: <Star className="w-6 h-6" />,
    },
  ];

  const values = [
    {
      icon: <Eye className="w-12 h-12" />,
      title: "Our Vision",
      description:
        "To create a world where sustainable living is accessible, affordable, and the preferred choice for everyone.",
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Our Mission",
      description:
        "Providing high-quality, eco-friendly products that reduce environmental impact while enhancing everyday life.",
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Our Values",
      description:
        "Sustainability, transparency, quality, and community. We believe in doing business responsibly.",
    },
  ];

  const timeline = [
    {
      year: "2020",
      title: "EcoShop Founded",
      description:
        "Started with a vision to make sustainable products accessible to everyone.",
    },
    {
      year: "2021",
      title: "First 1000 Customers",
      description:
        "Reached our first milestone with overwhelming support from eco-conscious consumers.",
    },
    {
      year: "2022",
      title: "Carbon Neutral Achievement",
      description:
        "Became a fully carbon-neutral company through renewable energy and offset programs.",
    },
    {
      year: "2023",
      title: "Global Expansion",
      description:
        "Expanded to serve customers worldwide while maintaining our sustainability standards.",
    },
    {
      year: "2024",
      title: "Award Recognition",
      description:
        "Received multiple sustainability awards and certifications for our environmental impact.",
    },
  ];

  const certifications = [
    { name: "Organic Certified", icon: "🌱" },
    { name: "Fair Trade", icon: "🤝" },
    { name: "Carbon Neutral", icon: "🌍" },
    { name: "B-Corp Certified", icon: "🏆" },
    { name: "Cruelty Free", icon: "🐰" },
    { name: "Recyclable", icon: "♻️" },
  ];

  return (
    <>
      <Navbar />

      <div className="bg-white text-gray-900 min-h-[screen] mt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 pt-24 pb-16 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-emerald-600/5"></div>
          <div
            className="max-w-6xl mx-auto text-center relative z-10"
            id="hero"
            data-animate
          >
            <div
              className={`transition-all duration-1000 ${
                isVisible.hero
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex justify-center mb-6">
                <div className="bg-green-600 p-4 rounded-full shadow-lg">
                  <Leaf className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                Welcome to EcoShop
              </h1>
              <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                Your trusted destination for eco-friendly and sustainable
                products that make a difference for our planet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                  Explore Our Story <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-full font-semibold transition-all">
                  Shop Products
                </button>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 animate-bounce delay-1000">
            <div className="bg-green-200 p-3 rounded-full opacity-60">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="absolute top-32 right-16 animate-bounce delay-2000">
            <div className="bg-emerald-200 p-3 rounded-full opacity-60">
              <Globe className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 group-hover:bg-green-200 p-4 rounded-full transition-colors">
                      <div className="text-green-600">{stat.icon}</div>
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div
              className="grid md:grid-cols-2 gap-16 items-center"
              id="who-we-are"
              data-animate
            >
              <div
                className={`transition-all duration-1000 delay-200 ${
                  isVisible["who-we-are"]
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
              >
                <div className="mb-6">
                  <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
                    About EcoShop
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                  Who We Are
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  At EcoShop, we believe in a greener future. Our mission is to
                  offer sustainable alternatives that reduce waste, protect the
                  environment, and improve everyday living for millions of
                  people worldwide.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Founded by a team of environmental enthusiasts and business
                  leaders, we're committed to making sustainable living
                  accessible, affordable, and enjoyable for everyone.
                </p>
                <div className="space-y-4">
                  {[
                    "Carefully curated eco-friendly products",
                    "Direct partnerships with sustainable manufacturers",
                    "Transparent supply chain and ethical practices",
                    "Carbon-neutral shipping and operations",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`transition-all duration-1000 delay-400 ${
                  isVisible["who-we-are"]
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop"
                    alt="Eco friendly products"
                    className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl">
                      <p className="text-sm font-medium text-gray-800">
                        "Sustainable products for a better tomorrow"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision, Mission, Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Our Foundation
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built on strong values and a clear vision for a sustainable
                future
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2"
                >
                  <div className="flex justify-center mb-6">
                    <div className="bg-green-100 group-hover:bg-green-200 p-4 rounded-full transition-colors">
                      <div className="text-green-600">{value.icon}</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Why Choose EcoShop?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're more than just an eco-friendly store. We're your partner
                in sustainable living.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                      <div
                        className={`bg-${feature.color}-100 group-hover:bg-${feature.color}-200 p-4 rounded-full transition-all duration-300 group-hover:scale-110`}
                      >
                        <div className={`text-${feature.color}-600`}>
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-center">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey Timeline */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Our Journey
              </h2>
              <p className="text-xl text-gray-600">
                Building a sustainable future, one milestone at a time
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>

              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0
                        ? "md:text-right md:pr-8"
                        : "md:text-left md:pl-8"
                    }`}
                  >
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <div className="text-green-600 font-bold text-lg mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Certifications
            </h2>
            <p className="text-gray-600 mb-12">
              Trusted and verified by leading sustainability organizations
            </p>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="group">
                  <div className="bg-gray-50 group-hover:bg-green-50 p-6 rounded-xl transition-colors">
                    <div className="text-3xl mb-2">{cert.icon}</div>
                    <div className="text-sm font-medium text-gray-700 group-hover:text-green-700">
                      {cert.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Go Green?
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Join thousands of customers who have already made the switch to
              sustainable living. Every purchase makes a difference for our
              planet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                Explore Products <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-full font-semibold transition-all">
                Contact Us
              </button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Truck className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <p className="font-medium">Free Carbon-Neutral Shipping</p>
              </div>
              <div>
                <Shield className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <p className="font-medium">30-Day Money Back Guarantee</p>
              </div>
              <div>
                <Award className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <p className="font-medium">Award-Winning Customer Service</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
