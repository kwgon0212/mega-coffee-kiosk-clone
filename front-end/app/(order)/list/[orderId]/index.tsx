import Layout from "@/components/ui/Layout";
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

interface OrderMenu {
  itemName: string;
  itemPrice: number;
  itemCount: number;
  options: {
    optionName: string;
    optionPrice: number;
  }[];
}

interface Order {
  orderId: string;
  storeName: string;
  orderNumber: number;
  orderTime: string;
  orderStatus: "CONFIRMED" | "COMPLETED";
  orderCount: number;
  orderMenus: OrderMenu[];
}

const OrderListDetailPage = () => {
  const { orderId } = useLocalSearchParams();

  const fetchOrder = async () => {
    const userInfoItem = await AsyncStorage.getItem("userInfo");
    const userInfo = JSON.parse(userInfoItem || "{}");
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/orders/${userInfo.userId}/${orderId}`
    );
    const data = await response.json();
    return data;
  };

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: ["order", orderId],
    queryFn: fetchOrder,
    select: (res: any) => res.data,
  });

  if (isLoading || !order) {
    return (
      <Layout>
        <View style={styles.loadingContainer}>
          <Text>로딩 중...</Text>
        </View>
      </Layout>
    );
  }

  const totalPrice = order.orderMenus.reduce(
    (acc, item) =>
      acc +
      item.itemPrice * item.itemCount +
      item.options.reduce(
        (optAcc, option) => optAcc + option.optionPrice * item.itemCount,
        0
      ),
    0
  );

  const getExpectedTime = () => {
    const orderTime = new Date(order.orderTime);
    const expectedTime = new Date(orderTime.getTime() + 15 * 60000); // 15분 후
    return {
      hour: expectedTime.getHours(),
      minute: expectedTime.getMinutes(),
    };
  };

  const expectedTime = getExpectedTime();

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            1시간 이내에 찾아가지 않으실 경우
          </Text>
          <Text style={styles.warningText}>
            품질 및 보관 문제로 폐기 될 수 있습니다.
          </Text>
        </View>

        <View style={styles.orderInfoContainer}>
          <View style={styles.storeInfo}>
            <Text style={styles.storeName}>{order.storeName}</Text>
            <Text style={styles.orderNumber}>
              주문번호 : {order.orderNumber}
            </Text>
          </View>

          <Text style={styles.orderTime}>
            {new Date(order.orderTime).toLocaleString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>

          <View style={styles.expectedTimeContainer}>
            <Text style={styles.expectedTimeText}>
              {expectedTime.hour}시 {expectedTime.minute}분
            </Text>
            <Text style={styles.expectedTimeSubText}>
              까지 제조가 완료될 예정입니다.
            </Text>
          </View>

          <View style={styles.orderStatusbarContainer}>
            <View
              style={[
                styles.orderStatusbar,
                {
                  width: order.orderStatus === "CONFIRMED" ? "50%" : "100%",
                },
              ]}
            />
            <View style={styles.statusTextContainer}>
              <Text
                style={[
                  styles.statusText,
                  order.orderStatus === "CONFIRMED" && styles.activeStatus,
                ]}
              >
                결제완료
              </Text>
              <Text
                style={[
                  styles.statusText,
                  order.orderStatus === "CONFIRMED" && styles.activeStatus,
                ]}
              >
                주문확인
              </Text>
              <Text
                style={[
                  styles.statusText,
                  order.orderStatus === "COMPLETED" && styles.activeStatus,
                ]}
              >
                제조완료
              </Text>
            </View>
          </View>
        </View>

        {order.orderMenus.map((item, index) => (
          <View
            style={styles.menuContainer}
            key={`${item.itemName}-${item.itemCount}-${item.options
              .map((opt) => opt.optionName)
              .join("-")}-${index}`}
          >
            <Image
              source={{
                uri: "https://img.79plus.co.kr/megahp/manager/upload/menu/20250320000925_1742396965069_ekSqAIVc1L.jpg",
              }}
              style={styles.menuImage}
            />
            <View style={styles.menuInfo}>
              <Text style={styles.menuName}>
                {item.itemName} x{item.itemCount}
              </Text>
              <View style={styles.optionsContainer}>
                {item.options.map((option, optIndex) => (
                  <Text
                    key={`${option.optionName}-${option.optionPrice}-${optIndex}`}
                    style={styles.optionText}
                  >
                    {option.optionName}
                  </Text>
                ))}
              </View>
            </View>
            <Text style={styles.menuPrice}>
              {(
                item.itemPrice +
                item.options.reduce((acc, opt) => acc + opt.optionPrice, 0)
              ).toLocaleString()}
              원
            </Text>
          </View>
        ))}

        <View style={styles.paymentContainer}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>결제수단</Text>
            <Text style={styles.paymentValue}>메가선불카드</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>상품금액</Text>
            <Text style={styles.paymentValue}>
              {totalPrice.toLocaleString()}원
            </Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>할인금액</Text>
            <Text style={styles.paymentValue}>-0원</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>결제금액</Text>
            <Text style={[styles.paymentValue, styles.totalPrice]}>
              {totalPrice.toLocaleString()}원
            </Text>
          </View>
        </View>

        <View style={styles.stampContainer}>
          <Text style={styles.stampLabel}>스탬프 적립</Text>
          <Text style={styles.stampValue}>0개</Text>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  warningContainer: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "black",
    opacity: 0.7,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    gap: 5,
    marginTop: 20,
  },
  warningText: {
    color: "white",
    fontSize: 16,
  },
  orderInfoContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
    gap: 20,
  },
  storeInfo: {
    alignItems: "center",
    gap: 5,
  },
  storeName: {
    fontSize: 18,
    fontWeight: "500",
  },
  orderNumber: {
    fontSize: 24,
    fontWeight: "600",
  },
  orderTime: {
    fontSize: 18,
    textAlign: "center",
  },
  expectedTimeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#f9fafc",
    paddingVertical: 15,
    borderRadius: 10,
    gap: 5,
  },
  expectedTimeText: {
    fontSize: 22,
    fontWeight: "800",
  },
  expectedTimeSubText: {
    fontSize: 16,
    fontWeight: "600",
  },
  orderStatusbarContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    gap: 10,
  },
  orderStatusbar: {
    height: 10,
    backgroundColor: "red",
    borderRadius: 10,
  },
  statusTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  statusText: {
    color: "#666",
  },
  activeStatus: {
    color: "red",
    fontWeight: "600",
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 20,
    backgroundColor: "white",
    marginTop: 10,
  },
  menuImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  menuInfo: {
    flex: 1,
    gap: 10,
  },
  menuName: {
    fontSize: 18,
    fontWeight: "500",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  optionText: {
    fontSize: 14,
    color: "#666",
  },
  menuPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  paymentContainer: {
    padding: 20,
    backgroundColor: "white",
    marginTop: 10,
    gap: 10,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentLabel: {
    fontSize: 16,
    color: "#777",
  },
  paymentValue: {
    fontSize: 18,
    fontWeight: "500",
  },
  totalPrice: {
    color: "red",
    fontWeight: "bold",
  },
  stampContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    marginTop: 10,
  },
  stampLabel: {
    fontSize: 16,
    color: "#777",
  },
  stampValue: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default OrderListDetailPage;
