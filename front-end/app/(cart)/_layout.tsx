import { Stack } from "expo-router";
import Header from "@/components/Header";

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
    </Stack>
  );
}
