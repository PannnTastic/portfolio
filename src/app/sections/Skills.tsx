"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/lib/data";
import SpotlightCard from "@/components/SpotlightCard";
import RevealText from "@/components/RevealText";

const categories = [
  { id: "frontend", label: "Frontend Development", color: "from-blue-500 to-cyan-500" },
  { id: "backend", label: "Backend & Database", color: "from-green-500 to-emerald-500" },
  { id: "tools", label: "ML, DevOps & Tools", color: "from-purple-500 to-pink-500" },
];

// Map tech to icons/colors
const techInfo: { [key: string]: { color: string; icon: string } } = {
  JavaScript: { color: "#F7DF1E", icon: "⚡" },
  TypeScript: { color: "#3178C6", icon: "🔷" },
  Java: { color: "#007396", icon: "☕" },
  Python: { color: "#3776AB", icon: "🐍" },
  Go: { color: "#00ADD8", icon: "🐹" },
  Gin: { color: "#00ADD8", icon: "🥃" },
  PHP: { color: "#777BB4", icon: "🐘" },
  "HTML/CSS": { color: "#E34F26", icon: "🎨" },
  React: { color: "#61DAFB", icon: "⚛️" },
  "Next.js": { color: "#000000", icon: "▲" },
  "React Native": { color: "#61DAFB", icon: "📱" },
  "Tailwind CSS": { color: "#06B6D4", icon: "🌊" },
  "Node.js": { color: "#339933", icon: "🟢" },
  MySQL: { color: "#4479A1", icon: "🐬" },
  PostgreSQL: { color: "#336791", icon: "🐘" },
  MongoDB: { color: "#47A248", icon: "🍃" },
  Redis: { color: "#DC382D", icon: "🔴" },
  Firebase: { color: "#FFCA28", icon: "🔥" },
  "Git/GitHub": { color: "#F05032", icon: "🐙" },
  Docker: { color: "#2496ED", icon: "🐳" },
  "Three.js": { color: "#000000", icon: "🎲" },
  TensorFlow: { color: "#FF6F00", icon: "🧠" },
  "Scikit-learn": { color: "#F7931E", icon: "🔬" },
  Pandas: { color: "#150458", icon: "🐼" },
  NumPy: { color: "#013243", icon: "🔢" },
  Figma: { color: "#F24E1E", icon: "🎭" },
  "VS Code": { color: "#007ACC", icon: "📝" },
  JavaFX: { color: "#007396", icon: "🎬" },
};

function SkillBar({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getGradient = (category: string) => {
    switch (category) {
      case "frontend":
        return "from-blue-500 to-cyan-500";
      case "backend":
        return "from-green-500 to-emerald-500";
      default:
        return "from-purple-500 to-pink-500";
    }
  };

  const techData = techInfo[skill.name] || { color: "#6366f1", icon: "💻" };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group"
    >
      <div className="flex justify-between mb-2">
        <motion.span
          className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-500 transition-colors flex items-center gap-2"
          whileHover={{ x: 5 }}
        >
          <span>{techData.icon}</span>
          {skill.name}
        </motion.span>
        <motion.span
          className="text-sm text-gray-500 dark:text-gray-400 tabular-nums"
          animate={isInView ? { opacity: [0, 1], y: [10, 0] } : {}}
          transition={{ delay: 0.5 + index * 0.05 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{
            duration: 1,
            delay: 0.2 + index * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`h-full bg-gradient-to-r ${getGradient(skill.category)} rounded-full relative`}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: index * 0.1 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24">
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
            <RevealText>Skills & Technologies</RevealText>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            <RevealText delay={0.2}>Technologies I use in my development journey</RevealText>
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <SpotlightCard className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm h-full border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: categoryIndex * 0.2 }}
                  />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {category.label}
                  </h3>
                </div>
                <div className="space-y-5">
                  {skills
                    .filter((skill) => skill.category === category.id)
                    .map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} index={index} />
                    ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            <RevealText>My Tech Stack</RevealText>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {Array.from(new Set(skills.map((s) => s.name))).map((skill, index) => {
              const techData = techInfo[skill] || { color: "#6366f1", icon: "💻" };
              return (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.03,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 },
                  }}
                  className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 transition-colors cursor-default border border-transparent hover:border-indigo-400 flex items-center gap-2"
                >
                  <span>{techData.icon}</span>
                  {skill}
                </motion.span>
              );
            })}
          </div>
        </motion.div>

        {/* Focus Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 grid md:grid-cols-2 gap-6"
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/20">
            <h4 className="font-bold text-indigo-500 mb-2">🔧 Backend Focus</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Go (Golang), Node.js, REST APIs, Microservices, Database Design
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <h4 className="font-bold text-purple-500 mb-2">🧠 ML Focus</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Python, TensorFlow, Scikit-learn, Data Analysis, Predictive Modeling
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
