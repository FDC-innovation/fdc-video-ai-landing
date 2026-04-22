"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useCallback } from "react";
import { Mic2, BrainCircuit, Sparkles, Scissors, Film } from "lucide-react";

function VideoThumb({ src, className, style }: { src: string; className?: string; style?: React.CSSProperties }) {
  const handleRef = useCallback((el: HTMLVideoElement | null) => {
    if (!el) return;
    const seek = () => { el.currentTime = 0.1; };
    if (el.readyState >= 1) {
      seek();
    } else {
      el.addEventListener("loadedmetadata", seek, { once: true });
    }
  }, []);

  return (
    <video
      ref={handleRef}
      src={src}
      controls
      playsInline
      preload="metadata"
      className={className}
      style={style}
    />
  );
}

/* ── Pipeline nodes shown in the center flow ── */
const pipelineNodes = [
  { Icon: Mic2,         label: "Transcribe",  sub: "Whisper AI",      color: "#818CF8" },
  { Icon: BrainCircuit, label: "Understand",  sub: "Auto-metadata",   color: "#C084FC" },
  { Icon: Sparkles,     label: "Find Clips",  sub: "Top 3 moments",   color: "#F472B6" },
  { Icon: Scissors,     label: "Cut & Sync",  sub: "Frame-accurate",  color: "#34D399" },
  { Icon: Film,         label: "Render",      sub: "Social-ready",    color: "#FB923C" },
];

/* ── Animated flowing dots along a connector line ── */
function FlowDots({ color }: { color: string }) {
  return (
    <div className="relative w-full h-0.5" style={{ background: "rgba(255,255,255,0.07)" }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          animate={{ x: ["-120%", "800%"] }}
          transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.53, ease: "linear" }}
        />
      ))}
    </div>
  );
}

/* ── One pipeline step node ── */
function PipelineNode({
  node,
  index,
  inView,
}: {
  node: (typeof pipelineNodes)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      className="flex flex-col items-center gap-2"
    >
      <motion.div
        animate={{ boxShadow: [`0 0 0px ${node.color}60`, `0 0 18px ${node.color}80`, `0 0 0px ${node.color}60`] }}
        transition={{ repeat: Infinity, duration: 2.2, delay: index * 0.4 }}
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ background: `${node.color}18`, border: `1.5px solid ${node.color}50` }}
      >
        <node.Icon size={20} style={{ color: node.color }} strokeWidth={1.8} />
      </motion.div>
      <p className="text-[11px] font-bold text-white/80 text-center leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
        {node.label}
      </p>
      <p className="text-[10px] text-white/35 text-center" style={{ fontFamily: "var(--font-inter)" }}>
        {node.sub}
      </p>
    </motion.div>
  );
}

/* ── Input video card (left) ── */
function InputCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-3"
    >
      <p className="text-[11px] font-bold tracking-widest uppercase text-white/30" style={{ fontFamily: "var(--font-syne)" }}>
        Input
      </p>

      {/* Video slot — swap src="" with your actual video later */}
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          aspectRatio: "16/9",
          background: "#111",
          border: "1.5px solid rgba(255,255,255,0.08)",
          minWidth: 220,
        }}
      >
        <video
          src="/vedio/Screen Recording 2026-04-16 120048.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Floating format pills */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {["MP4", "MP3", "MOV", "MKV"].map((fmt) => (
            <span
              key={fmt}
              className="px-2 py-0.5 rounded-md text-[9px] font-bold"
              style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {fmt}
            </span>
          ))}
        </div>
      </div>

      {/* Upload label */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(90,107,251,0.1)", border: "1px solid rgba(90,107,251,0.2)" }}>
        <motion.div className="w-2 h-2 rounded-full bg-[#5A6BFB]" animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
        <span className="text-[12px] font-semibold text-[#818CF8]" style={{ fontFamily: "var(--font-inter)" }}>
          1 upload · Processing instantly
        </span>
      </div>
    </motion.div>
  );
}

/* ── Output clips (right) ── */
function OutputCards({ inView }: { inView: boolean }) {
  const clips = [
    { label: "Clip 1", platform: "Reels",  color: "#E1306C", src: "/vedio/clip1.mp4" },
    { label: "Clip 2", platform: "Shorts", color: "#FF0000", src: "/vedio/clip2.mp4" },
    { label: "Clip 3", platform: "TikTok", color: "#69C9D0", src: "/vedio/clip3.mp4" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="flex flex-col gap-3"
    >
      <p className="text-[11px] font-bold tracking-widest uppercase text-white/30" style={{ fontFamily: "var(--font-syne)" }}>
        Output
      </p>

      {/* 3 portrait clip cards */}
      <div className="flex gap-3 items-end">
        {clips.map((clip, i) => (
          <motion.div
            key={clip.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.5 + i * 0.12 }}
            className="relative rounded-xl overflow-hidden flex-1"
            style={{
              aspectRatio: "9/16",
              background: "#111",
              border: "1.5px solid rgba(255,255,255,0.08)",
              maxWidth: 90,
              minWidth: 64,
            }}
          >
            <video
              src={clip.src}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Animated caption bar */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 px-1.5 py-2"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }}
            >
              <motion.div
                className="h-1.5 rounded-full mb-1.5"
                style={{ background: clip.color, width: "60%" }}
                animate={{ width: ["40%", "80%", "55%", "70%"] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.4 }}
              />
              <div className="h-1 rounded-full mb-1" style={{ background: "rgba(255,255,255,0.15)", width: "90%" }} />
              <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.1)", width: "70%" }} />
            </motion.div>

            {/* Platform badge */}
            <div
              className="absolute top-2 left-1.5 px-1.5 py-0.5 rounded-md text-[8px] font-bold"
              style={{ background: clip.color, color: "white" }}
            >
              {clip.platform}
            </div>

            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "rgba(255,255,255,0.1)" }}>
              <motion.div
                className="h-full"
                style={{ background: clip.color }}
                animate={{ width: ["0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 3 + i * 0.5, delay: i * 0.3 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Output label */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
        <motion.div className="w-2 h-2 rounded-full bg-[#34D399]" animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }} />
        <span className="text-[12px] font-semibold text-[#34D399]" style={{ fontFamily: "var(--font-inter)" }}>
          3 viral clips · Ready to post
        </span>
      </div>
    </motion.div>
  );
}

/* ── Main export ── */
export function VeedHowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="relative py-24 px-6 md:px-12 w-full overflow-hidden" style={{ background: "#080808" }}>

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-5%] top-[20%] w-125 h-125 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(90,107,251,0.3) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div className="absolute right-[-5%] bottom-[10%] w-100 h-100 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(217,70,239,0.3) 0%, transparent 65%)", filter: "blur(80px)" }} />
      </div>

      <div className="relative z-10 max-w-310 mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <span className="text-[11px] font-bold tracking-widest uppercase text-white/40" style={{ fontFamily: "var(--font-inter)" }}>
              How It Works
            </span>
          </div>
          <h2 className="text-white text-[36px] md:text-[52px] font-black leading-[1.05] tracking-[-0.02em] mb-3"
            style={{ fontFamily: "var(--font-syne)" }}>
            Upload your video.{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#818CF8] to-[#D946EF]">
              Get viral clips.
            </span>{" "}
            Automatically.
          </h2>
          <p className="text-white/60 text-lg" style={{ fontFamily: "var(--font-inter)" }}>
            One upload. Three viral clips. Zero editing.
          </p>
        </motion.div>

        {/* ── Horizontal pipeline flow ── */}
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4">

          {/* LEFT — input video */}
          <div className="w-full lg:w-55 shrink-0">
            <InputCard inView={inView} />
          </div>

          {/* CENTER — animated pipeline */}
          <div className="flex-1 w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="rounded-2xl p-6 md:p-8"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Desktop: horizontal nodes */}
              <div className="hidden md:flex items-center gap-0">
                {pipelineNodes.map((node, i) => (
                  <div key={node.label} className="flex items-center flex-1 min-w-0">
                    <div className="flex flex-col items-center shrink-0">
                      <PipelineNode node={node} index={i} inView={inView} />
                    </div>
                    {i < pipelineNodes.length - 1 && (
                      <div className="flex-1 mx-2 -mt-4.5">
                        <FlowDots color={pipelineNodes[i + 1].color} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile: vertical nodes */}
              <div className="flex md:hidden flex-col gap-4">
                {pipelineNodes.map((node, i) => (
                  <div key={node.label} className="flex items-center gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.45, delay: 0.3 + i * 0.08 }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${node.color}18`, border: `1.5px solid ${node.color}50` }}
                    >
                      <node.Icon size={17} style={{ color: node.color }} strokeWidth={1.8} />
                    </motion.div>
                    <div>
                      <p className="text-[13px] font-bold text-white/80" style={{ fontFamily: "var(--font-syne)" }}>{node.label}</p>
                      <p className="text-[11px] text-white/35" style={{ fontFamily: "var(--font-inter)" }}>{node.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — output clips */}
          <div className="w-full lg:w-auto shrink-0">
            <OutputCards inView={inView} />
          </div>
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
        >
          {[
            { value: "1", label: "upload" },
            { value: "3", label: "viral clips" },
            { value: "0", label: "manual editing" },
            { value: "~5 min", label: "to process" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-5 text-center"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="text-[28px] font-black text-white leading-none mb-1" style={{ fontFamily: "var(--font-syne)" }}>
                {s.value}
              </p>
              <p className="text-[11px] text-white/35 font-semibold uppercase tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Before / After transformation ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-24"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h3 className="text-white text-[28px] md:text-[40px] font-black tracking-tight mb-3" style={{ fontFamily: "var(--font-syne)" }}>
              See the transformation
            </h3>
            <p className="text-white/50 text-base" style={{ fontFamily: "var(--font-inter)" }}>
              Same content. Completely different result.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">

            {/* LEFT — Raw input */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex-1 flex flex-col gap-3"
            >
              {/* Label */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/30" />
                <span className="text-[11px] font-bold tracking-widest uppercase text-white/40" style={{ fontFamily: "var(--font-syne)" }}>
                  Raw Input
                </span>
              </div>

              {/* Raw video card */}
              <div
                className="relative rounded-2xl overflow-hidden flex-1"
                style={{ background: "#0d0d0d", border: "1.5px solid rgba(255,255,255,0.07)" }}
              >
                {/* "Unedited" top bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-[10px] text-white/25 font-mono ml-2">raw_footage.mp4 · Unedited</span>
                </div>

                <video
                  src="/vedio/Screen Recording 2026-04-16 120048.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full"
                  style={{ aspectRatio: "16/9", display: "block" }}
                />

                {/* Footer tags */}
                <div className="flex items-center gap-2 px-4 py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  {["Long-form", "No captions", "No editing"].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md text-[9px] font-semibold"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CENTER — Arrow */}
            <div className="flex lg:flex-col items-center justify-center gap-3 py-4 lg:py-0 shrink-0">
              <div className="hidden lg:flex flex-col items-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#818CF8" }}
                    animate={{ opacity: [0.2, 1, 0.2], y: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.25 }}
                  />
                ))}
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(129,140,248,0.15)", border: "1.5px solid rgba(129,140,248,0.3)" }}
              >
                <motion.div
                  animate={{ rotate: [0, 0], scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                >
                  {/* Arrow right on desktop, arrow down on mobile */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2.5"
                    className="hidden lg:block">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2.5"
                    className="block lg:hidden">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </motion.div>
              </div>
              <p className="text-[10px] font-bold text-[#818CF8] tracking-widest uppercase" style={{ fontFamily: "var(--font-syne)" }}>
                AI
              </p>
              <div className="hidden lg:flex flex-col items-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#818CF8" }}
                    animate={{ opacity: [0.2, 1, 0.2], y: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.4, delay: 0.7 + i * 0.25 }}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT — Output phones */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="flex-1 flex flex-col gap-3"
            >
              {/* Label */}
              <div className="flex items-center gap-2">
                <motion.div className="w-2 h-2 rounded-full bg-[#34D399]"
                  animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#34D399]" style={{ fontFamily: "var(--font-syne)" }}>
                  AI Output · 3 Clips
                </span>
              </div>

              {/* 3 Phone frames */}
              <div className="flex gap-3 justify-center items-end">
                {[
                  { src: "/vedio/clip1.mp4", platform: "Reels",  color: "#E1306C" },
                  { src: "/vedio/clip2.mp4", platform: "Shorts", color: "#FF0000" },
                  { src: "/vedio/clip3.mp4", platform: "TikTok", color: "#69C9D0" },
                ].map((clip, i) => (
                  <motion.div
                    key={clip.platform}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                    className="relative flex-1"
                    style={{ maxWidth: 160 }}
                  >
                    <div
                      className="relative rounded-3xl overflow-hidden"
                      style={{
                        aspectRatio: "9/19.5",
                        background: "#0a0a0a",
                        border: "2px solid rgba(255,255,255,0.1)",
                        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${clip.color}25`,
                      }}
                    >
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-black rounded-full z-30" />
                      <div className="absolute top-6 left-2 z-20">
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-bold text-white" style={{ background: clip.color }}>
                          {clip.platform}
                        </span>
                      </div>
                      <VideoThumb
                        src={clip.src}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Feature callouts — below phones */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                {[
                  { label: "Hook in 2s",      sub: "Grabs attention instantly", color: "#F59E0B" },
                  { label: "Auto Captions",   sub: "Word-by-word sync",         color: "#818CF8" },
                  { label: "Blurred BG",      sub: "No black bars",             color: "#34D399" },
                  { label: "Branded Intro",   sub: "Title + logo slide",        color: "#E1306C" },
                  { label: "Outro Slide",     sub: "Channel name",              color: "#F472B6" },
                  { label: "Progress Bar",    sub: "Auto-rendered",             color: "#FB923C" },
                ].map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.35, delay: 1.2 + i * 0.07 }}
                    className="flex items-start gap-2 px-3 py-2 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: c.color }} />
                    <div>
                      <p className="text-[11px] font-bold text-white/80 leading-tight" style={{ fontFamily: "var(--font-syne)" }}>{c.label}</p>
                      <p className="text-[9px] text-white/35 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{c.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
