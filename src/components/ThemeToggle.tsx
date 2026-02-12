import React from "react";
import { IconButton } from "react-native-paper";
import { useAppTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { themeMode, toggleTheme } = useAppTheme();

  const getIcon = () => {
    switch (themeMode) {
      case "auto":
        return "brightness-auto";
      case "light":
        return "white-balance-sunny";
      case "dark":
        return "weather-night";
    }
  };

  return (
    <IconButton icon={getIcon()} onPress={toggleTheme} size={24} animated />
  );
}
