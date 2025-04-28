import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import HeaderOptions from "@/components/HeaderOptions";
import Feather from "@expo/vector-icons/Feather";
import MenuCard from "../MenuCard";

export default function StoreMenu() {
  const { store } = useLocalSearchParams<{ store: string }>();
  const [selectedOption, setSelectedOption] = useState("new");
  const [filter, setFilter] = useState(1);

  const menuList = [
    {
      id: 1,
      name: "라떼",
      category: "coffee",
      price: 5000,
      image: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      name: "초코라떼",
      category: "coffee",
      price: 5000,
      image: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      name: "아이스아메리카노",
      category: "coffee",
      price: 5000,
      image: "https://picsum.photos/200/300",
    },
    {
      id: 4,
      name: "핫아메리카노",
      category: "coffee",
      price: 5000,
      image: "https://picsum.photos/200/300",
    },
    {
      id: 5,
      name: "아이스초코라떼",
      category: "coffee",
      price: 5000,
      image: "https://picsum.photos/200/300",
    },
    {
      id: 6,
      name: "헛개리카노",
      category: "coffee",
      price: 5000,
      image: "https://picsum.photos/200/300",
    },
  ];

  return (
    <View style={styles.container}>
      <HeaderOptions
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
        options={[
          { id: "new", label: "신메뉴" },
          { id: "recommend", label: "추천메뉴" },
          { id: "coffee", label: "커피" },
          { id: "decaf", label: "디카페인" },
          { id: "drink", label: "음료" },
          { id: "tea", label: "티" },
          { id: "food", label: "푸드" },
          { id: "product", label: "상품" },
        ]}
      />

      <View style={styles.mainContainer}>
        <View style={styles.filter}>
          <Text>{menuList.length}개</Text>
          <TouchableOpacity
            onPress={() => setFilter((prev) => (prev === 1 ? 3 : 1))}
          >
            <Text>{filter}열보기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          {menuList.map((menu) => (
            <MenuCard
              key={menu.name}
              menu={menu}
              filter={filter === 1 ? 3 : 1}
              onPress={() => {
                router.push(`/(menu)/${store}/${menu.id}`);
              }}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{store}</Text>
        <Feather name="shopping-cart" size={24} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  filter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  mainContainer: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    rowGap: 30,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: "black",
    height: 100,
  },
  footerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
