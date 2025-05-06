import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import Button from "@/components/Button";
import { useCartStore } from "@/store/useCartStore";
import Toast from "react-native-toast-message";
import recommendMenu from "@/assets/mock/recommendedMenu";
import { CartItem, Menu, MenuItem } from "@/type";
import Accordion from "@/components/Accordion";
import Checkbox from "@/components/Checkbox";
import { useQuery } from "@tanstack/react-query";

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
  const [isUsePersonal, setIsUsePersonal] = useState<Record<string, boolean>>(
    {}
  );
  const [selectedShot, setSelectedShot] = useState<string | null>(null);

  const [optionState, setOptionState] = useState<Record<string, boolean>>({});

  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const fetchMenuData = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/menus/item/${menuId}`
    );
    const data = await response.json();
    return data;
  };

  const {
    data: menu,
    isLoading,
    error,
  } = useQuery<MenuItem>({
    queryKey: ["menu", menuId],
    queryFn: () => fetchMenuData(),
  });

  // 옵션 선택 상태 초기화
  useEffect(() => {
    if (menu) {
      setIsUsePersonal(
        menu.optionCategories.reduce((acc, category) => {
          category.options.forEach((option) => {
            acc[option.optionName] = false;
          });
          return acc;
        }, {} as Record<string, boolean>)
      );
      setTotalPrice(menu.itemPrice);
      setSelectedShot(null);
    }
  }, [menu]);

  const cupCategory = useMemo(
    () =>
      menu?.optionCategories.find(
        (category) => category.categoryName === "컵 선택"
      ),
    [menu]
  );

  const otherCategories = useMemo(
    () =>
      menu?.optionCategories.filter(
        (category) => category.categoryName !== "컵 선택"
      ),
    [menu]
  );

  // 가격 계산
  useEffect(() => {
    if (!menu) return;

    let price = menu.itemPrice;

    // 컵 선택 옵션 가격
    if (cupCategory && isUseTumbler) {
      const cupOption = cupCategory.options[0];
      if (cupOption && cupOption.optionPrice) {
        price += cupOption.optionPrice;
      }
    }

    // 나머지 옵션 가격
    otherCategories?.forEach((category, catIdx) => {
      if (category.categoryName === "샷 선택") {
        // 샷 선택 카테고리의 경우 선택된 옵션만 가격 추가
        if (selectedShot) {
          const selectedOption = category.options.find(
            (opt) => opt.optionName === selectedShot
          );
          if (selectedOption && selectedOption.optionPrice) {
            price += selectedOption.optionPrice;
          }
        }
      } else {
        // 다른 카테고리는 기존 로직대로 처리
        category.options.forEach((option) => {
          if (optionState[option.optionName]) {
            price += option.optionPrice;
          }
        });
      }
    });

    setTotalPrice(price);
  }, [
    isUseTumbler,
    isUsePersonal,
    selectedShot,
    menu,
    cupCategory,
    otherCategories,
    optionState,
  ]);

  const resetState = () => {
    if (!menu) return;

    setIsUseTumbler(false);
    setIsUsePersonal(
      menu.optionCategories.reduce((acc, category) => {
        category.options.forEach((option) => {
          acc[option.optionName] = false;
        });
        return acc;
      }, {} as Record<string, boolean>)
    );
    setOptionState({});
    setSelectedShot(null);
    setQuantity(1);
    setTotalPrice(0);
    setIsOpenCupAccordion(false);
    setIsOpenPersonalAccordion(false);
    setIsOpenInfoModal(false);
  };

  const handleOrder = () => {
    if (!menu) return;

    const selectedOptions = Object.entries(optionState)
      .filter(([_, checked]) => checked)
      .map(([optionName]) => {
        const found = menu.optionCategories
          .flatMap((cat) => cat.options)
          .find((opt) => opt.optionName === optionName);
        return found
          ? { optionName: found.optionName, optionPrice: found.optionPrice }
          : null;
      })
      .filter(
        (v): v is { optionName: string; optionPrice: number } => v !== null
      );

    const cartItem: CartItem = {
      id: Number(menuId),
      store,
      name: menu.itemName,
      quantity,
      image: menu.itemPictureUrl || "",
      isUseTumbler,
      selectedShot,
      options: selectedOptions,
      price: menu.itemPrice,
      perTotalPrice: totalPrice,
      createdCartItemAt: new Date(),
      itemMakeTime: menu.itemMakeTime,
    };
    addToCart(cartItem);
    resetState();
    router.push("/cart");
  };

  const handleAddToCart = () => {
    if (!menu) return;

    Toast.show({ type: "successAddCart" });
    const selectedOptions = Object.entries(optionState)
      .filter(([_, checked]) => checked)
      .map(([optionName]) => {
        const found = menu.optionCategories
          .flatMap((cat) => cat.options)
          .find((opt) => opt.optionName === optionName);
        return found
          ? { optionName: found.optionName, optionPrice: found.optionPrice }
          : null;
      })
      .filter(
        (v): v is { optionName: string; optionPrice: number } => v !== null
      );

    const cartItem: CartItem = {
      id: Number(menuId),
      store,
      name: menu.itemName,
      quantity,
      image: menu.itemPictureUrl || "",
      isUseTumbler,
      selectedShot,
      options: selectedOptions,
      price: menu.itemPrice,
      perTotalPrice: totalPrice,
      createdCartItemAt: new Date(),
      itemMakeTime: menu.itemMakeTime,
    };
    addToCart(cartItem);
    resetState();
  };

  if (isLoading || !menu) {
    return (
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>메뉴 정보를 불러오는 중입니다.</Text>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>메뉴 정보를 불러오는 중 오류가 발생했습니다.</Text>
      </Layout>
    );
  }

  return (
    <ScrollView bounces={false}>
      <Layout style={{ gap: 10, backgroundColor: "#F8FAFC" }}>
        <Pressable
          style={styles.imageContainer}
          onPress={() => setIsOpenInfoModal(true)}
        >
          <View>
            <Image source={{ uri: menu.itemPictureUrl }} style={styles.image} />
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
          <Text style={styles.name}>{menu.itemName}</Text>
          <Text style={styles.description}>{menu.itemMenuDetail}</Text>
        </Pressable>
        <Pressable
          style={styles.infoContainer}
          onPress={() => setIsOpenInfoModal(true)}
        >
          <Text style={styles.infoTitle}>제품 상세 정보</Text>
          <Entypo name="chevron-thin-right" size={20} color="black" />
        </Pressable>

        {cupCategory && (
          <Accordion
            isOpen={isOpenCupAccordion}
            setIsOpen={setIsOpenCupAccordion}
            title="컵 선택"
          >
            <View style={styles.cupContainer}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {cupCategory.options[0]?.optionName}
              </Text>
              <Checkbox
                label={cupCategory.options[0]?.optionName}
                isChecked={isUseTumbler}
                setIsChecked={setIsUseTumbler}
              />
            </View>
          </Accordion>
        )}

        <Accordion
          isOpen={isOpenPersonalAccordion}
          setIsOpen={setIsOpenPersonalAccordion}
          title="퍼스널 옵션"
        >
          <View style={styles.cupContainer}>
            {otherCategories?.map((category, catIdx) => (
              <View key={category.categoryName}>
                <Text style={{ fontSize: 18, fontWeight: "500" }}>
                  {category.categoryName}
                </Text>
                {category.options.map((option) =>
                  category.categoryName === "샷 선택" ? (
                    <Checkbox
                      key={option.optionName}
                      label={option.optionName}
                      isChecked={selectedShot === option.optionName}
                      disabled={!option.optionAvailable}
                      setIsChecked={(isChecked) => {
                        if (isChecked) {
                          setSelectedShot(option.optionName);
                        } else {
                          setSelectedShot(null);
                        }
                      }}
                    />
                  ) : (
                    <Checkbox
                      key={option.optionName}
                      label={
                        option.optionName +
                        `${!option.optionAvailable ? " [품절]" : ""}`
                      }
                      isChecked={optionState[option.optionName] || false}
                      disabled={!option.optionAvailable}
                      setIsChecked={(isChecked) =>
                        setOptionState((prev: any) => {
                          if (isChecked) {
                            return { ...prev, [option.optionName]: true };
                          } else {
                            const { [option.optionName]: _, ...rest } = prev;
                            return rest;
                          }
                        })
                      }
                    />
                  )
                )}
              </View>
            ))}
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

      {menu && (
        <InfoModal
          isOpen={isOpenInfoModal}
          setIsOpen={setIsOpenInfoModal}
          info={menu.detail}
        />
      )}
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
