import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            title: "랜딩",
          }}
        />
        <Stack.Screen
          name="menu"
          options={{
            title: "메뉴",
            headerBackTitle: "뒤로",
          }}
        />
        <Stack.Screen
          name="order"
          options={{
            title: "주문",
            headerBackTitle: "뒤로",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
