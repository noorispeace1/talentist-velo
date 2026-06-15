"use client";

import { motion } from "motion/react";
import React from "react";
import { Link } from "@heroui/react";
import { Terminal, PaintBucket, PieChart, Megaphone, ShieldCheck, Monitor } from "lucide-react";

export default function TrendingCategories() {
  const categories = [
    { name: "Software Engineering", count: "1,200+ Jobs", icon: <Terminal className="w-8 h-8" /> },
    { name: "UI/UX Design", count: "850+ Jobs", icon: <PaintBucket className="w-8 h-8" /> },
    { name: "Data Science", count: "640+ Jobs", icon: <PieChart className="w-8 h-8" /> },
    { name: "Marketing", count: "420+ Jobs", icon: <Megaphone className="w-8 h-8" /> },
    { name: "Cybersecurity", count: "310+ Jobs", icon: <ShieldCheck className="w-8 h-8" /> },
    { name: "Product Management", count: "590+ Jobs", icon: <Monitor className="w-8 h-8" /> },
  ];

  return (
    <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Explore by Category</h2>
            <p className="text-zinc-400 text-lg max-w-xl">
              Find the role that perfectly matches your skills and career aspirations.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/jobs" className="text-white hover:text-emerald-400 flex items-center gap-2 font-medium transition-colors">
              Browse all jobs <span aria-hidden="true">&rarr;</span>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                href={`/jobs?category=${encodeURIComponent(category.name)}`}
                className="group block p-8 rounded-[32px] bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="flex flex-col gap-4">
                    <div className="text-zinc-400 group-hover:text-emerald-400 transition-colors duration-300">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{category.name}</h3>
                      <p className="text-sm text-zinc-500">{category.count}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                    <span aria-hidden="true">&rarr;</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
