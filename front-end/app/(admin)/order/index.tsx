import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import Layout from "@/components/ui/Layout";
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const AdminOrderPage = () => {
  const [activeAccordionId, setActiveAccordionId] = useState<string | null>(
    null
  );

  const orders = [
    { id: "1", title: "주문번호1", status: "결제완료" },
    { id: "2", title: "주문번호2", status: "결제완료" },
    { id: "3", title: "주문번호3", status: "결제완료" },
    { id: "4", title: "주문번호4", status: "승인대기" },
    { id: "5", title: "주문번호5", status: "승인대기" },
  ];

  return (
    <Layout style={{}}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>주문승인 대기</Text>
          {orders
            .filter((order) => order.status === "결제완료")
            .map((order) => (
              <Accordion
                key={order.id}
                title={order.title}
                subtitle="아이스 아메리카노 및 3개"
                isOpen={activeAccordionId === order.id}
                setIsOpen={(open) =>
                  setActiveAccordionId(open ? order.id : null)
                }
              >
                <View style={styles.orderCard}>
                  <Text style={styles.orderCustomer}>주문자: {"test123"}</Text>
                  <View style={styles.orderMenuContainer}>
                    <Text style={styles.orderMenu}>
                      아이스 아메리카노 x {1}
                    </Text>
                    <Text style={styles.orderMenuOption}>바닐라시럽추가</Text>
                    <Text style={styles.orderMenuOption}>휘핑크림추가</Text>
                    <Text style={styles.orderMenuOption}>연하게</Text>
                    <Text style={styles.orderMenuOption}>타피오카 펄추가</Text>
                  </View>

                  <View style={styles.orderInfoContainer}>
                    <Text>주문일시</Text>
                    <Text>2025-01-01 12:00:00</Text>
                  </View>
                  <View style={styles.orderInfoContainer}>
                    <Text>주문금액</Text>
                    <Text>10000원</Text>
                  </View>
                  <Button
                    text="주문확인"
                    onPress={() => {
                      order.status = "승인대기";
                    }}
                  />
                </View>
              </Accordion>
            ))}
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>제조완료 대기</Text>
          {orders
            .filter((order) => order.status === "승인대기")
            .map((order) => (
              <Accordion
                key={order.id}
                title={order.title}
                subtitle="아이스 아메리카노 및 3개"
                isOpen={activeAccordionId === order.id}
                setIsOpen={(open) =>
                  setActiveAccordionId(open ? order.id : null)
                }
              >
                <View style={styles.orderCard}>
                  <Text style={styles.orderCustomer}>주문자: {"test123"}</Text>
                  <View style={styles.orderMenuContainer}>
                    <Text style={styles.orderMenu}>
                      아이스 아메리카노 x {1}
                    </Text>
                    <Text style={styles.orderMenuOption}>바닐라시럽추가</Text>
                    <Text style={styles.orderMenuOption}>휘핑크림추가</Text>
                    <Text style={styles.orderMenuOption}>연하게</Text>
                    <Text style={styles.orderMenuOption}>타피오카 펄추가</Text>
                  </View>

                  <View style={styles.orderInfoContainer}>
                    <Text>주문일시</Text>
                    <Text>2025-01-01 12:00:00</Text>
                  </View>
                  <View style={styles.orderInfoContainer}>
                    <Text>주문금액</Text>
                    <Text>10000원</Text>
                  </View>
                  <Button
                    text="제조완료"
                    backgroundColor="#452613"
                    color="white"
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
    gap: 5,
  },
  orderInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default AdminOrderPage;
