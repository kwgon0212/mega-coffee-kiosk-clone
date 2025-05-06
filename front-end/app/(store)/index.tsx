import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import StoreCard from "./StoreCard";
import { router } from "expo-router";
import HeaderOptions from "@/components/HeaderOptions";
import StoreModal from "./StoreModal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as SecureStore from "expo-secure-store";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

interface Store {
  name: string;
  address: {
    zipCode: string;
    city: string;
    street: string;
    detail: string;
  };
  lat: number;
  lng: number;
}

const StorePage = () => {
  const [selectedOption, setSelectedOption] = useState("list");
  const [isOpenStoreModal, setIsOpenStoreModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [storeList, setStoreList] = useState<Store[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const mapRef = useRef<MapView>(null);
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  // 모든 매장이 보이도록 지도 영역 조정
  const fitMapToMarkers = () => {
    if (!storeList.length || !mapRef.current) return;

    const coordinates = storeList.map((store) => ({
      latitude: store.lat,
      longitude: store.lng,
    }));

    const minLat = Math.min(...coordinates.map((coord) => coord.latitude));
    const maxLat = Math.max(...coordinates.map((coord) => coord.latitude));
    const minLng = Math.min(...coordinates.map((coord) => coord.longitude));
    const maxLng = Math.max(...coordinates.map((coord) => coord.longitude));

    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;
    const latitudeDelta = (maxLat - minLat) * 1.5; // 여유 공간을 위해 1.5배
    const longitudeDelta = (maxLng - minLng) * 1.5;

    setInitialRegion({
      latitude: centerLat,
      longitude: centerLng,
      latitudeDelta,
      longitudeDelta,
    });

    mapRef.current.fitToCoordinates(coordinates, {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  };

  // 현재 위치 가져오기
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "위치 권한이 필요합니다",
            "매장과의 거리를 계산하기 위해 위치 권한이 필요합니다."
          );
          return;
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        // 지도가 준비되었다면 현재 위치로 이동
        if (mapRef.current && isMapReady) {
          mapRef.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      } catch (error) {
        console.error("위치 가져오기 오류:", error);
        Alert.alert("오류", "현재 위치를 가져오는데 실패했습니다.");
      }
    })();
  }, [isMapReady]);

  // 매장 목록이 변경되면 지도 영역 조정
  useEffect(() => {
    if (storeList.length > 0) {
      fitMapToMarkers();
    }
  }, [storeList]);

  // 두 지점 간의 거리 계산 (Haversine 공식)
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371e3; // 지구의 반경 (미터)
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // 미터 단위로 반환
  };

  useEffect(() => {
    const fetchIsAdmin = async () => {
      const accessToken = await SecureStore.getItemAsync("accessToken");

      const res = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/auth/check/admin`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      // setIsAdmin(data.isAdmin);
    };
    fetchIsAdmin();
  }, []);

  useEffect(() => {
    const fetchStoreList = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_TEST_SERVER}/store`
        );
        const data = await response.json();
        setStoreList(data);

        // 매장 데이터를 받아오면 바로 지도 영역 설정
        if (data.length > 0) {
          const coordinates = data.map((store: Store) => ({
            latitude: store.lat,
            longitude: store.lng,
          }));

          const minLat = Math.min(
            ...coordinates.map(
              (coord: { latitude: number; longitude: number }) => coord.latitude
            )
          );
          const maxLat = Math.max(
            ...coordinates.map(
              (coord: { latitude: number; longitude: number }) => coord.latitude
            )
          );
          const minLng = Math.min(
            ...coordinates.map(
              (coord: { latitude: number; longitude: number }) =>
                coord.longitude
            )
          );
          const maxLng = Math.max(
            ...coordinates.map(
              (coord: { latitude: number; longitude: number }) =>
                coord.longitude
            )
          );

          const centerLat = (minLat + maxLat) / 2;
          const centerLng = (minLng + maxLng) / 2;
          const latitudeDelta = (maxLat - minLat) * 1.5;
          const longitudeDelta = (maxLng - minLng) * 1.5;

          setInitialRegion({
            latitude: centerLat,
            longitude: centerLng,
            latitudeDelta,
            longitudeDelta,
          });
        }
      } catch (error) {
        console.error("매장 목록 가져오기 오류:", error);
        Alert.alert("오류", "매장 목록을 가져오는데 실패했습니다.");
      }
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
            <Text style={styles.storeCount}>{storeList.length}개의 매장</Text>
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
                distance={
                  currentLocation
                    ? calculateDistance(
                        currentLocation.latitude,
                        currentLocation.longitude,
                        store.lat,
                        store.lng
                      )
                    : 0
                }
                onPress={() => {
                  setIsOpenStoreModal(true);
                  setSelectedStore(store);
                }}
              />
            ))}
          </View>
        )}

        {selectedOption === "map" && initialRegion && (
          <View style={styles.mapContainer}>
            <MapView
              ref={mapRef}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={initialRegion}
              onMapReady={() => setIsMapReady(true)}
            >
              {storeList.map((store, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: store.lat,
                    longitude: store.lng,
                  }}
                  title={store.name}
                  description={`${store.address.city} ${store.address.street}`}
                  onPress={() => {
                    setIsOpenStoreModal(true);
                    setSelectedStore(store);
                  }}
                />
              ))}
            </MapView>
          </View>
        )}
      </View>

      {selectedStore && (
        <StoreModal
          isVisible={isOpenStoreModal}
          onClose={() => setIsOpenStoreModal(false)}
          store={selectedStore}
        />
      )}

      {isAdmin && (
        <TouchableOpacity
          style={styles.adminButton}
          onPress={() => router.push("/(admin)")}
        >
          <MaterialIcons name="admin-panel-settings" size={24} color="black" />
        </TouchableOpacity>
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
  mapContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    width: Dimensions.get("window").width - 32,
    height: "100%",
  },
});

export default StorePage;
