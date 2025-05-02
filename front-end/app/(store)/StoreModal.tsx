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

interface StoreModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  info: {
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
  };
}

const StoreModal = ({ isOpen, setIsOpen, info }: StoreModalProps) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isOpen}>
      <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>'{info.name}'에서</Text>
                <Text style={styles.modalTitle}>주문하시겠습니까?</Text>
              </View>
              <View style={styles.mapContainer}>
                <View
                  style={{
                    width: "100%",
                    height: 250,
                    backgroundColor: "yellow",
                  }}
                />
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
                  onPress={() => {
                    setIsOpen(false);
                  }}
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
                    router.push(`/(menu)/${info.name}`);
                    setIsOpen(false);
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
    paddingHorizontal: 20,
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
