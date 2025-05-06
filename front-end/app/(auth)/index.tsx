import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { router } from "expo-router";
import Button from "@/components/Button";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!account || !password) {
      Alert.alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account, password, provider: "LOCAL" }),
      }
    );

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

    if (!response.ok) {
      Alert.alert(
        data.error ||
          data.message ||
          "아이디 또는 비밀번호가 일치하지 않습니다."
      );
      return;
    }

    await SecureStore.setItemAsync("accessToken", data.accessToken);
    await SecureStore.setItemAsync("refreshToken", data.refreshToken);

    await AsyncStorage.setItem("userInfo", JSON.stringify(data.userInfo));

    router.replace("/(store)");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          placeholderTextColor="#666"
          value={account}
          onChangeText={setAccount}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button text="로그인" onPress={handleLogin} />
        <Pressable
          style={styles.signup}
          onPress={() => router.push("/(auth)/signup")}
        >
          <Text>계정이 없으신가요?</Text>
          <Text
            style={{ fontSize: 14, borderBottomWidth: 1, paddingVertical: 3 }}
          >
            회원가입
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8B4513",
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    // borderColor: "#8B4513",
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
  signup: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
