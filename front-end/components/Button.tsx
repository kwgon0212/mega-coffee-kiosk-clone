import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  DimensionValue,
} from "react-native";

interface ButtonProps {
  text?: string;
  title?: string;
  onPress?: () => void;
  backgroundColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  width?: DimensionValue;
}

const Button = ({
  text,
  title,
  onPress,
  backgroundColor = "#FFD700",
  color = "#8B4513",
  style,
  width,
}: ButtonProps) => {
  return (
    <Pressable
      style={[styles.button, { backgroundColor, width }, style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color }]}>{title || text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,

    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Button;
