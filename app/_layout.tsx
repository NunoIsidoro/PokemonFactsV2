import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import { ThemeToggle } from "../src/components/ThemeToggle";
import { ThemeProvider } from "../src/context/ThemeContext";

function AppStack() {
  const theme = useTheme(); 

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.primary,
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
