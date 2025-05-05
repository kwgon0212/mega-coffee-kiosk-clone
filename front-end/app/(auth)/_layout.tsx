import { Stack } from "expo-router";
import Header from "@/components/Header";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <Header title="로그인 / 회원가입" showBackButton />,
        }}
      />
      <Stack.Screen
        name="signup/index"
        options={{
          header: () => <Header title="회원가입" showBackButton />,
        }}
      />
    </Stack>
  );
}
