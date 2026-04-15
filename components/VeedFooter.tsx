import React from "react";
import { motion } from "framer-motion";
import { Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export function VeedFooter() {
  const cols = [
    { title: "Product", links: ["Features", "Templates", "How It Works", "Roadmap"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
    { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
  ];

  return (
    <footer className="bg-white border-t border-[#E5E7EB] px-6 pt-20 pb-10 w-full">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-5 pr-0 md:pr-12">
            <div className="flex items-center gap-2 mb-6">
              <span
                className="text-2xl font-[900] tracking-tight text-[#1C1C1C]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Chalchitra
              </span>
            </div>
            <p
              className="text-[#737373] text-[15px] leading-[1.6] max-w-sm"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              The AI-native creation studio.<br />
              Edit less. Create more.
            </p>
          </div>

          {/* Links Columns */}
          {cols.map((col, idx) => (
            <div key={idx} className="col-span-1 md:col-span-2">
              <p
                className="font-bold text-[#1C1C1C] mb-6 text-[15px]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {col.title}
              </p>
              <ul className="flex flex-col gap-4">
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href="#"
                      className="text-[15px] text-[#737373] hover:text-[#5A6BFB] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#F4F4F5] gap-4">
          <p
            className="text-[13px] text-[#A1A1AA]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            © {new Date().getFullYear()} Chalchitra. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.1, color: "#1C1C1C" }}
                whileTap={{ scale: 0.95 }}
                className="text-[#A1A1AA] hover:text-[#1C1C1C] transition-colors"
              >
                <Icon size={18} strokeWidth={2} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
