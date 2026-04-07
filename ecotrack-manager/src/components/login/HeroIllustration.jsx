import { motion } from 'framer-motion';
import { Leaf, Recycle, Sparkles } from 'lucide-react';

export default function HeroIllustration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Left side - Recycling character */}
      <motion.div
        className="absolute bottom-0 left-10 md:left-32 w-48 h-48 md:w-64 md:h-64"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="relative w-full h-full">
          {/* Recycling bin character */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-32 h-40 bg-gradient-to-b from-green-400 to-green-600 rounded-2xl shadow-2xl flex items-center justify-center border-4 border-green-300">
              <Recycle className="w-20 h-20 text-white" strokeWidth={1.5} />
            </div>
            {/* Character face */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-green-500 rounded-full border-4 border-green-300 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="flex gap-3 mb-2">
                  <div className="w-3 h-3 bg-white rounded-full" />
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <div className="w-8 h-2 bg-white rounded-full" />
              </div>
            </div>
            {/* Arms */}
            <motion.div
              className="absolute top-20 -left-8 w-12 h-4 bg-green-500 rounded-full origin-right"
              animate={{ rotate: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-20 -right-8 w-12 h-4 bg-green-500 rounded-full origin-left"
              animate={{ rotate: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Legs */}
            <div className="absolute -bottom-8 left-4 w-4 h-12 bg-green-700 rounded-full" />
            <div className="absolute -bottom-8 right-4 w-4 h-12 bg-green-700 rounded-full" />
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Truck character */}
      <motion.div
        className="absolute bottom-0 right-10 md:right-32 w-48 h-48 md:w-64 md:h-64"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <div className="relative w-full h-full">
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {/* Truck body */}
            <div className="w-40 h-28 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl shadow-2xl border-4 border-emerald-300 relative">
              {/* Cabin */}
              <div className="absolute -right-8 top-2 w-12 h-20 bg-emerald-500 rounded-r-lg border-4 border-emerald-300" />
              {/* Windows */}
              <div className="absolute right-0 top-4 w-6 h-8 bg-blue-300/50 rounded-sm" />
              {/* Wheels */}
              <motion.div
                className="absolute -bottom-4 left-4 w-10 h-10 bg-gray-800 rounded-full border-4 border-gray-600"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-4 right-4 w-10 h-10 bg-gray-800 rounded-full border-4 border-gray-600"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              {/* Face on truck */}
              <div className="absolute left-8 top-8 w-16 h-16 flex flex-col items-center justify-center">
                <div className="flex gap-2 mb-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="w-6 h-2 bg-white rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating leaves */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`leaf-login-${i}`}
          className="absolute"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: -50,
            rotate: 0 
          }}
          animate={{ 
            y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            rotate: 360 
          }}
          transition={{ 
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear" 
          }}
        >
          <Leaf className="w-6 h-6 md:w-8 md:h-8 text-green-300/40" />
        </motion.div>
      ))}

      {/* Sparkles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`sparkle-login-${i}`}
          className="absolute"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            scale: 0,
            opacity: 0 
          }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: 180
          }}
          transition={{ 
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2 
          }}
        >
          <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-yellow-300/60" />
        </motion.div>
      ))}
    </div>
  );
}
