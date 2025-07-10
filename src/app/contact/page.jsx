import Navbar from "@/components/heropage/Navbar";
import Footer from "@/components/heropage/Footer";

export default function ContactPage() {
  return (
    <>
    <Navbar />
    <div className="bg-white text-green-900 pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-100 text-center py-12 px-4">
        <h1 className="text-4xl font-bold mb-2">📞 Contact Us</h1>
        <p className="text-lg text-green-800 max-w-xl mx-auto">
          We’d love to hear from you! Whether you have questions, feedback, or just want to say hello.
        </p>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 px-4 md:px-20 grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-green-800">Reach Out</h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>📍 Address:</strong> 123 Eco Street, Green City, Earth
            </li>
            <li>
              <strong>📧 Email:</strong> support@ecoshop.com
            </li>
            <li>
              <strong>📞 Phone:</strong> +91 9876543210
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="bg-green-50 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Send Us a Message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>
            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
              >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Google Map Embed */}
      <section className="px-4 md:px-20 pb-20">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">📍 Our Location</h2>
        <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-md">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.37463111167!2d77.06889985000001!3d28.52758200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3c1548c12db%3A0x6f6c844e23d57cd3!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1625222223333!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
      </section>
    </div>
    <Footer />
            </>
  );
}
