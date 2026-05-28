"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function AgeVerification() {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVerified = sessionStorage.getItem("age_verified");
    if (hasVerified) {
      setIsVerified(true);
    }
    setIsLoading(false);
  }, []);

  const handleApprove = () => {
    sessionStorage.setItem("age_verified", "true");
    setIsVerified(true);
  };

  const handleDecline = () => {
    window.location.href = "https://www.google.com";
  };

  if (isLoading) {
    return null;
  }

  if (isVerified) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020b26]"
    >
      <div className="mx-4 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="font-cinzel text-2xl font-bold tracking-[0.2em] text-[#ed6a17] sm:text-3xl">
            MEISINDO
          </h1>
          <p className="mt-2 text-sm tracking-[0.15em] text-[#fff7ef]/60">
            Karya Semesta
          </p>
        </div>

        {/* Modal Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-[#03143f] p-8 text-center"
        >
          <h2 className="mb-4 text-xl font-semibold text-[#fff7ef] sm:text-2xl">
            Age Verification Required
          </h2>

          <p className="mb-8 text-sm leading-relaxed text-[#fff7ef]/60">
            You must be 21 years of age or older to enter this website.
            <br />
            By entering, you confirm that you are of legal drinking age.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleApprove}
              className="w-full rounded-xl bg-[#ed6a17] py-4 text-sm font-semibold tracking-wider text-white transition-all hover:bg-[#d55d0f]"
            >
              I AM 21 OR OLDER
            </button>

            <button
              onClick={handleDecline}
              className="w-full rounded-xl border border-white/10 py-4 text-sm font-medium tracking-wider text-[#fff7ef]/60 transition-all hover:border-white/20 hover:text-[#fff7ef]/80"
            >
              I AM UNDER 21
            </button>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs text-[#fff7ef]/30">
          Please drink responsibly. Do not share with minors.
        </p>
      </div>
    </motion.div>
  );
}
