import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import Layout from "@/components/ui/Layout";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import InfoModal from "./InfoModal";
import Accordion from "./Accordion";
import Checkbox from "./Checkbox";
import Button from "@/components/Button";
import menuList from "@/assets/mock/menuList";

interface PersonalOption {
  shot: "연하게" | "샷추가" | "2샷 추가" | null;
  syrup: string[];
  sweetener: string[];
  topping: string[];
}

const MenuDetailPage = () => {
  const { menuId, store } = useLocalSearchParams();
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [isOpenCupAccordion, setIsOpenCupAccordion] = useState(false);
  const [isOpenPersonalAccordion, setIsOpenPersonalAccordion] = useState(false);

  const [useTumbler, setUseTumbler] = useState(false);
  const [usePersonal, setUsePersonal] = useState<PersonalOption>({
    shot: null,
    syrup: [],
    sweetener: [],
    topping: [],
  });
  const [amount, setAmount] = useState(1);

  const menu = menuList.find((menu) => menu.id === Number(menuId));

  const recommendMenu = [
    {
      id: 99,
      name: "나랑 같이 날아 츄! 우주선 빨대 텀블러",
      price: 21900,
      image:
        "https://img.79plus.co.kr/megahp/manager/upload/menu/20241023211612_1729685772681_nAZ0gCnL21.jpg",
    },
    {
      id: 100,
      name: "나랑 같이 마셔 츄! 콜드컵 키링 텀블러",
      price: 16900,
      image:
        "https://img.79plus.co.kr/megahp/manager/upload/menu/20241023211823_1729685903747_KQC1QUAgR3.jpg",
    },
    {
      id: 101,
      name: "나랑 같이 가자 츄! 하츄핑 실리콘 가방",
      price: 20400,
      image:
        "https://img.79plus.co.kr/megahp/manager/upload/menu/20241023211908_1729685948585_e8lASrT0Uy.jpg",
    },
    {
      id: 102,
      name: "나랑 같이 냠냠 츄! 로켓 멀티통",
      price: 9900,
      image:
        "https://img.79plus.co.kr/megahp/manager/upload/menu/20241023212015_1729686015557_fh9lJdKwGu.jpg",
    },
  ];

  const totalPrice =
    menu?.price * amount +
    (usePersonal.shot === "샷추가" ? 600 : 0) +
    (usePersonal.shot === "2샷 추가" ? 1200 : 0) +
    usePersonal.syrup.length * 700 +
    usePersonal.sweetener.length * 1000 +
    usePersonal.topping.length * 700;

  const togglePersonalArray = (
    key: "sweetener" | "topping" | "syrup",
    value: string
  ) => {
    setUsePersonal((prev) => {
      const arr = prev[key] || [];
      if (arr.includes(value)) {
        return { ...prev, [key]: arr.filter((v) => v !== value) };
      } else {
        return { ...prev, [key]: [...arr, value] };
      }
    });
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
              isChecked={useTumbler}
              setIsChecked={setUseTumbler}
            />
          </View>
        </Accordion>

        <Accordion
          isOpen={isOpenPersonalAccordion}
          setIsOpen={setIsOpenPersonalAccordion}
          title="퍼스널 옵션"
        >
          <View style={styles.cupContainer}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>샷선택</Text>
            <Checkbox
              label="연하게"
              isChecked={usePersonal.shot === "연하게"}
              setIsChecked={() =>
                setUsePersonal((prev) => ({
                  ...prev,
                  shot: prev.shot === "연하게" ? null : "연하게",
                }))
              }
            />
            <Checkbox
              label="샷추가 +600원"
              isChecked={usePersonal.shot === "샷추가"}
              setIsChecked={() =>
                setUsePersonal((prev) => ({
                  ...prev,
                  shot: prev.shot === "샷추가" ? null : "샷추가",
                }))
              }
            />
            <Checkbox
              label="2샷 추가 +1,200원"
              isChecked={usePersonal.shot === "2샷 추가"}
              setIsChecked={() =>
                setUsePersonal((prev) => ({
                  ...prev,
                  shot: prev.shot === "2샷 추가" ? null : "2샷 추가",
                }))
              }
            />
            <Text style={{ fontSize: 16, fontWeight: "500" }}>당도 선택</Text>
            <Checkbox
              label="바닐라시럽추가 +700원"
              isChecked={usePersonal.sweetener?.includes("바닐라시럽추가")}
              setIsChecked={() =>
                togglePersonalArray("syrup", "바닐라시럽추가")
              }
            />
            <Checkbox
              label="카라멜시럽추가 +700원"
              isChecked={usePersonal.sweetener?.includes("카라멜시럽추가")}
              setIsChecked={() =>
                togglePersonalArray("syrup", "카라멜시럽추가")
              }
            />
            <Checkbox
              label="헤이즐넛시럽추가 +700원"
              isChecked={usePersonal.sweetener?.includes("헤이즐넛시럽추가")}
              setIsChecked={() =>
                togglePersonalArray("syrup", "헤이즐넛시럽추가")
              }
            />
            <Checkbox
              label="라이트바닐라시럽추가 +1,000원"
              isChecked={usePersonal.sweetener?.includes(
                "라이트바닐라시럽추가"
              )}
              setIsChecked={() =>
                togglePersonalArray("sweetener", "라이트바닐라시럽추가")
              }
            />
            <Checkbox
              label="연유 추가 +1,000원"
              isChecked={usePersonal.sweetener?.includes("연유 추가")}
              setIsChecked={() => togglePersonalArray("sweetener", "연유 추가")}
            />
            <Checkbox
              label="꿀 추가 +1,000원"
              isChecked={usePersonal.sweetener?.includes("꿀 추가")}
              setIsChecked={() => togglePersonalArray("sweetener", "꿀 추가")}
            />
            <Checkbox
              label="저당 스테비아 추가 +800원"
              isChecked={usePersonal.sweetener?.includes("저당 스테비아 추가")}
              setIsChecked={() =>
                togglePersonalArray("sweetener", "저당 스테비아 추가")
              }
            />
            <Text style={{ fontSize: 16, fontWeight: "500" }}>토핑 선택</Text>
            <Checkbox
              label="휘핑추가 +700원"
              isChecked={usePersonal.topping?.includes("휘핑추가")}
              setIsChecked={() => togglePersonalArray("topping", "휘핑추가")}
            />
            <Checkbox
              label="타피오카펄추가 +700원"
              isChecked={usePersonal.topping?.includes("타피오카펄추가")}
              setIsChecked={() =>
                togglePersonalArray("topping", "타피오카펄추가")
              }
            />
          </View>
        </Accordion>

        <View style={styles.orderContainer}>
          <View style={styles.amountContainer}>
            <Pressable onPress={() => setAmount(amount - 1)}>
              <AntDesign name="minuscircle" size={24} color="#452613" />
            </Pressable>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>{amount}</Text>
            <Pressable onPress={() => setAmount(amount + 1)}>
              <AntDesign name="pluscircle" size={24} color="#452613" />
            </Pressable>
          </View>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>
            {totalPrice.toLocaleString()}
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
            {totalPrice.toLocaleString()} 원
          </Text>
        </View>

        <View style={styles.orderButtonContainer}>
          <Button
            text="바로 주문"
            backgroundColor="#e8e4e0"
            color="#452613"
            style={{ flex: 1 }}
          />
          <Button
            text="장바구니 담기"
            backgroundColor="#452613"
            color="white"
            style={{ flex: 1 }}
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
