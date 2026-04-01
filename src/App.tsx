/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { motion, useScroll, useTransform } from "motion/react";
import { Instagram } from "lucide-react";
import { useRef, MouseEvent } from "react";
import confetti from 'canvas-confetti';

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const handleButtonClick = (e: MouseEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D2B48C', '#F5F2ED', '#5A4A40']
    });
    
    // Allow navigation if the link is not just '#'
    const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
    if (href && href !== '#') {
      setTimeout(() => window.location.href = href, 500);
    }
  };

  const buttons = [
    { label: "WEBSITE", href: "https://anabarretodigital.com.br/" },
    { label: "PORTFÓLIO", href: "#" },
    { label: "CONTATE-ME", href: "https://api.whatsapp.com/send/?phone=5511971950431&text&type=phone_number&app_absent=0" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen overflow-y-auto relative font-sans text-[#4A4A4A]">
      {/* Parallax Background */}
      <motion.div
        style={{ 
          y: backgroundY,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E6E3DE' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }}
        className="absolute inset-0 z-0 opacity-40"
      />

      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
        {/* Decorative Top Bar */}
        <div className="w-full h-2 bg-[#D2B48C] mb-8 rounded-full opacity-60"></div>

        {/* Main Card */}
        <motion.div
          style={{ y: cardY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center relative"
        >
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg -mt-20 mb-6">
            <img
              src="https://empurion.com.br/wp-content/uploads/2026/03/A1-2.png"
              alt="Ana Barreto"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Name & Subtitle */}
          <h1 className="font-serif text-3xl font-semibold text-[#5A4A40] mb-2">
            ANA BARRETO
          </h1>
          <p className="text-sm tracking-widest uppercase mb-8">
            Videomaker & Social Media
          </p>

          {/* Buttons */}
          <div className="w-full space-y-4">
            {buttons.map((btn) => (
              <motion.a
                key={btn.label}
                href={btn.href}
                onClick={handleButtonClick}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0px 10px 20px rgba(90, 74, 64, 0.15)"
                }}
                whileTap={{ scale: 0.98 }}
                className="block w-full py-3 border border-[#D2B48C] rounded-full text-center text-xs tracking-widest font-medium hover:bg-[#5A4A40] hover:text-white hover:border-[#5A4A40] transition-all duration-300"
              >
                {btn.label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="mt-8 flex items-center gap-2 text-xs opacity-70">
          <Instagram size={14} />
          <span>@barreto_anac</span>
        </footer>

        {/* Decorative Bottom Bar */}
        <div className="w-full h-2 bg-[#D2B48C] mt-8 rounded-full opacity-60"></div>
      </div>
    </div>
  );
}
