import Layout from "@/components/ui/Layout";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

const OrderListDetailPage = () => {
  const { orderId } = useLocalSearchParams();

  const fetchOrder = async (orderId: string) => {
    const userInfoItem = await AsyncStorage.getItem("userInfo");
    const userInfo = JSON.parse(userInfoItem || "{}");
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/orders/${userInfo.userId}/${orderId}` // orderId가 왜 UUID인지?
    );
    const data = await response.json();

    return data;
  };

  // const { data: order } = useQuery({
  //   queryKey: ["order", orderId],
  //   queryFn: () => fetchOrder(orderId as string),
  // });

  const order = {
    orderId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    storeName: "메가커피 강남점",
    orderNumber: 12345,
    orderTime: "2025-05-06T06:47:23.888Z",
    orderStatus: "CONFIRMED",
    orderCount: 2,
    orderMenus: [
      {
        itemName: "아메리카노",
        itemPrice: 2000,
        itemCount: 1,
        options: [
          {
            optionName: "샷 추가",
            optionPrice: 500,
          },
        ],
      },
      {
        itemName: "카페라떼",
        itemPrice: 2500,
        itemCount: 1,
        options: [
          {
            optionName: "시럽 추가",
            optionPrice: 300,
          },
        ],
      },
    ],
  };

  const totalPrice = order.orderMenus.reduce(
    (acc: number, item: any) =>
      acc +
      item.itemPrice +
      item.options.reduce(
        (acc: number, option: any) => acc + option.optionPrice,
        0
      ),
    0
  );

  return (
    <Layout>
      <ScrollView
        style={{ gap: 10, backgroundColor: "#f9fafc" }}
        // bounces={false}
      >
        <View style={{ width: "100%", alignItems: "center", gap: 20 }}>
          <View style={styles.warningContainer}>
            <Text style={styles.warningText}>
              1시간 이내에 찾아가지 않으실 경우
            </Text>
            <Text style={styles.warningText}>
              품질 및 보관 문제로 폐기 될 수 있습니다.
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
              justifyContent: "center",
              gap: 20,
              backgroundColor: "white",
            }}
          >
            <View style={{ alignItems: "center", gap: 5, paddingVertical: 10 }}>
              <Text style={{ fontWeight: "500", fontSize: 18 }}>
                {order.storeName}
              </Text>
              <Text style={{ fontWeight: "600", fontSize: 24 }}>
                주문번호 : {order.orderNumber}
              </Text>
            </View>

            <View style={{ alignItems: "center", gap: 5 }}>
              <Text style={{ fontSize: 18 }}>
                {new Date(order.orderTime).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>

            <View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  backgroundColor: "#f9fafc",
                  paddingVertical: 15,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 22, fontWeight: "800" }}>
                  {18}시 {52}분
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                  까지 제조가 완료될 예정입니다.
                </Text>
              </View>
            </View>

            <View style={styles.orderStatusbarContainer}>
              <View
                style={[
                  styles.orderStatusbar,
                  {
                    width:
                      order.orderStatus === "CONFIRMED"
                        ? "10%"
                        : order.orderStatus === "PREPARING"
                        ? "50%"
                        : "100%",
                  },
                ]}
              />
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "space-between",
                  paddingHorizontal: 5,
                }}
              >
                <Text
                  style={{
                    color: order.orderStatus === "CONFIRMED" ? "red" : "black",
                  }}
                >
                  결제완료
                </Text>
                <Text
                  style={{
                    color: order.orderStatus === "PREPARING" ? "red" : "black",
                  }}
                >
                  주문확인
                </Text>
                <Text
                  style={{
                    color: order.orderStatus === "COMPLETED" ? "red" : "black",
                  }}
                >
                  제조완료
                </Text>
              </View>
            </View>
          </View>
        </View>

        {order.orderMenus.map((item: any) => (
          <View
            style={styles.menuContainer}
            key={`${item.itemName}-${JSON.stringify(item.options)}`}
          >
            <Image
              source={{
                uri: "https://img.79plus.co.kr/megahp/manager/upload/menu/20250320000925_1742396965069_ekSqAIVc1L.jpg",
              }}
              style={styles.menuImage}
            />
            <View style={{ gap: 10, flex: 1 }}>
              <Text style={{ fontSize: 18 }}>
                {item.itemName} x{item.itemCount}
              </Text>

              <View style={{ flexDirection: "row", gap: 5 }}>
                {item.options.map((option: any) => (
                  <Text
                    style={{ fontSize: 14 }}
                    key={`${item.itemName}-${option.optionName}`}
                  >
                    {option.optionName} {option.optionPrice.toLocaleString()}원
                  </Text>
                ))}
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {(
                  item.itemPrice +
                  item.options.reduce(
                    (acc: number, option: any) => acc + option.optionPrice,
                    0
                  )
                ).toLocaleString()}
                원
              </Text>
            </View>
          </View>
        ))}

        <View style={{ padding: 20, gap: 10, backgroundColor: "white" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.subtitle}>결제수단</Text>
            <Text style={styles.price}>메가선불카드</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.subtitle}>상품금액</Text>
            <Text style={styles.price}>{totalPrice.toLocaleString()}원</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.subtitle}>할인금액</Text>
            <Text style={styles.price}>-{Number(0).toLocaleString()}원</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.subtitle}>결제금액</Text>
            <Text style={[styles.price, { color: "red", fontWeight: "bold" }]}>
              {totalPrice.toLocaleString()}원
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: 20,
            backgroundColor: "white",
            flex: 1,
          }}
        >
          <Text style={styles.subtitle}>스탬프 적립</Text>
          <Text style={styles.price}>0개</Text>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  warningContainer: {
    width: "90%",
    backgroundColor: "black",
    opacity: 0.7,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    gap: 5,
  },
  warningText: {
    color: "white",
    fontSize: 16,
  },
  orderStatusbarContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    gap: 10,
    marginVertical: 10,
  },
  orderStatusbar: {
    height: 10,
    backgroundColor: "red",
    borderRadius: 10,
  },
  menuImage: {
    width: 100,
    height: 100,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#777",
  },
  price: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default OrderListDetailPage;
