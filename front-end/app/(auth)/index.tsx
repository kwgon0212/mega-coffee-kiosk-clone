import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { router } from "expo-router";
import Button from "@/components/Button";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#666"
          secureTextEntry
        />
        <Button text="로그인" onPress={() => router.replace("/(store)")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8B4513",
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#8B4513",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
});
