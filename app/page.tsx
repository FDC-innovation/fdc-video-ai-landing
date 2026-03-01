"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Clock,
  DollarSign,
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
} from "lucide-react";

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const ACCENT = "#00FFD1";
const SURFACE = "#111111";
const BORDER = "#1f1f1f";
const MUTED = "#666666";
const DANGER = "#FF4D4D";

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] as [number, number, number, number], delay },
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
   ANIMATED COUNTER
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
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) ref.current.textContent = prefix + Math.round(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, target, suffix, prefix]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

/* ─────────────────────────────────────────────
   CURSOR GLOW
───────────────────────────────────────────── */
function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

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
      className="pointer-events-none fixed top-0 left-0 z-50 w-[600px] h-[600px] rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background: `radial-gradient(circle, rgba(0,255,209,0.04) 0%, transparent 70%)`,
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
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 50));
  }, [scrollY]);

  const links = ["Features", "Templates", "How It Works", "Pricing"];

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id.toLowerCase().replace(/\s+/g, "-"))?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b py-3"
          : "bg-transparent py-5"
      }`}
      style={scrolled ? { borderBottomColor: "rgba(255,255,255,0.1)" } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-syne)", color: "#F2F2F2" }}
          >
            FDC
          </span>
          <span
            className="w-2 h-2 rounded-full mt-1"
            style={{ background: ACCENT }}
          />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="text-sm transition-colors duration-200 cursor-pointer bg-transparent border-0"
              style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F2F2F2")}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
            >
              {l}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: `0 0 20px rgba(0,255,209,0.4)` }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("waitlist")}
            className="px-5 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all"
            style={{
              background: ACCENT,
              color: "#080808",
              fontFamily: "var(--font-syne)",
            }}
          >
            Join Waitlist →
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden cursor-pointer bg-transparent border-0"
          style={{ color: "#F2F2F2" }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t backdrop-blur-xl px-6 py-4 flex flex-col gap-4"
          style={{ borderTopColor: "rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.95)" }}
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
            Join Waitlist →
          </button>
        </motion.div>
      )}
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
      transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="relative w-full max-w-3xl mx-auto rounded-2xl border overflow-hidden"
      style={{
        background: "rgba(17,17,17,0.95)",
        borderColor: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(20px)",
        boxShadow: `0 40px 120px rgba(0,0,0,0.8), 0 0 60px rgba(0,255,209,0.06)`,
      }}
    >
      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-3 right-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
        style={{
          background: "rgba(0,255,209,0.12)",
          border: `1px solid rgba(0,255,209,0.3)`,
          color: ACCENT,
          fontFamily: "var(--font-syne)",
        }}
      >
        <span
          className="w-2 h-2 rounded-full pulse-glow"
          style={{ background: ACCENT }}
        />
        AI Processing • 00:02:14 saved
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
          fdc_rawfootage.mp4
        </span>
      </div>

      {/* Preview area */}
      <div className="flex gap-px relative" style={{ height: "180px", background: "rgba(0,0,0,0.5)" }}>
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
            style={{
              background: "#1a1a1a",
              borderColor: "rgba(255,255,255,0.6)",
            }}
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
          {/* Scanning line */}
          <div
            className="scan-line absolute left-0 right-0 h-px opacity-70"
            style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }}
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
        {/* Playhead */}
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
              boxShadow: s.active ? `0 0 12px rgba(0,255,209,0.2)` : "none",
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

  const words1 = ["Stop", "Editing."];
  const words2 = ["Start", "Creating."];

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* Background mesh */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="mesh-orb-1 absolute w-[700px] h-[700px] rounded-full opacity-30"
          style={{
            top: "-100px",
            left: "-100px",
            background: `radial-gradient(circle, rgba(0,255,209,0.18) 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
        />
        <div
          className="mesh-orb-2 absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            top: "200px",
            right: "-150px",
            background: `radial-gradient(circle, rgba(0,180,255,0.15) 0%, transparent 70%)`,
            filter: "blur(100px)",
          }}
        />
        <div
          className="mesh-orb-3 absolute w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            bottom: "100px",
            left: "30%",
            background: `radial-gradient(circle, rgba(130,0,255,0.12) 0%, transparent 70%)`,
            filter: "blur(120px)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-28 pb-16 max-w-5xl mx-auto w-full">
        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="visible"
          className="mb-6 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
          style={{
            background: "rgba(0,255,209,0.08)",
            border: `1px solid rgba(0,255,209,0.2)`,
            color: ACCENT,
            fontFamily: "var(--font-inter)",
          }}
        >
          <span>✦</span>
          <span>AI-Powered Video Editing</span>
        </motion.div>

        {/* Headline */}
        <h1
          className="font-black leading-none mb-6"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(52px, 8vw, 96px)",
            color: "#F2F2F2",
          }}
        >
          <div className="overflow-hidden">
            <div className="flex flex-wrap justify-center gap-x-4">
              {words1.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.3 + i * 0.12,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden mt-2">
            <div className="flex flex-wrap justify-center gap-x-4">
              {words2.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.55 + i * 0.12,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                  }}
                  className="inline-block"
                  style={word === "Creating." ? { color: ACCENT } : {}}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
        </h1>

        {/* Sub */}
        <motion.p
          variants={fadeUp}
          custom={0.7}
          initial="hidden"
          animate="visible"
          className="text-lg max-w-xl mb-10 leading-relaxed"
          style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
        >
          FDC turns raw footage into publish-ready content in minutes. No timeline.
          No complexity. Just results.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          custom={0.85}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 30px rgba(0,255,209,0.5)`,
            }}
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
            Join the Waitlist
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full font-medium text-base cursor-pointer transition-all"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#F2F2F2",
              background: "transparent",
              fontFamily: "var(--font-inter)",
            }}
          >
            Watch Demo ▶
          </motion.button>
        </motion.div>

        {/* Social proof */}
        <motion.p
          variants={fadeUp}
          custom={1.0}
          initial="hidden"
          animate="visible"
          className="text-sm mb-14"
          style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
        >
          <span style={{ color: ACCENT }}>✦</span> 2,400+ creators on the waitlist
        </motion.p>

        {/* Editor mockup */}
        <EditorMockup />
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
    "TikTok Brands",
    "Course Creators",
    "Marketing Agencies",
    "Freelancers",
    "E-commerce Brands",
    "Podcasters",
    "Documentary Makers",
  ];
  const doubled = [...items, ...items];

  return (
    <section
      className="py-12 overflow-hidden"
      style={{ background: "#0c0c0c", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
    >
      <p
        className="text-center text-sm mb-6"
        style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
      >
        Trusted by creators at
      </p>
      <div className="relative overflow-hidden">
        <div className="marquee-inner flex gap-12 whitespace-nowrap">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="text-sm font-medium flex-shrink-0 flex items-center gap-3"
              style={{ color: "#333", fontFamily: "var(--font-syne)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: BORDER }}
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
   PAIN POINTS
───────────────────────────────────────────── */
function PainPoints() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const pains = [
    {
      icon: <Clock size={28} style={{ color: DANGER }} />,
      stat: "6+ Hours",
      title: "Per video, wasted editing",
      body: "Cutting, color correcting, adding captions, syncing audio — the average creator burns an entire workday just to finish one video.",
    },
    {
      icon: <DollarSign size={28} style={{ color: "#F5A623" }} />,
      stat: "$2,000+",
      title: "Per video, wasted on editors",
      body: "Hiring a professional video editor is expensive, slow, and unpredictable. Revisions take days. Deadlines get missed. Budgets explode.",
    },
    {
      icon: <BrainCircuit size={28} style={{ color: "#A78BFA" }} />,
      stat: "Months",
      title: "To master pro tools",
      body: "Premiere Pro, DaVinci Resolve, After Effects — powerful tools built for professionals, not for people who just want to post great content.",
    },
  ];

  return (
    <section
      id="pain-points"
      className="py-28 px-6"
      style={{ background: "#080808" }}
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2
            className="font-black mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(32px, 5vw, 52px)",
              color: "#F2F2F2",
            }}
          >
            Video editing is broken for most people.
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
          >
            The old way is slow, expensive, and built for experts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pains.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300 } }}
              className="rounded-2xl p-8 flex flex-col border"
              style={{ background: SURFACE, borderColor: BORDER }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ background: "rgba(255,77,77,0.08)", border: `1px solid rgba(255,77,77,0.2)` }}
              >
                {p.icon}
              </div>
              <p
                className="text-5xl font-black mb-2"
                style={{ fontFamily: "var(--font-syne)", color: "#F2F2F2" }}
              >
                {p.stat}
              </p>
              <p
                className="font-semibold mb-3 text-base"
                style={{ color: "#aaa", fontFamily: "var(--font-syne)" }}
              >
                {p.title}
              </p>
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
              >
                {p.body}
              </p>
              <div
                className="mt-6 h-1 rounded-full opacity-60"
                style={{ background: `linear-gradient(90deg, ${DANGER}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12 text-lg font-semibold"
          style={{ color: ACCENT, fontFamily: "var(--font-syne)" }}
        >
          There is a better way. →
        </motion.p>
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

  const cardBase = "rounded-2xl p-6 border flex flex-col gap-4 cursor-default transition-all duration-300";

  return (
    <section
      id="features"
      className="py-28 px-6"
      style={{ background: "#0c0c0c" }}
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2
            className="font-black mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(32px, 5vw, 52px)",
              color: "#F2F2F2",
            }}
          >
            Everything you need. Nothing you don&apos;t.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* AI Smart Edit — col-span-2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 }}
            whileHover={{ borderColor: "rgba(0,255,209,0.2)", boxShadow: "0 0 30px rgba(0,255,209,0.05)" }}
            className={`${cardBase} col-span-1 sm:col-span-2`}
            style={{ background: SURFACE, borderColor: BORDER }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,255,209,0.1)", border: `1px solid rgba(0,255,209,0.2)` }}
              >
                <BrainCircuit size={22} style={{ color: ACCENT }} />
              </div>
              <div>
                <h3
                  className="font-bold text-lg mb-1"
                  style={{ fontFamily: "var(--font-syne)", color: "#F2F2F2" }}
                >
                  AI Smart Edit
                </h3>
                <p
                  className="text-sm"
                  style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
                >
                  Drop your footage. Our AI analyzes pacing, removes dead air, fixes jump cuts,
                  and assembles a polished cut automatically.
                </p>
              </div>
            </div>
            <div
              className="relative rounded-xl overflow-hidden h-28"
              style={{ background: "rgba(0,0,0,0.4)", border: `1px solid ${BORDER}` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>
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
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            whileHover={{ borderColor: "rgba(0,255,209,0.2)", boxShadow: "0 0 30px rgba(0,255,209,0.05)" }}
            className={cardBase}
            style={{ background: SURFACE, borderColor: BORDER }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(0,255,209,0.1)", border: `1px solid rgba(0,255,209,0.2)` }}
            >
              <span style={{ color: ACCENT }} className="text-lg font-bold">Cc</span>
            </div>
            <h3 className="font-bold" style={{ fontFamily: "var(--font-syne)", color: "#F2F2F2" }}>
              Auto Captions
            </h3>
            <p className="text-sm" style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>
              98% accurate, styled captions generated in seconds. Animated, branded, ready to post.
            </p>
            <div
              className="rounded-lg p-3 text-xs font-mono"
              style={{ background: "rgba(0,0,0,0.4)", color: ACCENT }}
            >
              <motion.span
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ repeat: Infinity, duration: 3, times: [0, 0.1, 0.8, 1] }}
              >
                &quot;This is how you build in public...&quot;
              </motion.span>
              <span className="cursor-blink">|</span>
            </div>
          </motion.div>

          {/* Smart Reframe */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            whileHover={{ borderColor: "rgba(0,255,209,0.2)", boxShadow: "0 0 30px rgba(0,255,209,0.05)" }}
            className={cardBase}
            style={{ background: SURFACE, borderColor: BORDER }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(0,255,209,0.1)", border: `1px solid rgba(0,255,209,0.2)` }}
            >
              <Sliders size={18} style={{ color: ACCENT }} />
            </div>
            <h3 className="font-bold" style={{ fontFamily: "var(--font-syne)", color: "#F2F2F2" }}>
              Smart Reframe
            </h3>
            <p className="text-sm" style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>
              One video, every platform. Auto-crops for 9:16, 16:9, 1:1 with subject tracking.
            </p>
            <div className="flex gap-2 items-end">
              {[{ r: "9:16", h: "52px" }, { r: "16:9", h: "36px" }, { r: "1:1", h: "44px" }].map(({ r, h }) => (
                <div
                  key={r}
                  className="flex-1 rounded flex items-center justify-center text-xs font-semibold"
                  style={{
                    background: "rgba(0,255,209,0.08)",
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

          {/* Silence Remover */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            whileHover={{ borderColor: "rgba(0,255,209,0.2)", boxShadow: "0 0 30px rgba(0,255,209,0.05)" }}
            className={cardBase}
            style={{ background: SURFACE, borderColor: BORDER }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(0,255,209,0.1)", border: `1px solid rgba(0,255,209,0.2)` }}
            >
              <Zap size={18} style={{ color: ACCENT }} />
            </div>
            <h3 className="font-bold" style={{ fontFamily: "var(--font-syne)", color: "#F2F2F2" }}>
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
                      background: isSilent ? "rgba(255,77,77,0.3)" : `rgba(0,255,209,${0.4 + (i % 4) * 0.15})`,
                      height: isSilent ? "20%" : barHeight,
                    }}
                    animate={!isSilent ? { scaleY: [1, 0.6, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 0.8 + (i % 5) * 0.2, delay: (i % 7) * 0.1 }}
                  />
                );
              })}
            </div>
            <p className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>
              Dead air detected and removed automatically.
            </p>
          </motion.div>

          {/* AI Music Sync */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
            whileHover={{ borderColor: "rgba(0,255,209,0.2)", boxShadow: "0 0 30px rgba(0,255,209,0.05)" }}
            className={cardBase}
            style={{ background: SURFACE, borderColor: BORDER }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(0,255,209,0.1)", border: `1px solid rgba(0,255,209,0.2)` }}
            >
              <span style={{ color: ACCENT, fontSize: "18px" }}>♪</span>
            </div>
            <h3 className="font-bold" style={{ fontFamily: "var(--font-syne)", color: "#F2F2F2" }}>
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
            <p className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>
              Cuts sync to the beat. Royalty-free music library included.
            </p>
          </motion.div>

          {/* Color Grade */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            whileHover={{ borderColor: "rgba(0,255,209,0.2)", boxShadow: "0 0 30px rgba(0,255,209,0.05)" }}
            className={cardBase}
            style={{ background: SURFACE, borderColor: BORDER }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(0,255,209,0.1)", border: `1px solid rgba(0,255,209,0.2)` }}
            >
              <span style={{ color: ACCENT, fontSize: "18px" }}>◑</span>
            </div>
            <h3 className="font-bold" style={{ fontFamily: "var(--font-syne)", color: "#F2F2F2" }}>
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
            <p className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>
              Cinematic look applied in one click. Match any aesthetic.
            </p>
          </motion.div>

          {/* Brand Kit */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
            whileHover={{ borderColor: "rgba(0,255,209,0.2)", boxShadow: "0 0 30px rgba(0,255,209,0.05)" }}
            className={cardBase}
            style={{ background: SURFACE, borderColor: BORDER }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(0,255,209,0.1)", border: `1px solid rgba(0,255,209,0.2)` }}
            >
              <span style={{ color: ACCENT, fontSize: "18px" }}>◈</span>
            </div>
            <h3 className="font-bold" style={{ fontFamily: "var(--font-syne)", color: "#F2F2F2" }}>
              Brand Kit
            </h3>
            <div className="flex gap-2">
              {[ACCENT, "#A78BFA", "#F59E0B", "#EF4444"].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-lg" style={{ background: c }} />
              ))}
            </div>
            <p className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>
              Upload logo, set colors and fonts once. Every export is branded.
            </p>
          </motion.div>

          {/* B-Roll AI — col-span-2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            whileHover={{ borderColor: "rgba(0,255,209,0.2)", boxShadow: "0 0 30px rgba(0,255,209,0.05)" }}
            className={`${cardBase} col-span-1 sm:col-span-2`}
            style={{ background: SURFACE, borderColor: BORDER }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,255,209,0.1)", border: `1px solid rgba(0,255,209,0.2)` }}
              >
                <span style={{ color: ACCENT }}>▦</span>
              </div>
              <div>
                <h3
                  className="font-bold mb-1"
                  style={{ fontFamily: "var(--font-syne)", color: "#F2F2F2" }}
                >
                  B-Roll AI Suggestions
                </h3>
                <p className="text-sm" style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>
                  AI matches your script with relevant stock footage from our 10M+ library.
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
                  whileHover={{ scale: 1.05 }}
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
      body: "Any format. Phone video, screen recording, DSLR. FDC accepts everything.",
      visual: (
        <div
          className="mt-4 rounded-xl p-4 flex flex-col gap-2"
          style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${BORDER}` }}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>uploading_raw.mp4</span>
            <span style={{ color: ACCENT, fontFamily: "var(--font-syne)" }}>87%</span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <div
              className="upload-bar h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${ACCENT}, rgba(0,255,209,0.6))` }}
            />
          </div>
        </div>
      ),
    },
    {
      icon: <Sliders size={28} style={{ color: ACCENT }} />,
      number: "02",
      title: "Pick a Template or Style",
      body: "Choose from 50+ templates or describe your vibe. Set platform, length, tone.",
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
              style={{ borderColor: i === 0 ? `rgba(0,255,209,0.5)` : BORDER }}
            />
          ))}
        </div>
      ),
    },
    {
      icon: <Zap size={28} style={{ color: ACCENT }} />,
      number: "03",
      title: "Download or Publish Direct",
      body: "Export to YouTube, TikTok, Instagram, LinkedIn simultaneously. One click.",
      visual: (
        <div className="mt-4 flex flex-col gap-2">
          {["YouTube", "TikTok", "Instagram", "LinkedIn"].map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.15 }}
              className="flex items-center gap-2 text-sm"
            >
              <Check size={14} style={{ color: ACCENT }} />
              <span style={{ color: "#aaa", fontFamily: "var(--font-inter)" }}>{p}</span>
              <div
                className="ml-auto px-2 py-0.5 rounded-full text-xs"
                style={{ background: "rgba(0,255,209,0.1)", color: ACCENT, fontFamily: "var(--font-syne)" }}
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
      style={{ background: "#080808" }}
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2
            className="font-black mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(32px, 5vw, 52px)",
              color: "#F2F2F2",
            }}
          >
            From raw to ready in 3 steps.
          </h2>
          <p className="text-lg" style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>
            The fastest path from footage to finished.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="relative flex flex-col rounded-2xl p-7 border"
              style={{ background: SURFACE, borderColor: BORDER }}
            >
              <div
                className="text-6xl font-black mb-4 leading-none"
                style={{
                  fontFamily: "var(--font-syne)",
                  color: "rgba(0,255,209,0.07)",
                  letterSpacing: "-4px",
                }}
              >
                {s.number}
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(0,255,209,0.1)", border: `1px solid rgba(0,255,209,0.2)` }}
              >
                {s.icon}
              </div>
              <h3
                className="font-bold text-xl mb-2"
                style={{ fontFamily: "var(--font-syne)", color: "#F2F2F2" }}
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
function TemplatesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const dragContainerRef = useRef<HTMLDivElement>(null);

  const templates = [
    { name: "Viral Short", platform: "TikTok / Reels", duration: "15-60 sec", style: "Fast cuts, hooks", grad: "from-pink-600 to-orange-500" },
    { name: "Product Drop", platform: "Instagram", duration: "30 sec", style: "Luxury minimal", grad: "from-yellow-900 to-yellow-600" },
    { name: "Podcast Clip", platform: "YouTube Shorts", duration: "60 sec", style: "Talking head", grad: "from-blue-700 to-purple-600" },
    { name: "Fitness Reel", platform: "TikTok", duration: "30 sec", style: "Beat sync", grad: "from-orange-600 to-red-600" },
    { name: "Corporate Intro", platform: "LinkedIn", duration: "90 sec", style: "Professional", grad: "from-blue-900 to-teal-700" },
    { name: "Tutorial", platform: "YouTube", duration: "3-10 min", style: "Step by step", grad: "from-green-700 to-teal-600" },
    { name: "Travel Vlog", platform: "YouTube / Instagram", duration: "2-5 min", style: "Cinematic", grad: "from-teal-600 to-blue-700" },
    { name: "Testimonial", platform: "Ads / Web", duration: "60 sec", style: "Social proof", grad: "from-gray-700 to-gray-500" },
  ];

  return (
    <section
      id="templates"
      className="py-28 overflow-hidden"
      style={{ background: "#0c0c0c" }}
    >
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2
            className="font-black mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(32px, 5vw, 52px)",
              color: "#F2F2F2",
            }}
          >
            Pick a template. Drop your footage. Done.
          </h2>
          <p className="text-lg" style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>
            Creator-ready templates for every content type and platform.
          </p>
        </motion.div>
      </div>

      <div className="px-6 overflow-hidden" ref={dragContainerRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: -((templates.length - 3) * 280), right: 0 }}
            dragElastic={0.05}
            className="flex gap-4 cursor-grab active:cursor-grabbing select-none"
            style={{ width: "max-content" }}
          >
            {templates.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.07 }}
                whileHover={{ scale: 1.04 }}
                className="relative flex-shrink-0 rounded-2xl border overflow-hidden flex flex-col"
                style={{
                  background: SURFACE,
                  borderColor: BORDER,
                  width: "256px",
                  height: "360px",
                }}
              >
                {/* Thumbnail */}
                <div className={`h-40 bg-gradient-to-br ${t.grad} relative flex-shrink-0`}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.45)" }}
                  >
                    <span
                      className="text-sm font-bold px-3 py-1.5 rounded-full"
                      style={{ background: ACCENT, color: "#080808", fontFamily: "var(--font-syne)" }}
                    >
                      ▶ Preview
                    </span>
                  </motion.div>
                  <div className="absolute top-2 left-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "rgba(0,0,0,0.6)", color: "#F2F2F2", fontFamily: "var(--font-syne)" }}
                    >
                      {t.platform.split("/")[0].trim()}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "rgba(0,0,0,0.6)", color: MUTED, fontFamily: "var(--font-inter)" }}
                    >
                      {t.duration}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <p
                    className="font-bold text-base mb-1"
                    style={{ fontFamily: "var(--font-syne)", color: "#F2F2F2" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-xs mb-3" style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>
                    {t.style}
                  </p>
                  <div className="flex-1" />
                  <button
                    className="w-full py-2 rounded-full text-xs font-semibold cursor-pointer transition-all mt-2"
                    style={{
                      border: `1px solid rgba(0,255,209,0.3)`,
                      color: ACCENT,
                      background: "rgba(0,255,209,0.05)",
                      fontFamily: "var(--font-syne)",
                    }}
                  >
                    Use Template →
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   USE CASES
───────────────────────────────────────────── */
function UseCases() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const cases = [
    {
      emoji: "🎨",
      title: "Content Creators",
      tagline: "Post more. Edit less.",
      accent: ACCENT,
      benefits: [
        "Auto-cut silence and filler words",
        "One-click captions for every platform",
        "Consistent look across all videos",
        "Batch export to TikTok, YouTube, Reels",
      ],
    },
    {
      emoji: "🏢",
      title: "Brands & Teams",
      tagline: "Consistent video at scale.",
      accent: "#F2F2F2",
      benefits: [
        "Shared brand kit across all editors",
        "Approval workflows built in",
        "5 team seats on Studio plan",
        "White-label exports",
      ],
    },
    {
      emoji: "🎓",
      title: "Educators",
      tagline: "Transform recordings into lessons.",
      accent: ACCENT,
      benefits: [
        "Auto-chapter your long recordings",
        "Highlight key moments with AI",
        "Transcript and captions auto-generated",
        "Export for Teachable, Kajabi, Udemy",
      ],
    },
    {
      emoji: "📹",
      title: "Agencies",
      tagline: "Handle 10x more clients.",
      accent: "#F2F2F2",
      benefits: [
        "API access for custom integrations",
        "Unlimited client workspaces",
        "Custom template creation",
        "Priority rendering queue",
      ],
    },
  ];

  return (
    <section className="py-28 px-6" style={{ background: "#080808" }}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2
            className="font-black mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(32px, 5vw, 52px)",
              color: "#F2F2F2",
            }}
          >
            Built for every kind of creator.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300 } }}
              className="rounded-2xl p-8 border flex flex-col"
              style={{
                background: SURFACE,
                borderColor: BORDER,
                borderTopColor: c.accent,
                borderTopWidth: "2px",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{c.emoji}</span>
                <div>
                  <h3
                    className="font-bold text-lg"
                    style={{ fontFamily: "var(--font-syne)", color: "#F2F2F2" }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: c.accent, fontFamily: "var(--font-syne)" }}
                  >
                    {c.tagline}
                  </p>
                </div>
              </div>
              <ul className="flex flex-col gap-2">
                {c.benefits.map((b, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
                  >
                    <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: c.accent }} />
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
   STATS BAR
───────────────────────────────────────────── */
function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const stats = [
    { value: 50, suffix: "+", label: "Templates Available" },
    { value: 98, suffix: "%", label: "Transcription Accuracy" },
    { value: 3, suffix: " min", label: "Average Edit Time" },
    { value: 10, suffix: "x", label: "Faster Than Manual" },
  ];

  return (
    <section
      className="py-20 px-6"
      style={{ background: "#0f0f0f", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
    >
      <div
        className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10"
        ref={ref}
      >
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <p
              className="font-black leading-none mb-2"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "64px",
                color: ACCENT,
              }}
            >
              {inView ? (
                <Counter target={s.value} suffix={s.suffix} />
              ) : (
                `0${s.suffix}`
              )}
            </p>
            <p className="text-sm" style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>
              {s.label}
            </p>
          </motion.div>
        ))}
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
      quote: "I cut my editing time from 6 hours to 20 minutes. Not exaggerating.",
      name: "Aryan S.",
      role: "YouTube Creator",
      sub: "240K subscribers",
      initials: "AS",
    },
    {
      quote: "The auto-captions alone are worth it. Better than anything I&apos;ve used.",
      name: "Priya M.",
      role: "Brand Strategist",
      sub: "",
      initials: "PM",
    },
    {
      quote: "Our product launch video looked like we hired a full studio.",
      name: "Rohan K.",
      role: "E-commerce Founder",
      sub: "",
      initials: "RK",
    },
    {
      quote: "Finally an AI tool that actually understands what I&apos;m trying to say.",
      name: "Tasneem A.",
      role: "Course Creator",
      sub: "",
      initials: "TA",
    },
  ];

  return (
    <section className="py-28 px-6" style={{ background: "#0c0c0c" }}>
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2
            className="font-black mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 4vw, 48px)",
              color: "#F2F2F2",
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
              whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300 } }}
              className="rounded-2xl p-7 border flex flex-col gap-5"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                borderColor: "rgba(255,255,255,0.08)",
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
                    background: `rgba(0,255,209,0.12)`,
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
                    style={{ color: "#F2F2F2", fontFamily: "var(--font-syne)" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>
                    {t.role}{t.sub ? ` · ${t.sub}` : ""}
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
   PRICING
───────────────────────────────────────────── */
function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      features: ["5 exports / month", "Watermarked exports", "10 templates", "Basic captions"],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Creator",
      price: "$19",
      period: "/month",
      features: [
        "Unlimited exports",
        "No watermark",
        "All 50+ templates",
        "Brand kit",
        "All platforms",
        "Priority rendering",
      ],
      cta: "Join Waitlist for 50% Off",
      popular: true,
    },
    {
      name: "Studio",
      price: "$49",
      period: "/month",
      features: [
        "Everything in Creator",
        "5 team seats",
        "API access",
        "White label exports",
        "Custom templates",
        "Dedicated support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-28 px-6" style={{ background: "#080808" }}>
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2
            className="font-black mb-3"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(32px, 5vw, 52px)",
              color: "#F2F2F2",
            }}
          >
            Simple pricing. No surprises.
          </h2>
          <p className="text-lg" style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>
            Start free. Scale when you&apos;re ready.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative"
            >
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span
                    className="text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap"
                    style={{ background: ACCENT, color: "#080808", fontFamily: "var(--font-syne)" }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              <motion.div
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="relative rounded-2xl p-7 flex flex-col border overflow-hidden"
                style={
                  p.popular
                    ? {
                        background: SURFACE,
                        border: `1px solid rgba(0,255,209,0.3)`,
                        boxShadow: `0 0 60px rgba(0,255,209,0.10)`,
                        marginTop: "8px",
                      }
                    : { background: SURFACE, borderColor: BORDER }
                }
              >
                {p.popular && (
                  <motion.div
                    className="animated-border absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: `conic-gradient(from var(--angle, 0deg), transparent 60%, rgba(0,255,209,0.5) 75%, transparent 90%)`,
                      padding: "1px",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                )}
                <p
                  className="font-bold mb-1 text-base"
                  style={{ fontFamily: "var(--font-syne)", color: p.popular ? ACCENT : "#888" }}
                >
                  {p.name}
                </p>
                <div className="flex items-end gap-1 mb-6">
                  <span
                    className="font-black"
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontSize: "48px",
                      color: "#F2F2F2",
                      lineHeight: 1,
                    }}
                  >
                    {p.price}
                  </span>
                  <span className="mb-2 text-sm" style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>
                    {p.period}
                  </span>
                </div>

                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {p.features.map((f, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "#aaa", fontFamily: "var(--font-inter)" }}
                    >
                      <Check size={14} style={{ color: p.popular ? ACCENT : "#555", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{
                    scale: 1.04,
                    boxShadow: p.popular ? `0 0 30px rgba(0,255,209,0.4)` : "none",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="w-full py-3 rounded-full font-semibold text-sm cursor-pointer transition-all"
                  style={
                    p.popular
                      ? { background: ACCENT, color: "#080808", fontFamily: "var(--font-syne)" }
                      : {
                          background: "transparent",
                          border: `1px solid ${BORDER}`,
                          color: "#888",
                          fontFamily: "var(--font-syne)",
                        }
                  }
                >
                  {p.cta}
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10 text-sm"
          style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
        >
          🔒 Launching soon — waitlist members get 50% off for 3 months.
        </motion.p>
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
      style={{ background: "#080808" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{
          width: "700px",
          height: "700px",
          background: `radial-gradient(circle, rgba(0,255,209,0.08) 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto text-center" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-black mb-4"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(28px, 4vw, 48px)",
            color: "#F2F2F2",
          }}
        >
          The future of video editing is almost here.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mb-10 text-base leading-relaxed"
          style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
        >
          Join 2,400+ creators. Get early access, founding member pricing,
          and exclusive templates.
        </motion.p>

        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
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
                color: "#F2F2F2",
                fontFamily: "var(--font-inter)",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = ACCENT)}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
            <input
              type="email"
              placeholder="Email address"
              required
              className="w-full px-5 py-4 rounded-xl text-sm transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid rgba(255,255,255,0.1)`,
                color: "#F2F2F2",
                fontFamily: "var(--font-inter)",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = ACCENT)}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
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
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            >
              <option value="" disabled>What do you create?</option>
              <option value="short">Short Content</option>
              <option value="long">Long Form</option>
              <option value="corporate">Corporate</option>
              <option value="education">Education</option>
              <option value="ecommerce">E-commerce</option>
              <option value="other">Other</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: `0 0 30px rgba(0,255,209,0.4)` }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-base cursor-pointer transition-all flex items-center justify-center gap-2"
              style={{ background: ACCENT, color: "#080808", fontFamily: "var(--font-syne)" }}
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 flex flex-col items-center gap-4"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,255,209,0.15)", border: `2px solid ${ACCENT}` }}
            >
              <Check size={28} style={{ color: ACCENT }} />
            </div>
            <p
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-syne)", color: "#F2F2F2" }}
            >
              You&apos;re on the list!
            </p>
            <p className="text-sm" style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>
              We&apos;ll be in touch with early access details.
            </p>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-6 text-xs"
          style={{ color: "#444", fontFamily: "var(--font-inter)" }}
        >
          🔒 No spam. Ever. Unsubscribe anytime.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mt-6"
        >
          {["Early Access", "50% Off Launch Pricing", "Founding Member Badge"].map((pill, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1.5 rounded-full"
              style={{
                border: `1px solid rgba(0,255,209,0.2)`,
                color: ACCENT,
                background: "rgba(0,255,209,0.05)",
                fontFamily: "var(--font-inter)",
              }}
            >
              {pill}
            </span>
          ))}
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
    { title: "Product", links: ["Features", "Templates", "Pricing", "Roadmap"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
    { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
  ];

  return (
    <footer
      className="px-6 pt-16 pb-8"
      style={{ background: "#080808", borderTop: `1px solid ${BORDER}` }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-syne)", color: "#F2F2F2" }}
              >
                FDC
              </span>
              <span className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: MUTED, fontFamily: "var(--font-inter)" }}>
              Edit less. Create more.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p
                className="font-bold text-sm mb-4"
                style={{ fontFamily: "var(--font-syne)", color: "#aaa" }}
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
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#F2F2F2")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
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
          <p className="text-xs" style={{ color: "#333", fontFamily: "var(--font-inter)" }}>
            © 2025 FDC Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.2 }}
                style={{ color: "#333", display: "flex" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = ACCENT)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#333")}
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
      whileHover={{ scale: 1.1, boxShadow: `0 0 20px rgba(0,255,209,0.4)` }}
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
   ROOT PAGE
───────────────────────────────────────────── */
export default function FDCLandingPage() {
  // Suppress unused import warnings — Section/fadeUp/stagger used internally
  void Section;
  void fadeUp;
  void stagger;

  return (
    <main className="film-grain" style={{ background: "#080808", minHeight: "100vh" }}>
      <CursorGlow />
      <Navbar />
      <HeroSection />
      <TrustBar />
      <PainPoints />
      <div className="section-divider" />
      <FeaturesBento />
      <div className="section-divider" />
      <HowItWorks />
      <div className="section-divider" />
      <TemplatesSection />
      <div className="section-divider" />
      <UseCases />
      <div className="section-divider" />
      <StatsBar />
      <div className="section-divider" />
      <Testimonials />
      <div className="section-divider" />
      <Pricing />
      <div className="section-divider" />
      <WaitlistSection />
      <div className="section-divider" />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
