import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Play, Mic, Scissors, Type, Zap, Box, Layers, Film } from "lucide-react";

const BORDER = "rgba(0,0,0,0.08)";
const SURFACE = "#FAFAFA";
const MUTED = "#737373";
const ACCENT = "#5A6BFB"; // VEED-like purple/blue

/* ────────────────────────────────────────────────────────
   MINI MOCKUP COMPONENTS
──────────────────────────────────────────────────────── */

const ViralShortMockup = ({ isHovered }: { isHovered: boolean }) => (
  <div className="absolute inset-0 bg-[#0A0A0A] overflow-hidden rounded-[14px]">
    {/* Phone frame hint */}
    <div className="absolute inset-x-8 inset-y-4 border-2 border-white/10 rounded-3xl opacity-50 pointer-events-none" />

    {/* Floating captions */}
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
      animate={{ scale: isHovered ? [1, 1.1, 1] : 1 }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <div className="bg-[#FF0050]/20 text-[#FF0050] text-[10px] font-black px-2 py-0.5 rounded shadow-[0_0_10px_rgba(255,0,80,0.5)] transform -rotate-3 mb-1 w-max mx-auto">
        WAIT FOR IT 🤯
      </div>
      <div className="bg-white text-black text-[14px] font-black italic px-2 py-1 transform rotate-2 w-max shadow-xl">
        DID YOU KNOW?
      </div>
    </motion.div>

    {/* Mini timeline */}
    <div className="absolute bottom-6 inset-x-4 flex gap-1">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="h-1.5 rounded-full bg-white/30 flex-1"
          animate={{ opacity: isHovered ? [0.3, 1, 0.3] : 0.3 }}
          transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
        />
      ))}
    </div>
  </div>
);

const PodcastMockup = ({ isHovered }: { isHovered: boolean }) => (
  <div className="absolute inset-0 bg-[#161616] overflow-hidden rounded-[14px] flex flex-col p-3 gap-2">
    {/* Split screen avatars */}
    <div className="flex-1 flex gap-2">
      <div className="flex-1 rounded-xl bg-gradient-to-br from-indigo-900/40 to-black border border-white/5 relative overflow-hidden">
        <Mic className="absolute bottom-2 left-2 text-indigo-400 w-3 h-3" />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[2px] bg-indigo-500"
          animate={{ height: isHovered ? [2, 10, 2] : 2 }}
          transition={{ repeat: Infinity, duration: 0.5 }}
        />
      </div>
      <div className="flex-1 rounded-xl bg-gradient-to-br from-rose-900/40 to-black border border-white/5 relative overflow-hidden">
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[2px] bg-rose-500"
          animate={{ height: isHovered ? [2, 6, 2] : 2 }}
          transition={{ repeat: Infinity, duration: 0.7 }}
        />
      </div>
    </div>

    {/* Waveform */}
    <div className="h-10 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center p-2 gap-[2px]">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-white/20 rounded-full"
          animate={{ scaleY: isHovered ? [1, Math.random() * 2 + 0.5, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 0.5 + Math.random() * 0.5 }}
          style={{ height: '30%' }}
        />
      ))}
    </div>
  </div>
);

const FullEpisodeMockup = ({ isHovered }: { isHovered: boolean }) => (
  <div className="absolute inset-0 bg-[#0F1115] overflow-hidden rounded-[14px] p-3 flex flex-col">
    {/* Main viewer */}
    <div className="h-24 bg-black rounded-lg border border-white/10 relative overflow-hidden mb-2">
      <div className="absolute inset-0 flex items-center justify-center">
        <Film className="w-6 h-6 text-white/10" />
      </div>
      <motion.div
        className="absolute top-2 right-2 flex gap-1"
        animate={{ opacity: isHovered ? [0.4, 1, 0.4] : 0.4 }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
        <span className="text-[6px] text-white font-mono">REC</span>
      </motion.div>
    </div>

    {/* Tracks */}
    <div className="flex-1 flex flex-col gap-1.5 justify-end">
      <div className="flex gap-1 h-3">
        <div className="w-[30%] bg-blue-500/80 rounded-[2px]" />
        <div className="w-[10%] bg-blue-500/40 rounded-[2px]" />
        <div className="w-[50%] bg-blue-500/80 rounded-[2px]" />
      </div>
      <div className="flex gap-1 h-3">
        <div className="w-[15%] bg-purple-500/80 rounded-[2px]" />
        <div className="w-[45%] bg-purple-500/80 rounded-[2px]" />
        <div className="w-[20%] bg-purple-500/80 rounded-[2px]" />
      </div>
      <div className="flex gap-1 h-3">
        <div className="w-[60%] bg-green-500/60 rounded-[2px]" />
      </div>

      {/* Playhead */}
      <motion.div
        className="absolute bottom-3 top-32 w-[1px] bg-white pointer-events-none"
        animate={{ left: isHovered ? ["10%", "80%"] : "30%" }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-sm" />
      </motion.div>
    </div>
  </div>
);

const ProductDropMockup = ({ isHovered }: { isHovered: boolean }) => (
  <div className="absolute inset-0 bg-[#F8F9FA] overflow-hidden rounded-[14px]">
    {/* Clean gradient background */}
    <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 to-rose-100" />

    {/* Center product focus area */}
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-white/60 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl"
      animate={{
        rotate: isHovered ? [0, 5, -5, 0] : 0,
        scale: isHovered ? [1, 1.05, 1] : 1
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <Box className="w-8 h-8 text-black/40" />
    </motion.div>

    {/* Cinematic bars */}
    <motion.div
      className="absolute top-0 inset-x-0 bg-black"
      animate={{ height: isHovered ? "15%" : "0%" }}
      transition={{ duration: 0.8, ease: "circOut" }}
    />
    <motion.div
      className="absolute bottom-0 inset-x-0 bg-black"
      animate={{ height: isHovered ? "15%" : "0%" }}
      transition={{ duration: 0.8, ease: "circOut" }}
    />
  </div>
);

const FitnessMockup = ({ isHovered }: { isHovered: boolean }) => (
  <div className="absolute inset-0 bg-[#1A1A1A] overflow-hidden rounded-[14px] border-[4px] border-black p-1">
    <div className="absolute inset-0 bg-gradient-to-t from-red-600/40 to-transparent mix-blend-overlay" />

    {/* Big timer */}
    <div className="absolute top-4 inset-x-0 text-center">
      <motion.p
        className="font-mono text-4xl font-black text-white italic"
        style={{ textShadow: '0 0 20px rgba(255,0,0,0.8)' }}
        animate={{ opacity: isHovered ? [1, 0.8, 1] : 1 }}
        transition={{ repeat: Infinity, duration: 0.5 }}
      >
        00:15
      </motion.p>
    </div>

    {/* High energy flash */}
    {isHovered && (
      <motion.div
        className="absolute inset-0 bg-white"
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ repeat: Infinity, duration: 0.5, times: [0, 0.1, 1] }}
      />
    )}

    {/* Beat sync markers */}
    <div className="absolute bottom-4 inset-x-4 flex justify-between items-end">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="w-2 bg-yellow-400 rounded-sm"
          animate={{ height: isHovered ? [10, 30, 10] : 10 }}
          transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
        />
      ))}
    </div>
  </div>
);

const CinematicMockup = ({ isHovered }: { isHovered: boolean }) => (
  <div className="absolute inset-0 bg-[#000000] overflow-hidden rounded-[14px]">
    {/* Film grain effect */}
    <div className="absolute inset-0 opacity-30 mix-blend-screen"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      }}
    />

    {/* Moody colored gradient blob */}
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-600/50 rounded-full blur-[40px] pointer-events-none"
      animate={{
        scale: isHovered ? [1, 1.5, 1] : 1,
        backgroundColor: isHovered ? ["rgba(8,145,178,0.5)", "rgba(14,165,233,0.5)", "rgba(8,145,178,0.5)"] : "rgba(8,145,178,0.5)"
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />

    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{ letterSpacing: isHovered ? "8px" : "2px" }}
      transition={{ duration: 4, ease: "easeOut" }}
    >
      <span className="text-white text-[10px] font-thin uppercase tracking-[4px]">P R E S E N T S</span>
    </motion.div>
  </div>
);


/* ────────────────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────────────── */

const templates = [
  {
    name: "Viral Short",
    platform: "TikTok / Reels",
    duration: "15-60 sec",
    style: "Fast cuts, auto-captions",
    Mockup: ViralShortMockup,
    color: "#FF0050",
  },
  {
    name: "Podcast Highlight",
    platform: "YouTube / Spotify",
    duration: "60-90 sec",
    style: "AI speaker tracking",
    Mockup: PodcastMockup,
    color: "#5B21B6",
  },
  {
    name: "Full Episode Edit",
    platform: "YouTube Longform",
    duration: "30-90 min",
    style: "Multi-track mastery",
    Mockup: FullEpisodeMockup,
    color: "#2563EB",
  },
  {
    name: "Minimal Product",
    platform: "Instagram",
    duration: "15 sec",
    style: "Sleek, brand-ready",
    Mockup: ProductDropMockup,
    color: "#CA8A04",
  },
  {
    name: "Fitness Energy",
    platform: "TikTok",
    duration: "30 sec",
    style: "Beat-synced cuts",
    Mockup: FitnessMockup,
    color: "#DC2626",
  },
  {
    name: "Cinematic Intro",
    platform: "YouTube Vlog",
    duration: "15-30 sec",
    style: "LUTS & titles",
    Mockup: CinematicMockup,
    color: "#0891B2",
  },
];

export function VeedTemplates() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    // Calculate drag constraints based on total width of cards
    const cardWidth = 280; // 264px + 16px gap
    const totalContent = templates.length * cardWidth;
    setContentWidth(totalContent);
    setViewportWidth(window.innerWidth);

    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="templates" className="py-24 bg-white overflow-hidden text-[#0F1115]">
      <div className="max-w-[1280px] mx-auto px-6 mb-16">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAFAFA] border border-[#0000000A] shadow-sm mb-6"
          >
            <Layers size={14} className="text-[#5A6BFB]" />
            <span className="text-xs font-semibold tracking-wide text-[#737373]">
              TEMPLATES
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-black tracking-tight mb-4"
            style={{
              fontFamily: "var(--font-halyard)",
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: "1.1",
            }}
          >
            Pick a template.
            <br />
            Drop your footage.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5A6BFB] to-[#D946EF]">
              Done.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#737373] max-w-2xl font-medium"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            60+ creator-ready templates. Drag to explore.
          </motion.p>
        </div>
      </div>

      <div className="relative w-full pl-6 md:pl-12 lg:pl-32 overflow-visible">
        {/* Carousel */}
        <motion.div
          ref={containerRef}
          drag="x"
          dragConstraints={{
            left: viewportWidth > 0 ? -(contentWidth - viewportWidth + 300) : -1000,
            right: 0
          }}
          dragElastic={0.05}
          className="flex gap-4 cursor-grab active:cursor-grabbing select-none"
          style={{ width: "max-content", paddingRight: "40px" }}
        >
          {templates.map((t, i) => (
            <TemplateCard key={i} template={t} index={i} />
          ))}
        </motion.div>

        {/* Right fade out gradient */}
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

function TemplateCard({ template, index }: { template: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Mockup = template.Mockup;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 25 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative flex-shrink-0 w-[264px] h-[360px] rounded-[20px] overflow-hidden flex flex-col bg-white border shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-[#E5E7EB] transition-shadow duration-300 group"
      style={{
        boxShadow: isHovered ? "0 20px 40px rgb(0,0,0,0.08)" : undefined,
      }}
    >
      {/* Visual Area */}
      <div className="relative w-full h-[200px] p-2 bg-[#F3F4F6]">
        <Mockup isHovered={isHovered} />

        {/* Hover action overlay */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center bg-white/10 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-4 py-2 bg-white text-black font-bold text-xs rounded-full shadow-xl flex items-center gap-2 transform transition-transform group-hover:scale-105">
            <Play size={10} fill="currentColor" /> Preview
          </div>
        </motion.div>

        {/* Badges */}
        <div className="absolute top-4 left-4 z-20">
          <span className="text-[10px] font-bold px-2 py-1 rounded bg-black/40 text-white backdrop-blur-md">
            {template.platform.split(" ")[0]}
          </span>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-5 flex flex-col flex-1 bg-white">
        <h3 className="font-bold text-base text-[#0F1115] mb-1">
          {template.name}
        </h3>
        <p className="text-[13px] text-[#737373] line-clamp-1 mb-4">
          {template.style}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#A3A3A3] bg-[#F4F4F5] px-2 py-1 rounded-md">
            {template.duration}
          </span>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: `${template.color}15`, color: template.color }}
          >
            <motion.div
              animate={{ x: isHovered ? [0, 3, 0] : 0 }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              →
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
