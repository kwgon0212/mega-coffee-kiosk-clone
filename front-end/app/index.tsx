import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function LandingPage() {
  return (
    <View className="flex flex-1 items-center justify-center bg-black">
      <Text className="text-2xl font-bold mb-8 text-red-300">
        키오스크 주문 시스템 dd
      </Text>
      <Link href="/menu" asChild>
        <TouchableOpacity className="bg-blue-500 px-6 py-3 rounded-lg">
          <Text className="text-white font-bold">주문하기</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
