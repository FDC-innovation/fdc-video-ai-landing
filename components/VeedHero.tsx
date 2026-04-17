"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Download, Subtitles, MoreVertical, Edit2, Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";

function scrollTo(id: string, closeMobile?: () => void) {
  closeMobile?.();
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, closeMobile ? 200 : 0);
}

const links = [
  { label: "Features", id: "features" },
  { label: "Templates", id: "templates" },
  { label: "How It Works", id: "how-it-works" },
  { label: "Use Cases", id: "use-cases" },
  { label: "Contact", id: "contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Fixed pill navbar */}
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-0 right-0 z-[999] flex justify-center px-4"
      >
        <div
          className="w-full max-w-[780px] flex items-center justify-between transition-all duration-500"
          style={{
            background: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(0,0,0,0.05)",
            borderRadius: "100px",
            padding: "8px 8px 8px 24px",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.8) inset"
              : "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[17px] font-[900] tracking-tight text-[#1C1C1C] whitespace-nowrap bg-transparent border-0 p-0 cursor-pointer"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Chalchitra
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="px-4 py-2 rounded-full text-[13px] font-medium text-[#52525B] hover:text-[#1C1C1C] hover:bg-black/[0.04] transition-all duration-150 bg-transparent border-0 cursor-pointer whitespace-nowrap"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#52525B] hover:bg-black/[0.05] transition-colors bg-transparent border-0 cursor-pointer"
          >
            {menuOpen ? <X size={17} strokeWidth={2.5} /> : <Menu size={17} strokeWidth={2.5} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[72px] left-4 right-4 z-[998] rounded-[24px] overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
            }}
          >
            <div className="flex flex-col p-3 gap-1">
              {links.map(({ label, id }, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(id, closeMenu)}
                  className="text-left px-4 py-3 rounded-xl text-[15px] font-medium text-[#3F3F46] hover:text-[#1C1C1C] hover:bg-black/[0.04] transition-all bg-transparent border-0 cursor-pointer"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {label}
                </motion.button>
              ))}
              <div className="h-px mx-2 my-1 bg-black/[0.05]" />
              <button
                onClick={() => scrollTo("contact", closeMenu)}
                className="mx-1 mb-1 py-3 rounded-xl text-[15px] font-bold text-white cursor-pointer border-0"
                style={{
                  background: "linear-gradient(135deg, #7D55FA, #5A3FD4)",
                  fontFamily: "var(--font-syne)",
                }}
              >
                Get Early Access →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function VeedHero() {
  return (
    <div className="bg-[#F4F4F5] text-[#121212] min-h-[90vh] font-sans">
      <Navbar />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Side */}
          <div className="flex flex-col items-start">
            <div className="mb-4 flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold bg-[#7D55FA]/10 text-[#7D55FA] border border-[#7D55FA]/20">
              <span className="animate-pulse">✦</span> Chalchitra AI Studio
            </div>
            <h1
              className="text-[52px] md:text-[68px] lg:text-[76px] font-[900] leading-[0.9] tracking-[-0.02em] text-[#1C1C1C] mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              AI Native
              <br />
              <span className="text-[#7D55FA]"> Video Editing</span>
            </h1>
            <p className="text-[18px] md:text-[20px] text-[#3F3F46] leading-[1.5] max-w-[520px] mb-8 font-medium tracking-[-0.01em]">
              Chalchitra turns raw footage and podcast recordings into publish-ready content in minutes. AI-native. No
              timeline. No complexity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollTo("contact")}
                className="bg-[#7D55FA] text-white px-8 py-4 rounded-full text-[18px] font-semibold flex items-center justify-center hover:bg-[#6841E3] transition-colors shadow-sm"
              >
                Get Early Access
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollTo("features")}
                className="bg-white border border-gray-200 text-[#1C1C1C] px-8 py-4 rounded-full text-[18px] font-medium flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
              >
                See What It Can Do ↓
              </motion.button>
            </div>
            <p className="text-[14px] text-[#71717A] font-medium ml-2">
              <span className="text-[#7D55FA]">✦</span> 2,400+ creators on the waitlist
            </p>
          </div>

          {/* Right Side (Image + Widget) */}
          <div className="relative w-full aspect-[4/3] sm:aspect-auto sm:h-[450px] max-w-[600px] mx-auto lg:ml-auto select-none mt-10 lg:mt-0">
            {/* Base Image Placeholder */}
            <div className="absolute inset-0 bg-[#A688FA] rounded-[24px] overflow-hidden shadow-sm">
              {/* Optional background image fill */}
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center mix-blend-overlay opacity-60" />
              {/* Orange circle detail from screenshot */}
              <div className="absolute -right-4 top-16 w-16 h-24 bg-[#FF7E00] rounded-l-full blur-[1px]" />
            </div>

            {/* Floating UI Widget Container */}
            <div className="absolute left-0 bottom-4 sm:-left-12 sm:bottom-12 z-10 w-full sm:w-[340px]">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-[#F3F4F6] rounded-[20px] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 backdrop-blur-xl relative"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-[17px] font-bold text-[#111827]">Subtitles</h3>
                    <div className="flex items-center gap-1.5 text-[13px] text-[#6B7280] mt-0.5">
                      <Subtitles size={14} className="text-[#3B82F6]" />
                      <span className="font-medium">English</span>
                      <span className="text-[9px]">▼</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-gray-200 rounded-md transition-colors">
                      <Edit2 size={14} className="text-gray-500" />
                    </button>
                    <button className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-[8px] text-[13px] font-medium shadow-sm hover:bg-gray-50 transition-colors">
                      <span className="opacity-50">Ι</span> Edit
                    </button>
                  </div>
                </div>

                {/* Text Lines */}
                <div className="space-y-4 text-[14px] px-1 relative">
                  <div className="flex border-l-[3px] border-[#3B82F6] pl-3 py-1 text-[#374151] font-medium tracking-tight">
                    Stop scrolling! If you want to
                  </div>
                  <div className="flex pl-[15px] text-[#374151] font-medium tracking-tight relative">
                    But... the results? Unless you
                    <div className="absolute top-0 bottom-0 left-[15px] right-[40%] bg-[#ECFDF5]/80 -z-10 mix-blend-multiply" />
                  </div>
                  <div className="flex justify-between items-start pl-[15px] text-[#6B7280] text-[13px] pr-2">
                    <span className="leading-snug">
                      The best hooks usually <br /> happen in the first 3 seconds.
                    </span>
                    <MoreVertical size={16} className="text-gray-400 mt-1" />
                  </div>
                </div>

                {/* Floating Buttons inside widget */}
                <div className="absolute -top-8 -right-8 flex flex-col gap-2 z-20 hidden sm:flex">
                  <button className="flex items-center justify-center gap-2 bg-white text-black text-[13px] font-semibold px-4 py-2.5 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.08)] whitespace-nowrap border border-gray-100 transition-transform hover:scale-105">
                    <span className="text-gray-400 text-lg leading-none">+</span> Add Subtitles...
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-[#7D55FA] text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl shadow-[0_8px_20px_rgba(125,85,250,0.25)] border border-[#7D55FA] transition-transform hover:scale-105">
                    <Download size={14} /> Download <span className="opacity-70 ml-2 text-[10px]">▼</span>
                  </button>
                </div>
              </motion.div>

              {/* Absolute Dropdown inside widget (SRT format) */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-16 top-[65%] z-30 bg-white rounded-[16px] p-2 shadow-[0_15px_40px_rgba(0,0,0,0.12)] w-[160px] border border-gray-100 hidden sm:block"
              >
                <div className="flex flex-col gap-1.5">
                  <button className="text-left px-3 py-1.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                    .VTT format
                  </button>
                  <button className="text-left px-3 py-1.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                    .TXT format
                  </button>
                  <button className="text-left px-3 py-2 text-[14px] font-medium text-white bg-[#7D55FA] rounded-lg shadow-sm">
                    .SRT format
                  </button>
                </div>
                {/* Mouse cursor icon */}
                <div className="absolute -bottom-6 right-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.5 2.5L16.5 12L11 13L15 21L12.5 22L8.5 14L4 17.5V2.5Z"
                      fill="white"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20 flex flex-col items-center">
        {/* Rating Pill */}
        <div className="bg-white inline-flex items-center gap-4 px-6 py-3 rounded-full shadow-sm mb-12 border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="bg-[#1C1C1C] text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold">
              C
            </div>
            <span className="text-[22px] font-bold text-[#1C1C1C]">4.6</span>
          </div>
          <div className="flex gap-1 items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={i === 5 ? "url(#half)" : "#828282"}
                stroke="none"
              >
                {i === 5 && (
                  <defs>
                    <linearGradient id="half">
                      <stop offset="50%" stopColor="#828282" />
                      <stop offset="50%" stopColor="#E5E7EB" />
                    </linearGradient>
                  </defs>
                )}
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="text-[#71717A] text-[15px] font-medium pr-2">319 reviews</span>
        </div>
      </div>
    </div>
  );
}
