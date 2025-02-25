'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const ThemeToggleButton = ({ className }: { className?: string }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`${className} p-[4px] text-sm rounded-md text-[var(--gray-02)] dark:text-[var(--gray-01-dark)] hover:text-[var(--primary)] hover:dark:text-[var(--primary-dark)] transition-all duration-300`}
      aria-label='Toggle Dark Mode'
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
};

export default ThemeToggleButton;
