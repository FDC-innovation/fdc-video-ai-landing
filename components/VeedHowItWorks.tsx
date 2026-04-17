"use client";

import { motion } from "framer-motion";
import React from "react";

export function VeedHowItWorks() {
  const steps = [
    {
      step: "STEP 1",
      title: "Drop Your Footage",
      description: "Any format. Phone video, screen recording, DSLR, podcast audio. Chalchitra accepts everything.",
      illustration: (
        <div className="relative w-full h-[200px] flex items-center justify-center bg-transparent">
          {/* VEED-style simple overlapping shapes */}
          {/* Cloud base */}
          <div className="absolute w-24 h-16 bg-[#5A6BFB] rounded-full top-[50%] left-[45%] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute w-16 h-16 bg-[#5A6BFB] rounded-full top-[40%] left-[38%] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute w-14 h-14 bg-[#5A6BFB] rounded-full top-[60%] left-[32%] -translate-x-1/2 -translate-y-1/2" />
          
          {/* Floating upload circle */}
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute w-16 h-16 bg-gradient-to-t from-[#B0A6FF]/40 to-[#EAE7FF]/90 rounded-full flex flex-col items-center justify-center top-[65%] left-[55%] -translate-x-1/2 -translate-y-1/2 backdrop-blur-md border border-white/40 shadow-sm"
          >
            <div className="text-white">↑</div>
            <div className="text-[8px] font-bold text-white leading-none mt-1">87%</div>
          </motion.div>
          {/* Tiny floating file indicator */}
          <motion.div 
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1, scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-[25%] right-[20%] bg-white px-2 py-1 rounded-[6px] shadow-sm text-[8px] font-semibold text-gray-500 border border-gray-100"
          >
            uploading_raw.mp4
          </motion.div>
        </div>
      )
    },
    {
      step: "STEP 2",
      title: "Pick a Template",
      description: "Choose from 60+ templates or describe your vibe. Set platform, length, tone.",
      illustration: (
        <div className="relative w-full h-[200px] flex items-center justify-center bg-transparent">
          {/* Sparkles */}
          <motion.div 
             animate={{ rotate: 360 }}
             transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
             className="absolute top-[30%] right-[30%] text-[#B0A6FF] text-4xl opacity-60"
          >
            ✦
          </motion.div>
          
          {/* Central rounded square */}
          <div className="absolute w-24 h-24 bg-[#5A6BFB] rounded-[20px] flex items-center justify-center top-[50%] left-[45%] -translate-x-1/2 -translate-y-1/2 shadow-inner overflow-hidden">
             {/* Magic wand / Style icon representation */}
             <div className="w-12 h-12 border-2 border-white/60 rounded-full flex items-center justify-center relative">
               <div className="w-full h-px bg-white/60 absolute" />
               <div className="w-px h-full bg-white/60 absolute" />
             </div>
          </div>

          <motion.div 
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
            className="absolute top-[65%] right-[35%] bg-white/90 px-3 py-1.5 rounded-lg shadow-md border border-gray-100 backdrop-blur-sm"
          >
            <div className="text-[10px] font-bold text-[#5A6BFB]">VIBE SETTINGS</div>
            <div className="flex gap-1 mt-1">
               <span className="w-2 h-2 rounded-full bg-pink-400" />
               <span className="w-2 h-2 rounded-full bg-blue-400" />
               <span className="w-2 h-2 rounded-full bg-orange-400" />
            </div>
          </motion.div>
        </div>
      )
    },
    {
      step: "STEP 3",
      title: "Download or Publish",
      description: "Export to YouTube, TikTok, Instagram, LinkedIn, Spotify simultaneously. One click.",
      illustration: (
        <div className="relative w-full h-[200px] flex items-center justify-center bg-transparent">
          {/* Document shape */}
          <div className="absolute w-20 h-24 bg-[#5A6BFB] rounded-xl top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute w-8 h-8 bg-[#F4F4F5] rounded-bl-xl top-[35%] right-[35%] mix-blend-screen" />
          
          {/* Frosted folder front */}
          <motion.div 
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
            className="absolute w-28 h-16 bg-gradient-to-t from-[#B0A6FF]/60 to-[#EAE7FF]/90 rounded-xl top-[58%] left-[50%] -translate-x-1/2 -translate-y-1/2 backdrop-blur-md shadow-sm border border-white/50"
          />

          {/* Social media ready pills */}
          <div className="absolute top-[30%] -left-[5%] flex flex-col gap-1.5">
             <div className="bg-white px-2 py-0.5 rounded-md shadow-sm border border-gray-100 flex items-center gap-1.5 transform -rotate-6">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="text-[8px] font-bold text-gray-700">YouTube Ready</span>
             </div>
             <div className="bg-white px-2 py-0.5 rounded-md shadow-sm border border-gray-100 flex items-center gap-1.5 transform rotate-3 ml-4">
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
                <span className="text-[8px] font-bold text-gray-700">TikTok Ready</span>
             </div>
             <div className="bg-white px-2 py-0.5 rounded-md shadow-sm border border-gray-100 flex items-center gap-1.5 transform -rotate-2 ml-1">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                <span className="text-[8px] font-bold text-gray-700">IG Ready</span>
             </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="bg-[#F4F4F5] py-24 px-6 md:px-12 w-full font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-[#5A6BFB] font-bold text-sm tracking-widest uppercase mb-4">How It Works</p>
          <h2 className="text-[#1C1C1C] text-[40px] md:text-[56px] font-[900] leading-tight tracking-[-0.02em] mb-4" style={{ fontFamily: "var(--font-inter)" }}>
            Raw to ready in 3 steps.
          </h2>
          <p className="text-[#3F3F46] text-xl font-medium">
            The fastest path from footage to finished.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col border border-gray-100"
            >
              {/* Illustration Top Half */}
              <div className="w-full bg-[#FAFAFA] border-b border-gray-50 flex items-center justify-center p-6 min-h-[220px]">
                {item.illustration}
              </div>
              
              {/* Text Bottom Half */}
              <div className="p-8 lg:p-10 flex-1 bg-white">
                <span className="text-[12px] font-bold tracking-widest text-[#111827] uppercase opacity-90 block mb-3">
                  {item.step}
                </span>
                <h3 className="text-[26px] font-semibold text-[#1C1C1C] mb-4 tracking-[-0.01em] leading-tight">
                  {item.title}
                </h3>
                <p className="text-[#4B5563] text-[16px] leading-[1.6]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
