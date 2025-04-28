import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";

const menuItems = [
  { id: 1, name: "아메리카노", price: 4000 },
  { id: 2, name: "카페라떼", price: 4500 },
  { id: 3, name: "카푸치노", price: 4500 },
  { id: 4, name: "에스프레소", price: 3500 },
];

export default function MenuPage() {
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="p-4">
        {menuItems.map((item) => (
          <Link key={item.id} href="/order" asChild>
            <TouchableOpacity className="border-b border-gray-200 py-4">
              <Text className="text-lg font-bold">{item.name}</Text>
              <Text className="text-gray-600">
                {item.price.toLocaleString()}원
              </Text>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}
