import { Stack } from "expo-router";
import Header from "@/components/Header";
import { Text } from "react-native";

export default function MenuLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <Header title="주문하기" showBackButton borderBottomWidth={0} />
          ),
        }}
      />
      <Stack.Screen
        name="list/index"
        options={{
          header: () => (
            <Header title="주문 내역" showBackButton borderBottomWidth={0} />
          ),
        }}
      />
      <Stack.Screen
        name="list/[orderId]/index"
        options={{
          header: () => (
            <Header
              title="주문 내역"
              showBackButton
              borderBottomWidth={0}
              rightNode={
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: "#eee",
                    borderRadius: 99,
                    width: 70,
                    textAlign: "center",
                    paddingVertical: 5,
                  }}
                >
                  전자영수증
                </Text>
              }
            />
          ),
        }}
      />
    </Stack>
  );
}
