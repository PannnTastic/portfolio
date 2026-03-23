"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { userData } from "@/lib/data";
import ContactForm from "@/components/ContactForm";
import MagneticButton from "@/components/MagneticButton";
import RevealText from "@/components/RevealText";

export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <RevealText>Get In Touch</RevealText>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            <RevealText delay={0.2}>Have a project in mind? Let&apos;s work together!</RevealText>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Let&apos;s Talk
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities 
              to be part of your visions. Whether it&apos;s backend development, machine learning, 
              or full-stack projects, feel free to reach out!
            </p>

            <div className="space-y-6">
              <motion.div 
                className="flex items-center gap-4 group"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="p-4 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <a
                    href={`mailto:${userData.email}`}
                    className="text-gray-900 dark:text-white font-medium hover:text-indigo-500 transition-colors"
                  >
                    {userData.email}
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-4 group"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="p-4 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {userData.location}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="mt-10">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Follow Me</p>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: userData.github, label: "GitHub" },
                  { icon: Linkedin, href: userData.linkedin, label: "LinkedIn" },
                  
                ].map((social) => (
                  <MagneticButton
                    key={social.label}
                    className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-indigo-500 hover:text-white transition-all duration-300"
                    onClick={() => window.open(social.href, "_blank")}
                  >
                    <social.icon className="w-5 h-5" />
                  </MagneticButton>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-indigo-500">Currently available</span> for 
                freelance projects and internship opportunities in Backend Development 
                and Machine Learning.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
