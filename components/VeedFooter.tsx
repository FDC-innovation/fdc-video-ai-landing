"use client";

import React from "react";
import { motion } from "framer-motion";
import { Twitter, Instagram, Linkedin, Youtube, ArrowUpRight, Zap } from "lucide-react";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const navLinks = [
  { label: "Features", sectionId: "features" },
  { label: "Templates", sectionId: "templates" },
  { label: "How It Works", sectionId: "how-it-works" },
  { label: "Use Cases", sectionId: "use-cases" },
  { label: "Contact", sectionId: "contact" },
];

const socials = [
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/company/fdc-innovation-labs/?viewAsMember=true",
    label: "LinkedIn",
  },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

export function VeedFooter() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#080808]">

      {/* ── Ambient glows ── */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[-10%] top-[-20%] w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(90,107,251,0.18) 0%, transparent 65%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute right-[-5%] bottom-[-10%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(217,70,239,0.15) 0%, transparent 65%)", filter: "blur(100px)" }}
        />
      </div>

      {/* ── Giant wordmark watermark ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-center overflow-hidden select-none">
        <span
          className="text-[clamp(80px,14vw,180px)] font-[900] leading-none tracking-tighter opacity-[0.03] text-white whitespace-nowrap"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          CHALCHITRA
        </span>
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-6">

        {/* ── Hero CTA band ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col md:flex-row items-center justify-between gap-8 py-14 px-10 mt-16 rounded-[28px] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(90,107,251,0.12) 0%, rgba(217,70,239,0.08) 60%, rgba(0,0,0,0) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Card inner glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[28px]"
            style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(90,107,251,0.1) 0%, transparent 60%)" }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              >
                <Zap size={16} style={{ color: "#818CF8" }} />
              </motion.div>
              <span
                className="text-[12px] font-bold tracking-widest uppercase"
                style={{ color: "#818CF8", fontFamily: "var(--font-syne)" }}
              >
                Closed Beta · Limited Spots
              </span>
            </div>
            <h3
              className="text-[28px] md:text-[36px] font-[900] leading-tight text-white mb-2"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Ready to stop editing<br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(90deg, #818CF8, #D946EF)" }}
              >
                and start creating?
              </span>
            </h3>
            <p className="text-[15px]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
              Join 2,400+ creators already on the waitlist.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(129,140,248,0.4)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("contact")}
            className="relative z-10 flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[15px] flex-shrink-0 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #5A6BFB, #9333EA)",
              color: "white",
              fontFamily: "var(--font-syne)",
              boxShadow: "0 4px 24px rgba(90,107,251,0.3)",
            }}
          >
            Get Early Access
            <ArrowUpRight size={16} />
          </motion.button>
        </motion.div>

        {/* ── Divider ── */}
        <div className="h-px my-14" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

        {/* ── Main footer grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col gap-5"
          >
            <div className="flex items-center gap-3">
              <span
                className="text-[28px] font-[900] tracking-tight text-white"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Chalchitra
              </span>
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(90,107,251,0.12)",
                  border: "1px solid rgba(90,107,251,0.25)",
                  color: "#818CF8",
                  fontFamily: "var(--font-syne)",
                }}
              >
                BETA
              </span>
            </div>

            <p
              className="text-[14px] leading-[1.75] max-w-[340px]"
              style={{ color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-inter)" }}
            >
              The AI-native video creation studio. Built for creators who want to publish more and edit less.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-1">
              {socials.map(({ Icon, href, label }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="group w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(90,107,251,0.15)";
                    el.style.borderColor = "rgba(129,140,248,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(255,255,255,0.04)";
                    el.style.borderColor = "rgba(255,255,255,0.07)";
                  }}
                >
                  <Icon
                    size={15}
                    strokeWidth={2}
                    style={{ color: "rgba(255,255,255,0.4)", transition: "color 0.2s" }}
                    className="group-hover:text-[#818CF8]"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Nav */}
          <div className="lg:col-span-3">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[10px] font-bold tracking-[0.15em] uppercase mb-5"
              style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-syne)" }}
            >
              Navigate
            </motion.p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map(({ label, sectionId }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <button
                    onClick={() => scrollTo(sectionId)}
                    className="group flex items-center gap-0 text-[14px] transition-all duration-300 bg-transparent border-0 p-0 cursor-pointer"
                    style={{ color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-inter)" }}
                  >
                    <span
                      className="inline-block max-w-0 overflow-hidden transition-all duration-300 group-hover:max-w-[20px] group-hover:mr-2 h-px"
                      style={{ background: "linear-gradient(90deg, #5A6BFB, #D946EF)" }}
                    />
                    <span className="group-hover:text-white transition-colors duration-200">{label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Built by */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col gap-4"
          >
            <p
              className="text-[10px] font-bold tracking-[0.15em] uppercase"
              style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-syne)" }}
            >
              Built by
            </p>
            <div
              className="rounded-2xl p-5 flex flex-col gap-2"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                className="text-[15px] font-bold text-white"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                FDC Innovation Labs
              </p>
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}
              >
                Building AI-first tools for the next generation of creators.
              </p>
              <motion.a
                href="https://www.linkedin.com/company/fdc-innovation-labs/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 3 }}
                className="flex items-center gap-1.5 text-[12px] font-semibold mt-1"
                style={{ color: "#818CF8", fontFamily: "var(--font-inter)" }}
              >
                View on LinkedIn <ArrowUpRight size={12} />
              </motion.a>
            </div>
          </motion.div>

        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between py-6 gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p
            className="text-[12px]"
            style={{ color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-inter)" }}
          >
            © {new Date().getFullYear()} Chalchitra · FDC Innovation Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#818CF8" }}
            />
            <p
              className="text-[12px]"
              style={{ color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-inter)" }}
            >
              AI-powered · Built in India
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
