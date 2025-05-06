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
  nickName: string;
  gender: "MALE" | "FEMALE" | null;
  phoneNumber: string | null;
  dateOfBirth: string;
  role: "ADMIN" | "USER";
}

interface UserDetailModalProps {
  user: User | null;
  onClose: () => void;
}

const UserDetailModal = ({ user, onClose }: UserDetailModalProps) => {
  if (!user) return null;

  return (
    <Modal visible={!!user} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>회원 상세 정보</Text>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>이름</Text>
              <Text style={styles.value}>{user.name}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>닉네임</Text>
              <Text style={styles.value}>{user.nickName}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>전화번호</Text>
              <Text style={styles.value}>{user.phoneNumber}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>성별</Text>
              <Text style={styles.value}>
                {user.gender === "MALE"
                  ? "남성"
                  : user.gender === "FEMALE"
                  ? "여성"
                  : "선택 안함"}
              </Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>생년월일</Text>
              <Text style={styles.value}>{user.dateOfBirth}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                text="닫기"
                onPress={onClose}
                style={styles.button}
                backgroundColor="#e8e4e0"
                color="#452613"
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "#666",
  },
  value: {
    fontSize: 18,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 20,
  },
  button: {
    flex: 1,
  },
});

export default UserDetailModal;
