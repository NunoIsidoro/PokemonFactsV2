import { useRouter } from "expo-router";
import React, { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { Card, Icon, useTheme } from "react-native-paper";

type CardProps = {
  title: string;
  image: string;
  isFavorite: boolean;
};

const CardComponent = memo(
  ({ title, image, isFavorite = false }: CardProps) => {
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
            margin: 6,
            width: 180,
            height: 200,
            padding: 8,
            backgroundColor: colors.surfaceVariant,
          }}
        >
          <View
            style={{
              height: 40,
              justifyContent: "center",
              marginBottom: 8,
              marginLeft: 4,
              width: "100%",
            }}
          >
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              minimumFontScale={0.5}
              style={{
                textTransform: "capitalize",
                fontFamily: "Pokemon-Solid-Normal",
                fontSize: 20,
                color: colors.onSurface,
                letterSpacing: 2,
                textAlign: "left",
              }}
            >
              {title}
            </Text>
          </View>
          <Card.Cover
            source={{ uri: image }}
            style={{
              width: 130,
              height: 130,
              alignSelf: "center",
            }}
          />
          {isFavorite && (
            <View
              style={{
                position: "absolute",
                top: 30,
                zIndex: 1,
                borderRadius: 12,
                padding: 2,
              }}
            >
              <Icon source="heart" color="#ff0000" size={32} />
            </View>
          )}
        </Card>
      </Pressable>
    );
  },
);

CardComponent.displayName = "CardComponent";
export default CardComponent;
