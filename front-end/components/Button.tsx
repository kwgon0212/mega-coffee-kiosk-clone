import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ text, onPress }: { text: string; onPress?: () => void }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderColor: "#8B4513",
  },
  buttonText: {
    color: "#8B4513",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Button;
