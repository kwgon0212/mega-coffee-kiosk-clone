import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import Button from "@/components/Button";

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  joinDate: string;
  lastOrder: string;
  orderCount: number;
  status: "활성" | "휴면" | "정지";
}

interface UserDetailModalProps {
  user: User | null;
  onClose: () => void;
  onStatusChange?: (userId: string, newStatus: "활성" | "정지") => void;
}

const UserDetailModal = ({
  user,
  onClose,
  onStatusChange,
}: UserDetailModalProps) => {
  if (!user) return null;

  return (
    <Modal
      visible={!!user}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>회원 상세 정보</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>이름</Text>
              <Text style={styles.detailValue}>{user.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>이메일</Text>
              <Text style={styles.detailValue}>{user.email}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>전화번호</Text>
              <Text style={styles.detailValue}>{user.phoneNumber}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>가입일</Text>
              <Text style={styles.detailValue}>{user.joinDate}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>최근 주문</Text>
              <Text style={styles.detailValue}>{user.lastOrder}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>총 주문수</Text>
              <Text style={styles.detailValue}>{user.orderCount}회</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>계정 상태</Text>
              <Text style={styles.detailValue}>{user.status}</Text>
            </View>

            <View style={styles.modalActions}>
              <Button
                text="닫기"
                onPress={onClose}
                style={styles.modalButton}
                backgroundColor="#888"
              />
              <Button
                text={user.status === "정지" ? "계정 활성화" : "계정 정지"}
                style={styles.modalButton}
                backgroundColor={user.status === "정지" ? "#452613" : "#FF4444"}
                color="white"
                onPress={() =>
                  onStatusChange?.(
                    user.id,
                    user.status === "정지" ? "활성" : "정지"
                  )
                }
              />
            </View>
          </ScrollView>
        </View>
        <Pressable style={styles.modalOverlay} onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxWidth: 500,
    maxHeight: "80%",
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  detailLabel: {
    flex: 1,
    fontWeight: "500",
  },
  detailValue: {
    flex: 2,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 20,
  },
  modalButton: {
    minWidth: 100,
  },
});

export default UserDetailModal;
