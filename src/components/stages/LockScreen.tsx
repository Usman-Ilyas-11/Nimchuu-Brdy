'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, HelpCircle, Sparkles, Heart, AlertTriangle, X } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '@/config/birthday';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [isError, setIsError] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleKeyClick = (val: string) => {
    if (pin.length < 4) {
      const newPin = pin + val;
      setPin(newPin);
      setIsError(false);

      if (newPin.length === 4) {
        verifyPin(newPin);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setIsError(false);
  };

  const verifyPin = (inputPin: string) => {
    if (inputPin === BIRTHDAY_CONFIG.secretPin) {
      setIsUnlocked(true);
      setTimeout(() => {
        onUnlock();
      }, 900);
    } else {
      setIsError(true);
      setShowErrorModal(true);
      setPin('');
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setIsError(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex min-h-screen items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        <motion.div
          animate={isError ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative rounded-3xl bg-slate-950/70 p-8 backdrop-blur-2xl border border-pink-500/20 shadow-2xl shadow-pink-500/10 text-center overflow-hidden"
        >
          {/* Subtle Ambient Glow inside Card */}
          <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

          {/* Header Icon & Title */}
          <div className="relative mb-6 flex flex-col items-center">
            <motion.div
              animate={isUnlocked ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : {}}
              className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${
                isUnlocked
                  ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20'
                  : isError
                  ? 'border-rose-500/50 bg-rose-500/20 text-rose-400'
                  : 'border-pink-500/30 bg-pink-500/10 text-pink-400'
              } transition-colors duration-300`}
            >
              {isUnlocked ? <Unlock className="h-8 w-8 animate-pulse" /> : <Lock className="h-8 w-8" />}
            </motion.div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200 bg-clip-text text-transparent">
              Secret Birthday Vault
            </h1>
          </div>

          {/* Passcode Dots Display */}
          <div className="mb-6 flex justify-center gap-3">
            {[0, 1, 2, 3].map((index) => {
              const isFilled = pin.length > index;
              return (
                <motion.div
                  key={index}
                  animate={isFilled ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  className={`h-4 w-4 rounded-full border transition-all duration-200 ${
                    isUnlocked
                      ? 'border-emerald-400 bg-emerald-400 shadow-md shadow-emerald-400/50'
                      : isFilled
                      ? 'border-pink-400 bg-gradient-to-r from-pink-500 to-rose-400 shadow-md shadow-pink-500/50'
                      : 'border-slate-700 bg-slate-900/50'
                  }`}
                />
              );
            })}
          </div>

          {/* Keypad Buttons */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <button
                key={num}
                onClick={() => handleKeyClick(num)}
                disabled={isUnlocked}
                className="flex h-14 items-center justify-center rounded-2xl bg-slate-900/50 border border-slate-800 text-lg font-semibold text-slate-100 hover:bg-pink-500/10 hover:border-pink-500/30 hover:text-pink-300 active:scale-95 transition-all duration-150 shadow-sm"
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex h-14 items-center justify-center rounded-2xl bg-slate-900/30 border border-slate-800/80 text-pink-400/80 hover:bg-pink-500/10 hover:text-pink-300 transition-all active:scale-95"
              title="Need a hint?"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleKeyClick('0')}
              disabled={isUnlocked}
              className="flex h-14 items-center justify-center rounded-2xl bg-slate-900/50 border border-slate-800 text-lg font-semibold text-slate-100 hover:bg-pink-500/10 hover:border-pink-500/30 hover:text-pink-300 active:scale-95 transition-all"
            >
              0
            </button>
            <button
              onClick={handleDelete}
              disabled={isUnlocked || pin.length === 0}
              className="flex h-14 items-center justify-center rounded-2xl bg-slate-900/30 border border-slate-800/80 text-slate-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all active:scale-95"
            >
              ⌫
            </button>
          </div>

          {/* Hint Dropdown */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden rounded-xl bg-pink-500/10 p-3 border border-pink-500/20 text-xs text-pink-200/90"
              >
                <div className="flex items-center justify-center gap-1.5 font-medium">
                  <Sparkles className="h-3.5 w-3.5 text-pink-400" />
                  <span>{BIRTHDAY_CONFIG.hintMessage}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Feedback Message */}
          <div className="mt-4 h-6 text-xs font-medium">
            {isUnlocked ? (
              <span className="flex items-center justify-center gap-1 text-emerald-400 animate-pulse">
                <Heart className="h-3.5 w-3.5 fill-emerald-400" /> Passcode Accepted! Unlocking...
              </span>
            ) : (
              <span className="text-slate-500">Tap digits to enter code</span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Pop-Up Banner Modal for Incorrect PIN */}
      <AnimatePresence>
        {showErrorModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseErrorModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl bg-slate-900 p-6 text-center border border-rose-500/40 shadow-2xl shadow-rose-500/20"
            >
              {/* Close Icon */}
              <button
                onClick={handleCloseErrorModal}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Angry Emoji */}
              <div className="text-5xl my-2 animate-bounce">😡</div>

              {/* Title & Message */}
              <h3 className="text-xl font-extrabold text-rose-300">
                Are you seriously my bestie?!
              </h3>

              {/* Embedded Hint */}
              <div className="mt-4 rounded-xl bg-pink-500/10 p-3 border border-pink-500/20 text-xs text-pink-200">
                <p className="font-semibold text-pink-300 mb-1">💡 Hint:</p>
                <p>Our age difference followed by two zeros (00)</p>
              </div>

              {/* Try Again Button */}
              <button
                onClick={handleCloseErrorModal}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                Try Again 🔄
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
