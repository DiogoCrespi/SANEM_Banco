import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme, Theme } from ".";

type ThemeMode = "light" | "dark";

type ThemeContextType = {
  mode: ThemeMode;
  theme: Theme;
  toggleTheme: () => Promise<void>;
  setMode: (mode: ThemeMode) => Promise<void>;
};

const STORAGE_KEY = "@solidarios:theme_mode";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setModeState] = useState<ThemeMode>("light");

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored === "dark" || stored === "light") {
          setModeState(stored);
        } else {
          // default to light
          setModeState("light");
        }
      } catch (err) {
        setModeState("light");
      }
    })();
  }, []);

  const setMode = async (m: ThemeMode) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, m);
    } catch (err) {
      // ignore
    }
    setModeState(m);
  };

  const toggleTheme = async () => {
    await setMode(mode === "light" ? "dark" : "light");
  };

  const theme = mode === "light" ? (lightTheme as Theme) : (darkTheme as Theme);

  return (
    <ThemeContext.Provider value={{ mode, theme, toggleTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

export default ThemeProvider;
