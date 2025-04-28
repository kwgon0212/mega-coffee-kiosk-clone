import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity, View } from "react-native";

const MenuCard = ({
  menu,
  filter,
}: {
  menu: { name: string; price: number; image: string };
  filter: number;
}) => {
  if (filter === 3) {
    return (
      <TouchableOpacity
        style={[styles.container, { flexBasis: `${100 / filter}%` }]}
      >
        <Image source={{ uri: menu.image }} style={styles.menuImage} />
        <Text style={styles.name}>{menu.name}</Text>
        <Text style={styles.price}>{menu.price}원</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { flexBasis: `${100 / filter}%`, flexDirection: "row", gap: 30 },
      ]}
    >
      <Image source={{ uri: menu.image }} style={styles.menuImage} />
      <View style={{ flex: 1, gap: 10 }}>
        <Text style={styles.name}>{menu.name}</Text>
        <Text style={styles.price}>{menu.price}원</Text>
      </View>
    </TouchableOpacity>
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
    fontSize: 16,
  },
  name: {
    fontSize: 16,
  },
});

export default MenuCard;
