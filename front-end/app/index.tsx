import Button from "@/components/Button";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const LandingPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/mega-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="로그인 / 회원가입"
          onPress={() => {
            router.replace("/(auth)");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "column",
    width: "100%",
    maxWidth: 500,
    gap: 16,
  },
});
export default LandingPage;
