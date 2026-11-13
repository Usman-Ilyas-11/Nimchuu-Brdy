'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Sparkles, Heart, X, ZoomIn } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '@/config/birthday';
import { PolaroidPhoto } from '@/types/birthday';
import { ConfettiOverlay, triggerGrandConfetti } from './ConfettiOverlay';

interface CelebrationProps {
  onReplay: () => void;
}

export const Celebration: React.FC<CelebrationProps> = ({ onReplay }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidPhoto | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-between p-4 py-8 text-center"
    >
      <ConfettiOverlay />

      {/* Header Banner */}
      <div className="max-w-2xl mt-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full bg-pink-500/10 px-4 py-1.5 border border-pink-500/30 text-xs font-semibold text-pink-300 mb-3"
        >
          <Sparkles className="h-3.5 w-3.5 text-pink-400" />
          <span>Happy Birthday {BIRTHDAY_CONFIG.friendName}! 👑</span>
        </motion.div>

        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent drop-shadow-md"
        >
          Memory Scrapbook ✨
        </motion.h1>

        <p className="mt-2 text-xs sm:text-sm text-pink-200/70">
          Tap any polaroid photo to expand your best memories together!
        </p>
      </div>

      {/* Polaroid Gallery Grid */}
      <div className="my-8 w-full max-w-7xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
        {BIRTHDAY_CONFIG.photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: photo.rotation }}
            whileHover={{ scale: 1.06, rotate: 0, zIndex: 30 }}
            transition={{ delay: 0.15 * index, type: 'spring', stiffness: 200 }}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative bg-white p-3 pt-4 pb-6 rounded-sm shadow-xl shadow-black/40 cursor-pointer border border-slate-200 text-left transition-shadow hover:shadow-pink-500/20"
          >
            {/* Scrapbook Washi Tape Effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-pink-200/60 backdrop-blur-sm rotate-[-2deg] border border-white/50 shadow-sm pointer-events-none" />

            {/* Photo Container */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100 rounded-xs mb-3">
              <img
                src={photo.url}
                alt={photo.caption}
                className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
              </div>
            </div>

            {/* Handwritten Caption & Date */}
            <div className="px-1">
              <p className="font-serif text-sm font-semibold text-slate-800 tracking-wide line-clamp-1">
                {photo.caption}
              </p>
              {photo.date && (
                <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                  {photo.date}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white p-5 rounded-md shadow-2xl text-left"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-4 -right-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg hover:bg-rose-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="w-full overflow-hidden rounded-xs bg-slate-100 mb-4">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="w-full h-auto object-contain max-h-[70vh]"
                />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                {selectedPhoto.caption}
              </h3>
              {selectedPhoto.date && (
                <p className="text-xs text-slate-500 mt-1">{selectedPhoto.date}</p>
              )}

              {/* Emotional Line – only for special memories */}
              {selectedPhoto.emotionalLine && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="mt-4 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 px-4 py-3 shadow-inner"
                >
                  <div className="flex items-start gap-2">
                    <Heart className="mt-0.5 h-4 w-4 flex-shrink-0 fill-rose-400 text-rose-400 animate-pulse" />
                    <p className="font-serif text-sm italic leading-relaxed text-rose-700">
                      {selectedPhoto.emotionalLine}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
        <button
          onClick={() => triggerGrandConfetti()}
          className="flex items-center gap-2 rounded-full bg-pink-500/20 px-6 py-3 text-sm font-semibold text-pink-200 border border-pink-500/30 hover:bg-pink-500/30 transition-all active:scale-95 shadow-lg"
        >
          <Sparkles className="h-4 w-4 text-pink-400" />
          <span>More Confetti! 🎉</span>
        </button>

        <button
          onClick={onReplay}
          className="flex items-center gap-2 rounded-full bg-slate-900/80 px-6 py-3 text-sm font-semibold text-slate-200 border border-slate-700 hover:bg-slate-800 transition-all active:scale-95 shadow-lg"
        >
          <RotateCcw className="h-4 w-4 text-slate-400" />
          <span>Experience Again ↺</span>
        </button>
      </div>
    </motion.div>
  );
};
