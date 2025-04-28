import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

interface StoreCardProps {
  name: string;
  address: string;
  distance: number;
  onPress: () => void;
}

const StoreCard = ({ name, address, distance, onPress }: StoreCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.distance}>{distance}m</Text>
      </View>
      <View>
        <Image
          source={require("@/assets/images/mega-logo.png")}
          style={styles.storeImage}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
    color: "gray",
  },
  distance: {
    color: "red",
    fontSize: 16,
  },
  storeImage: {
    width: 70,
    height: 70,
    borderRadius: "100%",
  },
});

export default StoreCard;
