import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

export default function TestComponent() {
  return (
    <div className="min-h-screen eco-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-panel max-w-md w-full rounded-3xl p-8 text-center"
      >
        <Leaf className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-900 mb-2">EcoTrack is Working!</h1>
        <p className="text-green-700 mb-6">All systems operational</p>
      </motion.div>
    </div>
  );
}
