import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  text: string;
  onPress?: () => void;
  backgroundColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const Button = ({
  text,
  onPress,
  backgroundColor = "#FFD700",
  color = "#8B4513",
  style,
}: ButtonProps) => {
  return (
    <Pressable
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color }]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    width: "100%",
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
