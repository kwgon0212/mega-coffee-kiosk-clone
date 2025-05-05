import { MenuItemDetail } from "@/type";
import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

interface InfoModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  info: MenuItemDetail;
}

const InfoModal = ({ isOpen, setIsOpen, info }: InfoModalProps) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isOpen}>
      <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>제품영양정보</Text>
                <Text style={styles.modalSubTitle}>(oz / g) 기준</Text>
              </View>
              <View style={styles.modalInfoContainer}>
                <View style={styles.modalInfoItem}>
                  <Text style={styles.modalInfoItemTitle}>칼로리(Kcal)</Text>
                  <Text style={styles.modalInfoItemValue}>
                    {info.detailKcal}
                  </Text>
                </View>
                <View style={styles.modalInfoItem}>
                  <Text style={styles.modalInfoItemTitle}>나트륨(mg)</Text>
                  <Text style={styles.modalInfoItemValue}>{info.detailNa}</Text>
                </View>
                <View style={styles.modalInfoItem}>
                  <Text style={styles.modalInfoItemTitle}>탄수화물(g)</Text>
                  <Text style={styles.modalInfoItemValue}>
                    {info.detailGain}
                  </Text>
                </View>
                <View style={styles.modalInfoItem}>
                  <Text style={styles.modalInfoItemTitle}>당류(g)</Text>
                  <Text style={styles.modalInfoItemValue}>
                    {info.detailSugar}
                  </Text>
                </View>
                <View style={styles.modalInfoItem}>
                  <Text style={styles.modalInfoItemTitle}>포화지방(g)</Text>
                  <Text style={styles.modalInfoItemValue}>
                    {info.detailSatfat}
                  </Text>
                </View>
                <View style={styles.modalInfoItem}>
                  <Text style={styles.modalInfoItemTitle}>트랜스지방(g)</Text>
                  <Text style={styles.modalInfoItemValue}>
                    {info.detailTransfat}
                  </Text>
                </View>
                <View style={styles.modalInfoItem}>
                  <Text style={styles.modalInfoItemTitle}>단백질(g)</Text>
                  <Text style={styles.modalInfoItemValue}>
                    {info.detailProtein}
                  </Text>
                </View>
                <View style={styles.modalInfoItem}>
                  <Text style={styles.modalInfoItemTitle}>카페인(mg)</Text>
                  <Text style={styles.modalInfoItemValue}>
                    {info.detailCaffeine}
                  </Text>
                </View>
                {/* <View style={[styles.modalInfoItem]}>
                  <Text style={styles.modalInfoItemTitle}>
                    알레르기 유발 성분
                  </Text>
                  <Text style={styles.modalInfoItemValue}>
                    {info.allergy.join(", ")}
                  </Text>
                </View> */}
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
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    gap: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalSubTitle: {
    fontSize: 16,
    color: "gray",
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
  modalInfoItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalInfoItemTitle: {
    fontSize: 18,
  },
  modalInfoItemValue: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default InfoModal;
