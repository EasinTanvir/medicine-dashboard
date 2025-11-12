"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const BaseModal = ({ isOpen, onClose, children, maxWidth = "max-w-sm" }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className={`bg-white rounded-2xl shadow-xl w-[90%] ${maxWidth} p-6 relative`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>

            {/* Content (Dynamic) */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BaseModal;
