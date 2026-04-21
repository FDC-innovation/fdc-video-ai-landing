"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

export function VeedContact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
      const msg = err instanceof Error ? err.message : "Failed to send. Please try again.";
      setErrorMsg(msg);
      setStatus("error");
    }
  }

  return (
    <section className="bg-[#FFFFFF] py-24 px-6 md:px-12 w-full border-t border-[#F4F4F5] overflow-hidden" id="contact" ref={ref}>
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Typography & Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4F4F5] border border-[#E5E7EB] mb-6">
            <span className="text-xs font-semibold tracking-wide text-[#737373] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
              Get In Touch
            </span>
          </div>
          
          <h2
            className="text-[#1C1C1C] text-[48px] md:text-[64px] font-[900] leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Have a question?<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5A6BFB] to-[#D946EF]">Let&apos;s talk.</span>
          </h2>
          
          <p
            className="text-[#737373] text-lg md:text-xl font-medium max-w-md leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Whether it&apos;s a partnership, early access query, or just a hello — we read every single message.
          </p>

          {/* Contact persons */}
          <div className="flex flex-col gap-4 mt-2">
            {/* Ashish Pant */}
            <div
              className="rounded-2xl p-5 flex flex-col gap-1.5"
              style={{ background: "rgba(90,107,251,0.04)", border: "1px solid rgba(90,107,251,0.12)" }}
            >
              <p className="text-[15px] font-bold text-[#1C1C1C]" style={{ fontFamily: "var(--font-inter)" }}>
                Ashish Pant
              </p>
              <a
                href="mailto:Ashish.Pant@fastdataconnect.com"
                className="text-[13px] text-[#5A6BFB] hover:underline"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Ashish.Pant@fastdataconnect.com
              </a>
              <div className="flex flex-col gap-0.5">
                <a
                  href="tel:+919084704417"
                  className="text-[13px] text-[#737373] hover:text-[#1C1C1C] transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  +91 9084704417
                </a>
                <a
                  href="tel:+12402521259"
                  className="text-[13px] text-[#737373] hover:text-[#1C1C1C] transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  +1 (240) 252-1259
                </a>
              </div>
            </div>

            {/* Mike Agar */}
            <div
              className="rounded-2xl p-5 flex flex-col gap-1.5"
              style={{ background: "rgba(217,70,239,0.04)", border: "1px solid rgba(217,70,239,0.12)" }}
            >
              <p className="text-[15px] font-bold text-[#1C1C1C]" style={{ fontFamily: "var(--font-inter)" }}>
                Mike Agar
              </p>
              <a
                href="mailto:mike.agar@fastdataconnect.com"
                className="text-[13px] text-[#5A6BFB] hover:underline"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                mike.agar@fastdataconnect.com
              </a>
              <a
                href="tel:+12035717669"
                className="text-[13px] text-[#737373] hover:text-[#1C1C1C] transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                +1 (203) 571-7669
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm font-medium text-[#737373]" style={{ fontFamily: "var(--font-inter)" }}>
            <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center">
              <span className="text-xl">🔒</span>
            </div>
            Your info is never shared with third parties.
          </div>
        </motion.div>

        {/* Right Side: Professional Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          {/* Subtle background element */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#5A6BFB]/5 to-[#D946EF]/5 rounded-[32px] transform scale-105 -z-10" />
          
          <div className="bg-white border border-[#F4F4F5] rounded-[32px] p-8 md:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.04)]">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-12"
              >
                <div className="w-16 h-16 bg-[#F0FDF4] rounded-full flex items-center justify-center mb-6 border border-[#BBF7D0]">
                  <CheckCircle2 size={32} className="text-[#16A34A]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1C1C1C] mb-2" style={{ fontFamily: "var(--font-syne)" }}>Message Sent!</h3>
                <p className="text-[#737373]" style={{ fontFamily: "var(--font-inter)" }}>We&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-sm font-semibold text-[#5A6BFB] hover:text-[#4F46E5] transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-xl text-[#DC2626] text-sm text-left"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <AlertCircle size={16} />
                    {errorMsg}
                  </motion.div>
                )}

                <div className="group relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl px-5 py-4 text-[#1C1C1C] placeholder-[#A1A1AA] outline-none transition-all focus:bg-white focus:border-[#5A6BFB] focus:shadow-[0_0_0_4px_rgba(90,107,251,0.1)] hover:border-[#D4D4D8]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                </div>

                <div className="group relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@example.com"
                    className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl px-5 py-4 text-[#1C1C1C] placeholder-[#A1A1AA] outline-none transition-all focus:bg-white focus:border-[#5A6BFB] focus:shadow-[0_0_0_4px_rgba(90,107,251,0.1)] hover:border-[#D4D4D8]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                </div>

                <div className="group relative">
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what's on your mind..."
                    rows={4}
                    className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl px-5 py-4 text-[#1C1C1C] placeholder-[#A1A1AA] outline-none transition-all focus:bg-white focus:border-[#5A6BFB] focus:shadow-[0_0_0_4px_rgba(90,107,251,0.1)] hover:border-[#D4D4D8] resize-none"
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 w-full bg-[#1C1C1C] hover:bg-[#27272A] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {status === "loading" ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Loader2 size={20} />
                    </motion.div>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
