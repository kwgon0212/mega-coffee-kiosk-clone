import React from "react";
import { Text, Image, StyleSheet, View, Pressable } from "react-native";

const MenuCard = ({
  menu,
  filter,
  onPress,
}: {
  menu: { name: string; price: number; image: string };
  filter: number;
  onPress: () => void;
}) => {
  if (filter === 3) {
    return (
      <Pressable
        style={[styles.container, { flexBasis: `${100 / filter}%` }]}
        onPress={onPress}
      >
        <Image source={{ uri: menu.image }} style={styles.menuImage} />
        <Text style={[styles.name, { textAlign: "center" }]}>{menu.name}</Text>
        <Text style={styles.price}>{menu.price.toLocaleString()}원</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={[
        styles.container,
        {
          flexBasis: `${100 / filter}%`,
          flexDirection: "row",
          gap: 30,
        },
      ]}
      onPress={onPress}
    >
      <Image source={{ uri: menu.image }} style={styles.menuImage} />
      <View style={{ flex: 1, gap: 10 }}>
        <Text style={styles.name}>{menu.name}</Text>
        <Text style={styles.price}>{menu.price.toLocaleString()}원</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    gap: 5,
    alignItems: "center",
  },
  menuImage: {
    width: 100,
    height: 100,
  },
  price: {
    fontWeight: "bold",
    fontSize: 18,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default MenuCard;
