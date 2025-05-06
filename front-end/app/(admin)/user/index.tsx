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
import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  name: string;
  nickName: string;
  gender: "MALE" | "FEMALE" | null;
  phoneNumber: string | null;
  dateOfBirth: string;
  role: "ADMIN" | "USER";
}

const AdminUserPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api`);

      if (!response.ok) throw new Error("회원 정보를 가져오는데 실패했습니다.");
      const data = await response.json();
      return data;
    },
  });

  console.log("users", users);

  const filteredUsers = users.filter((user: User) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nickName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber?.includes(searchTerm) ||
      user.role === searchTerm
    );
  });

  return (
    <Layout style={{ paddingBottom: 50 }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="이름, 닉네임, 전화번호로 검색"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, { flex: 1 }]}>이름</Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>전화번호</Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>생년월일</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>관리</Text>
          </View>

          {filteredUsers.map((user: User) => (
            <Pressable
              key={user.id}
              style={styles.tableRow}
              onPress={() => setSelectedUser(user)}
            >
              <Text style={[styles.tableCell, { flex: 1 }]}>{user.name}</Text>
              <Text style={[styles.tableCell, { flex: 1.5 }]}>
                {user.phoneNumber || "-"}
              </Text>
              <Text style={[styles.tableCell, { flex: 1.5 }]}>
                {user.dateOfBirth}
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
});

export default AdminUserPage;
