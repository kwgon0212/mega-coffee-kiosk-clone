import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, Slot, useRouter, useSegments, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { router } from "expo-router";
import Header from "@/components/Header";
import Button from "@/components/Button";
import ToastProvider from "@/components/Toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const queryClient = new QueryClient();
  // const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  const path = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync("accessToken");
        const userInfo = await AsyncStorage.getItem("userInfo");

        console.log("accessToken", accessToken);
        console.log("path", path);
        console.log(
          "userInfo",
          JSON.stringify(JSON.parse(userInfo || "{}"), null, 2)
        );

        const inAuthGroup = segments[0] === "(auth)";
        const inAdminGroup = segments[0] === "(admin)";

        if (!accessToken) {
          if (path !== "/") router.replace("/");
          return;
        }

        if (path === "/" || path === "/(auth)") {
          router.replace("/(store)");
          return;
        }

        if (inAuthGroup) {
          if (path !== "/(store)") router.replace("/(store)");
          return;
        }

        if (inAdminGroup) {
          if (path !== "/(admin)") router.replace("/(admin)");
          return;
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        // setIsLoading(false);
      }
    };

    checkAuth();
  }, [path]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="(auth)"
          // options={{
          //   header: ({ navigation, route, options }) => (
          //     <Header
          //       title="로그인 / 회원가입"
          //       showBackButton={navigation.canGoBack()}
          //     />
          //   ),
          // }}
        />
        {/* <Stack.Screen name="(auth)" /> */}
        <Stack.Screen name="(store)" />
        <Stack.Screen name="(menu)/[store]" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <ToastProvider />
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
