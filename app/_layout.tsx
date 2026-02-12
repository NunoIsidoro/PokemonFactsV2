import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import { ThemeToggle } from "../src/components/ThemeToggle";
import { ThemeProvider } from "../src/context/ThemeContext";

// Componente interno para aceder ao tema (porque o Provider está fora)
function AppStack() {
  const theme = useTheme(); // Este tema já vem do Contexto

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.primary,
        // Adiciona o botão globalmente à direita
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Pokémon List" }} />
      <Stack.Screen name="tabs/PokemonProfile" options={{ title: "Pokemon" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppStack />
    </ThemeProvider>
  );
}
