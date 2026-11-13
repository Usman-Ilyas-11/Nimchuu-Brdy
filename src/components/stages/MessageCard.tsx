'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Sparkles, FastForward } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '@/config/birthday';

interface MessageCardProps {
  onNext: () => void;
  onAudioStart: () => void;
}

export const MessageCard: React.FC<MessageCardProps> = ({ onNext, onAudioStart }) => {
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const fullTextArray = BIRTHDAY_CONFIG.letterMessage;

  useEffect(() => {
    // Notify audio player to start background music
    onAudioStart();
  }, [onAudioStart]);

  // Typewriter effect loop using Array.from to correctly handle UTF-16 surrogate pairs and emojis
  useEffect(() => {
    if (currentParagraph >= fullTextArray.length) {
      setIsTypingComplete(true);
      return;
    }

    const paragraph = fullTextArray[currentParagraph];
    // Array.from splits string by full Unicode code points (emojis + characters)
    const characters = Array.from(paragraph);
    let charIndex = 0;

    const timer = setInterval(() => {
      if (charIndex < characters.length) {
        const char = characters[charIndex];
        setDisplayedText((prev) => prev + char);
        charIndex++;
      } else {
        clearInterval(timer);
        // Gentle reading pause between paragraphs (800ms)
        setTimeout(() => {
          if (currentParagraph < fullTextArray.length - 1) {
            setDisplayedText((prev) => prev + '\n\n');
            setCurrentParagraph((prev) => prev + 1);
          } else {
            setIsTypingComplete(true);
          }
        }, 800);
      }
    }, 65); // Slower, natural reading speed (65ms per character)

    return () => clearInterval(timer);
  }, [currentParagraph, fullTextArray]);

  const handleSkipTyping = () => {
    setDisplayedText(fullTextArray.join('\n\n'));
    setIsTypingComplete(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex min-h-screen items-center justify-center p-4"
    >
      <div className="w-full max-w-xl">
        <div className="relative rounded-3xl bg-slate-950/70 p-6 sm:p-10 backdrop-blur-2xl border border-pink-500/20 shadow-2xl shadow-pink-500/10">
          {/* Glass Letter Top Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-400">
                <Heart className="h-5 w-5 fill-pink-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-pink-200">
                  For My Dearest {BIRTHDAY_CONFIG.friendName}
                </h3>
                <p className="text-[11px] text-pink-300/50">Written with love 💌</p>
              </div>
            </div>

            {!isTypingComplete && (
              <button
                onClick={handleSkipTyping}
                className="flex items-center gap-1.5 rounded-full bg-slate-900/60 px-3 py-1.5 text-xs text-pink-300/80 border border-pink-500/20 hover:bg-pink-500/10 transition-colors"
                title="Skip typing"
              >
                <FastForward className="h-3.5 w-3.5" />
                <span>Show All</span>
              </button>
            )}
          </div>

          {/* Typewriter Body Content */}
          <div className="min-h-[220px] text-sm sm:text-base leading-relaxed text-pink-100/90 whitespace-pre-wrap font-serif tracking-wide selection:bg-pink-500/30">
            {displayedText}
            {!isTypingComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="inline-block w-2 h-4 ml-1 bg-pink-400 align-middle"
              />
            )}
          </div>

          {/* Letter Footer & Transition CTA */}
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 text-xs text-pink-300/60">
              <Sparkles className="h-4 w-4 text-pink-400" />
              <span>Make a wish when you reach the cake!</span>
            </div>

            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300"
            >
              <span>Next Surprise</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
