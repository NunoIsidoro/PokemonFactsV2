import { useRouter } from "expo-router";
import React, { memo } from "react"; // 1. Importar memo
import { Pressable } from "react-native";
import { Card, useTheme } from "react-native-paper";

type CardProps = {
  title: string;
  image: string;
};

const CardComponent = memo(({ title, image }: CardProps) => {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={() =>
        router.navigate({
          pathname: "../tabs/PokemonProfile",
          params: { name: title },
        })
      }
    >
      <Card
        style={{
          margin: 8,
          width: 150,
          height: 200,
          padding: 8,
          backgroundColor: colors.surfaceVariant,
        }}
      >
        <Card.Title
          title={title}
          titleStyle={{
            textTransform: "capitalize",
            fontSize: 20,
            fontWeight: "bold",

            color: colors.onSurface,
          }}
        />
        <Card.Cover
          source={{ uri: image }}
          style={{ width: 130, height: 130 }}
        />
      </Card>
    </Pressable>
  );
});

CardComponent.displayName = "CardComponent";
export default CardComponent;
