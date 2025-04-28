import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function OrderPage() {
  return (
    <View className="flex-1 p-4 bg-white">
      <View className="mb-4">
        <Text className="text-xl font-bold mb-2">주문 내역</Text>
        <Text className="text-gray-600">아메리카노 1개</Text>
        <Text className="text-gray-600">총 금액: 4,000원</Text>
      </View>

      <TouchableOpacity
        className="bg-blue-500 px-6 py-3 rounded-lg items-center"
        onPress={() => router.back()}
      >
        <Text className="text-white font-bold">결제하기</Text>
      </TouchableOpacity>
    </View>
  );
}
