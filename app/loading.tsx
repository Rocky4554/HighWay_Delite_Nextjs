"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Loading(): JSX.Element {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center space-y-3"
      >
        <Loader2 className="w-8 h-8 animate-spin text-gray-800" />
        <p className="text-sm text-gray-600 font-medium">Loading...</p>
      </motion.div>
    </div>
  );
}
