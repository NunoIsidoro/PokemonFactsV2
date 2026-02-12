import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#0061A4", // Azul principal
    background: "#E3F2FD", // Azul muito claro (substitui o branco)
    surface: "#F0F7FF", // Superfície dos cards
    secondary: "#535F70",
    outline: "#73777F",
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#D1E4FF", // Azul claro para destaque no escuro
    background: "#001D35", // Azul marinho profundo (substitui o preto)
    surface: "#00264D", // Azul um pouco mais claro para os cards
    surfaceVariant: "#6a849e", // Azul para variações de superfície
    secondary: "#BEC8D9",
    outline: "#8C9199",
    onSurface: "#001D35", // Branco para texto em superfícies escuras
  },
};
