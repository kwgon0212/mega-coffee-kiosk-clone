import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
interface AccordionProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
}

const Accordion = ({ isOpen, setIsOpen, children, title }: AccordionProps) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setIsOpen(!isOpen)} style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <Entypo name="chevron-thin-down" size={20} color="black" />
      </Pressable>

      {isOpen && children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.05)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Accordion;
