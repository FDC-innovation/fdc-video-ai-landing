"use client";

import { motion } from "framer-motion";
import React from "react";
import {
  Scissors,
  Subtitles,
  Crop,
  Mic2,
  MonitorPlay,
  Music,
  Palette,
  PenTool,
  LayoutGrid,
  Download,
} from "lucide-react";

// Reusable Text Block Component
function TextCard({ title, desc, tag }: { title: string; desc: string; tag?: string }) {
  return (
    <div className="bg-white rounded-[32px] p-10 md:p-16 flex flex-col justify-center h-full shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-gray-100">
      {tag && (
        <span className="bg-[#1C1C1C] text-white text-[11px] px-3 py-1.5 rounded-full uppercase font-bold tracking-widest self-start mb-6">
          {tag}
        </span>
      )}
      <h3
        className="text-[32px] md:text-[42px] font-semibold text-[#1C1C1C] mb-6 leading-[1.1] tracking-[-0.02em]"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {title}
      </h3>
      <p
        className="text-[#4B5563] text-[18px] md:text-[20px] leading-[1.6]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {desc}
      </p>
    </div>
  );
}

// Reusable Visual Box Component
function VisualCard({ children, bgClass }: { children: React.ReactNode; bgClass: string }) {
  return (
    <div
      className={`relative w-full min-h-[400px] md:min-h-[500px] rounded-[32px] overflow-hidden flex items-center justify-center p-8 ${bgClass}`}
    >
      {children}
    </div>
  );
}

export function VeedFeatures() {
  return (
    <section id="features" className="bg-[#F4F4F5] py-24 px-6 md:px-12 w-full font-sans border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <p
            className="text-[#5A6BFB] font-bold text-sm tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Capabilities
          </p>
          <h2
            className="text-[#1C1C1C] text-[40px] md:text-[64px] font-[900] leading-[1.1] tracking-[-0.02em] mb-6"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            AI Powered
            <br />
            Transcription & Editing
          </h2>
          <p
            className="text-[#3F3F46] text-xl md:text-2xl font-medium tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            From short-form social to long-form podcasts — one AI platform handles it all.
          </p>
        </div>

        {/* DETAILED ALTERNATING SECTIONS (Top 4 Core Features) */}
        <div className="flex flex-col gap-6 mb-16">
          {/* 1. AI Smart Edit (Visual Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VisualCard bgClass="bg-[#EEF2FF] p-0 block relative">
              <div className="absolute inset-0 w-full h-full">
                <img
                  src="/photo/ChatGPT%20Image%20Apr%2015,%202026,%2010_35_17%20AM.png"
                  alt="AI Smart Edit"
                  className="w-full h-full object-contain p-8 md:p-12 scale-110"
                />
              </div>
            </VisualCard>

            <TextCard
              title="AI Smart Edit"
              desc="Drop your footage. Our AI analyzes pacing, removes dead air, fixes jump cuts, and assembles a polished cut automatically."
            />
          </div>

          {/* 2. Auto Captions (Text Left, Visual Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="order-2 lg:order-1">
              <TextCard
                title="Auto Captions"
                desc="98% accurate captions in seconds. Animated, branded, ready to post. 'This is how you build in public...'"
                tag="CC"
              />
            </div>
            <div className="order-1 lg:order-2">
              <VisualCard bgClass="bg-[#EAE7FF] flex items-center justify-center">
                {/* Floating Auto Subtitle Menu */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white w-[90%] max-w-[320px] rounded-[24px] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] z-20 border border-gray-100"
                >
                  <div className="flex justify-between items-center px-1 mb-6">
                    <span className="font-bold text-[18px] text-gray-200 tracking-tight">Subtitles</span>
                    <span className="text-[13px] text-gray-400 font-mono">~11527 minutes</span>
                  </div>

                  <div className="bg-[#7D55FA] text-white w-full rounded-xl py-4 flex items-center justify-center gap-3 font-medium text-[15px] shadow-[0_8px_20px_rgba(125,85,250,0.3)] relative cursor-pointer">
                    <Subtitles size={20} /> Auto Subtitle
                    {/* Mouse cursor icon mimicking screenshot */}
                    <div className="absolute -bottom-5 -right-3 transform scale-110 drop-shadow-md z-30">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5.5 2.5L16.5 12L11 13L15 21L12.5 22L8.5 14L4 17.5V2.5Z"
                          fill="white"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-400 px-2 mt-6 mb-3">More options</p>
                  <div className="flex flex-col gap-2">
                    <div className="bg-[#F9FAFB] text-gray-600 text-[13px] font-medium py-3 rounded-lg flex justify-center cursor-not-allowed opacity-70">
                      Transcribe Manually
                    </div>
                    <div className="bg-[#F9FAFB] text-gray-600 text-[13px] font-medium py-3 rounded-lg flex justify-center cursor-not-allowed opacity-70">
                      Upload Subtitles
                    </div>
                  </div>
                </motion.div>
              </VisualCard>
            </div>
          </div>

          {/* 3. Smart Reframe (Visual Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VisualCard bgClass="bg-[#EBF8EF] p-0 block relative">
              <div className="absolute inset-0 w-full h-full">
                <img
                  src="/photo/ChatGPT Image Apr 15, 2026, 10_16_13 AM.png"
                  alt="Smart Reframe"
                  className="w-full h-full object-contain p-8 md:p-12"
                />
              </div>
            </VisualCard>

            <TextCard
              title="Smart Reframe"
              desc="One video, every platform. Auto-crops for 9:16, 16:9, 1:1 with subject tracking."
            />
          </div>

          {/* 4. Podcast Studio (Text Left, Visual Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="order-2 lg:order-1">
              <TextCard
                title="Podcast Studio"
                desc="Turn hours of raw podcast into highlights, chapters, viral clips and show notes — automatically."
                tag="NEW"
              />
            </div>
            <div className="order-1 lg:order-2">
              <VisualCard bgClass="bg-[#FDF4FF] p-0 block relative">
                <div className="absolute inset-4 rounded-[24px] overflow-hidden border border-white/50 shadow-sm">
                  <img src="/photo/podcast.png" alt="Podcast Studio" className="w-full h-full object-cover" />
                </div>

                {/* Overlay Timeline UI */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100">
                  <div className="flex justify-between items-center text-[11px] font-mono text-gray-500 mb-2 font-bold">
                    <span>0:00</span>
                    <span>2:14:32</span>
                  </div>

                  <div className="relative mb-6">
                    <div className="w-full h-2 bg-gray-200 rounded-full" />
                    <div className="absolute top-0 left-[15%] w-[20%] h-2 bg-[#5A6BFB] rounded-full shadow-sm" />
                    <div className="absolute top-0 left-[55%] w-[12%] h-2 bg-pink-500 rounded-full shadow-sm" />
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center bg-white px-3 py-2 rounded-lg border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-800">
                        <span className="text-[#5A6BFB]">✦</span> Best Moment
                      </div>
                      <span className="text-[12px] font-mono text-gray-400">12:34</span>
                    </div>
                    <div className="flex justify-between items-center bg-white px-3 py-2 rounded-lg border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-800">
                        <span className="text-pink-500">✦</span> Viral Hook
                      </div>
                      <span className="text-[12px] font-mono text-gray-400">1:24:15</span>
                    </div>
                  </div>
                </div>
              </VisualCard>
            </div>
          </div>
        </div>

        {/* SMALLER GRID - Remainder 5 Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Silence Remover */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col"
          >
            <div className="bg-[#F4F4F5] w-12 h-12 rounded-xl flex items-center justify-center text-gray-500 mb-6">
              <MonitorPlay size={24} />
            </div>
            <h4 className="text-[20px] font-semibold text-[#1C1C1C] mb-3">Silence Remover</h4>
            <p className="text-[15px] text-[#4B5563] leading-[1.6]">Dead air detected and removed automatically.</p>
          </motion.div>

          {/* AI Music Sync */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col relative overflow-hidden"
          >
            <div className="bg-[#EEF2FF] w-12 h-12 rounded-xl flex items-center justify-center text-[#5A6BFB] mb-6">
              <Music size={24} />
            </div>
            <h4 className="text-[20px] font-semibold text-[#1C1C1C] mb-3">AI Music Sync</h4>
            <p className="text-[15px] text-[#4B5563] leading-[1.6]">
              Cuts sync to the beat. Royalty-free music library included.
            </p>
            <div className="absolute -bottom-2 right-4 text-[80px] text-[#5A6BFB] opacity-5">♪</div>
          </motion.div>

          {/* Auto Color Grade */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col"
          >
            <div className="bg-[#FDF4FF] w-12 h-12 rounded-xl flex items-center justify-center text-pink-500 mb-6">
              <Palette size={24} />
            </div>
            <h4 className="text-[20px] font-semibold text-[#1C1C1C] mb-3">Auto Color Grade</h4>
            <p className="text-[15px] text-[#4B5563] leading-[1.6]">Cinematic look applied in one click.</p>

            <div className="mt-auto pt-6 flex items-center w-full bg-[#F4F4F5] rounded-xl p-1.5 border border-gray-200">
              <div className="flex-1 text-center text-[11px] font-bold text-gray-400 py-1.5">DULL</div>
              <div className="flex-1 text-center text-[11px] font-bold text-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg py-1.5 shadow-sm">
                VIVID
              </div>
            </div>
          </motion.div>

          {/* Brand Kit */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col relative overflow-hidden lg:col-span-1.5"
          >
            <div className="bg-[#F4F4F5] w-12 h-12 rounded-xl flex items-center justify-center text-gray-500 mb-6">
              <PenTool size={24} />
            </div>
            <h4 className="text-[20px] font-semibold text-[#1C1C1C] mb-3">Brand Kit</h4>
            <p className="text-[15px] text-[#4B5563] leading-[1.6]">
              Upload logo, set colors and fonts once. Every export is branded.
            </p>
            <div className="absolute -bottom-8 -right-4 text-[100px] text-gray-200 opacity-20">◈</div>
          </motion.div>

          {/* B-Roll AI */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col relative overflow-hidden lg:col-span-1.5"
          >
            <div className="bg-[#EEF2FF] w-12 h-12 rounded-xl flex items-center justify-center text-[#5A6BFB] mb-6">
              <LayoutGrid size={24} />
            </div>
            <h4 className="text-[20px] font-semibold text-[#1C1C1C] mb-3">B-Roll AI Suggestions</h4>
            <p className="text-[15px] text-[#4B5563] leading-[1.6]">
              AI matches your script with relevant stock footage from our 10M+ library.
            </p>
            <div className="absolute bottom-6 right-6 grid grid-cols-2 gap-1.5 opacity-20">
              <div className="w-5 h-5 bg-black rounded-md" />
              <div className="w-5 h-5 bg-black rounded-md" />
              <div className="w-5 h-5 bg-[#5A6BFB] rounded-md" />
              <div className="w-5 h-5 bg-black rounded-md" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
