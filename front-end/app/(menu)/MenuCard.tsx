import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Text, Image, StyleSheet, View, Pressable } from "react-native";

const MenuCard = ({
  menu,
  filter,
  onPress,
}: {
  menu: {
    itemId: number;
    itemName: string;
    itemPrice: number;
    itemSoldout: boolean;
    itemCategory: string;
    itemSubCategory: string;
    itemPictureUrl: string;
  };
  filter: number;
  onPress: () => void;
}) => {
  if (filter === 3) {
    return (
      <Pressable
        style={[styles.container, { flexBasis: `${100 / filter}%` }]}
        onPress={onPress}
      >
        {menu.itemPictureUrl ? (
          <Image
            source={{ uri: menu.itemPictureUrl }}
            style={styles.menuImage}
          />
        ) : (
          <View style={styles.menuImage}>
            <MaterialIcons name="image" size={24} color="black" />
          </View>
        )}
        <Text style={[styles.name, { textAlign: "center" }]}>
          {menu.itemName}
        </Text>
        <Text style={styles.price}>{menu.itemPrice.toLocaleString()}원</Text>
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
      <Image source={{ uri: menu.itemPictureUrl }} style={styles.menuImage} />
      <View style={{ flex: 1, gap: 10 }}>
        <Text style={styles.name}>{menu.itemName}</Text>
        <Text style={styles.price}>{menu.itemPrice.toLocaleString()}원</Text>
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
    justifyContent: "center",
    alignItems: "center",
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
