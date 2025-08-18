"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { AddPeoples } from "./add-peoples";

export function ConfirmSection() {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-8 px-4">
      <motion.div
        className="flex flex-col items-center gap-6 max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          Confirmação de Presença
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-center text-white/90 drop-shadow-md leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          Por favor, confirme sua presença no aniversário da Isabella.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: 0.9,
            duration: 0.6,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <AddPeoples />
        </motion.div>
      </motion.div>

      {/* Elementos decorativos */}
      <motion.div
        className="absolute top-20 left-10 text-4xl opacity-30"
        initial={{ opacity: 0, rotate: -45, scale: 0 }}
        animate={{ opacity: 0.3, rotate: 0, scale: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        🎂
      </motion.div>

      <motion.div
        className="absolute top-32 right-16 text-3xl opacity-30"
        initial={{ opacity: 0, rotate: 45, scale: 0 }}
        animate={{ opacity: 0.3, rotate: 0, scale: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        🎉
      </motion.div>
    </div>
  );
}
