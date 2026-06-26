"use client";

import { motion } from "motion/react";
import React from "react";
import { User, FileText, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Create an Account",
      description: "Sign up as a Job Seeker or Recruiter and set up your professional profile in minutes.",
      icon: <User className="w-10 h-10 text-emerald-400" />
    },





    
    {
      id: 2,
      title: "Discover or Post Jobs",
      description: "Seekers can browse thousands of opportunities. Recruiters can post jobs and review top candidates.",
      icon: <FileText className="w-10 h-10 text-purple-400" />
    },
    {
      id: 3,
      title: "Get Hired",
      description: "Connect instantly. Interview, hire, or get hired with our streamlined placement platform.",
      icon: <CheckCircle className="w-10 h-10 text-blue-400" />
    }
  ];

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">How Talentist Velo Works</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Your journey to finding the perfect job or the ideal candidate made incredibly simple.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative p-8 rounded-[32px] bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm hover:bg-zinc-800/50 transition-colors group"
            >
              <div className="w-20 h-20 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{step.description}</p>
              <div className="absolute top-8 right-8 text-9xl font-black text-white/[0.03] select-none pointer-events-none">
                {step.id}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
