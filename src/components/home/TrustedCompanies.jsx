"use client";

import { motion } from "motion/react";
import React from "react";
import { Briefcase, Building, Laptop, Monitor } from "lucide-react";

export default function TrustedCompanies() {
  const companies = [
    { name: "TechNova", icon: <Building className="w-8 h-8" /> },
    { name: "Google", icon: <Laptop className="w-8 h-8" /> },
    { name: "NextGen", icon: <Briefcase className="w-8 h-8" /> },
    { name: "RetailCorp", icon: <Monitor className="w-8 h-8" /> },
    { name: "OfficePro", icon: <Building className="w-8 h-8" /> },
    { name: "AlphaTech", icon: <Laptop className="w-8 h-8" /> },
  ];

  return (
    <section className="py-16 bg-black border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-zinc-500 text-sm font-semibold tracking-widest uppercase">Trusted by 500+ Top Companies</p>
      </div>
      <div className="relative flex overflow-x-hidden">
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
        
        <motion.div
          className="flex gap-16 py-4 whitespace-nowrap items-center w-max"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          {/* Tripled the array to create seamless loop */}
          {[...companies, ...companies, ...companies].map((company, index) => (
            <div key={index} className="flex items-center gap-3 text-zinc-400 opacity-60 hover:opacity-100 transition-opacity">
              {company.icon}
              <span className="text-xl font-bold tracking-tight">{company.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
