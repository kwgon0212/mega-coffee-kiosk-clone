import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import Layout from "@/components/ui/Layout";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Order } from "@/type";

const AdminOrderPage = () => {
  const [activeAccordionId, setActiveAccordionId] = useState<string | null>(
    null
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOrders = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/orders/admin`
    );
    const data = await response.json();
    return data;
  };

  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    select: (res: any) => res.data,
  });

  const handleOrderStatusChange = async (orderId: string, status: string) => {
    console.log("orderId", orderId);
    console.log("status", status);
    try {
      setIsUpdating(true);
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/orders/admin/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderStatus: status,
          }),
        }
      );
      const data = await response.json();

      if (data.success) {
        await refetch();
        Alert.alert("성공", "주문 상태가 변경되었습니다.");
      } else {
        Alert.alert("실패", "주문 상태 변경에 실패했습니다.");
      }
    } catch (error) {
      Alert.alert("오류", "주문 상태 변경 중 오류가 발생했습니다.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>주문 데이터를 불러오는데 실패했습니다.</Text>
        </View>
      </Layout>
    );
  }

  if (!orders) {
    return (
      <Layout>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>주문 데이터가 없습니다.</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      {isUpdating && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#452613" />
        </View>
      )}
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>주문승인 대기</Text>
          {orders
            .filter((order) => order.orderStatus === "CONFIRMED")
            .map((order) => (
              <Accordion
                key={order.orderId}
                title={`${order.storeName} 주문번호 ${order.orderNumber}`}
                subtitle={`${order.orderCount}개의 상품`}
                isOpen={activeAccordionId === order.orderId}
                setIsOpen={(open) =>
                  setActiveAccordionId(open ? order.orderId : null)
                }
                isStyled
              >
                <View style={styles.orderCard}>
                  <Text style={styles.orderCustomer}>주문자: {"test123"}</Text>
                  <View style={styles.orderMenuContainer}>
                    {order.orderMenus.map((menu, menuIndex) => (
                      <View
                        style={{ gap: 10 }}
                        key={`${menu.itemName}-${menu.itemCount}-${menuIndex}`}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "flex-end",
                            gap: 5,
                          }}
                        >
                          <Text style={styles.orderMenu}>{menu.itemName}</Text>
                          <Text style={{ fontSize: 16, fontWeight: "600" }}>
                            x{menu.itemCount}
                          </Text>
                        </View>
                        {menu.options.map((option, optIndex) => (
                          <Text
                            key={`${option.optionName}-${option.optionPrice}-${optIndex}`}
                            style={styles.orderMenuOption}
                          >
                            +{option.optionName}
                          </Text>
                        ))}
                      </View>
                    ))}
                  </View>

                  <View style={styles.orderInfoContainer}>
                    <Text>주문일시</Text>
                    <Text>
                      {new Date(order.orderTime).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </Text>
                  </View>
                  <View style={styles.orderInfoContainer}>
                    <Text>주문금액</Text>
                    <Text>10000원</Text>
                  </View>
                  <Button
                    text="주문확인"
                    onPress={() => {
                      handleOrderStatusChange(order.orderId, "COMPLETED");
                    }}
                    disabled={isUpdating}
                  />
                </View>
              </Accordion>
            ))}
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>제조완료</Text>
          {orders
            .filter((order) => order.orderStatus === "COMPLETED")
            .map((order) => (
              <Accordion
                key={order.orderId}
                title={order.storeName}
                subtitle={`${order.orderCount}개의 상품`}
                isOpen={activeAccordionId === order.orderId}
                setIsOpen={(open) =>
                  setActiveAccordionId(open ? order.orderId : null)
                }
                isStyled
              >
                <View style={styles.orderCard}>
                  <Text style={styles.orderCustomer}>주문자: {"test123"}</Text>
                  <View style={styles.orderMenuContainer}>
                    {order.orderMenus.map((menu, menuIndex) => (
                      <Text
                        key={`${menu.itemName}-${menu.itemCount}-${menuIndex}`}
                        style={styles.orderMenuOption}
                      >
                        {menu.itemName} x{menu.itemCount}
                      </Text>
                    ))}
                  </View>

                  <View style={styles.orderInfoContainer}>
                    <Text>주문일시</Text>
                    <Text>
                      {new Date(order.orderTime).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </Text>
                  </View>
                  <View style={styles.orderInfoContainer}>
                    <Text>주문금액</Text>
                    <Text>10000원</Text>
                  </View>
                  <Button
                    text="제조완료"
                    backgroundColor="#452613"
                    color="white"
                    onPress={() => {
                      // handleOrderStatusChange(order.orderId, "COMPLETED");
                    }}
                    disabled={isUpdating}
                  />
                </View>
              </Accordion>
            ))}
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  orderCard: {
    gap: 10,
    padding: 20,
    paddingTop: 0,
    backgroundColor: "white",
  },
  orderCustomer: {
    fontSize: 16,
    fontWeight: "500",
    borderBottomWidth: 0.2,
    borderBottomColor: "gray",
    paddingBottom: 10,
  },
  orderMenu: {
    fontSize: 20,
    fontWeight: "bold",
  },
  orderMenuOption: {
    fontSize: 16,
    color: "gray",
    paddingLeft: 10,
  },
  orderMenuContainer: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 5,
  },
  orderInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});

export default AdminOrderPage;
