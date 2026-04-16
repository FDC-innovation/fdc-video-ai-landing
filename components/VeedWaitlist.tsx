"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";

export function VeedWaitlist() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  return (
    // <section
    //   className="bg-[#FAFAFA] py-32 px-6 overflow-hidden relative border-t border-[#F4F4F5]"
    //   id="waitlist"
    //   ref={ref}
    // >
    //   {/* Decorative Blur Backgrounds */}
    //   <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#5A6BFB]/10 to-[#D946EF]/10 rounded-full blur-[100px] opacity-60 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
    //   <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#5A6BFB]/10 to-[#00FFD1]/10 rounded-full blur-[100px] opacity-60 pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

    //   <div className="relative z-10 max-w-lg mx-auto text-center">
    //     <motion.div
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={inView ? { opacity: 1, y: 0 } : {}}
    //       transition={{ duration: 0.5 }}
    //       className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white border border-[#E5E7EB] mb-8 shadow-sm"
    //     >
    //       <span
    //         className="text-xs font-bold tracking-widest text-[#5A6BFB] uppercase"
    //         style={{ fontFamily: "var(--font-inter)" }}
    //       >
    //         Early Access
    //       </span>
    //     </motion.div>

    //     <motion.h2
    //       initial={{ opacity: 0, y: 30 }}
    //       animate={inView ? { opacity: 1, y: 0 } : {}}
    //       transition={{ delay: 0.1, duration: 0.7 }}
    //       className="text-[#1C1C1C] text-[40px] md:text-[56px] font-[900] leading-[1.1] tracking-[-0.02em] mb-6"
    //       style={{ fontFamily: "var(--font-inter)" }}
    //     >
    //       The future of creation
    //       <br />
    //       is almost here.
    //     </motion.h2>

    //     <motion.p
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={inView ? { opacity: 1, y: 0 } : {}}
    //       transition={{ delay: 0.2, duration: 0.7 }}
    //       className="mb-10 text-lg md:text-xl text-[#737373] leading-relaxed"
    //       style={{ fontFamily: "var(--font-inter)" }}
    //     >
    //       Join 2,400+ creators worldwide. Get early access and help shape the future of AI video and podcast creation.
    //     </motion.p>

    //     <AnimatePresence mode="wait">
    //       {!submitted ? (
    //         <motion.form
    //           key="form"
    //           initial={{ opacity: 0, y: 20 }}
    //           animate={{ opacity: 1, y: 0 }}
    //           exit={{ opacity: 0, scale: 0.95 }}
    //           transition={{ delay: 0.3, duration: 0.5 }}
    //           onSubmit={(e) => {
    //             e.preventDefault();
    //             setSubmitted(true);
    //           }}
    //           className="flex flex-col gap-4 bg-white p-6 rounded-[24px] border border-[#F4F4F5] shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
    //         >
    //           <div className="group relative">
    //             <input
    //               type="text"
    //               placeholder="Full Name"
    //               required
    //               className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl px-5 py-4 text-[#1C1C1C] placeholder-[#A1A1AA] outline-none transition-all focus:bg-white focus:border-[#5A6BFB] focus:shadow-[0_0_0_4px_rgba(90,107,251,0.1)] hover:border-[#D4D4D8]"
    //               style={{ fontFamily: "var(--font-inter)" }}
    //             />
    //           </div>

    //           <div className="group relative">
    //             <input
    //               type="email"
    //               placeholder="Email address"
    //               required
    //               className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl px-5 py-4 text-[#1C1C1C] placeholder-[#A1A1AA] outline-none transition-all focus:bg-white focus:border-[#5A6BFB] focus:shadow-[0_0_0_4px_rgba(90,107,251,0.1)] hover:border-[#D4D4D8]"
    //               style={{ fontFamily: "var(--font-inter)" }}
    //             />
    //           </div>

    //           <div className="group relative">
    //             <select
    //               required
    //               defaultValue=""
    //               className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl px-5 py-4 text-[#737373] outline-none transition-all appearance-none cursor-pointer focus:bg-white focus:border-[#5A6BFB] focus:shadow-[0_0_0_4px_rgba(90,107,251,0.1)] hover:border-[#D4D4D8]"
    //               style={{ fontFamily: "var(--font-inter)" }}
    //             >
    //               <option value="" disabled>
    //                 What do you create?
    //               </option>
    //               <option value="short">Short-Form Content</option>
    //               <option value="long">Long-Form Video</option>
    //               <option value="podcast">Podcast Creator</option>
    //               <option value="corporate">Corporate / Brand</option>
    //               <option value="education">Education</option>
    //               <option value="ecommerce">E-commerce</option>
    //               <option value="other">Other</option>
    //             </select>
    //             <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-[#737373]">
    //               <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                 <path
    //                   d="M1 1.5L6 6.5L11 1.5"
    //                   stroke="currentColor"
    //                   strokeWidth="2"
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                 />
    //               </svg>
    //             </div>
    //           </div>

    //           <motion.button
    //             whileHover={{ scale: 1.02 }}
    //             whileTap={{ scale: 0.98 }}
    //             type="submit"
    //             className="mt-2 w-full bg-[#1C1C1C] hover:bg-[#27272A] transform transition-all shadow-[0_8px_20px_rgba(0,0,0,0.1)] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
    //             style={{ fontFamily: "var(--font-syne)" }}
    //           >
    //             Reserve My Spot
    //             <motion.span
    //               animate={{ x: [0, 5, 0] }}
    //               transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
    //             >
    //               <ChevronRight size={20} />
    //             </motion.span>
    //           </motion.button>
    //         </motion.form>
    //       ) : (
    //         <motion.div
    //           key="success"
    //           initial={{ opacity: 0, scale: 0.8 }}
    //           animate={{ opacity: 1, scale: 1 }}
    //           className="py-16 flex flex-col items-center gap-6 bg-white rounded-[24px] border border-[#F4F4F5] shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
    //         >
    //           <div className="w-20 h-20 bg-[#F0FDF4] rounded-full flex items-center justify-center border border-[#BBF7D0]">
    //             <Check size={36} className="text-[#16A34A]" />
    //           </div>
    //           <div>
    //             <p className="text-2xl font-bold text-[#1C1C1C] mb-2" style={{ fontFamily: "var(--font-syne)" }}>
    //               You&apos;re on the list!
    //             </p>
    //             <p className="text-[#737373]" style={{ fontFamily: "var(--font-inter)" }}>
    //               We&apos;ll be in touch with early access details soon.
    //             </p>
    //           </div>
    //         </motion.div>
    //       )}
    //     </AnimatePresence>

    //     <motion.p
    //       initial={{ opacity: 0 }}
    //       animate={inView ? { opacity: 1 } : {}}
    //       transition={{ delay: 0.6 }}
    //       className="mt-8 text-sm text-[#737373] flex items-center justify-center gap-2 font-medium"
    //       style={{ fontFamily: "var(--font-inter)" }}
    //     >
    //       🔒 No spam. Ever. Unsubscribe anytime.
    //     </motion.p>

    //     <motion.div
    //       initial={{ opacity: 0, y: 10 }}
    //       animate={inView ? { opacity: 1, y: 0 } : {}}
    //       transition={{ delay: 0.7 }}
    //       className="flex flex-wrap justify-center gap-3 mt-8"
    //     >
    //       {["Priority Early Access", "Founding Member Status", "Shape the Roadmap"].map((pill, i) => (
    //         <span
    //           key={i}
    //           className="text-xs px-4 py-2 rounded-full border border-[#E5E7EB] text-[#1C1C1C] bg-white font-semibold shadow-sm"
    //           style={{ fontFamily: "var(--font-inter)" }}
    //         >
    //           {pill}
    //         </span>
    //       ))}
    //     </motion.div>
    //   </div>
    // </section>
    <></>
  );
}
