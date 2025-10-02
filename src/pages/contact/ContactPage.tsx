// src/pages/Contact/ContactPage.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import type { ContactData } from "./contact-data";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const contactData: ContactData = {
        ...formData,
        timestamp: new Date(),
      };

      await addDoc(collection(db, "contacts"), contactData);

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Contact <span className="text-lime-500">Us</span>
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Have questions or need support? Fill the form below and we'll get
            back to you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-left text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-lime-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-left text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-lime-500"
                placeholder="johndoe@email.com"
              />
            </div>
            <div>
              <label className="block text-left text-gray-700 mb-2">Message</label>
              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-lime-500"
                placeholder="Write your message here..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-lime-500 text-gray-900 font-semibold py-3 rounded-lg hover:bg-lime-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
