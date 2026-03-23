"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Star, GitFork, ArrowUpRight, Loader2, RefreshCw } from "lucide-react";
import { useGitHubRepos } from "@/hooks/useGitHub";
import { useState } from "react";
import SpotlightCard from "@/components/SpotlightCard";
import RevealText from "@/components/RevealText";
import { toast } from "sonner";

// Language color mapping
const languageColors: { [key: string]: string } = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  Java: "bg-orange-600",
  "C++": "bg-pink-600",
  "C#": "bg-purple-600",
  Go: "bg-cyan-500",
  Rust: "bg-red-600",
  HTML: "bg-orange-500",
  CSS: "bg-blue-600",
  Shell: "bg-gray-500",
  Ruby: "bg-red-700",
  PHP: "bg-indigo-500",
  Swift: "bg-orange-400",
  Kotlin: "bg-purple-500",
  Dart: "bg-cyan-400",
  Vue: "bg-green-400",
  React: "bg-blue-400",
  "Jupyter Notebook": "bg-orange-600",
};

// Map topics to tech stack names
const topicToTech: { [key: string]: string } = {
  react: "React",
  nextjs: "Next.js",
  typescript: "TypeScript",
  javascript: "JavaScript",
  python: "Python",
  go: "Go",
  golang: "Go",
  java: "Java",
  "tailwind-css": "Tailwind",
  tailwindcss: "Tailwind",
  css: "CSS",
  html: "HTML",
  nodejs: "Node.js",
  "react-native": "React Native",
  firebase: "Firebase",
  mongodb: "MongoDB",
  mysql: "MySQL",
  postgresql: "PostgreSQL",
  redis: "Redis",
  docker: "Docker",
  kubernetes: "Kubernetes",
  git: "Git",
  github: "GitHub",
  vscode: "VS Code",
  figma: "Figma",
  threejs: "Three.js",
  webgl: "WebGL",
  bootstrap: "Bootstrap",
  sass: "Sass",
  redux: "Redux",
  graphql: "GraphQL",
  restapi: "REST API",
  json: "JSON",
  axios: "Axios",
  express: "Express",
  flask: "Flask",
  django: "Django",
  spring: "Spring",
  hibernate: "Hibernate",
  maven: "Maven",
  gradle: "Gradle",
  junit: "JUnit",
  pandas: "Pandas",
  numpy: "NumPy",
  matplotlib: "Matplotlib",
  selenium: "Selenium",
  beautifulsoup: "BeautifulSoup",
  tensorflow: "TensorFlow",
  pytorch: "PyTorch",
  scikitlearn: "Scikit-learn",
  "scikit-learn": "Scikit-learn",
  ml: "Machine Learning",
  "machine-learning": "Machine Learning",
  ai: "AI",
  api: "API",
  backend: "Backend",
  frontend: "Frontend",
  fullstack: "Full Stack",
};

// Get tech stack from repo data
function getTechStack(repo: {
  language: string | null;
  topics: string[];
  name: string;
}): string[] {
  const tech: string[] = [];
  
  // Add primary language
  if (repo.language) {
    tech.push(repo.language);
  }
  
  // Map topics to tech names
  if (repo.topics && repo.topics.length > 0) {
    repo.topics.forEach((topic) => {
      const mapped = topicToTech[topic.toLowerCase()];
      if (mapped && !tech.includes(mapped)) {
        tech.push(mapped);
      }
    });
  }
  
  // Infer from repo name
  const nameLower = repo.name.toLowerCase();
  if (nameLower.includes("go-") || nameLower.includes("-go") || nameLower.includes("golang")) {
    if (!tech.includes("Go")) tech.push("Go");
  }
  if (nameLower.includes("react-native") && !tech.includes("React Native")) {
    tech.push("React Native");
  } else if (nameLower.includes("react") && !tech.includes("React")) {
    tech.push("React");
  }
  if (nameLower.includes("next") && !tech.includes("Next.js")) {
    tech.push("Next.js");
  }
  if (nameLower.includes("vue") && !tech.includes("Vue")) {
    tech.push("Vue");
  }
  if (nameLower.includes("angular") && !tech.includes("Angular")) {
    tech.push("Angular");
  }
  if (nameLower.includes("ml-") || nameLower.includes("machine-learning")) {
    if (!tech.includes("Machine Learning")) tech.push("Machine Learning");
  }
  
  return tech.slice(0, 5); // Max 5 items
}

export default function Projects() {
  const [sortBy, setSortBy] = useState<"updated" | "stars">("updated");
  const { repos, loading, error } = useGitHubRepos(sortBy, 12);

  const handleDemoClick = (demoUrl: string | null, projectName: string) => {
    if (!demoUrl || demoUrl === "" || demoUrl === "#") {
      toast.info(`Demo for ${projectName} is not available yet!`);
    } else {
      window.open(demoUrl, "_blank");
    }
  };

  const toggleSort = () => {
    setSortBy((prev) => (prev === "updated" ? "stars" : "updated"));
  };

  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-900/50">
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
            <RevealText>Featured Projects</RevealText>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            <RevealText delay={0.2}>Latest repositories from my GitHub</RevealText>
          </p>

          {/* Sort Toggle */}
          <motion.button
            onClick={toggleSort}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition-colors border border-gray-200 dark:border-gray-700"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Sort by: {sortBy === "updated" ? "Recently Updated" : "Most Stars"}
          </motion.button>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Loading repositories...</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-red-500 mb-4">Failed to load repositories</p>
            <p className="text-sm text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                  <div className="h-full flex flex-col">
                    {/* Project Header with Language Color */}
                    <div className={`relative h-48 bg-gradient-to-br ${
                      project.language && languageColors[project.language]
                        ? `from-gray-900 to-gray-800`
                        : "from-indigo-500 via-purple-500 to-pink-500"
                    } overflow-hidden`}>
                      {/* Language indicator */}
                      {project.language && (
                        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm">
                          <span className={`w-3 h-3 rounded-full ${languageColors[project.language] || "bg-gray-400"}`} />
                          <span className="text-xs text-white font-medium">{project.language}</span>
                        </div>
                      )}

                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-6xl font-bold text-white/20">
                          {project.name.charAt(0).toUpperCase()}
                        </span>
                      </motion.div>

                      {/* Floating gradient orbs */}
                      <motion.div
                        className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10 blur-xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />

                      {/* Overlay on hover */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                      >
                        <motion.a
                          href={project.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 rounded-full bg-white/20 text-white hover:bg-white hover:text-gray-900 transition-all backdrop-blur-sm"
                          aria-label="View Code"
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                        <motion.button
                          onClick={() => handleDemoClick(project.homepage, project.name)}
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 rounded-full bg-white/20 text-white hover:bg-white hover:text-gray-900 transition-all backdrop-blur-sm"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.button>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <motion.h3
                          className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          {project.name}
                        </motion.h3>
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 45 }}
                          className="text-gray-400 group-hover:text-indigo-500 transition-colors"
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                        {project.description || "No description available"}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {getTechStack(project).map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                            whileHover={{ scale: 1.1 }}
                            className={`px-2 py-1 text-xs rounded-md cursor-default ${
                              techIndex === 0 && project.language === tech
                                ? "bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20 font-medium"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <motion.span
                          className="flex items-center gap-1"
                          whileHover={{ scale: 1.1, color: "#fbbf24" }}
                        >
                          <Star className="w-4 h-4" />
                          {project.stars}
                        </motion.span>
                        <motion.span
                          className="flex items-center gap-1"
                          whileHover={{ scale: 1.1, color: "#6366f1" }}
                        >
                          <GitFork className="w-4 h-4" />
                          {project.forks}
                        </motion.span>
                        <span className="text-xs ml-auto">
                          Updated: {new Date(project.updated_at).toLocaleDateString("en-US")}
                        </span>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-12"
          >
            <motion.a
              href="https://github.com/PannnTastic?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:border-indigo-500 hover:text-indigo-500 dark:hover:border-indigo-400 dark:hover:text-indigo-400 transition-all duration-300 group"
            >
              <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              View All Projects
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
