import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

interface StoreCardProps {
  name: string;
  address: string;
  distance: number;
  onPress: () => void;
}

const StoreCard = ({ name, address, distance, onPress }: StoreCardProps) => {
  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.distance}>{formatDistance(distance)}</Text>
      </View>
      <View>
        <Image
          source={require("@/assets/images/mega-logo.png")}
          style={styles.storeImage}
        />
      </View>
    </Pressable>
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
    gap: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
  },
  address: {
    fontSize: 14,
    color: "gray",
  },
  distance: {
    color: "#452613",
    fontSize: 16,
    fontWeight: "500",
  },
  storeImage: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
});

export default StoreCard;
