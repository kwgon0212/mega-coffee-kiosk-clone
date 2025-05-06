import { Pressable, View, Text, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useCartStore } from "@/store/useCartStore";
import { router } from "expo-router";

const CartButton = ({ color = "black" }: { color?: string }) => {
  const { count } = useCartStore();

  const handlePressCart = () => {
    router.replace("/(cart)");
  };

  return (
    <Pressable onPress={handlePressCart}>
      <Feather name="shopping-cart" size={24} color={color} />
      <View style={styles.count}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>
          {count}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  count: {
    position: "absolute",
    top: -8,
    right: -12,
    width: 20,
    height: 12,
    backgroundColor: "red",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CartButton;
