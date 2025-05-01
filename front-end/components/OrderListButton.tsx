import React from "react";
import Octicons from "@expo/vector-icons/Octicons";
import { Pressable } from "react-native";

interface OrderListButtonProps {
  onPress: () => void;
}

const OrderListButton = ({ onPress }: OrderListButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <Octicons name="three-bars" size={24} color="black" />
    </Pressable>
  );
};

export default OrderListButton;
