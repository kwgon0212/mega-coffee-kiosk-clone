import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";

interface CheckboxProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  label?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const Checkbox = ({
  isChecked,
  setIsChecked,
  label,
  style,
  disabled,
}: CheckboxProps) => {
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Pressable
      onPress={toggleCheckbox}
      style={[styles.checkboxContainer, style]}
      disabled={disabled}
    >
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checked: {
    backgroundColor: "#452613",
    borderWidth: 0,
  },
  checkmark: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  label: {
    fontSize: 16,
  },
});
