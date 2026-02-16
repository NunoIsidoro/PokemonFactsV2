import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
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
        headerTitleStyle: { fontFamily: "Pokemon-Solid" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Pokémon List" }} />
      <Stack.Screen name="tabs/PokemonProfile" options={{ title: "Pokemon" }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Pokemon-Solid": require("../assets/fonts/Pokemon_Solid.ttf"),
    "Pokemon-Solid-Normal": require("../assets/fonts/Pokemon_Solid_Normal.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <AppStack />
    </ThemeProvider>
  );
}
