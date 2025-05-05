import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
interface AccordionProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  isStyled?: boolean;
}

const Accordion = ({
  isOpen,
  setIsOpen,
  children,
  title,
  subtitle,
  isStyled,
}: AccordionProps) => {
  return (
    <View
      style={[
        styles.container,
        isStyled && {
          boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2)",
          borderRadius: 10,
        },
      ]}
    >
      <Pressable onPress={() => setIsOpen(!isOpen)} style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <View style={styles.headerRight}>
          <Text style={styles.subtitleText}>{subtitle}</Text>
          <Entypo
            name={`chevron-thin-${isOpen ? "up" : "down"}`}
            size={20}
            color="black"
          />
        </View>
      </Pressable>

      {isOpen && children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
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
  subtitleText: {
    fontSize: 14,
    color: "gray",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default Accordion;
