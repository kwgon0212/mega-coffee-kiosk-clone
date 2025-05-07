import Button from "@/components/Button";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";

const LandingPage = () => {
  const handleGoogleLogin = async () => {
    try {
      const authUrl = `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/google`;
      const callbackUrl = `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/google/callback`;

      console.log("인증 URL:", authUrl);
      console.log("콜백 URL:", callbackUrl);

      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        callbackUrl
      );

      console.log("WebBrowser 결과:", result);

      if (result.type === "success") {
        console.log("성공 URL:", result.url);
        const url = result.url;

        if (url.includes("code=")) {
          const code = url.split("code=")[1].split("&")[0];
          console.log("인증 코드:", code);

          const response = await fetch(
            `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/google/callback?code=${code}`
          );

          const data = await response.json();
          console.log("서버 응답:", data);

          if (response.ok) {
            await SecureStore.setItemAsync("accessToken", data.accessToken);
            router.replace("/(store)");
          } else {
            Alert.alert(
              "로그인 실패",
              data.message || "로그인에 실패했습니다."
            );
          }
        } else {
          console.log("URL에 code 파라미터가 없습니다:", url);
          Alert.alert("오류", "인증 코드를 받지 못했습니다.");
        }
      } else {
        console.log(
          "WebBrowser 세션이 성공적으로 종료되지 않았습니다:",
          result.type
        );
        Alert.alert("오류", "로그인이 취소되었습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      Alert.alert("오류", "로그인 중 오류가 발생했습니다.");
    }
  };

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
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
        >
          <Text style={styles.buttonText}>Google로 로그인</Text>
        </TouchableOpacity>
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
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LandingPage;
