'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
    } else {
      // 시스템 테마 선호도 확인
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setIsDarkMode(prefersDark);
      localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode, mounted]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
