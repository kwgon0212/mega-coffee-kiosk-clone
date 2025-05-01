import Header from "@/components/Header";
import { router, Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const AdminLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <Header
              title="관리자 페이지"
              rightNode={
                <Pressable onPress={() => router.replace("/(store)")}>
                  <Ionicons name="home-outline" size={20} color="black" />
                </Pressable>
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name="order/index"
        options={{
          header: () => <Header title="주문 관리" showBackButton />,
        }}
      />
      <Stack.Screen
        name="user/index"
        options={{
          header: () => <Header title="회원 관리" showBackButton />,
        }}
      />
      <Stack.Screen
        name="menu/index"
        options={{
          header: () => <Header title="메뉴 관리" showBackButton />,
        }}
      />
      <Stack.Screen
        name="statistics/index"
        options={{
          header: () => <Header title="통계" showBackButton />,
        }}
      />
    </Stack>
  );
};

export default AdminLayout;
