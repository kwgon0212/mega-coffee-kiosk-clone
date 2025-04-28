import { Stack } from "expo-router";
import Header from "@/components/Header";
import SearchButton from "@/components/SearchButton";

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
                <SearchButton
                  onPress={() => {
                    console.log("search store");
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
