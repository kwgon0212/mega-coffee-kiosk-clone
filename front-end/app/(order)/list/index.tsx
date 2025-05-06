import Layout from "@/components/ui/Layout";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import Accordion from "@/components/Accordion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

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
  orderStatus: "CONFIRMED" | "PREPARING" | "COMPLETED";
  orderCount: number;
  orderMenus: OrderMenu[];
}

const OrderListPage = () => {
  const [activeAccordionId, setActiveAccordionId] = useState<string | null>(
    null
  );
  const router = useRouter();

  const fetchOrders = async () => {
    const userInfo = JSON.parse(
      (await AsyncStorage.getItem("userInfo")) || "{}"
    );
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/orders/${userInfo.userId}`
    );
    const data = await response.json();
    return data;
  };

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery<Order[]>({
    queryKey: ["userOrders"],
    queryFn: fetchOrders,
    select: (res: any) => res.data,
  });

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "주문 확인";
      case "COMPLETED":
        return "제조 완료";
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#452613" />
        </View>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <View style={styles.errorContainer}>
          <Text>주문 내역을 불러오는데 실패했습니다.</Text>
        </View>
      </Layout>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Layout>
        <View style={styles.emptyContainer}>
          <Text>주문 내역이 없습니다.</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>주문 내역</Text>
        {orders.map((order) => (
          <Pressable
            key={order.orderId}
            onPress={() => router.push(`/(order)/list/${order.orderId}`)}
          >
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.storeName}>{order.storeName}</Text>
                  <Text style={styles.orderNumber}>
                    주문번호 {order.orderNumber}
                  </Text>
                </View>
                <Text style={styles.orderCount}>
                  {order.orderCount}개의 상품
                </Text>
              </View>
              <View style={styles.orderStatus}>
                <Text style={styles.orderStatusText}>
                  {getOrderStatusText(order.orderStatus)}
                </Text>
              </View>
              <View style={styles.orderMenuContainer}>
                {order.orderMenus.map((menu, index) => (
                  <View
                    key={`${menu.itemName}-${index}`}
                    style={styles.menuItem}
                  >
                    <View style={styles.menuHeader}>
                      <Text style={styles.menuName}>{menu.itemName}</Text>
                      <Text style={styles.menuCount}>x{menu.itemCount}</Text>
                    </View>
                    {menu.options.map((option, optIndex) => (
                      <Text
                        key={`${option.optionName}-${optIndex}`}
                        style={styles.optionText}
                      >
                        +{option.optionName}
                      </Text>
                    ))}
                    <Text style={styles.menuPrice}>
                      {(menu.itemPrice +
                        menu.options.reduce(
                          (sum, opt) => sum + opt.optionPrice,
                          0
                        )) *
                        menu.itemCount}
                      원
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderTime}>
                  {new Date(order.orderTime).toLocaleString("ko-KR")}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  orderCard: {
    backgroundColor: "white",
    padding: 15,
    gap: 10,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  storeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  orderNumber: {
    fontSize: 14,
    color: "#666",
  },
  orderCount: {
    fontSize: 14,
    color: "#666",
  },
  orderStatus: {
    paddingVertical: 5,
  },
  orderStatusText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ff0000",
  },
  orderMenuContainer: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    gap: 10,
  },
  menuItem: {
    gap: 5,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuName: {
    fontSize: 16,
    fontWeight: "600",
  },
  menuCount: {
    fontSize: 14,
    color: "#666",
  },
  optionText: {
    fontSize: 14,
    color: "#666",
    paddingLeft: 10,
  },
  menuPrice: {
    fontSize: 14,
    color: "#452613",
    fontWeight: "500",
  },
  orderInfo: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  orderTime: {
    fontSize: 14,
    color: "#666",
  },
});

export default OrderListPage;
