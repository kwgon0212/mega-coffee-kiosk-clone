import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Toast, { ToastConfig } from "react-native-toast-message";

const config: ToastConfig = {
  successAddCart: () => (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>상품이 장바구니에 담겨졌습니다.</Text>
    </View>
  ),
};

const ToastProvider = () => {
  return (
    <Toast
      position="bottom"
      bottomOffset={110}
      config={config}
      visibilityTime={1000}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 16,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 50,
  },
});

export default ToastProvider;
