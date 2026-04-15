import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function VeedTestimonials() {
  const testimonials = [
    {
      quote: "I went from spending half my day in the timeline to a finished video in under 40 minutes. Chalchitra is genuinely game-changing.",
      name: "Marcus T.",
      role: "YouTube Creator",
      sub: "540K subscribers",
      initials: "MT",
    },
    {
      quote: "The auto-captions are more accurate than anything else I've tested. My audience retention improved noticeably.",
      name: "Sofia R.",
      role: "Brand Strategist",
      sub: "São Paulo",
      initials: "SR",
    },
    {
      quote: "It found the best 60 seconds from my 2-hour podcast episode. Like having a producer available on demand.",
      name: "Yasmin A.",
      role: "Podcast Host",
      sub: "Johannesburg",
      initials: "YA",
    },
    {
      quote: "Our product launches now look premium. The AI understands visual storytelling in a way no other tool does.",
      name: "James O.",
      role: "E-commerce Founder",
      sub: "Lagos",
      initials: "JO",
    },
  ];

  return (
    <section className="bg-white py-24 px-6 md:px-12 w-full border-t border-[#F4F4F5]">
      <div className="max-w-[1240px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4F4F5] border border-[#E5E7EB] mb-6">
            <span className="text-xs font-semibold tracking-wide text-[#737373] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
              Early Voices
            </span>
          </div>
          <h2
            className="text-[#1C1C1C] text-[40px] md:text-[56px] font-[900] leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Creators already love what&apos;s coming.
          </h2>
          <p
            className="text-[#737373] text-lg md:text-xl font-medium"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Join thousands of creators shaping the future of video editing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="bg-[#FAFAFA] rounded-2xl p-8 border border-[#F4F4F5] flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={16} className="fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <p
                  className="text-[15px] leading-relaxed text-[#3F3F46] mb-8 font-medium"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-white border border-[#E5E7EB] text-[#1C1C1C] shadow-sm"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    className="font-bold text-sm text-[#1C1C1C]"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs text-[#737373]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t.role}
                    {t.sub && <span className="block text-[11px] mt-0.5 opacity-80">{t.sub}</span>}
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
