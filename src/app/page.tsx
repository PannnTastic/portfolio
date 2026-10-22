"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { userData } from "@/lib/data";

export default function Home() {
  return (
    <>
      <section id="home" className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 mb-5"
          >
            Full Stack Developer · Yogyakarta
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-4"
          >
            {userData.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-10 leading-1.6"
          >
            {userData.bio}
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={userData.cv}
              download
              className="px-6 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              Download CV
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors"
            >
              View Projects
            </a>
          </div>
        </div>

        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <motion.img
            src={userData.avatar}
            alt="Profile photo of Ahmad Alfan Alfian Irfan"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-white dark:border-slate-900/50 shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-400"
        >
          <span className="text-xs mb-1">Scroll down</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </motion.div>
        </motion.div>
      </section>

      <section id="about" className="py-20 border-b border-slate-100 dark:border-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
              <motion.img
                src={userData.avatar}
                alt="Profile photo"
                className="w-full h-full object-cover rounded-2xl border border-slate-200 dark:border-slate-800/50 shadow-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">About Me</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-1.7 mb-6 max-w-lg">
                I am Ahmad Alfan Alfian Irfan, an Information Technology student at Universitas Muhammadiyah Yogyakarta. My main focus is backend development and machine learning. I enjoy building efficient systems and learning new technologies.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="text-slate-400 w-16">University</span><span className="font-medium">Universitas Muhammadiyah Yogyakarta</span></div>
                <div className="flex items-start gap-3"><span className="text-slate-400 w-16">Major</span><span className="font-medium">Information Technology</span></div>
                <div className="flex items-start gap-3"><span className="text-slate-400 w-16">Location</span><span className="font-medium">Yogyakarta, Indonesia</span></div>
                <div className="flex items-start gap-3"><span className="text-slate-400 w-16">Email</span><a href={`mailto:${userData.email}`} className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">{userData.email}</a></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-950/30 border-b border-slate-100 dark:border-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Skills</h2>
            <p className="text-slate-600 dark:text-slate-400">Technologies used in development.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Frontend", tech: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
              { label: "Backend", tech: ["Go", "Python", "Node.js", "Gin", "PostgreSQL", "MySQL"] },
              { label: "ML & Tools", tech: ["TensorFlow", "Scikit-learn", "Pandas", "Docker", "Git/GitHub"] },
            ].map((group) => (
              <div key={group.label} className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">{group.label}</h3>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 leading-1.6">
                  {group.tech.map((t) => (
                    <li key={t} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Projects</h2>
            <p className="text-slate-600 dark:text-slate-400">Websites I have built.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Kopingaji", desc: "Ecommerce for local businesses", url: "https://kopingaji.com/" },
              { name: "Berkah Seka Wanta Tangguh", desc: "Company profile + ecommerce for building materials", url: "https://berkahsekawantangguh.com/" },
              { name: "Merzzmail", desc: "Mail server system", url: "https://merzzmail.my.id/" },
              { name: "Bimbel Aksara", desc: "LMS + company profile (capstone project)", url: "https://bimbelaksara.vercel.app/" },
              { name: "OISL Website", desc: "Research laboratory website", url: "https://oisl-website.pages.dev/" },
            ].map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="group block p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-indigo-500 transition-colors">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{p.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{p.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 border-b border-slate-100 dark:border-slate-900/30">
        <div className="container mx-auto px-6 text-center max-w-xl">
          <h2 className="text-3xl font-bold mb-4">Contact</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Interested in collaborating or want to consult?</p>
          <a href={userData.cv} download className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
            Download CV
          </a>
          <p className="text-slate-600 dark:text-slate-400 mt-6 text-sm">{userData.email} &bull; {userData.location}</p>
        </div>
      </section>

      <footer className="py-10 border-t border-slate-100 dark:border-slate-900/30">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>© {new Date().getFullYear()} Ahmad Alfan Alfian Irfan.</span>
          <div className="flex gap-4">
            <a href={userData.github} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">GitHub</a>
            <a href={userData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  );
}
