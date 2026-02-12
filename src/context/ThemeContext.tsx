import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import {
    darkTheme as customDark,
    lightTheme as customLight,
} from "../../theme";

type ThemeMode = "auto" | "light" | "dark";

interface ThemeContextData {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const THEME_KEY = "@theme_preference";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("auto");

  useEffect(() => {
    async function loadTheme() {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (savedTheme) {
        setThemeMode(savedTheme as ThemeMode);
      }
    }
    loadTheme();
  }, []);

  const saveThemePreference = async (newMode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, newMode);
      setThemeMode(newMode);
    } catch (error) {
      console.error("Erro ao guardar tema:", error);
    }
  };

  const toggleTheme = () => {
    if (themeMode === "auto") saveThemePreference("light");
    else if (themeMode === "light") saveThemePreference("dark");
    else saveThemePreference("auto");
  };

  const isDark =
    themeMode === "auto" ? systemScheme === "dark" : themeMode === "dark";

  const theme = isDark ? customDark : customLight;

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, isDark }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  return useContext(ThemeContext);
}
