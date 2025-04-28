import { Stack } from "expo-router";
import Header from "@/components/Header";
import SearchButton from "@/components/SearchButton";

export default function MenuLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[store]"
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
    </Stack>
  );
}
