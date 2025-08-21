"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle,
  Calendar,
  Zap,
} from "lucide-react";

const ContactPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      description: "Mon-Fri from 8am to 5pm",
      contact: "+91 9876543210",
      action: "tel:+919876543210",
      color: "blue",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description: "We'll respond within 24 hours",
      contact: "support@ecoshop.com",
      action: "mailto:support@ecoshop.com",
      color: "green",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Available 24/7 for support",
      contact: "Start Chat",
      action: "#",
      color: "purple",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      description: "Come see our eco showroom",
      contact: "123 Eco Street, Green City",
      action: "#",
      color: "orange",
    },
  ];

  const supportCategories = [
    { value: "general", label: "General Inquiry", icon: "💬" },
    { value: "product", label: "Product Question", icon: "🛍️" },
    { value: "order", label: "Order Support", icon: "📦" },
    { value: "shipping", label: "Shipping Info", icon: "🚚" },
    { value: "returns", label: "Returns & Refunds", icon: "↩️" },
    { value: "partnership", label: "Partnership", icon: "🤝" },
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 2:00 PM" },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, name: "Facebook", url: "#" },
    { icon: <Twitter className="w-5 h-5" />, name: "Twitter", url: "#" },
    { icon: <Instagram className="w-5 h-5" />, name: "Instagram", url: "#" },
    { icon: <Linkedin className="w-5 h-5" />, name: "LinkedIn", url: "#" },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        category: "general",
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  return (
    <>
      <Navbar />

      <div className="bg-white text-gray-900 min-h-screen">
        {/* Hero Section */}
      <section
  id="hero"
  data-animate
  className="relative bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 pt-24 pb-16 px-4 overflow-hidden mt-16"
>

          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              isVisible.hero
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {" "}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              We'd love to hear from you! Whether you have questions, feedback,
              or need support with your eco-friendly journey.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Choose Your Preferred Way to Connect
              </h2>
              <p className="text-xl text-gray-600">
                Multiple ways to reach us for your convenience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.action}
                  className="group block bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
                >
                  <div
                    className={`bg-${method.color}-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <div className={`text-${method.color}-600`}>
                      {method.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {method.description}
                  </p>
                  <p className="text-green-600 font-medium group-hover:text-green-700">
                    {method.contact}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Send className="w-6 h-6 text-green-600" />
                    <h2 className="text-2xl font-bold text-gray-800">
                      Send Us a Message
                    </h2>
                  </div>

                  {submitStatus === "success" && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <p className="text-green-800">
                        Thank you! Your message has been sent successfully.
                      </p>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        >
                          {supportCategories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                              {cat.icon} {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="What's this about?"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="6"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us more about your inquiry..."
                        required
                      ></textarea>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-4 rounded-lg font-semibold transition-all transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Info Sidebar */}
              <div className="space-y-8">
                {/* Office Hours */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-semibold text-gray-800">
                      Office Hours
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {officeHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-600">{schedule.day}</span>
                        <span className="font-medium text-gray-800">
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="#"
                      className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <Calendar className="w-5 h-5" />
                      Schedule a Call
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <Zap className="w-5 h-5" />
                      Check Order Status
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <Users className="w-5 h-5" />
                      Join Our Community
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Follow Us
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors group"
                      >
                        <div className="text-gray-600 group-hover:text-green-600">
                          {social.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">
                          {social.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Map */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Visit Our Eco-Friendly Showroom
              </h2>
              <p className="text-xl text-gray-600">
                Experience our sustainable products in person
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-green-50 p-8 rounded-2xl h-full">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Our Location
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">
                          EcoShop Headquarters
                        </p>
                        <p className="text-gray-600">
                          123 Eco Street, Green City
                        </p>
                        <p className="text-gray-600">Delhi, India - 110001</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-800">
                          +91 9876543210
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-800">
                          visit@ecoshop.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-green-200">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      What to Expect
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Interactive product demonstrations
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Sustainability education center
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Expert eco-consultations
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.37463111167!2d77.06889985000001!3d28.52758200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3c1548c12db%3A0x6f6c844e23d57cd3!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1625222223333!5m2!1sen!2sin"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="EcoShop Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
