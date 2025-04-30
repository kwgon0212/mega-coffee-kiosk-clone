import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Layout from "@/components/ui/Layout";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import InfoModal from "./InfoModal";
import Accordion from "./Accordion";
import Checkbox from "./Checkbox";
import Button from "@/components/Button";
import menuList from "@/assets/mock/menuList";
import { useCartStore } from "@/store/useCartStore";
import Toast from "react-native-toast-message";
import recommendMenu from "@/assets/mock/recommendedMenu";
import { CartItem } from "@/type";

interface PersonalOption {
  shot: "연하게" | "샷추가" | "2샷 추가" | null;
  syrup: string[];
  sweetener: string[];
  topping: string[];
}

const MenuDetailPage = () => {
  const { menuId, store } = useLocalSearchParams() as {
    menuId: string;
    store: string;
  };
  const { addToCart } = useCartStore();

  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [isOpenCupAccordion, setIsOpenCupAccordion] = useState(false);
  const [isOpenPersonalAccordion, setIsOpenPersonalAccordion] = useState(false);

  const [isUseTumbler, setIsUseTumbler] = useState(false);
  const [isUsePersonal, setIsUsePersonal] = useState<PersonalOption>({
    shot: null,
    syrup: [],
    sweetener: [],
    topping: [],
  });
  const [quantity, setQuantity] = useState(1);

  console.log(isUsePersonal);
  const menu = menuList.find((menu) => menu.id === Number(menuId))!;

  const totalPrice =
    menu?.price +
    (isUsePersonal.shot === "샷추가" ? 600 : 0) +
    (isUsePersonal.shot === "2샷 추가" ? 1200 : 0) +
    isUsePersonal.syrup.length * 700 +
    isUsePersonal.sweetener.length * 1000 +
    isUsePersonal.topping.length * 700;

  const togglePersonalArray = (
    key: "sweetener" | "topping" | "syrup",
    value: string
  ) => {
    setIsUsePersonal((prev) => {
      const arr = prev[key] || [];
      if (arr.includes(value)) {
        return { ...prev, [key]: arr.filter((v) => v !== value) };
      } else {
        return { ...prev, [key]: [...arr, value] };
      }
    });
  };

  const resetState = () => {
    setIsUseTumbler(false);
    setIsUsePersonal({
      shot: null,
      syrup: [],
      sweetener: [],
      topping: [],
    });
    setQuantity(1);
    setIsOpenCupAccordion(false);
    setIsOpenPersonalAccordion(false);
    setIsOpenInfoModal(false);
  };

  const handleOrder = () => {
    const cartItem: CartItem = {
      id: menu.id,
      store,
      name: menu.name,
      quantity,
      price: menu.price,
      image: menu.image,
      isUseTumbler,
      options: { ...isUsePersonal },
    };
    addToCart(cartItem);
    router.push("/cart");
    resetState();
  };

  const handleAddToCart = () => {
    Toast.show({ type: "successAddCart" });
    const cartItem: CartItem = {
      id: menu.id,
      store,
      name: menu.name,
      quantity,
      price: menu.price,
      image: menu.image,
      isUseTumbler,
      options: { ...isUsePersonal },
    };
    addToCart(cartItem);
    resetState();
  };

  return (
    <ScrollView bounces={false}>
      <Layout style={{ gap: 10, backgroundColor: "#F8FAFC" }}>
        <Pressable
          style={styles.imageContainer}
          onPress={() => setIsOpenInfoModal(true)}
        >
          <View>
            <Image source={{ uri: menu?.image }} style={styles.image} />
            <MaterialCommunityIcons
              style={{
                position: "absolute",
                right: -10,
                bottom: 0,
                backgroundColor: "#888",
                padding: 4,
                borderRadius: "100%",
              }}
              name="plus-box-multiple-outline"
              size={16}
              color="white"
            />
          </View>
          <Text style={styles.name}>{menu?.name}</Text>
          <Text style={styles.description}>{menu?.description}</Text>
        </Pressable>

        <Pressable
          style={styles.infoContainer}
          onPress={() => setIsOpenInfoModal(true)}
        >
          <Text style={styles.infoTitle}>제품 상세 정보</Text>
          <Entypo name="chevron-thin-right" size={20} color="black" />
        </Pressable>

        <Accordion
          isOpen={isOpenCupAccordion}
          setIsOpen={setIsOpenCupAccordion}
          title="컵 선택"
        >
          <View style={styles.cupContainer}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              개인 텀블러 사용
            </Text>
            <Checkbox
              label="텀블러(개인컵) 사용"
              isChecked={isUseTumbler}
              setIsChecked={setIsUseTumbler}
            />
          </View>
        </Accordion>

        <Accordion
          isOpen={isOpenPersonalAccordion}
          setIsOpen={setIsOpenPersonalAccordion}
          title="퍼스널 옵션"
        >
          <View style={styles.cupContainer}>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>샷선택</Text>
            <Checkbox
              label="연하게"
              isChecked={isUsePersonal.shot === "연하게"}
              setIsChecked={() =>
                setIsUsePersonal((prev) => ({
                  ...prev,
                  shot: prev.shot === "연하게" ? null : "연하게",
                }))
              }
            />
            <Checkbox
              label="샷추가 +600원"
              isChecked={isUsePersonal.shot === "샷추가"}
              setIsChecked={() =>
                setIsUsePersonal((prev) => ({
                  ...prev,
                  shot: prev.shot === "샷추가" ? null : "샷추가",
                }))
              }
            />
            <Checkbox
              label="2샷 추가 +1,200원"
              isChecked={isUsePersonal.shot === "2샷 추가"}
              setIsChecked={() =>
                setIsUsePersonal((prev) => ({
                  ...prev,
                  shot: prev.shot === "2샷 추가" ? null : "2샷 추가",
                }))
              }
            />
            <Text style={{ fontSize: 18, fontWeight: "500" }}>당도 선택</Text>
            <Checkbox
              label="바닐라시럽추가 +700원"
              isChecked={isUsePersonal.sweetener?.includes("바닐라시럽추가")}
              setIsChecked={() =>
                togglePersonalArray("syrup", "바닐라시럽추가")
              }
            />
            <Checkbox
              label="카라멜시럽추가 +700원"
              isChecked={isUsePersonal.sweetener?.includes("카라멜시럽추가")}
              setIsChecked={() =>
                togglePersonalArray("syrup", "카라멜시럽추가")
              }
            />
            <Checkbox
              label="헤이즐넛시럽추가 +700원"
              isChecked={isUsePersonal.sweetener?.includes("헤이즐넛시럽추가")}
              setIsChecked={() =>
                togglePersonalArray("syrup", "헤이즐넛시럽추가")
              }
            />
            <Checkbox
              label="라이트바닐라시럽추가 +1,000원"
              isChecked={isUsePersonal.sweetener?.includes(
                "라이트바닐라시럽추가"
              )}
              setIsChecked={() =>
                togglePersonalArray("sweetener", "라이트바닐라시럽추가")
              }
            />
            <Checkbox
              label="연유 추가 +1,000원"
              isChecked={isUsePersonal.sweetener?.includes("연유 추가")}
              setIsChecked={() => togglePersonalArray("sweetener", "연유 추가")}
            />
            <Checkbox
              label="꿀 추가 +1,000원"
              isChecked={isUsePersonal.sweetener?.includes("꿀 추가")}
              setIsChecked={() => togglePersonalArray("sweetener", "꿀 추가")}
            />
            <Checkbox
              label="저당 스테비아 추가 +800원"
              isChecked={isUsePersonal.sweetener?.includes(
                "저당 스테비아 추가"
              )}
              setIsChecked={() =>
                togglePersonalArray("sweetener", "저당 스테비아 추가")
              }
            />
            <Text style={{ fontSize: 18, fontWeight: "500" }}>토핑 선택</Text>
            <Checkbox
              label="휘핑추가 +700원"
              isChecked={isUsePersonal.topping?.includes("휘핑추가")}
              setIsChecked={() => togglePersonalArray("topping", "휘핑추가")}
            />
            <Checkbox
              label="타피오카펄추가 +700원"
              isChecked={isUsePersonal.topping?.includes("타피오카펄추가")}
              setIsChecked={() =>
                togglePersonalArray("topping", "타피오카펄추가")
              }
            />
          </View>
        </Accordion>

        <View style={styles.orderContainer}>
          <View style={styles.amountContainer}>
            <Pressable onPress={() => setQuantity(quantity - 1)}>
              <AntDesign name="minuscircle" size={24} color="#452613" />
            </Pressable>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>{quantity}</Text>
            <Pressable onPress={() => setQuantity(quantity + 1)}>
              <AntDesign name="pluscircle" size={24} color="#452613" />
            </Pressable>
          </View>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>
            {(totalPrice * quantity).toLocaleString()}
          </Text>
        </View>

        <View style={styles.recommendContainer}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>추천 메뉴</Text>
          <View style={styles.recommendMenuContainer}>
            {recommendMenu.map((menu) => (
              <View
                key={menu.id}
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  source={{ uri: menu.image }}
                  style={styles.recommendMenuImage}
                />
                <View style={{ flexDirection: "column", gap: 10, flex: 1 }}>
                  <Text style={{ fontSize: 16 }}>{menu.name}</Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {menu.price.toLocaleString()}원
                  </Text>
                </View>
                <Checkbox isChecked={false} setIsChecked={() => {}} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.totalPriceContainer}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>상품금액</Text>
          <Text style={{ fontSize: 20, fontWeight: "500", color: "red" }}>
            {(totalPrice * quantity).toLocaleString()} 원
          </Text>
        </View>

        <View style={styles.orderButtonContainer}>
          <Button
            text="바로 주문"
            backgroundColor="#e8e4e0"
            color="#452613"
            style={{ flex: 1 }}
            onPress={handleOrder}
          />
          <Button
            text="장바구니 담기"
            backgroundColor="#452613"
            color="white"
            style={{ flex: 1 }}
            onPress={handleAddToCart}
          />
        </View>
      </Layout>

      <InfoModal
        isOpen={isOpenInfoModal}
        setIsOpen={setIsOpenInfoModal}
        info={menu?.info}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "gray",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    gap: 10,
    backgroundColor: "white",
    boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.05)",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cupContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    backgroundColor: "white",
  },
  orderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
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
  orderButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  totalPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "white",
    boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.05)",
  },
  recommendContainer: {
    gap: 10,
    padding: 20,
    backgroundColor: "white",
    boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.05)",
  },
  recommendMenuContainer: {
    gap: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  recommendMenuImage: {
    width: 100,
    height: 100,
  },
});

export default MenuDetailPage;
