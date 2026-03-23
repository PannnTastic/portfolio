"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Zap, Globe, Award, Coffee, GraduationCap, MapPin, Calendar, Server, Brain } from "lucide-react";
import { userData, experiences } from "@/lib/data";
import SpotlightCard from "@/components/SpotlightCard";
import RevealText from "@/components/RevealText";

const features = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, efficient, and well-documented code",
  },
  {
    icon: Palette,
    title: "Modern Design",
    description: "Creating beautiful and intuitive user interfaces",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing applications for speed and efficiency",
  },
  {
    icon: Globe,
    title: "Responsive",
    description: "Building apps that work seamlessly across all devices",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900/50">
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
            <RevealText>About Me</RevealText>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            <RevealText delay={0.2}>Get to know more about me and my journey</RevealText>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Name Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {userData.name}
              </h3>
              <p className="text-indigo-500 font-medium">@{userData.username}</p>
            </motion.div>

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Education</h4>
                  <span className="text-xs text-green-500 font-medium px-2 py-0.5 rounded-full bg-green-500/10">
                    {userData.education.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {userData.education.university}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {userData.education.degree} - {userData.education.major}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {userData.education.startYear} - {userData.education.endYear || "Present"}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {userData.location}
                  </span>
                </div>
              </div>
            </motion.div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Who I Am
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Hello! I&apos;m <strong className="text-gray-900 dark:text-white">{userData.name}</strong>, 
                an Information Technology student at{" "}
                <strong className="text-indigo-500">{userData.education.university}</strong> with a strong 
                passion for backend development and machine learning.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                I started my university journey in 2023 and have been focusing on building scalable 
                backend systems, exploring APIs, and diving into machine learning. I enjoy solving 
                complex problems and creating efficient solutions.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Currently, I&apos;m deepening my skills in Go (Golang) for high-performance backends 
                and Python for machine learning applications. I&apos;m always eager to learn new 
                technologies and take on challenging projects.
              </motion.p>
            </div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-6 mt-8"
            >
              {[
                { icon: Award, value: "2023", label: "Started University" },
                { icon: Coffee, value: "UMY", label: "University" },
                { icon: Code2, value: "IT", label: "Major" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                  whileHover={{ y: -5 }}
                  className="text-center p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 group"
                >
                  <motion.div
                    className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300"
                    whileHover={{ rotate: 10 }}
                  >
                    <feature.icon className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Journey & Experience
            </h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <SpotlightCard className="relative pl-8 pb-6 last:pb-0">
                    {/* Timeline line */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700">
                      <motion.div
                        className="absolute top-2 left-[-5px] w-2.5 h-2.5 rounded-full bg-indigo-500"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                      />
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {exp.role}
                        </h4>
                        <motion.span
                          className="text-sm text-indigo-500 font-medium px-3 py-1 rounded-full bg-indigo-500/10"
                          whileHover={{ scale: 1.05 }}
                        >
                          {exp.period}
                        </motion.span>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                        {exp.company}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {exp.description}
                      </p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>

            {/* Current Focus - Backend & ML */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-indigo-500/20">
                  <Server className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Brain className="w-5 h-5 text-purple-500" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  🎯 Current Focus
                </h4>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-indigo-500 mb-1">Backend Development</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Deepening expertise in Go (Golang) for high-performance APIs and microservices, 
                    along with Node.js and database optimization.
                  </p>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <p className="font-semibold text-purple-500 mb-1">Machine Learning</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Exploring ML algorithms with Python, TensorFlow, and Scikit-learn. 
                    Working on data analysis and predictive modeling projects.
                  </p>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 pt-2">
                  💡 Open for internship opportunities in Backend or ML Engineering!
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
