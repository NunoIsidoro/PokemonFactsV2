import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,

    // Brand
    primary: "#0061A4",
    onPrimary: "#FFFFFF",
    primaryContainer: "#D1E4FF",
    onPrimaryContainer: "#001D35",

    // Base surfaces
    background: "#E3F2FD",
    onBackground: "#001D35",
    surface: "#F0F7FF",
    onSurface: "#001D35",
    surfaceVariant: "#DDE3EA",
    onSurfaceVariant: "#404A57",

    // Secondary / Tertiary
    secondary: "#535F70",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#D7E3F7",
    onSecondaryContainer: "#0F1C2B",

    tertiary: "#6B5778",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#F2DAFF",
    onTertiaryContainer: "#251431",

    // Feedback
    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",

    // Lines / shadows
    outline: "#73777F",
    outlineVariant: "#C4C6CF",
    shadow: "#000000",
    scrim: "#000000",

    // Inverse (para snackbars, etc.)
    inverseSurface: "#2E3135",
    inverseOnSurface: "#F1F0F4",
    inversePrimary: "#9CCAFF",

    // Optional / quality-of-life
    surfaceDisabled: "rgba(0,0,0,0.12)",
    onSurfaceDisabled: "rgba(0,0,0,0.38)",
    backdrop: "rgba(45,50,56,0.4)",
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,

    // Brand
    primary: "#D1E4FF",
    onPrimary: "#003258",
    primaryContainer: "#00497D",
    onPrimaryContainer: "#D1E4FF",

    // Base surfaces
    background: "#001D35",
    onBackground: "#D7E3F7",
    surface: "#00274D",
    onSurface: "#D7E3F7",
    surfaceVariant: "#0c3873",
    onSurfaceVariant: "#C4C6CF",

    // Secondary / Tertiary
    secondary: "#BEC8D9",
    onSecondary: "#283141",
    secondaryContainer: "#3E4758",
    onSecondaryContainer: "#D7E3F7",

    tertiary: "#D7BEE4",
    onTertiary: "#3B2947",
    tertiaryContainer: "#523F5E",
    onTertiaryContainer: "#F2DAFF",

    // Feedback
    error: "#FFB4AB",
    onError: "#690005",
    errorContainer: "#93000A",
    onErrorContainer: "#FFDAD6",

    // Lines / shadows
    outline: "#8C9199",
    outlineVariant: "#404A57",
    shadow: "#000000",
    scrim: "#000000",

    // Inverse
    inverseSurface: "#DDE3EA",
    inverseOnSurface: "#1B1F24",
    inversePrimary: "#0061A4",

    // Optional / quality-of-life
    surfaceDisabled: "rgba(215,227,247,0.12)",
    onSurfaceDisabled: "rgba(215,227,247,0.38)",
    backdrop: "rgba(10,15,20,0.6)",
  },
};
