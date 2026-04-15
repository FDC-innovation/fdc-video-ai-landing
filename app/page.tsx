"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { VeedHero } from "../components/VeedHero";
import { VeedHowItWorks } from "../components/VeedHowItWorks";
import { VeedFeatures } from "../components/VeedFeatures";
import { VeedMarquee } from "../components/VeedMarquee";
import { VeedUseCases } from "../components/VeedUseCases";
import { VeedTemplates } from "../components/VeedTemplates";
import { VeedTestimonials } from "../components/VeedTestimonials";
import { VeedContact } from "../components/VeedContact";
import { VeedWaitlist } from "../components/VeedWaitlist";
import { VeedFooter } from "../components/VeedFooter";

gsap.registerPlugin(ScrollTrigger, useGSAP);
import {
  BrainCircuit,
  Upload,
  Sliders,
  Zap,
  Check,
  CheckCircle2,
  Star,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUp,
  Menu,
  X,
  ChevronRight,
  Loader2,
  Mic,
  Headphones,
  Globe,
  Sun,
  Moon,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DESIGN TOKENS  (all CSS vars — theme-aware)
───────────────────────────────────────────── */
const ACCENT = "var(--accent)";
const SURFACE = "var(--surface)";
const BORDER = "var(--border)";
const MUTED = "var(--text-muted)";
const DANGER = "var(--danger)";

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─────────────────────────────────────────────
   SECTION WRAPPER — scroll reveal
───────────────────────────────────────────── */
function Section({
  children,
  className = "",
  id = "",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTER — GSAP ScrollTrigger
───────────────────────────────────────────── */
function Counter({
  target,
  suffix = "",
  prefix = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    gsap.set(el, { opacity: 0, y: 16 });
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = prefix + Math.round(obj.val) + suffix;
          },
        });
      },
    });
  });

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   CURSOR GLOW
───────────────────────────────────────────── */
function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 18 });
  const springY = useSpring(y, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 rounded-full"
      style={{
        width: "700px",
        height: "700px",
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background: `radial-gradient(circle, rgba(0,255,209,0.05) 0%, transparent 65%)`,
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { scrollY } = useScroll();

  // Initialise from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("chalchitra-theme");
    const prefersDark = !saved || saved === "dark";
    setIsDark(prefersDark);
    document.documentElement.setAttribute(
      "data-theme",
      prefersDark ? "dark" : "light"
    );
  }, []);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 50));
  }, [scrollY]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    const theme = next ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("chalchitra-theme", theme);
  };

  const links = ["Features", "Templates", "How It Works", "Use Cases", "Contact"];

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    document
      .getElementById(id.toLowerCase().replace(/\s+/g, "-"))
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 will-change-transform ${
        scrolled
          ? isDark
            ? "bg-[#0A0A0A]/70 backdrop-blur-[24px] backdrop-saturate-[180%] border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-3"
            : "bg-[#FFFFFF]/70 backdrop-blur-[24px] backdrop-saturate-[180%] border-b border-black/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-3"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span
            className="text-xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            <span className="text-shimmer">Chalchitra</span>
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="text-sm transition-colors duration-200 cursor-pointer bg-transparent border-0"
              style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              {l}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: 15 }}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300"
            style={{
              background: "var(--surface)",
              border: `1px solid var(--border)`,
              color: MUTED,
            }}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: `0 0 24px rgba(var(--accent-rgb),0.45)` }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("waitlist")}
            className="px-5 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all"
            style={{
              background: ACCENT,
              color: "#080808",
              fontFamily: "var(--font-syne)",
            }}
          >
            Get Early Access →
          </motion.button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              background: "var(--surface)",
              border: `1px solid var(--border)`,
              color: "var(--text-muted)",
            }}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            className="cursor-pointer bg-transparent border-0"
            style={{ color: "var(--fg)" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t backdrop-blur-xl px-6 py-4 flex flex-col gap-4"
            style={{
              borderTopColor: "var(--nav-border)",
              background: "var(--menu-bg)",
            }}
          >
            {links.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className="text-left text-sm py-2 cursor-pointer transition-colors bg-transparent border-0"
                style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
              >
                {l}
              </button>
            ))}
            <button
              onClick={() => scrollTo("waitlist")}
              className="w-full py-2 rounded-full text-sm font-semibold cursor-pointer"
              style={{ background: ACCENT, color: "#080808" }}
            >
              Get Early Access →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─────────────────────────────────────────────
   HERO EDITOR MOCKUP
───────────────────────────────────────────── */
function EditorMockup() {
  const steps = [
    { label: "Silence removed", done: true },
    { label: "Color graded", done: true },
    { label: "Adding captions...", done: false, active: true },
    { label: "Exporting", done: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 1.0,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className="relative w-full max-w-3xl mx-auto rounded-2xl border overflow-hidden"
      style={{
        background: "rgba(17,17,17,0.97)",
        borderColor: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(24px)",
        boxShadow: `0 40px 120px rgba(0,0,0,0.85), 0 0 80px rgba(0,255,209,0.07)`,
      }}
    >
      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        className="absolute top-3 right-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
        style={{
          background: "rgba(0,255,209,0.1)",
          border: `1px solid rgba(0,255,209,0.25)`,
          color: ACCENT,
          fontFamily: "var(--font-syne)",
        }}
      >
        <span
          className="w-2 h-2 rounded-full pulse-glow"
          style={{ background: ACCENT }}
        />
        AI Processing · 00:02:14 saved
      </motion.div>

      {/* Top bar */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b"
        style={{ borderBottomColor: BORDER }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: DANGER }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#F5A623" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#27C940" }} />
        </div>
        <span
          className="text-xs mx-auto"
          style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
        >
          chalchitra_raw.mp4
        </span>
      </div>

      {/* Preview area */}
      <div
        className="flex gap-px relative"
        style={{ height: "180px", background: "rgba(0,0,0,0.5)" }}
      >
        {/* RAW side */}
        <div className="relative flex-1 overflow-hidden flex items-end">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #2a1a0e 0%, #1a0a0a 40%, #0e1520 70%, #080808 100%)",
              filter: "contrast(1.4) saturate(0.3) brightness(0.6)",
            }}
          />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.02) 3px, rgba(255,255,255,0.02) 4px)`,
            }}
          />
          <span
            className="relative z-10 text-xs font-bold m-2 px-2 py-0.5 rounded"
            style={{
              background: "rgba(255,77,77,0.2)",
              border: `1px solid rgba(255,77,77,0.4)`,
              color: DANGER,
              fontFamily: "var(--font-syne)",
            }}
          >
            RAW
          </span>
        </div>

        {/* Divider handle */}
        <div
          className="relative flex-shrink-0 flex items-center justify-center cursor-ew-resize z-10"
          style={{ width: "20px", background: "rgba(0,0,0,0.6)" }}
        >
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px"
            style={{ background: "rgba(255,255,255,0.6)" }}
          />
          <div
            className="relative w-5 h-5 rounded-full border-2 flex items-center justify-center"
            style={{ background: "#1a1a1a", borderColor: "rgba(255,255,255,0.6)" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.8)" }}
            />
          </div>
        </div>

        {/* EDITED side */}
        <div className="relative flex-1 overflow-hidden flex items-end">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #0a2a1a 0%, #091a2a 40%, #1a0a2a 70%, #0a0a18 100%)",
              filter: "contrast(1.1) saturate(1.4) brightness(0.9)",
            }}
          />
          <div
            className="scan-line absolute left-0 right-0 h-px opacity-70"
            style={{
              background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
            }}
          />
          <span
            className="relative z-10 text-xs font-bold m-2 px-2 py-0.5 rounded"
            style={{
              background: "rgba(0,255,209,0.15)",
              border: `1px solid rgba(0,255,209,0.4)`,
              color: ACCENT,
              fontFamily: "var(--font-syne)",
            }}
          >
            EDITED
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div
        className="px-4 py-3 border-t relative overflow-hidden"
        style={{ borderTopColor: BORDER }}
      >
        <div className="flex gap-1 mb-2" style={{ height: "28px" }}>
          {[
            { w: "w-24", color: "bg-purple-600/70" },
            { w: "w-16", color: "bg-blue-600/70" },
            { w: "w-20", color: "bg-green-600/70" },
            { w: "w-12", color: "bg-yellow-600/70" },
            { w: "w-28", color: "bg-red-600/70" },
            { w: "w-10", color: "bg-pink-600/70" },
            { w: "w-20", color: "bg-teal-600/70" },
            { w: "w-16", color: "bg-orange-600/70" },
            { w: "w-14", color: "bg-indigo-600/70" },
          ].map((clip, i) => (
            <div
              key={i}
              className={`${clip.w} ${clip.color} rounded-sm border border-white/10 flex-shrink-0`}
            />
          ))}
        </div>
        <div className="playhead absolute top-3 w-px h-8" style={{ background: DANGER }}>
          <div
            className="w-2 h-2 rounded-full absolute -top-1 -translate-x-1/2"
            style={{ background: DANGER }}
          />
        </div>
      </div>

      {/* AI Status */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-t flex-wrap"
        style={{ borderTopColor: BORDER, background: "rgba(0,0,0,0.3)" }}
      >
        {steps.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
            style={{
              background: s.active
                ? "rgba(0,255,209,0.1)"
                : s.done
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.02)",
              border: s.active
                ? `1px solid rgba(0,255,209,0.3)`
                : `1px solid ${BORDER}`,
              color: s.active ? ACCENT : s.done ? "#888" : "#444",
              fontFamily: "var(--font-inter)",
              boxShadow: s.active ? `0 0 14px rgba(0,255,209,0.2)` : "none",
            }}
          >
            {s.done ? (
              <CheckCircle2 size={11} style={{ color: ACCENT }} />
            ) : s.active ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Loader2 size={11} />
              </motion.div>
            ) : (
              <span className="w-2.5 h-2.5 rounded-full border border-current inline-block" />
            )}
            {s.label}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
function HeroSection() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 180]);
  const ctaWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── Hero entrance timeline ─────────────────────────
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(
      "[data-hero-eyebrow]",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7 }
    )
      .fromTo(
        "[data-hero-line]",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 },
        "-=0.3"
      )
      .fromTo(
        "[data-hero-sub]",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.4"
      )
      .fromTo(
        "[data-hero-cta]",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.35"
      );

    // ── Floating mockup ────────────────────────────────
    gsap.to("[data-hero-mockup]", {
      y: -14,
      duration: 3.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1.2,
    });

    // ── Magnetic CTA button ────────────────────────────
    const wrap = ctaWrapRef.current;
    if (!wrap) return;
    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      gsap.to(wrap, { x: dx * 0.28, y: dy * 0.28, duration: 0.3, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(wrap, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.5)" });
    };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  });

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Background mesh */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="mesh-orb-1 absolute w-[700px] h-[700px] rounded-full opacity-25"
          style={{
            top: "-100px",
            left: "-100px",
            background: `radial-gradient(circle, rgba(0,255,209,0.2) 0%, transparent 70%)`,
            filter: "blur(90px)",
          }}
        />
        <div
          className="mesh-orb-2 absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            top: "200px",
            right: "-150px",
            background: `radial-gradient(circle, rgba(0,180,255,0.15) 0%, transparent 70%)`,
            filter: "blur(110px)",
          }}
        />
        <div
          className="mesh-orb-3 absolute w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            bottom: "100px",
            left: "30%",
            background: `radial-gradient(circle, rgba(130,0,255,0.12) 0%, transparent 70%)`,
            filter: "blur(130px)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-28 pb-16 max-w-5xl mx-auto w-full">
        {/* Eyebrow */}
        <div
          data-hero-eyebrow
          className="mb-6 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
          style={{
            background: "rgba(0,255,209,0.07)",
            border: `1px solid rgba(0,255,209,0.18)`,
            color: ACCENT,
            fontFamily: "var(--font-inter)",
            opacity: 0,
          }}
        >
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            style={{ display: "inline-block" }}
          >
            ✦
          </motion.span>
          <span>Chalchitra AI Studio · Closed Beta</span>
        </div>

        {/* Headline */}
        <h1
          className="font-black leading-none mb-6"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(36px, 8vw, 96px)",
            color: "var(--fg)",
          }}
        >
          <div className="overflow-hidden">
            <div data-hero-line className="flex justify-center" style={{ opacity: 0 }}>
              Stop Editing.
            </div>
          </div>
          <div className="overflow-hidden mt-2">
            <div data-hero-line className="flex justify-center" style={{ opacity: 0 }}>
              Start{" "}
              <span style={{ color: ACCENT, marginLeft: "0.25em" }}>Creating.</span>
            </div>
          </div>
        </h1>

        {/* Sub */}
        <p
          data-hero-sub
          className="text-lg max-w-2xl mb-10 leading-relaxed"
          style={{ color: MUTED, fontFamily: "var(--font-inter)", opacity: 0 }}
        >
          Chalchitra turns raw footage and podcast recordings into publish-ready
          content in minutes. AI-native. No timeline. No complexity.
        </p>

        {/* CTAs */}
        <div
          data-hero-cta
          className="flex flex-col sm:flex-row gap-4 mb-6"
          style={{ opacity: 0 }}
        >
          <div ref={ctaWrapRef} style={{ display: "inline-flex" }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: `0 0 32px rgba(0,255,209,0.55)` }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                document
                  .getElementById("waitlist")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 rounded-full font-bold text-base cursor-pointer transition-all"
              style={{
                background: ACCENT,
                color: "#080808",
                fontFamily: "var(--font-syne)",
              }}
            >
              Get Early Access
            </motion.button>
          </div>
          <motion.button
            whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.35)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 rounded-full font-medium text-base cursor-pointer transition-all"
            style={{
              border: "1px solid rgba(255,255,255,0.14)",
              color: "var(--fg)",
              background: "transparent",
              fontFamily: "var(--font-inter)",
            }}
          >
            See What It Can Do ↓
          </motion.button>
        </div>

        {/* Social proof */}
        <p
          className="text-sm mb-14"
          style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
        >
          <span style={{ color: ACCENT }}>✦</span> 2,400+ creators on the
          waitlist
        </p>

        {/* Editor mockup */}
        <div data-hero-mockup style={{ width: "100%" }}>
          <EditorMockup />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TRUST BAR
───────────────────────────────────────────── */
function TrustBar() {
  const items = [
    "YouTube Creators",
    "Podcast Networks",
    "TikTok Brands",
    "Course Creators",
    "Marketing Agencies",
    "Freelancers",
    "E-commerce Brands",
    "Documentary Makers",
    "Podcast Hosts",
    "Edu-Content Studios",
  ];
  const doubled = [...items, ...items];

  return (
    <section
      className="py-12 overflow-hidden"
      style={{
        background: "var(--bg-alt)",
        borderTop: `1px solid ${BORDER}`,
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <p
        className="text-center text-xs mb-6 tracking-widest uppercase"
        style={{ color: "var(--border)", fontFamily: "var(--font-syne)" }}
      >
        Built for every kind of creator
      </p>
      <div className="relative overflow-hidden">
        <div className="marquee-inner flex gap-12 whitespace-nowrap">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="text-sm font-medium flex-shrink-0 flex items-center gap-3"
              style={{ color: "var(--border)", fontFamily: "var(--font-syne)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: "var(--border)" }}
              />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FEATURES BENTO
───────────────────────────────────────────── */
function FeaturesBento() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const cardBase =
    "rounded-2xl p-6 border flex flex-col gap-4 cursor-default transition-all duration-300";

  return (
    <section id="features" className="py-28 px-6" style={{ background: "var(--bg-alt)" }}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div data-gsap-reveal className="text-center mb-16">
          <p
            className="text-sm font-semibold mb-3 tracking-widest uppercase"
            style={{ color: ACCENT, fontFamily: "var(--font-syne)" }}
          >
            Capabilities
          </p>
          <h2
            className="font-black mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(32px, 5vw, 52px)",
              color: "var(--fg)",
            }}
          >
            Everything you need.{" "}
            <span style={{ color: ACCENT }}>Nothing you don&apos;t.</span>
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
          >
            From short-form social to long-form podcasts — one AI platform
            handles it all.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-gsap-bento>
          {/* AI Smart Edit — col-span-2 */}
          <motion.div
            data-gsap-card
            whileHover={{
              borderColor: "rgba(0,255,209,0.22)",
              boxShadow: "0 0 40px rgba(0,255,209,0.06)",
            }}
            className={`${cardBase} col-span-1 sm:col-span-2`}
            style={{ background: SURFACE, borderColor: BORDER }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(0,255,209,0.1)",
                  border: `1px solid rgba(0,255,209,0.2)`,
                }}
              >
                <BrainCircuit size={22} style={{ color: ACCENT }} />
              </div>
              <div>
                <h3
                  className="font-bold text-lg mb-1"
                  style={{ fontFamily: "var(--font-syne)", color: "var(--fg)" }}
                >
                  AI Smart Edit
                </h3>
                <p
                  className="text-sm"
                  style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
                >
                  Drop your footage. Our AI analyzes pacing, removes dead air,
                  fixes jump cuts, and assembles a polished cut automatically.
                </p>
              </div>
            </div>
            <div
              className="relative rounded-xl overflow-hidden h-28"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: `1px solid ${BORDER}`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-xs"
                  style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
                >
                  Analyzing footage...
                </span>
              </div>
              {[0, 20, 40, 60, 80].map((top, i) => (
                <motion.div
                  key={i}
                  className="absolute left-0 right-0 h-px"
                  style={{
                    top: `${top}%`,
                    background: `linear-gradient(90deg, transparent, rgba(0,255,209,0.3), transparent)`,
                  }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Auto Captions */}
          <motion.div
            data-gsap-card
            whileHover={{
              borderColor: "rgba(0,255,209,0.22)",
              boxShadow: "0 0 40px rgba(0,255,209,0.06)",
            }}
            className={cardBase}
            style={{ background: SURFACE, borderColor: BORDER }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(0,255,209,0.1)",
                border: `1px solid rgba(0,255,209,0.2)`,
              }}
            >
              <span style={{ color: ACCENT }} className="text-lg font-bold">
                Cc
              </span>
            </div>
            <h3
              className="font-bold"
              style={{ fontFamily: "var(--font-syne)", color: "var(--fg)" }}
            >
              Auto Captions
            </h3>
            <p
              className="text-sm"
              style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
            >
              98% accurate captions in seconds. Animated, branded, ready to
              post.
            </p>
            <div
              className="rounded-lg p-3 text-xs font-mono"
              style={{ background: "rgba(0,0,0,0.4)", color: ACCENT }}
            >
              <motion.span
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  times: [0, 0.1, 0.8, 1],
                }}
              >
                &quot;This is how you build in public...&quot;
              </motion.span>
              <span className="cursor-blink">|</span>
            </div>
          </motion.div>

          {/* Smart Reframe */}
          <motion.div
            data-gsap-card
            whileHover={{
              borderColor: "rgba(0,255,209,0.22)",
              boxShadow: "0 0 40px rgba(0,255,209,0.06)",
            }}
            className={cardBase}
            style={{ background: SURFACE, borderColor: BORDER }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(0,255,209,0.1)",
                border: `1px solid rgba(0,255,209,0.2)`,
              }}
            >
              <Sliders size={18} style={{ color: ACCENT }} />
            </div>
            <h3
              className="font-bold"
              style={{ fontFamily: "var(--font-syne)", color: "var(--fg)" }}
            >
              Smart Reframe
            </h3>
            <p
              className="text-sm"
              style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
            >
              One video, every platform. Auto-crops for 9:16, 16:9, 1:1 with
              subject tracking.
            </p>
            <div className="flex gap-2 items-end">
              {[
                { r: "9:16", h: "52px" },
                { r: "16:9", h: "36px" },
                { r: "1:1", h: "44px" },
              ].map(({ r, h }) => (
                <div
                  key={r}
                  className="flex-1 rounded flex items-center justify-center text-xs font-semibold"
                  style={{
                    background: "rgba(0,255,209,0.07)",
                    border: `1px solid rgba(0,255,209,0.15)`,
                    color: ACCENT,
                    fontFamily: "var(--font-syne)",
                    height: h,
                  }}
                >
                  {r}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Podcast Studio — col-span-2, highlighted */}
          <motion.div
            data-gsap-card
            whileHover={{
              borderColor: "rgba(0,255,209,0.3)",
              boxShadow: "0 0 50px rgba(0,255,209,0.08)",
            }}
            className={`${cardBase} col-span-1 sm:col-span-2`}
            style={{
              background: `linear-gradient(135deg, rgba(0,255,209,0.04) 0%, ${SURFACE} 60%)`,
              borderColor: "rgba(0,255,209,0.12)",
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(0,255,209,0.12)",
                  border: `1px solid rgba(0,255,209,0.25)`,
                }}
              >
                <Mic size={22} style={{ color: ACCENT }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3
                    className="font-bold text-lg"
                    style={{ fontFamily: "var(--font-syne)", color: "var(--fg)" }}
                  >
                    Podcast Studio
                  </h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: "rgba(0,255,209,0.12)",
                      color: ACCENT,
                      fontFamily: "var(--font-syne)",
                      border: `1px solid rgba(0,255,209,0.2)`,
                    }}
                  >
                    New
                  </span>
                </div>
                <p
                  className="text-sm"
                  style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
                >
                  Turn hours of raw podcast into highlights, chapters, viral
                  clips and show notes — automatically.
                </p>
              </div>
            </div>

            {/* Podcast timeline visualization */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: `1px solid ${BORDER}`,
              }}
            >
              {/* Timeline bar */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-mono flex-shrink-0"
                  style={{ color: MUTED }}
                >
                  0:00
                </span>
                <div
                  className="relative flex-1 rounded-full overflow-hidden"
                  style={{ height: "10px", background: "rgba(255,255,255,0.04)" }}
                >
                  {/* Waveform texture */}
                  <div className="absolute inset-0 flex items-center gap-px px-1">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${25 + Math.abs(Math.sin(i * 0.7) * 75)}%`,
                          background: "rgba(255,255,255,0.06)",
                        }}
                      />
                    ))}
                  </div>
                  {/* Highlighted best-moment segments */}
                  {[
                    { left: "9%", width: "11%" },
                    { left: "31%", width: "7%" },
                    { left: "53%", width: "13%" },
                    { left: "76%", width: "9%" },
                  ].map((seg, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-0 bottom-0 rounded-full"
                      style={{
                        left: seg.left,
                        width: seg.width,
                        background: `rgba(0,255,209,0.5)`,
                      }}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        delay: i * 0.45,
                      }}
                    />
                  ))}
                </div>
                <span
                  className="text-xs font-mono flex-shrink-0"
                  style={{ color: MUTED }}
                >
                  2:14:32
                </span>
              </div>

              {/* Best clip cards */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Best Moment", time: "12:34" },
                  { label: "Key Insight", time: "48:22" },
                  { label: "Viral Hook", time: "1:24:15" },
                ].map((clip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="rounded-lg px-3 py-2 text-center"
                    style={{
                      background: "rgba(0,255,209,0.06)",
                      border: `1px solid rgba(0,255,209,0.18)`,
                    }}
                  >
                    <p
                      className="text-xs font-semibold mb-0.5"
                      style={{
                        color: ACCENT,
                        fontFamily: "var(--font-syne)",
                      }}
                    >
                      ✦ {clip.label}
                    </p>
                    <p
                      className="text-xs font-mono"
                      style={{ color: MUTED }}
                    >
                      {clip.time}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Silence Remover */}
          <motion.div
            data-gsap-card
            whileHover={{
              borderColor: "rgba(0,255,209,0.22)",
              boxShadow: "0 0 40px rgba(0,255,209,0.06)",
            }}
            className={cardBase}
            style={{ background: SURFACE, borderColor: BORDER }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(0,255,209,0.1)",
                border: `1px solid rgba(0,255,209,0.2)`,
              }}
            >
              <Zap size={18} style={{ color: ACCENT }} />
            </div>
            <h3
              className="font-bold"
              style={{ fontFamily: "var(--font-syne)", color: "var(--fg)" }}
            >
              Silence Remover
            </h3>
            <div className="flex items-end gap-0.5 h-10">
              {Array.from({ length: 24 }).map((_, i) => {
                const isSilent = [4, 5, 6, 12, 13, 18, 19].includes(i);
                const barHeight = `${30 + ((i * 17 + 7) % 70)}%`;
                return (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      background: isSilent
                        ? "rgba(255,77,77,0.3)"
                        : `rgba(0,255,209,${0.4 + (i % 4) * 0.15})`,
                      height: isSilent ? "20%" : barHeight,
                    }}
                    animate={!isSilent ? { scaleY: [1, 0.6, 1] } : {}}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8 + (i % 5) * 0.2,
                      delay: (i % 7) * 0.1,
                    }}
                  />
                );
              })}
            </div>
            <p
              className="text-xs"
              style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
            >
              Dead air detected and removed automatically.
            </p>
          </motion.div>

          {/* AI Music Sync */}
          <motion.div
            data-gsap-card
            whileHover={{
              borderColor: "rgba(0,255,209,0.22)",
              boxShadow: "0 0 40px rgba(0,255,209,0.06)",
            }}
            className={cardBase}
            style={{ background: SURFACE, borderColor: BORDER }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(0,255,209,0.1)",
                border: `1px solid rgba(0,255,209,0.2)`,
              }}
            >
              <span style={{ color: ACCENT, fontSize: "18px" }}>♪</span>
            </div>
            <h3
              className="font-bold"
              style={{ fontFamily: "var(--font-syne)", color: "var(--fg)" }}
            >
              AI Music Sync
            </h3>
            <div className="flex items-end gap-1 h-10">
              {([1, 2, 3, 4, 5, 6, 7] as const).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    background: ACCENT,
                    animationName: `eq-${i + 1}`,
                    animationDuration: `${0.4 + i * 0.1}s`,
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                    animationDirection: "alternate",
                    height: "60%",
                  }}
                />
              ))}
            </div>
            <p
              className="text-xs"
              style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
            >
              Cuts sync to the beat. Royalty-free music library included.
            </p>
          </motion.div>

          {/* Color Grade */}
          <motion.div
            data-gsap-card
            whileHover={{
              borderColor: "rgba(0,255,209,0.22)",
              boxShadow: "0 0 40px rgba(0,255,209,0.06)",
            }}
            className={cardBase}
            style={{ background: SURFACE, borderColor: BORDER }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(0,255,209,0.1)",
                border: `1px solid rgba(0,255,209,0.2)`,
              }}
            >
              <span style={{ color: ACCENT, fontSize: "18px" }}>◑</span>
            </div>
            <h3
              className="font-bold"
              style={{ fontFamily: "var(--font-syne)", color: "var(--fg)" }}
            >
              Auto Color Grade
            </h3>
            <div
              className="h-16 rounded-xl overflow-hidden"
              style={{
                background: `linear-gradient(90deg, #2a2215 0%, #1a1a28 40%, #0f2a1a 70%, rgba(0,255,209,0.2) 100%)`,
              }}
            >
              <div className="h-full flex">
                <div
                  className="flex-1 flex items-center justify-center text-xs font-bold"
                  style={{ color: "#666", fontFamily: "var(--font-syne)" }}
                >
                  DULL
                </div>
                <div className="w-px opacity-40" style={{ background: "white" }} />
                <div
                  className="flex-1 flex items-center justify-center text-xs font-bold"
                  style={{ color: ACCENT, fontFamily: "var(--font-syne)" }}
                >
                  VIVID
                </div>
              </div>
            </div>
            <p
              className="text-xs"
              style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
            >
              Cinematic look applied in one click.
            </p>
          </motion.div>

          {/* Brand Kit */}
          <motion.div
            data-gsap-card
            whileHover={{
              borderColor: "rgba(0,255,209,0.22)",
              boxShadow: "0 0 40px rgba(0,255,209,0.06)",
            }}
            className={cardBase}
            style={{ background: SURFACE, borderColor: BORDER }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(0,255,209,0.1)",
                border: `1px solid rgba(0,255,209,0.2)`,
              }}
            >
              <span style={{ color: ACCENT, fontSize: "18px" }}>◈</span>
            </div>
            <h3
              className="font-bold"
              style={{ fontFamily: "var(--font-syne)", color: "var(--fg)" }}
            >
              Brand Kit
            </h3>
            <div className="flex gap-2">
              {[ACCENT, "#A78BFA", "#F59E0B", "#EF4444"].map((c, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-lg"
                  style={{ background: c }}
                />
              ))}
            </div>
            <p
              className="text-xs"
              style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
            >
              Upload logo, set colors and fonts once. Every export is branded.
            </p>
          </motion.div>

          {/* B-Roll AI — col-span-2 */}
          <motion.div
            data-gsap-card
            whileHover={{
              borderColor: "rgba(0,255,209,0.22)",
              boxShadow: "0 0 40px rgba(0,255,209,0.06)",
            }}
            className={`${cardBase} col-span-1 sm:col-span-2`}
            style={{ background: SURFACE, borderColor: BORDER }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(0,255,209,0.1)",
                  border: `1px solid rgba(0,255,209,0.2)`,
                }}
              >
                <span style={{ color: ACCENT }}>▦</span>
              </div>
              <div>
                <h3
                  className="font-bold mb-1"
                  style={{ fontFamily: "var(--font-syne)", color: "var(--fg)" }}
                >
                  B-Roll AI Suggestions
                </h3>
                <p
                  className="text-sm"
                  style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
                >
                  AI matches your script with relevant stock footage from our
                  10M+ library.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                "from-purple-900 to-blue-900",
                "from-teal-900 to-green-900",
                "from-orange-900 to-red-900",
                "from-blue-900 to-indigo-900",
                "from-pink-900 to-purple-900",
                "from-amber-900 to-orange-900",
                "from-green-900 to-teal-900",
                "from-indigo-900 to-violet-900",
              ].map((grad, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.06 }}
                  className={`h-16 rounded-lg bg-gradient-to-br ${grad} border`}
                  style={{ borderColor: BORDER }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────── */
function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    {
      icon: <Upload size={28} style={{ color: ACCENT }} />,
      number: "01",
      title: "Drop Your Footage",
      body: "Any format. Phone video, screen recording, DSLR, podcast audio. Chalchitra accepts everything.",
      visual: (
        <div
          className="mt-4 rounded-xl p-4 flex flex-col gap-2"
          style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${BORDER}` }}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>
              uploading_raw.mp4
            </span>
            <span style={{ color: ACCENT, fontFamily: "var(--font-syne)" }}>
              87%
            </span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <div
              className="upload-bar h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${ACCENT}, rgba(0,255,209,0.6))`,
              }}
            />
          </div>
        </div>
      ),
    },
    {
      icon: <Sliders size={28} style={{ color: ACCENT }} />,
      number: "02",
      title: "Pick a Template or Style",
      body: "Choose from 60+ templates or describe your vibe. Set platform, length, tone.",
      visual: (
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {[
            "from-pink-700 to-orange-600",
            "from-blue-700 to-purple-600",
            "from-green-700 to-teal-600",
            "from-amber-700 to-red-600",
            "from-indigo-700 to-blue-600",
            "from-violet-700 to-pink-600",
          ].map((g, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              className={`h-12 rounded-lg bg-gradient-to-br ${g} cursor-pointer border`}
              style={{
                borderColor: i === 0 ? `rgba(0,255,209,0.5)` : BORDER,
              }}
            />
          ))}
        </div>
      ),
    },
    {
      icon: <Zap size={28} style={{ color: ACCENT }} />,
      number: "03",
      title: "Download or Publish Direct",
      body: "Export to YouTube, TikTok, Instagram, LinkedIn, Spotify simultaneously. One click.",
      visual: (
        <div className="mt-4 flex flex-col gap-2">
          {["YouTube", "TikTok", "Instagram", "Spotify"].map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.15 }}
              className="flex items-center gap-2 text-sm"
            >
              <Check size={14} style={{ color: ACCENT }} />
              <span style={{ color: "#aaa", fontFamily: "var(--font-inter)" }}>
                {p}
              </span>
              <div
                className="ml-auto px-2 py-0.5 rounded-full text-xs"
                style={{
                  background: "rgba(0,255,209,0.1)",
                  color: ACCENT,
                  fontFamily: "var(--font-syne)",
                }}
              >
                Ready
              </div>
            </motion.div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-28 px-6"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div data-gsap-reveal className="text-center mb-20">
          <p
            className="text-sm font-semibold mb-3 tracking-widest uppercase"
            style={{ color: ACCENT, fontFamily: "var(--font-syne)" }}
          >
            How It Works
          </p>
          <h2
            className="font-black mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(32px, 5vw, 52px)",
              color: "var(--fg)",
            }}
          >
            Raw to ready in 3 steps.
          </h2>
          <p
            className="text-lg"
            style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
          >
            The fastest path from footage to finished.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              data-gsap-step
              whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300 } }}
              className="relative flex flex-col rounded-2xl p-7 border"
              style={{ background: SURFACE, borderColor: BORDER }}
            >
              <div
                className="text-6xl font-black mb-4 leading-none"
                style={{
                  fontFamily: "var(--font-syne)",
                  color: "rgba(0,255,209,0.06)",
                  letterSpacing: "-4px",
                }}
              >
                {s.number}
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: "rgba(0,255,209,0.1)",
                  border: `1px solid rgba(0,255,209,0.2)`,
                }}
              >
                {s.icon}
              </div>
              <h3
                className="font-bold text-xl mb-2"
                style={{ fontFamily: "var(--font-syne)", color: "var(--fg)" }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
              >
                {s.body}
              </p>
              {s.visual}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TEMPLATES
───────────────────────────────────────────── */


/* ─────────────────────────────────────────────
   USE CASES
───────────────────────────────────────────── */
function UseCases() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const cases = [
    /* ── 1. CONTENT CREATORS ─────────────────────────── */
    {
      title: "Content Creators",
      tagline: "Post more. Edit less.",
      accentColor: ACCENT,
      borderAccent: ACCENT,
      cardGlow: "rgba(0,255,209,0.08)",
      benefits: [
        "Auto-cut silence and filler words",
        "One-click captions for every platform",
        "Consistent look across all videos",
        "Batch export to TikTok, YouTube, Reels",
      ],
      visual: (
        <div
          className="relative rounded-xl overflow-hidden mb-5"
          style={{
            height: "160px",
            background:
              "linear-gradient(135deg, rgba(5,15,10,0.95) 0%, rgba(10,5,20,0.9) 100%)",
            border: `1px solid rgba(0,255,209,0.08)`,
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0,255,209,0.04) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0,255,209,0.04) 1px, transparent 1px)`,
              backgroundSize: "22px 22px",
            }}
          />

          {/* Rainbow timeline track */}
          <div
            className="absolute top-5 left-4 right-4 flex gap-1.5 items-end"
            style={{ height: "36px" }}
          >
            {[
              { g: "from-pink-500 to-rose-400", flex: 2, filler: false },
              { g: "from-orange-500 to-amber-400", flex: 1, filler: true },
              { g: "from-yellow-400 to-lime-400", flex: 2.5, filler: false },
              { g: "from-green-500 to-teal-400", flex: 1, filler: true },
              { g: "from-blue-500 to-indigo-400", flex: 3, filler: false },
              { g: "from-violet-500 to-purple-400", flex: 1.5, filler: false },
            ].map((clip, i) => (
              <motion.div
                key={i}
                className={`bg-gradient-to-r ${clip.g} rounded-sm h-full`}
                style={{ flex: clip.flex, originX: 0 }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={
                  inView
                    ? clip.filler
                      ? {
                        opacity: [0, 1, 1, 0],
                        scaleX: [0, 1, 1, 0],
                      }
                      : { opacity: 1, scaleX: 1 }
                    : {}
                }
                transition={
                  clip.filler
                    ? {
                      delay: 0.4 + i * 0.08,
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 1.5,
                    }
                    : { delay: 0.25 + i * 0.08, duration: 0.45 }
                }
              />
            ))}
          </div>

          {/* Filler-cut label */}
          <motion.div
            className="absolute top-2 right-4 text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(255,77,77,0.12)",
              border: "1px solid rgba(255,77,77,0.35)",
              color: DANGER,
              fontFamily: "var(--font-syne)",
              fontSize: "10px",
            }}
            animate={
              inView ? { opacity: [0, 1, 1, 0] } : {}
            }
            transition={{
              repeat: Infinity,
              duration: 2.5,
              delay: 0.9,
              repeatDelay: 1.5,
            }}
          >
            ✂ filler removed
          </motion.div>

          {/* Scatter particles on filler removal */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: "5px",
                height: "5px",
                background: i % 2 === 0 ? ACCENT : DANGER,
                left: `${22 + i * 9}%`,
                top: "42%",
              }}
              animate={
                inView
                  ? {
                    y: [0, -24 - i * 6],
                    x: [(i - 2) * 8, (i - 2) * 16],
                    opacity: [0, 1, 0],
                    scale: [0, 1.8, 0],
                  }
                  : {}
              }
              transition={{
                repeat: Infinity,
                duration: 1.4,
                delay: 0.9 + i * 0.1,
                repeatDelay: 2.6,
              }}
            />
          ))}

          {/* Platform export badges */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            {["TikTok", "YouTube", "Reels"].map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.12 }}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  background: "rgba(0,255,209,0.07)",
                  border: `1px solid rgba(0,255,209,0.18)`,
                  color: ACCENT,
                  fontFamily: "var(--font-syne)",
                  fontSize: "11px",
                }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: ACCENT }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.4,
                    delay: i * 0.4,
                  }}
                />
                {p}
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },

    /* ── 2. PODCASTERS ───────────────────────────────── */
    {
      title: "Podcasters",
      tagline: "Your best moments, found automatically.",
      accentColor: "#F59E0B",
      borderAccent: "#F59E0B",
      cardGlow: "rgba(245,158,11,0.07)",
      benefits: [
        "AI extracts best clips with timestamps",
        "Auto-chapter long-form episodes",
        "Transcript, show notes & newsletter generated",
        "One recording → Clips, reels, audiograms",
      ],
      visual: (
        <div
          className="relative rounded-xl overflow-hidden mb-5"
          style={{
            height: "160px",
            background:
              "linear-gradient(135deg, rgba(25,12,0,0.95) 0%, rgba(15,8,0,0.95) 100%)",
            border: "1px solid rgba(245,158,11,0.1)",
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px)`,
              backgroundSize: "22px 22px",
            }}
          />

          {/* Radiating rings from mic center */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[1, 2, 3, 4].map((ring) => (
              <motion.div
                key={ring}
                className="absolute rounded-full border"
                style={{
                  borderColor: `rgba(245,158,11,${0.45 - ring * 0.08})`,
                  width: `${ring * 30}px`,
                  height: `${ring * 30}px`,
                }}
                animate={{ scale: [1, 2.2 + ring * 0.2], opacity: [0.55, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  delay: ring * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Mic icon */}
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(245,158,11,0.14)",
                border: "1.5px solid rgba(245,158,11,0.5)",
                boxShadow:
                  "0 0 24px rgba(245,158,11,0.35), 0 0 8px rgba(245,158,11,0.2)",
              }}
            >
              <Mic size={20} style={{ color: "#F59E0B" }} />
            </motion.div>
          </div>

          {/* Floating timestamp bubbles */}
          {[
            { label: "BEST MOMENT", time: "12:34", left: "4%", delay: 0.2 },
            { label: "VIRAL HOOK", time: "01:24:15", left: "55%", delay: 1.0 },
            { label: "KEY INSIGHT", time: "48:22", left: "64%", delay: 1.8 },
          ].map((ts, i) => (
            <motion.div
              key={i}
              className="absolute font-bold px-2 py-1 rounded-full"
              style={{
                left: ts.left,
                bottom: "32px",
                background: "rgba(245,158,11,0.1)",
                color: "#F59E0B",
                border: "1px solid rgba(245,158,11,0.28)",
                fontFamily: "var(--font-syne)",
                whiteSpace: "nowrap",
                fontSize: "9px",
              }}
              animate={
                inView
                  ? { opacity: [0, 1, 1, 0], y: [0, -8, -20, -36] }
                  : {}
              }
              transition={{
                repeat: Infinity,
                duration: 3.5,
                delay: ts.delay + 0.6,
                repeatDelay: 0.8,
                ease: "easeOut",
              }}
            >
              ✦ {ts.label} · {ts.time}
            </motion.div>
          ))}

          {/* Amber spectrogram waveform */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-end gap-px px-3"
            style={{ height: "28px" }}
          >
            {Array.from({ length: 44 }).map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  background: `rgba(245,158,11,${0.25 + ((i * 7) % 5) * 0.08})`,
                  height: `${18 + Math.abs(Math.sin(i * 0.65)) * 82}%`,
                }}
                animate={{ scaleY: [1, 0.35 + ((i * 3) % 7) * 0.1, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.55 + (i % 5) * 0.12,
                  delay: (i % 9) * 0.07,
                }}
              />
            ))}
          </div>
        </div>
      ),
    },

    /* ── 3. EDUCATORS ───────────────────────────────── */
    {
      title: "Educators",
      tagline: "Transform recordings into lessons.",
      accentColor: "#06B6D4",
      borderAccent: "#3B82F6",
      cardGlow: "rgba(6,182,212,0.07)",
      benefits: [
        "Auto-chapter your long recordings",
        "Highlight key moments with AI",
        "Transcript and captions auto-generated",
        "Export for any LMS platform",
      ],
      visual: (
        <div
          className="relative rounded-xl overflow-hidden mb-5"
          style={{
            height: "160px",
            background:
              "linear-gradient(135deg, rgba(0,5,20,0.95) 0%, rgba(0,10,18,0.95) 100%)",
            border: "1px solid rgba(59,130,246,0.1)",
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)`,
              backgroundSize: "22px 22px",
            }}
          />

          {/* Progress bar */}
          <div className="absolute top-5 left-4 right-4">
            <div className="flex items-center justify-between mb-1.5">
              <span
                style={{
                  color: "#3B82F6",
                  fontFamily: "var(--font-syne)",
                  fontSize: "10px",
                  fontWeight: 600,
                }}
              >
                Lecture Recording · 1:42:00
              </span>
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{
                  color: "#06B6D4",
                  fontFamily: "var(--font-syne)",
                  fontSize: "10px",
                }}
              >
                AI Analyzing...
              </motion.span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #3B82F6, #06B6D4)",
                  boxShadow: "0 0 10px rgba(6,182,212,0.5)",
                }}
                initial={{ width: "0%" }}
                animate={inView ? { width: "82%" } : {}}
                transition={{ duration: 2.5, delay: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Chapter marker cards */}
          <div className="absolute top-[52px] left-4 right-4 flex gap-2">
            {[
              { num: "01", label: "Introduction", delay: 0.9 },
              { num: "02", label: "Core Concept", delay: 1.5 },
              { num: "03", label: "Key Summary", delay: 2.1 },
            ].map((ch) => (
              <motion.div
                key={ch.num}
                initial={{ opacity: 0, y: 12, scale: 0.88 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  delay: ch.delay,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 320,
                  damping: 20,
                }}
                className="flex-1 rounded-lg p-2 text-center"
                style={{
                  background: "rgba(59,130,246,0.08)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  boxShadow: "0 0 12px rgba(6,182,212,0.06)",
                }}
              >
                <p
                  style={{
                    color: "#06B6D4",
                    fontFamily: "var(--font-syne)",
                    fontSize: "9px",
                    fontWeight: 700,
                  }}
                >
                  CH {ch.num}
                </p>
                <p
                  style={{
                    color: "#60A5FA",
                    fontFamily: "var(--font-inter)",
                    fontSize: "9px",
                    marginTop: "2px",
                  }}
                >
                  {ch.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Transcript lines */}
          <div
            className="absolute left-4 right-4 flex flex-col gap-1.5 overflow-hidden"
            style={{ bottom: "32px", height: "28px" }}
          >
            {[90, 70, 80, 55].map((w, i) => (
              <motion.div
                key={i}
                className="h-1.5 rounded-full"
                style={{
                  width: `${w}%`,
                  background: `rgba(6,182,212,${0.12 + i * 0.04})`,
                }}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 2.3 + i * 0.1 }}
              />
            ))}
          </div>

          {/* LMS export format badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 2.6 }}
            className="absolute bottom-3 right-4 flex gap-1.5"
          >
            {["LMS", "PDF", "SRT"].map((fmt) => (
              <span
                key={fmt}
                className="rounded-full font-bold"
                style={{
                  background: "rgba(59,130,246,0.1)",
                  color: "#3B82F6",
                  fontFamily: "var(--font-syne)",
                  fontSize: "9px",
                  padding: "2px 7px",
                  border: "1px solid rgba(59,130,246,0.2)",
                }}
              >
                {fmt}
              </span>
            ))}
          </motion.div>
        </div>
      ),
    },

    /* ── 4. BRANDS & TEAMS ──────────────────────────── */
    {
      title: "Brands & Teams",
      tagline: "Consistent video at scale.",
      accentColor: "#14B8A6",
      borderAccent: "#9CA3AF",
      cardGlow: "rgba(20,184,166,0.07)",
      benefits: [
        "Shared brand kit across all editors",
        "Approval workflows built in",
        "Multi-seat collaboration",
        "White-label exports",
      ],
      visual: (
        <div
          className="relative rounded-xl overflow-hidden mb-5"
          style={{
            height: "160px",
            background:
              "linear-gradient(135deg, rgba(0,12,12,0.95) 0%, rgba(5,10,15,0.95) 100%)",
            border: "1px solid rgba(20,184,166,0.1)",
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(20,184,166,0.04) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(20,184,166,0.04) 1px, transparent 1px)`,
              backgroundSize: "22px 22px",
            }}
          />

          {/* Collaborator avatars */}
          <div className="absolute top-5 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {["MK", "JL", "AR", "TS"].map((ini, i) => (
                <motion.div
                  key={ini}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.3 + i * 0.1,
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="w-7 h-7 rounded-full flex items-center justify-center font-bold"
                  style={{
                    background: `hsl(${i * 55 + 165}, 45%, 22%)`,
                    border: "2px solid rgba(20,184,166,0.35)",
                    color: "#14B8A6",
                    fontFamily: "var(--font-syne)",
                    fontSize: "9px",
                    marginLeft: i === 0 ? 0 : "-6px",
                    zIndex: 4 - i,
                    boxShadow: "0 0 10px rgba(20,184,166,0.2)",
                  }}
                >
                  {ini}
                </motion.div>
              ))}
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
                className="ml-2"
                style={{
                  color: "#14B8A6",
                  fontFamily: "var(--font-syne)",
                  fontSize: "9px",
                }}
              >
                editing live
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.1 }}
                >
                  ...
                </motion.span>
              </motion.span>
            </div>

            {/* Approved badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.8, type: "spring", stiffness: 280 }}
              className="flex items-center gap-1 px-2 py-1 rounded-full"
              style={{
                background: "rgba(20,184,166,0.1)",
                border: "1px solid rgba(20,184,166,0.3)",
                color: "#14B8A6",
                fontFamily: "var(--font-syne)",
                fontSize: "9px",
                fontWeight: 700,
                boxShadow: "0 0 10px rgba(20,184,166,0.15)",
              }}
            >
              <Check size={10} />
              Approved
            </motion.div>
          </div>

          {/* Brand kit + branded video thumbnails */}
          <div className="absolute top-[54px] left-4 right-4 flex items-center gap-4">
            {/* Swatches */}
            <div className="flex-shrink-0">
              <p
                style={{
                  color: "#444",
                  fontFamily: "var(--font-inter)",
                  fontSize: "9px",
                  marginBottom: "5px",
                }}
              >
                Brand Kit
              </p>
              <div className="flex gap-1">
                {["#14B8A6", "#6366F1", "#F59E0B", "#EF4444"].map(
                  (color, i) => (
                    <motion.div
                      key={color}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.08, type: "spring" }}
                      className="w-5 h-5 rounded"
                      style={{
                        background: color,
                        boxShadow: `0 0 8px ${color}50`,
                      }}
                    />
                  )
                )}
              </div>
            </div>

            {/* Branded thumbnails */}
            <div className="flex gap-2 flex-1">
              {[
                { ratio: "9:16", h: "46px", w: "27px" },
                { ratio: "16:9", h: "30px", w: "53px" },
                { ratio: "1:1", h: "38px", w: "38px" },
              ].map((fmt, i) => (
                <motion.div
                  key={fmt.ratio}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 + i * 0.12 }}
                  className="rounded relative overflow-hidden flex items-center justify-center flex-shrink-0"
                  style={{
                    height: fmt.h,
                    width: fmt.w,
                    background:
                      "linear-gradient(135deg, rgba(20,184,166,0.14), rgba(99,102,241,0.14))",
                    border: "1px solid rgba(20,184,166,0.22)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #14B8A6, #6366F1)",
                      opacity: 0.12,
                    }}
                    animate={{ opacity: [0.08, 0.22, 0.08] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.2,
                      delay: i * 0.5,
                    }}
                  />
                  <span
                    style={{
                      color: "#14B8A6",
                      fontFamily: "var(--font-syne)",
                      fontSize: "8px",
                      fontWeight: 700,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {fmt.ratio}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Approval workflow progress */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center">
            {["Draft", "Review", "Approved", "Published"].map((stage, i) => (
              <div key={stage} className="flex items-center flex-1 last:flex-none">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.2 + i * 0.18 }}
                  className="flex items-center gap-1 flex-shrink-0"
                >
                  <motion.div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      background:
                        i <= 2 ? "#14B8A6" : "rgba(255,255,255,0.08)",
                      boxShadow:
                        i === 2
                          ? "0 0 8px rgba(20,184,166,0.9)"
                          : "none",
                    }}
                    animate={
                      i < 3 ? { scale: [1, 1.25, 1] } : {}
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 1.6,
                      delay: i * 0.3,
                    }}
                  />
                  <span
                    style={{
                      color: i <= 2 ? "#14B8A6" : "#2a2a2a",
                      fontFamily: "var(--font-inter)",
                      fontSize: "9px",
                    }}
                  >
                    {stage}
                  </span>
                </motion.div>
                {i < 3 && (
                  <div
                    className="mx-1.5 h-px flex-1"
                    style={{
                      background:
                        i < 2
                          ? "rgba(20,184,166,0.35)"
                          : "rgba(255,255,255,0.05)",
                      minWidth: "10px",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="use-cases"
      className="relative py-28 px-6"
      style={{ background: "var(--bg)" }}
    >
      {/* Section-wide faint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.011) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.011) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <div data-gsap-reveal className="text-center mb-16">
          <p
            className="text-sm font-semibold mb-3 tracking-widest uppercase"
            style={{ color: ACCENT, fontFamily: "var(--font-syne)" }}
          >
            Use Cases
          </p>
          <h2
            className="font-black mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(32px, 5vw, 52px)",
              color: "var(--fg)",
            }}
          >
            Built for every kind of creator.
          </h2>
        </div>

        {/* 2×2 grid with connecting light paths */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Vertical connecting light path */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px pointer-events-none overflow-hidden"
            style={{ zIndex: 0 }}
          >
            <motion.div
              className="w-full absolute"
              style={{
                height: "120px",
                background:
                  "linear-gradient(to bottom, transparent, rgba(0,255,209,0.18), transparent)",
              }}
              animate={inView ? { y: ["-120px", "calc(100% + 120px)"] } : {}}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "linear",
                delay: 1.2,
              }}
            />
          </div>

          {/* Horizontal connecting light path */}
          <div
            className="hidden md:block absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px pointer-events-none overflow-hidden"
            style={{ zIndex: 0 }}
          >
            <motion.div
              className="absolute h-full"
              style={{
                width: "120px",
                background:
                  "linear-gradient(to right, transparent, rgba(0,255,209,0.14), transparent)",
              }}
              animate={
                inView ? { x: ["-120px", "calc(100% + 120px)"] } : {}
              }
              transition={{
                repeat: Infinity,
                duration: 4.5,
                ease: "linear",
                delay: 0.5,
              }}
            />
          </div>

          {/* Cards */}
          {cases.map((c, i) => (
            <motion.div
              key={i}
              data-gsap-use-case
              whileHover={{
                scale: 1.025,
                boxShadow: `0 0 70px ${c.cardGlow}, 0 24px 48px rgba(0,0,0,0.45)`,
                transition: { type: "spring", stiffness: 280, damping: 22 },
              }}
              className="relative rounded-2xl p-6 border flex flex-col"
              style={{
                background:
                  "linear-gradient(145deg, rgba(15,15,15,0.97) 0%, rgba(10,10,10,0.99) 100%)",
                borderColor: BORDER,
                borderTopColor: c.borderAccent,
                borderTopWidth: "2px",
                backdropFilter: "blur(20px)",
                zIndex: 1,
              }}
            >
              {/* Holographic shimmer overlay on hover */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${c.cardGlow} 0%, transparent 60%)`,
                  opacity: 0.5,
                }}
              />

              {/* Visual panel */}
              {c.visual}

              {/* Text content */}
              <div className="mb-3">
                <h3
                  className="font-bold text-lg mb-0.5"
                  style={{
                    fontFamily: "var(--font-syne)",
                    color: "var(--fg)",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  className="text-sm font-semibold"
                  style={{
                    color: c.accentColor,
                    fontFamily: "var(--font-syne)",
                  }}
                >
                  {c.tagline}
                </p>
              </div>

              <ul className="flex flex-col gap-2">
                {c.benefits.map((b, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm"
                    style={{
                      color: MUTED,
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    <Check
                      size={13}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: c.accentColor }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ─────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────── */
function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const testimonials = [
    {
      quote:
        "I went from spending half my day in the timeline to a finished video in under 40 minutes. Chalchitra is genuinely game-changing.",
      name: "Marcus T.",
      role: "YouTube Creator",
      sub: "540K subscribers",
      initials: "MT",
    },
    {
      quote:
        "The auto-captions are more accurate than anything else I've tested. My audience retention improved noticeably.",
      name: "Sofia R.",
      role: "Brand Strategist",
      sub: "São Paulo",
      initials: "SR",
    },
    {
      quote:
        "It found the best 60 seconds from my 2-hour podcast episode. Like having a producer available on demand.",
      name: "Yasmin A.",
      role: "Podcast Host",
      sub: "Johannesburg",
      initials: "YA",
    },
    {
      quote:
        "Our product launches now look premium. The AI understands visual storytelling in a way no other tool does.",
      name: "James O.",
      role: "E-commerce Founder",
      sub: "Lagos",
      initials: "JO",
    },
  ];

  return (
    <section className="py-28 px-6" style={{ background: "var(--bg-alt)" }}>
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className="text-sm font-semibold mb-3 tracking-widest uppercase"
            style={{ color: ACCENT, fontFamily: "var(--font-syne)" }}
          >
            Early Voices
          </p>
          <h2
            className="font-black mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 4vw, 48px)",
              color: "var(--fg)",
            }}
          >
            Creators already love what&apos;s coming.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="rounded-2xl p-7 border flex flex-col gap-5"
              style={{
                background: "rgba(255,255,255,0.025)",
                backdropFilter: "blur(12px)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} fill={ACCENT} style={{ color: ACCENT }} />
                ))}
              </div>
              <p
                className="text-base leading-relaxed flex-1"
                style={{ color: "#D0D0D0", fontFamily: "var(--font-inter)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background: `rgba(0,255,209,0.1)`,
                    border: `1px solid rgba(0,255,209,0.2)`,
                    color: ACCENT,
                    fontFamily: "var(--font-syne)",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "var(--fg)", fontFamily: "var(--font-syne)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
                  >
                    {t.role}
                    {t.sub ? ` · ${t.sub}` : ""}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONTACT SECTION
───────────────────────────────────────────── */
type FormStatus = "idle" | "loading" | "success" | "error";

function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Basic client-side validation before hitting the API
  function validate(): string | null {
    if (!name.trim()) return "Please enter your name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Please enter a valid email address.";
    if (!message.trim() || message.trim().length < 10)
      return "Message must be at least 10 characters.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    const err = validate();
    if (err) {
      setErrorMsg(err);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to send. Please try again.";
      setErrorMsg(msg);
      setStatus("error");
    }
  }

  // Shared focus/blur handlers for inputs
  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = ACCENT;
    e.target.style.boxShadow = `0 0 0 3px rgba(var(--accent-rgb), 0.1)`;
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "var(--border)";
    e.target.style.boxShadow = "none";
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "12px",
    background: "var(--surface)",
    border: `1px solid var(--border)`,
    color: "var(--fg)",
    fontFamily: "var(--font-inter)",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "var(--bg-alt)" }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          background: `radial-gradient(circle, rgba(var(--accent-rgb), 0.05) 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p
            className="text-sm font-semibold mb-3 tracking-widest uppercase"
            style={{ color: ACCENT, fontFamily: "var(--font-syne)" }}
          >
            Get In Touch
          </p>
          <h2
            className="font-black mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 4vw, 48px)",
              color: "var(--fg)",
            }}
          >
            Have a question?{" "}
            <span style={{ color: ACCENT }}>Let&apos;s talk.</span>
          </h2>
          <p
            className="text-base"
            style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
          >
            Whether it&apos;s a partnership, early access query, or just a hello
            — we read every message.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="rounded-2xl p-8 border"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              /* ── Success state ───────────────────────────── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                className="py-10 flex flex-col items-center gap-5 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="w-18 h-18 rounded-full flex items-center justify-center"
                  style={{
                    width: 72,
                    height: 72,
                    background: "rgba(var(--accent-rgb), 0.1)",
                    border: `2px solid ${ACCENT}`,
                  }}
                >
                  <CheckCircle2 size={32} style={{ color: ACCENT }} />
                </motion.div>
                <div>
                  <p
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-syne)", color: "var(--fg)" }}
                  >
                    Message sent!
                  </p>
                  <p style={{ color: MUTED, fontFamily: "var(--font-inter)", fontSize: 14 }}>
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm cursor-pointer bg-transparent border-0 transition-colors"
                  style={{ color: ACCENT, fontFamily: "var(--font-inter)" }}
                >
                  Send another message →
                </button>
              </motion.div>
            ) : (
              /* ── Form ────────────────────────────────────── */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
              >
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: MUTED, fontFamily: "var(--font-syne)" }}
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Aditya Tonk"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                      disabled={status === "loading"}
                      style={inputBase}
                      autoComplete="name"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: MUTED, fontFamily: "var(--font-syne)" }}
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="hello@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                      disabled={status === "loading"}
                      style={inputBase}
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: MUTED, fontFamily: "var(--font-syne)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={(e) => {
                      (e.target as HTMLTextAreaElement).style.borderColor = ACCENT;
                      (e.target as HTMLTextAreaElement).style.boxShadow =
                        `0 0 0 3px rgba(var(--accent-rgb), 0.1)`;
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLTextAreaElement).style.borderColor = "var(--border)";
                      (e.target as HTMLTextAreaElement).style.boxShadow = "none";
                    }}
                    disabled={status === "loading"}
                    style={{
                      ...inputBase,
                      resize: "vertical",
                      minHeight: 120,
                    }}
                  />
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {(status === "error" || errorMsg) && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                      style={{
                        background: "rgba(214,48,48,0.08)",
                        border: `1px solid rgba(214,48,48,0.25)`,
                        color: DANGER,
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      <span>⚠</span>
                      <span>{errorMsg || "Something went wrong. Please try again."}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={
                    status !== "loading"
                      ? { scale: 1.02, boxShadow: `0 0 28px rgba(var(--accent-rgb),0.4)` }
                      : {}
                  }
                  whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                  className="w-full py-4 rounded-xl font-bold text-base cursor-pointer transition-all flex items-center justify-center gap-2"
                  style={{
                    background: status === "loading" ? "var(--border)" : ACCENT,
                    color: "#080808",
                    fontFamily: "var(--font-syne)",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    opacity: status === "loading" ? 0.75 : 1,
                  }}
                >
                  {status === "loading" ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        style={{ display: "inline-block" }}
                      >
                        <Loader2 size={18} />
                      </motion.span>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <ChevronRight size={18} />
                    </>
                  )}
                </motion.button>

                <p
                  className="text-center text-xs"
                  style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
                >
                  🔒 Your info is never shared with third parties.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   WAITLIST CTA
───────────────────────────────────────────── */
function WaitlistSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="waitlist"
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{
          width: "800px",
          height: "800px",
          background: `radial-gradient(circle, rgba(0,255,209,0.07) 0%, transparent 65%)`,
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto text-center" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold mb-4 tracking-widest uppercase"
          style={{ color: ACCENT, fontFamily: "var(--font-syne)" }}
        >
          Early Access
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="font-black mb-4"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(28px, 4vw, 52px)",
            color: "var(--fg)",
          }}
        >
          The future of creation
          <br />
          is almost here.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-10 text-base leading-relaxed"
          style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
        >
          Join 2,400+ creators worldwide. Get early access and help shape the
          future of AI video and podcast creation.
        </motion.p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3 }}
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full px-5 py-4 rounded-xl text-sm transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid rgba(255,255,255,0.1)`,
                  color: "var(--fg)",
                  fontFamily: "var(--font-inter)",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
              <input
                type="email"
                placeholder="Email address"
                required
                className="w-full px-5 py-4 rounded-xl text-sm transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid rgba(255,255,255,0.1)`,
                  color: "var(--fg)",
                  fontFamily: "var(--font-inter)",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
              <select
                required
                defaultValue=""
                className="w-full px-5 py-4 rounded-xl text-sm transition-all appearance-none"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid rgba(255,255,255,0.1)`,
                  color: MUTED,
                  fontFamily: "var(--font-inter)",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                }
              >
                <option value="" disabled>
                  What do you create?
                </option>
                <option value="short">Short-Form Content</option>
                <option value="long">Long-Form Video</option>
                <option value="podcast">Podcast Creator</option>
                <option value="corporate">Corporate / Brand</option>
                <option value="education">Education</option>
                <option value="ecommerce">E-commerce</option>
                <option value="other">Other</option>
              </select>
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 0 32px rgba(0,255,209,0.45)`,
                }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-base cursor-pointer transition-all flex items-center justify-center gap-2"
                style={{
                  background: ACCENT,
                  color: "#080808",
                  fontFamily: "var(--font-syne)",
                }}
              >
                Reserve My Spot
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ChevronRight size={18} />
                </motion.span>
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center gap-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(0,255,209,0.14)",
                  border: `2px solid ${ACCENT}`,
                }}
              >
                <Check size={28} style={{ color: ACCENT }} />
              </motion.div>
              <p
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-syne)", color: "var(--fg)" }}
              >
                You&apos;re on the list!
              </p>
              <p
                className="text-sm"
                style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
              >
                We&apos;ll be in touch with early access details soon.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-6 text-xs"
          style={{ color: "#333", fontFamily: "var(--font-inter)" }}
        >
          🔒 No spam. Ever. Unsubscribe anytime.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mt-6"
        >
          {["Priority Early Access", "Founding Member Status", "Shape the Roadmap"].map(
            (pill, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{
                  border: `1px solid rgba(0,255,209,0.18)`,
                  color: ACCENT,
                  background: "rgba(0,255,209,0.04)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {pill}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Templates", "How It Works", "Roadmap"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
    { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
  ];

  return (
    <footer
      className="px-6 pt-16 pb-8"
      style={{ background: "var(--bg)", borderTop: `1px solid ${BORDER}` }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-xl font-black text-shimmer"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Chalchitra
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
            >
              The AI-native creation studio.
              <br />
              Edit less. Create more.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p
                className="font-bold text-sm mb-4"
                style={{ fontFamily: "var(--font-syne)", color: "#555" }}
              >
                {col.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200"
                      style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--fg)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = MUTED)
                      }
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between pt-6 gap-4"
          style={{ borderTop: `1px solid ${BORDER}` }}
        >
          <p
            className="text-xs"
            style={{ color: "#2a2a2a", fontFamily: "var(--font-inter)" }}
          >
            © 2025 Chalchitra. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.2 }}
                style={{ color: "var(--border)", display: "flex" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = ACCENT)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--border)")
                }
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   SCROLL TO TOP
───────────────────────────────────────────── */
function ScrollToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setVisible(v > 500));
  }, [scrollY]);

  return (
    <motion.button
      initial={false}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.1, boxShadow: `0 0 24px rgba(0,255,209,0.45)` }}
      whileTap={{ scale: 0.9 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-[90] w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
      style={{
        background: ACCENT,
        color: "#080808",
        boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <ArrowUp size={18} />
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   GLOBAL GSAP SCROLL ANIMATIONS
───────────────────────────────────────────── */
function GlobalGSAP() {
  useGSAP(() => {
    // ── Section header reveals ─────────────────────────
    gsap.utils.toArray<HTMLElement>("[data-gsap-reveal]").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    });

    // ── Bento grid: stagger cards per grid ────────────
    gsap.utils.toArray<HTMLElement>("[data-gsap-bento]").forEach((grid) => {
      const cards = grid.querySelectorAll<HTMLElement>("[data-gsap-card]");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: grid, start: "top 85%", once: true },
        }
      );
    });

    // ── How It Works step cards ────────────────────────
    const stepCards = gsap.utils.toArray<HTMLElement>("[data-gsap-step]");
    if (stepCards.length) {
      gsap.fromTo(
        stepCards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: { trigger: stepCards[0], start: "top 88%", once: true },
        }
      );
    }

    // ── Template cards ─────────────────────────────────
    const tCards = gsap.utils.toArray<HTMLElement>("[data-gsap-template-card]");
    if (tCards.length) {
      gsap.fromTo(
        tCards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: tCards[0], start: "top 88%", once: true },
        }
      );
    }

    // ── Use Case cards ─────────────────────────────────
    const ucCards = gsap.utils.toArray<HTMLElement>("[data-gsap-use-case]");
    if (ucCards.length) {
      gsap.fromTo(
        ucCards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ucCards[0], start: "top 88%", once: true },
        }
      );
    }
  });

  return null;
}

/* ─────────────────────────────────────────────
   ROOT PAGE
───────────────────────────────────────────── */
export default function ChalchitraLandingPage() {
  // Section/stagger used internally in Section component
  void Section;
  void stagger;

  return (
    <main
      className="film-grain"
      style={{ background: "var(--bg)", minHeight: "100vh" }}
    >
      <CursorGlow />
      <GlobalGSAP />
      <VeedHero />
      <VeedMarquee />
      <div className="section-divider" />
      <VeedFeatures />
      <div className="section-divider" />
      <VeedHowItWorks />
      <div className="section-divider" />
      <VeedTemplates />
      <div className="section-divider" />
      <VeedUseCases />
      <div className="section-divider" />
      <VeedTestimonials />
      <div className="section-divider" />
      <VeedContact />
      <div className="section-divider" />
      <VeedWaitlist />
      <VeedFooter />
      <ScrollToTop />
    </main>
  );
}
