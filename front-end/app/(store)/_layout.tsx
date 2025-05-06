import { router, Stack } from "expo-router";
import Header from "@/components/Header";
import SearchButton from "@/components/SearchButton";
import { View } from "react-native";
import OrderListButton from "@/components/OrderListButton";

export default function StoreLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <Header
              title="매장 선택"
              borderBottomWidth={0}
              rightNode={
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <SearchButton
                    onPress={() => {
                      console.log("search store");
                    }}
                  />
                  <OrderListButton
                    onPress={() => {
                      router.push("/(order)/list");
                    }}
                  />
                </View>
              }
            />
          ),
        }}
      />
    </Stack>
  );
}
