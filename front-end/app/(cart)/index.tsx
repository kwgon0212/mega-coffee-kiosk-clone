import Layout from "@/components/ui/Layout";
import { useCartStore } from "@/store/useCartStore";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "@/components/Button";
import { CartItem } from "@/type";

const CartPage = () => {
  const { cart, setQuantity, removeFromCart } = useCartStore();
  console.log(cart);
  useEffect(() => {
    // clearCart();
    if (cart.length === 0) {
      Alert.alert(
        "",
        `장바구니에 담긴 상품이 없습니다.
상품목록 화면으로 이동합니다.`,
        [
          {
            text: "확인",
            onPress: () => {
              router.push("/(menu)/중구중림점");
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [cart]);

  const getTotalPrice = (item: CartItem) => {
    return (
      (item.price +
        (item.options.shot === "샷추가" ? 600 : 0) +
        (item.options.shot === "2샷 추가" ? 1200 : 0) +
        (item.options.syrup?.length || 0) * 700 +
        (item.options.sweetener?.length || 0) * 1000 +
        (item.options.topping?.length || 0) * 700) *
      item.quantity
    );
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  return (
    <Layout>
      <ScrollView bounces={false}>
        <View style={styles.store}>
          <Text style={{ color: "white", fontSize: 20 }}>중구중림점</Text>
        </View>
        <View style={styles.cartList}>
          <Text style={styles.cartListTitle}>주문 상품</Text>
          {cart.map((item) => (
            <View
              key={`${item.id.toString()}-${JSON.stringify(item.options)}-${
                item.quantity
              }-${item.isUseTumbler}`}
              style={styles.cartListCard}
            >
              <Pressable
                style={{ position: "absolute", top: 0, right: 0, zIndex: 2 }}
                onPress={() => handleRemoveItem(item.id)}
              >
                <AntDesign name="closecircle" size={20} color="black" />
              </Pressable>
              <Image
                source={{ uri: item.image }}
                style={styles.cartListImage}
              />
              <View style={styles.cartListCardInfo}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <View>
                  {Object.keys(item.options).map((option) => (
                    <Text key={option}>
                      {item.options[option as keyof typeof item.options]
                        ? `${option} x1`
                        : ""}
                    </Text>
                  ))}
                </View>

                <View style={styles.orderContainer}>
                  <View style={styles.amountContainer}>
                    <Pressable
                      onPress={() => setQuantity(item.id, item.quantity - 1)}
                    >
                      <AntDesign name="minuscircle" size={24} color="#452613" />
                    </Pressable>
                    <Text style={{ fontSize: 16, fontWeight: "500" }}>
                      {item.quantity}
                    </Text>
                    <Pressable
                      onPress={() => setQuantity(item.id, item.quantity + 1)}
                    >
                      <AntDesign name="pluscircle" size={24} color="#452613" />
                    </Pressable>
                  </View>
                  <Text style={{ fontSize: 20, fontWeight: "700" }}>
                    {getTotalPrice(item).toLocaleString()}원
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: 20,
            backgroundColor: "#F8FAFC",
          }}
        >
          <Text>장바구니에 담은 상품은 최대 30일간 보관됩니다.</Text>
        </View>

        <View style={styles.totalPriceContainer}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>상품금액</Text>
          <Text style={{ fontSize: 20, fontWeight: "500", color: "red" }}>
            {cart
              .reduce((acc, item) => acc + getTotalPrice(item), 0)
              .toLocaleString()}{" "}
            원
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <Button
            text="주문하기"
            onPress={() => {
              router.push("/(order)");
            }}
            backgroundColor="#452613"
            color="white"
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  store: {
    backgroundColor: "black",
    padding: 20,
  },
  cartList: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    gap: 20,
  },
  cartListTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cartListImage: {
    width: 100,
    height: 100,
    borderRadius: "100%",
  },
  cartListCard: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    // justifyContent: "space-between",
  },
  cartListCardInfo: {
    flex: 1,
    gap: 10,
    // alignItems: "center",
    // justifyContent: "space-between",
  },
  orderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 20,
    backgroundColor: "white",
    boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.05)",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    backgroundColor: "white",
  },
  totalPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "white",
    boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.05)",
  },
});

export default CartPage;
