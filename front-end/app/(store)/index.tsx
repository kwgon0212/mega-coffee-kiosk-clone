import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import StoreCard from "./StoreCard";
import { router } from "expo-router";
import HeaderOptions from "@/components/HeaderOptions";
import StoreModal from "./StoreModal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface Store {
  name: string;
  address: {
    zipCode: string;
    city: string;
    street: string;
    detail: string;
  };
  distance: number;
  lat: number;
  lng: number;
}
const StorePage = () => {
  const [selectedOption, setSelectedOption] = useState("list");
  const [isOpenStoreModal, setIsOpenStoreModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const [storeList, setStoreList] = useState<Store[]>([]);

  useEffect(() => {
    const fetchStoreList = async () => {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_TEST_SERVER}/store`
      );
      // const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/store`);
      const data = await response.json();
      setStoreList(data);
    };
    fetchStoreList();
  }, []);

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
                address={`${store.address.city} ${store.address.street} ${store.address.detail}`}
                distance={store.distance}
                onPress={() => {
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

      <TouchableOpacity
        style={styles.adminButton}
        onPress={() => router.push("/(admin)")}
      >
        <MaterialIcons name="admin-panel-settings" size={24} color="black" />
      </TouchableOpacity>
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
  adminButton: {
    position: "absolute",
    bottom: 50,
    right: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: "100%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default StorePage;
