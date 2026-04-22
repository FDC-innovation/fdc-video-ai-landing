"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import {
  Scissors,
  Subtitles,
  Mic,
  GraduationCap,
  Users,
  Check,
  Play,
  Pause,
  SkipForward,
  Volume2,
  Download,
  Share2,
  Sparkles,
  FileText,
  BookOpen,
  Layers,
  Shield,
  Palette,
  MonitorPlay,
  Zap,
} from "lucide-react";

/* ────────────────────────────────────────────────────────
   CONTENT CREATORS VISUAL
──────────────────────────────────────────────────────── */
function CreatorsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isInView = useInView(containerRef, { margin: "-100px" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isInView) {
      const playVideo = async () => {
        try {
          video.muted = true;
          await video.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      };
      playVideo();
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isInView]);


  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.muted = false;
      video.volume = 0.6;
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[480px] md:min-h-[540px] bg-[#1C1C1C] rounded-[28px] overflow-hidden flex flex-col">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-3 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[11px] text-gray-400 ml-3 font-mono">
            creator_script.mp4
          </span>
        </div>
      </div>

      {/* Video area */}
      <div className="relative flex-1 cursor-pointer" onClick={togglePlay}>
        <video
          ref={videoRef}
          src="/vedio/clip_00_polished.mp4"
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Play/pause overlay on click */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center bg-black/30 z-10"
            >
              <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/25">
                <Play size={28} className="text-white ml-1" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Auto-caption overlay */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 z-20"
          animate={{ opacity: [0, 1, 1, 0], y: [6, 0, 0, -6] }}
          transition={{
            repeat: Infinity,
            duration: 5,
            times: [0, 0.1, 0.85, 1],
            repeatDelay: 1,
          }}
        >
          <span className="text-white text-[13px] font-semibold tracking-tight">
            &quot;This is how you{" "}
            <span className="text-[#7D55FA] font-bold">build in public</span>
            ...&quot;
          </span>
        </motion.div>
      </div>

      {/* Bottom controls overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-5 pt-10 pb-4">
        {/* Timeline visualization */}
        <div className="flex gap-1 items-end mb-3" style={{ height: 20 }}>
          {[
            { w: "18%", color: "#7D55FA" },
            { w: "8%", color: "#FF5F57", filler: true },
            { w: "22%", color: "#5A6BFB" },
            { w: "6%", color: "#FF5F57", filler: true },
            { w: "15%", color: "#A78BFA" },
            { w: "12%", color: "#7C3AED" },
            { w: "19%", color: "#8B5CF6" },
          ].map((clip, i) => (
            <motion.div
              key={i}
              className="rounded-[2px] h-full"
              style={{
                width: clip.w,
                background: clip.filler
                  ? `repeating-linear-gradient(45deg, ${clip.color}40, ${clip.color}40 2px, transparent 2px, transparent 4px)`
                  : `${clip.color}99`,
                opacity: clip.filler ? 0.6 : 0.85,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
            />
          ))}
        </div>

        {/* Platform export badges */}
        <div className="flex gap-2">
          {[
            { name: "TikTok", icon: "📱" },
            { name: "YouTube", icon: "▶" },
            { name: "Reels", icon: "🎬" },
          ].map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.12 }}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[11px] font-bold border border-white/20 bg-white/10 text-white backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:bg-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
            >
              <span className="text-sm filter drop-shadow-md">{p.icon}</span>
              {p.name}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


/* ────────────────────────────────────────────────────────
   PODCASTERS VISUAL
──────────────────────────────────────────────────────── */
function PodcastersVisual() {
  return (
    <div className="relative w-full h-full min-h-[480px] md:min-h-[540px] bg-[#1C1C1C] rounded-[28px] overflow-hidden p-5 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[11px] text-gray-500 ml-3 font-mono">
            podcast_ep47.wav — 2:14:32
          </span>
        </div>
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/25"
        >
          <Sparkles size={11} className="text-[#F59E0B]" />
          <span className="text-[10px] font-bold text-[#F59E0B]">
            AI Analyzing
          </span>
        </motion.div>
      </div>

      {/* Waveform visualization */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1200] via-[#1a1508] to-[#0f0f0f] p-4 mb-4 flex-1">
        {/* Waveform bars */}
        <div className="flex items-center gap-[2px] h-16 mb-3 px-2">
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-full"
              style={{
                background: `rgba(245,158,11,${0.3 + ((i * 7) % 5) * 0.12})`,
                height: `${20 + Math.abs(Math.sin(i * 0.45)) * 80}%`,
              }}
              animate={{ scaleY: [1, 0.3 + ((i * 3) % 7) * 0.1, 1] }}
              transition={{
                repeat: Infinity,
                duration: 0.6 + (i % 5) * 0.15,
                delay: (i % 11) * 0.06,
              }}
            />
          ))}
        </div>

        {/* Timeline ruler */}
        <div className="flex justify-between px-2 mb-4">
          {["0:00", "0:30", "1:00", "1:30", "2:00", "2:14"].map((t) => (
            <span key={t} className="text-[9px] text-white/20 font-mono">
              {t}
            </span>
          ))}
        </div>

        {/* AI-detected moments */}
        <div className="flex flex-col gap-2">
          {[
            {
              label: "BEST MOMENT",
              time: "12:34",
              color: "#F59E0B",
              desc: "Guest reveals key insight",
              confidence: 97,
            },
            {
              label: "VIRAL HOOK",
              time: "01:24:15",
              color: "#EF4444",
              desc: '"This changed everything..."',
              confidence: 94,
            },
            {
              label: "KEY INSIGHT",
              time: "48:22",
              color: "#8B5CF6",
              desc: "Framework explanation",
              confidence: 91,
            },
          ].map((moment, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl border"
              style={{
                background: `${moment.color}08`,
                borderColor: `${moment.color}20`,
              }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "linear",
                    delay: i * 0.5,
                  }}
                >
                  <span style={{ color: moment.color }} className="text-sm">
                    ✦
                  </span>
                </motion.div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-black tracking-wider"
                      style={{ color: moment.color }}
                    >
                      {moment.label}
                    </span>
                    <span className="text-[9px] text-white/25 font-mono bg-white/5 px-1.5 py-0.5 rounded">
                      {moment.confidence}% match
                    </span>
                  </div>
                  <p className="text-[11px] text-white/35 mt-0.5">
                    {moment.desc}
                  </p>
                </div>
              </div>
              <span
                className="text-[11px] font-mono font-bold tabular-nums"
                style={{ color: moment.color }}
              >
                {moment.time}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Output formats */}
      <div className="flex gap-2">
        {[
          { name: "Clips", count: "8", icon: <Scissors size={13} /> },
          { name: "Reels", count: "3", icon: <MonitorPlay size={13} /> },
          { name: "Transcript", count: "1", icon: <FileText size={13} /> },
          { name: "Show Notes", count: "1", icon: <BookOpen size={13} /> },
        ].map((out, i) => (
          <motion.div
            key={out.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + i * 0.1 }}
            className="flex-1 flex flex-col items-center gap-1 py-2 rounded-xl bg-[#F59E0B]/5 border border-[#F59E0B]/15 cursor-pointer hover:bg-[#F59E0B]/10 transition-colors"
          >
            <span className="text-[#F59E0B]">{out.icon}</span>
            <span className="text-[9px] font-bold text-[#F59E0B]">
              {out.name}
            </span>
            <span className="text-[9px] text-white/25 font-mono">
              {out.count}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   EDUCATORS VISUAL
──────────────────────────────────────────────────────── */
function EducatorsVisual() {
  return (
    <div className="relative w-full h-full min-h-[480px] md:min-h-[540px] bg-[#1C1C1C] rounded-[28px] overflow-hidden p-5 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[11px] text-gray-500 ml-3 font-mono">
            Lecture Recording · 1:42:00
          </span>
        </div>
        <motion.div
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/25"
        >
          <Zap size={11} className="text-[#06B6D4]" />
          <span className="text-[10px] font-bold text-[#06B6D4]">
            AI Analyzing...
          </span>
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="mb-4 px-1">
        <div className="h-2.5 rounded-full overflow-hidden bg-white/5 relative">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #3B82F6, #06B6D4)",
              boxShadow: "0 0 14px rgba(6,182,212,0.5)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: "82%" }}
            transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
          />
          <motion.div
            className="absolute top-0 h-full w-8 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            }}
            animate={{ left: ["-10%", "85%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Chapter grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          {
            num: "01",
            label: "Introduction",
            time: "0:00 - 12:30",
            color: "#3B82F6",
          },
          {
            num: "02",
            label: "Core Concept",
            time: "12:30 - 45:15",
            color: "#06B6D4",
          },
          {
            num: "03",
            label: "Key Summary",
            time: "45:15 - 1:02:00",
            color: "#8B5CF6",
          },
        ].map((ch, i) => (
          <motion.div
            key={ch.num}
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.8 + i * 0.25,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="rounded-xl p-3 border text-center relative overflow-hidden"
            style={{
              background: `${ch.color}08`,
              borderColor: `${ch.color}20`,
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: `${ch.color}05` }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                delay: i * 0.6,
              }}
            />
            <p
              className="text-[10px] font-black tracking-widest relative z-10"
              style={{ color: ch.color }}
            >
              CH {ch.num}
            </p>
            <p className="text-[12px] font-semibold text-white/70 mt-1 relative z-10">
              {ch.label}
            </p>
            <p className="text-[9px] text-white/25 font-mono mt-1 relative z-10">
              {ch.time}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Transcript preview */}
      <div className="flex-1 rounded-xl bg-white/[0.02] border border-white/5 p-3 mb-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold text-[#06B6D4] tracking-wider uppercase">
            Auto-Generated Transcript
          </span>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]"
          />
        </div>
        <div className="flex flex-col gap-2">
          {[
            {
              time: "12:31",
              text: "Let's break down the fundamental concepts...",
              highlight: true,
            },
            {
              time: "12:45",
              text: "The key principle here is the relationship between...",
              highlight: false,
            },
            {
              time: "13:02",
              text: "And this is where most students struggle with...",
              highlight: false,
            },
            {
              time: "13:18",
              text: "Remember the formula we covered earlier...",
              highlight: true,
            },
          ].map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + i * 0.15 }}
              className="flex items-start gap-2"
            >
              <span className="text-[9px] font-mono text-white/20 flex-shrink-0 mt-0.5 w-8">
                {line.time}
              </span>
              <p
                className={`text-[11px] leading-relaxed ${
                  line.highlight
                    ? "text-[#06B6D4]/80 font-medium"
                    : "text-white/30"
                }`}
              >
                {line.text}
                {line.highlight && (
                  <span className="ml-1 text-[8px] text-[#F59E0B] font-bold">
                    ★ KEY
                  </span>
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Export formats */}
      <div className="flex gap-2">
        {[
          { name: "LMS", icon: <GraduationCap size={13} />, color: "#3B82F6" },
          { name: "PDF", icon: <FileText size={13} />, color: "#EF4444" },
          { name: "SRT", icon: <Subtitles size={13} />, color: "#06B6D4" },
          { name: "SCORM", icon: <Layers size={13} />, color: "#8B5CF6" },
        ].map((fmt, i) => (
          <motion.div
            key={fmt.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 + i * 0.1, type: "spring" }}
            className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl border cursor-pointer transition-colors"
            style={{
              background: `${fmt.color}08`,
              borderColor: `${fmt.color}20`,
              color: fmt.color,
            }}
          >
            {fmt.icon}
            <span className="text-[10px] font-black">{fmt.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   BRANDS & TEAMS VISUAL
──────────────────────────────────────────────────────── */
function BrandsVisual() {
  return (
    <div className="relative w-full h-full min-h-[480px] md:min-h-[540px] bg-[#1C1C1C] rounded-[28px] overflow-hidden p-5 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[11px] text-gray-500 ml-3 font-mono">
            Team Workspace — Acme Corp
          </span>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#28C840]/15 border border-[#28C840]/25"
        >
          <Check size={10} className="text-[#28C840]" />
          <span className="text-[10px] font-bold text-[#28C840]">
            Approved
          </span>
        </motion.div>
      </div>

      {/* Collaborators row */}
      <div className="flex items-center gap-3 mb-4 px-1">
        <div className="flex items-center">
          {[
            { ini: "MK", hue: 280 },
            { ini: "JL", hue: 200 },
            { ini: "AR", hue: 150 },
            { ini: "TS", hue: 40 },
          ].map((u, i) => (
            <motion.div
              key={u.ini}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.3 + i * 0.1,
                type: "spring",
                stiffness: 280,
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-[#1C1C1C]"
              style={{
                background: `hsl(${u.hue}, 50%, 25%)`,
                color: `hsl(${u.hue}, 70%, 70%)`,
                marginLeft: i === 0 ? 0 : -8,
                zIndex: 4 - i,
                boxShadow: `0 0 10px hsla(${u.hue}, 50%, 40%, 0.3)`,
              }}
            >
              {u.ini}
            </motion.div>
          ))}
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-[11px] text-[#14B8A6] font-medium"
        >
          editing live
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            ...
          </motion.span>
        </motion.span>
      </div>

      {/* Brand Kit panel */}
      <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4 mb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Palette size={13} className="text-[#14B8A6]" />
            <span className="text-[11px] font-bold text-white/60">
              Brand Kit
            </span>
          </div>
          <Shield size={12} className="text-[#14B8A6]/50" />
        </div>

        <div className="flex items-center gap-3 mb-3">
          {/* Color swatches */}
          <div className="flex gap-1.5">
            {["#14B8A6", "#6366F1", "#F59E0B", "#EF4444", "#1C1C1C"].map(
              (color, i) => (
                <motion.div
                  key={color}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.06, type: "spring" }}
                  className="w-6 h-6 rounded-lg border border-white/10 cursor-pointer transition-transform hover:scale-110"
                  style={{
                    background: color,
                    boxShadow: `0 2px 8px ${color}30`,
                  }}
                />
              )
            )}
          </div>

          {/* Font preview */}
          <div className="flex-1 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
            <span className="text-[10px] text-white/30 font-mono">Aa</span>
            <span className="text-[10px] text-white/50 font-semibold">
              Inter · Semi
            </span>
          </div>
        </div>

        {/* Aspect ratio formats */}
        <div className="flex gap-2">
          {[
            { ratio: "9:16", w: 24, h: 38 },
            { ratio: "16:9", w: 48, h: 28 },
            { ratio: "1:1", w: 32, h: 32 },
          ].map((fmt, i) => (
            <motion.div
              key={fmt.ratio}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="flex-1 flex flex-col items-center gap-1.5 py-2 rounded-lg bg-white/[0.02] border border-white/5 cursor-pointer hover:border-[#14B8A6]/30 transition-colors"
            >
              <div
                className="rounded border border-[#14B8A6]/30 flex items-center justify-center"
                style={{ width: fmt.w, height: fmt.h }}
              >
                <motion.div
                  className="rounded"
                  style={{
                    width: fmt.w - 8,
                    height: fmt.h - 8,
                    background:
                      "linear-gradient(135deg, #14B8A6, #6366F1)",
                    opacity: 0.25,
                  }}
                  animate={{ opacity: [0.15, 0.35, 0.15] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    delay: i * 0.5,
                  }}
                />
              </div>
              <span className="text-[9px] font-bold text-[#14B8A6]">
                {fmt.ratio}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Approval workflow */}
      <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4 mb-3 flex-1">
        <span className="text-[10px] font-bold text-white/40 tracking-wider uppercase mb-3 block">
          Approval Workflow
        </span>
        <div className="flex items-center">
          {[
            { label: "Draft", done: true },
            { label: "Review", done: true },
            { label: "Approved", done: true, active: true },
            { label: "Published", done: false },
          ].map((stage, i) => (
            <React.Fragment key={stage.label}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 + i * 0.2 }}
                className="flex flex-col items-center gap-1.5 flex-shrink-0"
              >
                <motion.div
                  className="w-8 h-8 rounded-full flex items-center justify-center border-2"
                  style={{
                    background: stage.done
                      ? stage.active
                        ? "#14B8A6"
                        : "rgba(20,184,166,0.15)"
                      : "rgba(255,255,255,0.03)",
                    borderColor: stage.done
                      ? "#14B8A6"
                      : "rgba(255,255,255,0.06)",
                    boxShadow: stage.active
                      ? "0 0 16px rgba(20,184,166,0.5)"
                      : "none",
                  }}
                  animate={stage.active ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {stage.done ? (
                    <Check
                      size={12}
                      className={
                        stage.active ? "text-[#1C1C1C]" : "text-[#14B8A6]"
                      }
                    />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                  )}
                </motion.div>
                <span
                  className="text-[9px] font-semibold"
                  style={{
                    color: stage.done ? "#14B8A6" : "rgba(255,255,255,0.15)",
                  }}
                >
                  {stage.label}
                </span>
              </motion.div>
              {i < 3 && (
                <div
                  className="flex-1 h-px mx-1"
                  style={{
                    background:
                      i < 2
                        ? "rgba(20,184,166,0.35)"
                        : "rgba(255,255,255,0.05)",
                    minWidth: 16,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex gap-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#14B8A6]/10 border border-[#14B8A6]/20 cursor-pointer hover:bg-[#14B8A6]/15 transition-colors"
        >
          <Download size={13} className="text-[#14B8A6]" />
          <span className="text-[11px] font-bold text-[#14B8A6]">
            White-label Export
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1 }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 cursor-pointer hover:bg-white/[0.06] transition-colors"
        >
          <Share2 size={13} className="text-white/40" />
        </motion.div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   TAB DATA
──────────────────────────────────────────────────────── */
const useCaseData = [
  {
    id: "creators",
    icon: <Scissors size={18} />,
    label: "Content Creators",
    tagline: "Post more. Edit less.",
    color: "#7D55FA",
    benefits: [
      "Auto-cut silence and filler words",
      "One-click captions for every platform",
      "Consistent look across all videos",
      "Batch export to TikTok, YouTube, Reels",
    ],
    visual: <CreatorsVisual />,
  },
  {
    id: "podcasters",
    icon: <Mic size={18} />,
    label: "Podcasters",
    tagline: "Your best moments, found automatically.",
    color: "#F59E0B",
    benefits: [
      "AI extracts best clips with timestamps",
      "Auto-chapter long-form episodes",
      "Transcript, show notes & newsletter generated",
      "One recording → Clips, reels, audiograms",
    ],
    visual: <PodcastersVisual />,
  },
  {
    id: "educators",
    icon: <GraduationCap size={18} />,
    label: "Educators",
    tagline: "Transform recordings into lessons.",
    color: "#06B6D4",
    benefits: [
      "Auto-chapter your long recordings",
      "Highlight key moments with AI",
      "Transcript and captions auto-generated",
      "Export for any LMS platform",
    ],
    visual: <EducatorsVisual />,
  },
  {
    id: "brands",
    icon: <Users size={18} />,
    label: "Brands & Teams",
    tagline: "Consistent video at scale.",
    color: "#14B8A6",
    benefits: [
      "Shared brand kit across all editors",
      "Approval workflows built in",
      "Multi-seat collaboration",
      "White-label exports",
    ],
    visual: <BrandsVisual />,
  },
];

/* ────────────────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────────────── */
export function VeedUseCases() {
  const [active, setActive] = useState(0);
  const current = useCaseData[active];

  return (
    <section
      id="use-cases"
      className="bg-[#F4F4F5] py-24 px-6 md:px-12 w-full font-sans border-b border-gray-100"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <p className="text-[#7D55FA] font-bold text-sm tracking-widest uppercase mb-4">
            Use Cases
          </p>
          <h2 className="text-[#1C1C1C] text-[40px] md:text-[64px] font-[900] leading-[1.05] tracking-[-0.02em] mb-6" style={{ fontFamily: "var(--font-inter)" }}>
            Built for every kind
            <br />
            of creator.
          </h2>
          <p className="text-[#3F3F46] text-xl md:text-2xl font-medium tracking-[-0.01em]">
            Whether you&apos;re a solo creator or a 50-person team — Chalchitra
            adapts to your workflow.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {useCaseData.map((tab, i) => (
            <motion.button
              key={tab.id}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center gap-2.5 px-5 py-3 md:px-7 md:py-3.5 rounded-full text-[14px] md:text-[15px] font-semibold transition-all duration-300 cursor-pointer border"
              style={{
                background:
                  active === i ? tab.color : "white",
                color: active === i ? "white" : "#3F3F46",
                borderColor:
                  active === i ? tab.color : "#E5E7EB",
                boxShadow:
                  active === i
                    ? `0 8px 32px ${tab.color}35, 0 2px 8px ${tab.color}20`
                    : "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <span
                style={{
                  color: active === i ? "white" : tab.color,
                }}
              >
                {tab.icon}
              </span>
              {tab.label}
              {active === i && (
                <motion.div
                  layoutId="tab-glow"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${tab.color}20, transparent)`,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Content area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          >
            {/* Left: Text card */}
            <div className="bg-white rounded-[32px] p-10 md:p-14 flex flex-col justify-center shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-gray-100 order-2 lg:order-1">
              {/* Tag pill */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-2.5 mb-6"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${current.color}12`,
                    color: current.color,
                  }}
                >
                  {current.icon}
                </div>
                <span
                  className="text-[12px] font-bold tracking-widest uppercase"
                  style={{ color: current.color }}
                >
                  {current.label}
                </span>
              </motion.div>

              {/* Tagline */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[32px] md:text-[42px] font-[800] text-[#1C1C1C] mb-6 leading-[1.1] tracking-[-0.02em]"
              >
                {current.tagline}
              </motion.h3>

              {/* Benefits */}
              <ul className="flex flex-col gap-4 mb-8">
                {current.benefits.map((b, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + j * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: `${current.color}12`,
                      }}
                    >
                      <Check size={13} style={{ color: current.color }} />
                    </div>
                    <span className="text-[#3F3F46] text-[16px] md:text-[18px] font-medium leading-[1.4]">
                      {b}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="self-start px-8 py-3.5 rounded-full text-white text-[15px] font-semibold cursor-pointer transition-all duration-300"
                style={{
                  background: current.color,
                  boxShadow: `0 8px 24px ${current.color}30`,
                }}
              >
                Try for Free →
              </motion.button>
            </div>

            {/* Right: Visual mockup */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="rounded-[32px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.15)]"
              >
                {current.visual}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
