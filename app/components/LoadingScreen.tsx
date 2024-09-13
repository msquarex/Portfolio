import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background-start"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.svg
        className="w-16 h-16 mb-4"
        viewBox="0 0 50 50"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="#8000ff"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="94.25 31.41"
        />
      </motion.svg>
      <motion.div
        className="text-4xl font-bold text-accent-purple"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Loading...
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;