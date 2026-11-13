'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Sparkles, PartyPopper } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '@/config/birthday';

interface CakeCuttingProps {
  onCelebrate: () => void;
}

export const CakeCutting: React.FC<CakeCuttingProps> = ({ onCelebrate }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isSliced, setIsSliced] = useState(false);
  const [knifeAnimating, setKnifeAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const smokeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Blow candle smoke puff canvas animation
  const triggerSmokePuff = () => {
    setCandlesBlown(true);
    const canvas = smokeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 320;
    canvas.height = 160;

    let particles = Array.from({ length: 30 }, () => ({
      x: 160 + (Math.random() - 0.5) * 80,
      y: 100,
      radius: Math.random() * 9 + 4,
      speedY: -Math.random() * 2.2 - 1,
      speedX: (Math.random() - 0.5) * 1.8,
      opacity: 0.85,
    }));

    let animId: number;
    const renderSmoke = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let aliveCount = 0;

      particles.forEach((p) => {
        if (p.opacity > 0) {
          aliveCount++;
          p.y += p.speedY;
          p.x += p.speedX;
          p.radius += 0.35;
          p.opacity -= 0.02;

          ctx.fillStyle = `rgba(220, 220, 240, ${Math.max(0, p.opacity)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (aliveCount > 0) {
        animId = requestAnimationFrame(renderSmoke);
      }
    };

    renderSmoke();
  };

  // Trigger realistic knife slicing animation
  const handleCutCake = () => {
    if (!candlesBlown) {
      triggerSmokePuff();
    }
    setKnifeAnimating(true);
    setTimeout(() => {
      setIsSliced(true);
      setKnifeAnimating(false);
    }, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.7 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 text-center"
    >
      {/* Background Glow */}
      <div className="absolute w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Single Line Heading */}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-pink-300 to-rose-200 bg-clip-text text-transparent mb-2">
        Happy Birthday {BIRTHDAY_CONFIG.friendName}! 🎂
      </h2>
      <p className="text-xs sm:text-sm text-pink-200/70 mb-6 max-w-sm">
        {!candlesBlown
          ? 'Tap "Blow Candles" to extinguish the flames!'
          : !isSliced
          ? 'Tap "Cut Cake Slice 🔪" to slice the cake into two pieces!'
          : 'Yum! Two delicious slices! Ready to celebrate? 🎉'}
      </p>

      {/* Cake Area Container */}
      <div
        ref={containerRef}
        onClick={!isSliced ? handleCutCake : undefined}
        className="relative w-80 h-84 flex flex-col items-center justify-end cursor-pointer group select-none"
      >
        {/* Smoke Canvas Overlay for blown candles */}
        <canvas
          ref={smokeCanvasRef}
          className="absolute top-0 pointer-events-none z-40"
        />

        {/* Animated Knife Cutting Motion */}
        <AnimatePresence>
          {knifeAnimating && (
            <motion.div
              initial={{ y: -120, x: -10, rotate: -25, opacity: 0 }}
              animate={{ y: 20, x: 0, rotate: 0, opacity: 1 }}
              exit={{ y: 150, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute z-50 pointer-events-none"
            >
              <svg width="40" height="140" viewBox="0 0 40 140">
                {/* Silver Blade */}
                <path d="M 18 10 L 26 10 L 24 100 L 18 115 L 18 10 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
                <path d="M 22 10 L 26 10 L 24 100 L 22 100 Z" fill="#ffffff" opacity="0.6" />
                {/* Knife Handle */}
                <rect x="15" y="100" width="10" height="35" rx="3" fill="#334155" stroke="#1e293b" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Candles on Top */}
        <div className="relative z-30 flex gap-6 mb-[-8px]">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              {!candlesBlown ? (
                <motion.div
                  animate={{
                    scale: [1, 1.18, 0.92, 1],
                    rotate: [-4, 4, -2, 2],
                  }}
                  transition={{ repeat: Infinity, duration: 0.55 + idx * 0.1 }}
                  className="w-4 h-6 rounded-full bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 shadow-[0_0_14px_#f59e0b] origin-bottom"
                />
              ) : (
                <div className="w-0.5 h-3 bg-slate-500 rounded-full" />
              )}
              <div className="w-3 h-10 rounded-t-sm bg-gradient-to-b from-pink-300 via-rose-300 to-pink-400 border-x border-pink-400/50 shadow-inner" />
            </div>
          ))}
        </div>

        {/* Realistic Multi-Tier Cake Splitting into Two Pieces */}
        <div className="relative w-full flex items-center justify-center">
          {/* Left Cake Half */}
          <motion.div
            animate={isSliced ? { x: -28, rotate: -3 } : { x: 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            className="flex flex-col items-end overflow-hidden"
          >
            {/* Top Tier Left */}
            <div className="w-24 h-16 rounded-tl-2xl bg-gradient-to-r from-pink-400 to-rose-400 border-t-4 border-l-4 border-white/70 shadow-lg relative overflow-hidden flex items-center justify-end pr-2">
              <div className="absolute top-0 inset-x-0 h-4 bg-white/40 rounded-b-xl" />
              <span className="text-[10px] font-bold text-white/90 drop-shadow">Sweet</span>
              {/* Inner Sponge Layer Reveal on Slice */}
              {isSliced && (
                <div className="absolute inset-y-0 right-0 w-3 bg-amber-100 border-l border-amber-300 flex flex-col justify-around py-1">
                  <div className="w-full h-1 bg-rose-400" />
                  <div className="w-full h-1 bg-rose-400" />
                </div>
              )}
            </div>

            {/* Bottom Tier Left */}
            <div className="w-36 h-24 rounded-tl-3xl bg-gradient-to-r from-purple-500 to-pink-500 border-t-4 border-l-4 border-white/70 shadow-xl relative overflow-hidden flex items-center justify-end pr-3">
              <div className="absolute top-0 inset-x-0 h-5 bg-white/40 rounded-b-2xl" />
              <div className="absolute bottom-0 inset-x-0 h-3 bg-slate-200/80 rounded-l-full" />
              {/* Inner Sponge Layer Reveal on Slice */}
              {isSliced && (
                <div className="absolute inset-y-0 right-0 w-4 bg-amber-100 border-l border-amber-300 flex flex-col justify-around py-2">
                  <div className="w-full h-1.5 bg-rose-500" />
                  <div className="w-full h-1.5 bg-rose-500" />
                  <div className="w-full h-1.5 bg-rose-500" />
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Cake Half */}
          <motion.div
            animate={isSliced ? { x: 28, rotate: 3 } : { x: 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            className="flex flex-col items-start overflow-hidden"
          >
            {/* Top Tier Right */}
            <div className="w-24 h-16 rounded-tr-2xl bg-gradient-to-r from-rose-400 to-pink-500 border-t-4 border-r-4 border-white/70 shadow-lg relative overflow-hidden flex items-center justify-start pl-2">
              <div className="absolute top-0 inset-x-0 h-4 bg-white/40 rounded-b-xl" />
              <span className="text-[10px] font-bold text-white/90 drop-shadow">Wishes</span>
              {/* Inner Sponge Layer Reveal on Slice */}
              {isSliced && (
                <div className="absolute inset-y-0 left-0 w-3 bg-amber-100 border-r border-amber-300 flex flex-col justify-around py-1">
                  <div className="w-full h-1 bg-rose-400" />
                  <div className="w-full h-1 bg-rose-400" />
                </div>
              )}
            </div>

            {/* Bottom Tier Right */}
            <div className="w-36 h-24 rounded-tr-3xl bg-gradient-to-r from-pink-500 to-rose-500 border-t-4 border-r-4 border-white/70 shadow-xl relative overflow-hidden flex items-center justify-start pl-3">
              <div className="absolute top-0 inset-x-0 h-5 bg-white/40 rounded-b-2xl" />
              <div className="absolute bottom-0 inset-x-0 h-3 bg-slate-200/80 rounded-r-full" />
              {/* Inner Sponge Layer Reveal on Slice */}
              {isSliced && (
                <div className="absolute inset-y-0 left-0 w-4 bg-amber-100 border-r border-amber-300 flex flex-col justify-around py-2">
                  <div className="w-full h-1.5 bg-rose-500" />
                  <div className="w-full h-1.5 bg-rose-500" />
                  <div className="w-full h-1.5 bg-rose-500" />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {!candlesBlown ? (
          <button
            onClick={triggerSmokePuff}
            className="flex items-center gap-2 rounded-full bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-amber-300 border border-amber-500/30 hover:bg-amber-500/10 shadow-lg transition-all active:scale-95"
          >
            <Wind className="h-4 w-4 text-amber-400 animate-pulse" />
            <span>Blow Candles 🌬️</span>
          </button>
        ) : !isSliced ? (
          <button
            onClick={handleCutCake}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 hover:scale-105 transition-all active:scale-95"
          >
            <Sparkles className="h-4 w-4" />
            <span>Cut Cake Slice 🔪</span>
          </button>
        ) : (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={onCelebrate}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <PartyPopper className="h-5 w-5 text-amber-300 animate-bounce" />
            <span>Grand Celebration! 🎉</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
