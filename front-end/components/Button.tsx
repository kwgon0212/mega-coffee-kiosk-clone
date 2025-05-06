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
  disabled?: boolean;
}

const Button = ({
  text,
  title,
  onPress,
  backgroundColor = "#FFD700",
  color = "#8B4513",
  style,
  width,
  disabled = false,
}: ButtonProps) => {
  return (
    <Pressable
      style={[
        {
          backgroundColor: disabled ? "#ccc" : backgroundColor,
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={{ color: disabled ? "#666" : color, fontSize: 16 }}>
        {title || text}
      </Text>
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
