"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

// Instagram SVG icon component
function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-white"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

const whatsappNumber = "6285157815688";
const instagramUrl = "https://www.instagram.com/mksbali/";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {/* Instagram Button */}
            <motion.a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              <motion.div
                className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#fccc63] via-[#f77737] to-[#c13584] shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <InstagramIcon size={24} />
              </motion.div>
            </motion.a>

            {/* WhatsApp Button */}
            <motion.a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <motion.div
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={24} className="text-white" />
              </motion.div>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button - Pulsing Effect */}
      <div className="relative">
        {/* Pulsing rings */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#ed6a17]"
          animate={{
            scale: [1, 1.3, 1.5, 1],
            opacity: [0.6, 0.3, 0, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-[#ed6a17]"
          animate={{
            scale: [1, 1.5, 2, 1],
            opacity: [0.4, 0.2, 0, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5,
          }}
        />

        {/* Main button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#ed6a17] shadow-[0_0_40px_rgba(237,106,23,0.5)]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            rotate: isOpen ? 90 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <Phone
            size={24}
            className="text-white transition-transform"
          />
        </motion.button>
      </div>
    </div>
  );
}
