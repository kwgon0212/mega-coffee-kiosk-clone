import Layout from "@/components/ui/Layout";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const AdminPage = () => {
  return (
    <Layout style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/(admin)/order")}
      >
        <Text style={styles.buttonText}>주문 관리</Text>
        <Entypo name="chevron-thin-right" size={20} color="black" />
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/(admin)/user")}
      >
        <Text style={styles.buttonText}>회원 관리</Text>
        <Entypo name="chevron-thin-right" size={20} color="black" />
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/(admin)/menu")}
      >
        <Text style={styles.buttonText}>메뉴 관리</Text>
        <Entypo name="chevron-thin-right" size={20} color="black" />
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/(admin)/statistics")}
      >
        <Text style={styles.buttonText}>통계</Text>
        <Entypo name="chevron-thin-right" size={20} color="black" />
      </Pressable>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    gap: 20,
  },
  button: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    boxShadow: "1px 1px 10px 0 rgba(0, 0, 0, 0.1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AdminPage;
