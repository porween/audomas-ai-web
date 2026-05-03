"use client";

import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingChatButton() {
  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-14 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-[0_8px_30px_rgb(147,51,234,0.3)] hover:shadow-[0_8px_30px_rgb(147,51,234,0.5)] transition-shadow border border-white/20"
    >
      <MessageSquare className="w-5 h-5 fill-white/20" />
      แชทกับ AI
    </motion.button>
  );
}
