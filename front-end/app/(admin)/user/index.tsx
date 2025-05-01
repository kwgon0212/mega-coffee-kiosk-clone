import Layout from "@/components/ui/Layout";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import Button from "@/components/Button";
import UserDetailModal from "./UserDetailModal";

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

const AdminUserPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 더미 데이터
  const users: User[] = [
    {
      id: "1",
      name: "김토스",
      email: "toss@example.com",
      phoneNumber: "010-1234-5678",
      joinDate: "2024-01-01",
      lastOrder: "2024-03-15",
      orderCount: 25,
      status: "활성",
    },
    {
      id: "2",
      name: "이카카오",
      email: "kakao@example.com",
      phoneNumber: "010-8765-4321",
      joinDate: "2023-12-01",
      lastOrder: "2024-03-10",
      orderCount: 15,
      status: "휴면",
    },
  ];

  const statusFilters = ["활성", "휴면", "정지"];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.includes(searchTerm);

    const matchesStatus = !selectedStatus || user.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (userId: string, newStatus: "활성" | "정지") => {
    console.log(`사용자 ${userId}의 상태를 ${newStatus}로 변경`);
    setSelectedUser(null);
  };

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="이름, 이메일, 전화번호로 검색"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <View style={styles.filterContainer}>
              {statusFilters.map((status) => (
                <Pressable
                  key={status}
                  style={[
                    styles.filterButton,
                    selectedStatus === status && styles.filterButtonActive,
                  ]}
                  onPress={() =>
                    setSelectedStatus(selectedStatus === status ? null : status)
                  }
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      selectedStatus === status &&
                        styles.filterButtonTextActive,
                    ]}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, { flex: 1 }]}>이름</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>이메일</Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>전화번호</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>주문수</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>상태</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>관리</Text>
          </View>

          {filteredUsers.map((user) => (
            <Pressable
              key={user.id}
              style={styles.tableRow}
              onPress={() => setSelectedUser(user)}
            >
              <Text style={[styles.tableCell, { flex: 1 }]}>{user.name}</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>{user.email}</Text>
              <Text style={[styles.tableCell, { flex: 1.5 }]}>
                {user.phoneNumber}
              </Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {user.orderCount}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { flex: 1 },
                  styles[`status${user.status}` as keyof typeof styles],
                ]}
              >
                {user.status}
              </Text>
              <View style={[styles.tableCell, { flex: 1 }]}>
                <Pressable
                  onPress={() => setSelectedUser(user)}
                  style={styles.detailButton}
                >
                  <Text style={{ color: "white" }}>상세</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>

        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onStatusChange={handleStatusChange}
        />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchContainer: {
    gap: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  filterButtonActive: {
    backgroundColor: "#452613",
  },
  filterButtonText: {
    color: "#666",
  },
  filterButtonTextActive: {
    color: "white",
  },
  tableContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  tableCell: {
    paddingHorizontal: 5,
    textAlign: "center",
  },
  detailButton: {
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "#452613",
  },
  status활성: {
    color: "#4CAF50",
  },
  status휴면: {
    color: "#FFC107",
  },
  status정지: {
    color: "#FF4444",
  },
});

export default AdminUserPage;
