import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  rightNode?: React.ReactNode;
  borderBottomWidth?: number;
  onPressBackButton?: () => void;
}

export default function Header({
  title,
  showBackButton = false,
  onPressBackButton,
  rightNode,
  borderBottomWidth = 0.2,
}: HeaderProps) {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={[styles.container, { borderBottomWidth }]}>
        <View style={styles.leftContainer}>
          {showBackButton && (
            <TouchableOpacity
              onPress={() => {
                if (onPressBackButton) {
                  onPressBackButton();
                } else {
                  router.back();
                }
              }}
              style={styles.backButton}
            >
              <Entypo name="chevron-thin-left" size={20} color="black" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <View style={styles.rightContainer}>{rightNode}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 20,
  },
  leftContainer: {
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    width: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  backButton: {},
  backButtonText: {
    fontSize: 24,
    color: "#8B4513",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
