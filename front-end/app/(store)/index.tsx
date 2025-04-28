import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import StoreCard from "./StoreCard";
import { router } from "expo-router";
import HeaderOptions from "@/components/HeaderOptions";

const StorePage = () => {
  const [selectedOption, setSelectedOption] = useState("list");

  const storeList = [
    {
      name: "중구 중림점",
      address: "서울특별시 중구 청파로 47-1, 1층(중림동)",
      distance: 47,
    },
    {
      name: "충정로역점",
      address: "서울특별시 중구 중림로 10, 상가1동 1층 104-2호(중림동)",
      distance: 325,
    },
  ];

  return (
    <View style={styles.container}>
      <HeaderOptions
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
        options={[
          { id: "list", label: "리스트로 선택" },
          { id: "map", label: "지도로 선택" },
          { id: "favorite", label: "즐겨찾기" },
        ]}
      />
      <View style={styles.content}>
        <Text>
          내 주변에 <Text style={styles.highlight}>{10}개의 매장</Text>이
          있습니다.
        </Text>
        {selectedOption === "list" && (
          <View style={styles.storeList}>
            {storeList.map((store, index) => (
              <StoreCard
                key={index}
                name={store.name}
                address={store.address}
                distance={store.distance}
                onPress={() => {
                  router.push(`/(menu)/${store.name}`);
                }}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    padding: 16,
  },
  highlight: {
    backgroundColor: "#FFD700",
  },
  storeList: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
});

export default StorePage;
