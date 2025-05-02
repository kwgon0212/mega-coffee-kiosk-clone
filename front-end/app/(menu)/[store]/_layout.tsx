import { Stack } from "expo-router";
import Header from "@/components/Header";
import SearchButton from "@/components/SearchButton";
import CartButton from "@/components/CartButton";

export default function MenuLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <Header
              title="주문하기"
              showBackButton
              borderBottomWidth={0}
              rightNode={
                <SearchButton
                  onPress={() => {
                    console.log("search menu");
                  }}
                />
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name="[menuId]/index"
        options={{
          header: () => (
            <Header
              showBackButton
              borderBottomWidth={0}
              rightNode={<CartButton />}
            />
          ),
        }}
      />
    </Stack>
  );
}
