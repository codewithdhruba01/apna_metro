import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`p-1.5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors duration-150 focus:outline-none ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -45, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 45, scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <Moon className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 45, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -45, scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <Sun className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
