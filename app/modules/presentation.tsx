"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function Presentation() {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (!showMessage) {
    return null;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: -50 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      >
        <motion.h1
          className="text-4xl md:text-7xl text-center text-white drop-shadow-2xl"
          style={{
            fontFamily: "var(--font-dancing-script)",
            fontWeight: 600,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          {"Aniversário da Isabella".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.5 + index * 0.1,
                duration: 0.1,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.div
          className="text-7xl md:text-9xl drop-shadow-lg flex gap-2"
          style={{
            filter: "drop-shadow(0 0 20px rgba(255, 107, 157, 0.4))",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 3,
            duration: 0.5,
          }}
        >
          {["🎂", "🎉", "🥳"].map((emoji, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 3.2 + index * 0.3,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
