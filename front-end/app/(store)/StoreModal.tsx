import Button from "@/components/Button";
import { router } from "expo-router";
import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { WebView } from "react-native-webview";

interface StoreModalProps {
  isVisible: boolean;
  onClose: () => void;
  store: {
    name: string;
    address: {
      zipCode: string;
      city: string;
      street: string;
      detail: string;
    };
    lat: number;
    lng: number;
  };
}

const StoreModal = ({ isVisible, onClose, store }: StoreModalProps) => {
  const defaultLocation = {
    latitude: 37.5665,
    longitude: 126.978,
  };

  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
          function handleError(error) {
            console.error('Google Maps Error:', error);
            document.getElementById('map').innerHTML = '지도를 불러오는 중 오류가 발생했습니다.';
          }
        </script>
        <script src="https://maps.googleapis.com/maps/api/js?key=${
          process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY
        }&callback=initMap" async defer onerror="handleError"></script>
        <style>
          html, body, #map {
            height: 100%;
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          function initMap() {
            try {
              console.log('Initializing map...');
              const location = { 
                lat: ${store?.lat || defaultLocation.latitude}, 
                lng: ${store?.lng || defaultLocation.longitude} 
              };
              
              console.log('Location:', location);
              
              if (!location.lat || !location.lng) {
                throw new Error('Invalid coordinates');
              }

              const mapOptions = {
                zoom: 15,
                center: location,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false
              };

              const map = new google.maps.Map(document.getElementById('map'), mapOptions);
              
              const marker = new google.maps.Marker({
                position: location,
                map: map,
                title: '${store?.name || "매장 위치"}',
                animation: google.maps.Animation.DROP
              });

              marker.addListener('click', () => {
                map.setCenter(location);
                map.setZoom(17);
              });

              console.log('Map initialized successfully');
            } catch (error) {
              console.error('Google Maps 초기화 오류:', error);
              document.getElementById('map').innerHTML = '지도를 불러오는 중 오류가 발생했습니다.';
            }
          }

          window.gm_authFailure = function() {
            console.error('Google Maps 인증 실패');
            document.getElementById('map').innerHTML = '지도를 불러오는 중 오류가 발생했습니다.';
          };
        </script>
      </body>
    </html>
  `;

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  '{store?.name || "매장"}'에서
                </Text>
                <Text style={styles.modalTitle}>주문하시겠습니까?</Text>
              </View>
              <View style={styles.mapContainer}>
                <WebView source={{ html: mapHtml }} style={styles.map} />
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{ position: "relative" }}>
                  <Text
                    style={{ color: "red", fontSize: 18, fontWeight: "bold" }}
                  >
                    주문 확인 후 취소가 불가합니다.
                  </Text>
                  <View style={styles.highlight} />
                </View>
              </View>

              <View style={styles.orderButtonContainer}>
                <Button
                  text="취소"
                  backgroundColor="#e8e4e0"
                  color="#452613"
                  style={{
                    flex: 1,
                    borderRadius: 0,
                    borderBottomLeftRadius: 10,
                  }}
                  onPress={onClose}
                />
                <Button
                  text="주문하기"
                  backgroundColor="#452613"
                  color="white"
                  style={{
                    flex: 1,
                    borderRadius: 0,
                    borderBottomRightRadius: 10,
                  }}
                  onPress={() => {
                    if (store?.name) {
                      router.push(`/(menu)/${store.name}`);
                    }
                    onClose();
                  }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    paddingTop: 20,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    gap: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalHeader: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalInfoContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
  },
  mapContainer: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  highlight: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    height: 8,
    backgroundColor: "rgba(255, 0, 0, 0.2)",
  },
  orderButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default StoreModal;
