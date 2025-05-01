import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { router } from "expo-router";
import Header from "@/components/Header";
import Button from "@/components/Button";
import ToastProvider from "@/components/Toast";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(auth)"
          options={{
            header: ({ navigation, route, options }) => (
              <Header
                title="로그인 / 회원가입"
                showBackButton={navigation.canGoBack()}
              />
            ),
          }}
        />
        <Stack.Screen name="(store)" />
        <Stack.Screen name="(menu)/[store]" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <ToastProvider />
      <StatusBar style="auto" />
    </>
  );
}
