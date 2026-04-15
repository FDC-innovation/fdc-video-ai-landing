"use client";

import { motion } from "framer-motion";
import React from "react";

export function VeedMarquee() {
  const items = [
    "TikTok Brands",
    "Course Creators",
    "Marketing Agencies",
    "Freelancers",
    "E-commerce Brands",
    "Podcasters",
    "Documentary Makers",
    "YouTube Creators"
  ];

  // Duplicate items twice to ensure a seamless infinite scroll loop
  const marqueeItems = [...items, ...items];

  return (
    <div className="w-full bg-[#F4F4F5] border-y border-gray-100 overflow-hidden py-10 relative flex items-center">

      {/* Optional gradient fade at edges to make it look cleaner like the screenshot */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F4F4F5] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F4F4F5] to-transparent z-10" />

      <div className="flex w-full">
        <motion.div
          className="flex gap-12 md:gap-24 whitespace-nowrap items-center min-w-max px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 45, repeat: Infinity }}
        >
          {marqueeItems.map((item, idx) => (
            <span
              key={idx}
              className="text-[22px] md:text-[28px] font-bold text-[#A1A1AA] hover:text-[#71717A] tracking-tight transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
