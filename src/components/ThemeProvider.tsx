'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
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

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
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

  useLayoutEffect(() => {
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
