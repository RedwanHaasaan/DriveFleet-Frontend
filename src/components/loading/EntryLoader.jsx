"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LottiePlayer from "@/components/Lottie/LottiePlayer";
import carLoad from "@/assets/car_Load.json";

const MIN_DISPLAY_MS = 2200;

export function EntryLoader({ children }) {
  const [showLoader, setShowLoader] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if loader already shown in this session
    if (typeof window !== "undefined") {
      const hasLoaded = sessionStorage.getItem("drivefleet_loaded");
      if (hasLoaded) {
        setShowLoader(false);
        return;
      }
    }

    setShowLoader(true);
    setProgress(0);
    document.body.style.overflow = "hidden";

    let progressInterval;
    let finishTimeout;
    let hideTimeout;

    const startProgress = () => {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 92) return prev;
          return prev + Math.random() * 12 + 4;
        });
      }, 180);
    };

    const finish = () => {
      clearInterval(progressInterval);
      setProgress(100);
      hideTimeout = setTimeout(() => {
        setShowLoader(false);
        document.body.style.overflow = "";
        sessionStorage.setItem("drivefleet_loaded", "true");
      }, 450);
    };

    startProgress();

    const onReady = () => {
      finishTimeout = setTimeout(finish, MIN_DISPLAY_MS);
    };

    if (document.readyState === "complete") {
      onReady();
    } else {
      window.addEventListener("load", onReady);
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(finishTimeout);
      clearTimeout(hideTimeout);
      window.removeEventListener("load", onReady);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && (
          <motion.div
            key="entry-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            suppressHydrationWarning
            className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center px-6"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="mb-2"
              >
                <Image
                  src="https://i.ibb.co/KjZ3cRSV/logo.png"
                  alt="DriveFleet"
                  width={120}
                  height={120}
                  priority
                  className="h-24 w-24 object-contain"
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-2xl md:text-3xl font-bold text-foreground tracking-tight"
              >
                Drive<span className="text-primary">Fleet</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-2 text-sm text-muted-foreground"
              >
                Premium car rentals at your fingertips
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8 w-56 h-36 md:w-64 md:h-40"
              >
                <LottiePlayer
                  animationData={carLoad}
                  loop
                  autoplay
                  className="w-full h-full"
                />
              </motion.div>

              <div className="mt-10 w-56 md:w-64">
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  {progress < 100 ? "Loading your experience..." : "Welcome!"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: showLoader ? 0 : 1 }}
        transition={{ duration: 0.4, delay: showLoader ? 0 : 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
