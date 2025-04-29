import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import StoreCard from "./StoreCard";
import { router } from "expo-router";
import HeaderOptions from "@/components/HeaderOptions";
import StoreModal from "./StoreModal";

interface Store {
  name: string;
  address: string;
  distance: number;
  lat: number;
  lng: number;
}
const StorePage = () => {
  const [selectedOption, setSelectedOption] = useState("list");
  const [isOpenStoreModal, setIsOpenStoreModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const storeList = [
    {
      name: "중구 중림점",
      address: "서울특별시 중구 청파로 47-1, 1층(중림동)",
      distance: 47,
      lat: 37.5665,
      lng: 126.9783,
    },
    {
      name: "충정로역점",
      address: "서울특별시 중구 중림로 10, 상가1동 1층 104-2호(중림동)",
      distance: 325,
      lat: 37.5665,
      lng: 126.9783,
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
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.storeCount}>내 주변에 </Text>
          <View style={{ position: "relative" }}>
            <Text style={styles.storeCount}>{10}개의 매장</Text>
            <View style={styles.highlight} />
          </View>
          <Text style={styles.storeCount}>이 있습니다.</Text>
        </View>
        {selectedOption === "list" && (
          <View style={styles.storeList}>
            {storeList.map((store, index) => (
              <StoreCard
                key={index}
                name={store.name}
                address={store.address}
                distance={store.distance}
                onPress={() => {
                  // router.push(`/(menu)/${store.name}`);
                  setIsOpenStoreModal(true);
                  setSelectedStore(store);
                }}
              />
            ))}
          </View>
        )}
      </View>

      {selectedStore && (
        <StoreModal
          isOpen={isOpenStoreModal}
          setIsOpen={setIsOpenStoreModal}
          info={selectedStore}
        />
      )}
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
    width: "100%",
    height: 10,
    position: "absolute",
    bottom: -2,
    left: 0,
    opacity: 0.4,
  },
  storeList: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  storeCount: {
    fontSize: 18,
  },
});

export default StorePage;
