import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "../theme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTintColor: theme.colors.primary,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Pokémon List" }} />
        <Stack.Screen
          name="tabs/PokemonProfile"
          options={{ title: "Pokemon" }}
        />
      </Stack>
    </PaperProvider>
  );
}
