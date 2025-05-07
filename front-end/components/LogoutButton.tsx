import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const LogoutButton = () => {
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await AsyncStorage.removeItem("userInfo");

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/logout`
    );
    const data = await response.json();
    console.log(data);
    router.replace("/");
  };

  return (
    <Pressable onPress={handleLogout}>
      <MaterialIcons name="logout" size={24} color="black" />
    </Pressable>
  );
};

export default LogoutButton;
