import Layout from "@/components/ui/Layout";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";

const OrderListDetailPage = () => {
  const { orderId } = useLocalSearchParams();
  return (
    <Layout style={{ gap: 10, backgroundColor: "#f9fafc" }}>
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
            gap: 20,
            backgroundColor: "white",
          }}
        >
          <View style={{ alignItems: "center", gap: 5 }}>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>영등포역점</Text>
            <Text style={{ fontWeight: "600", fontSize: 24 }}>
              주문번호 : {orderId}
            </Text>
          </View>

          <View style={{ alignItems: "center", gap: 5 }}>
            <Text style={{ fontSize: 18 }}>2025. 03. 22. 18:47</Text>
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
            <View style={styles.orderStatusbar} />
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "space-between",
                paddingHorizontal: 5,
              }}
            >
              <Text>결제완료</Text>
              <Text style={{ color: "red" }}>주문확인</Text>
              <Text>제조완료</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <Image
          source={{
            uri: "https://img.79plus.co.kr/megahp/manager/upload/menu/20250320000925_1742396965069_ekSqAIVc1L.jpg",
          }}
          style={styles.menuImage}
        />
        <View style={{ gap: 10, flex: 1 }}>
          <Text style={{ fontSize: 18 }}>아메리카노</Text>
          <Text style={{ fontSize: 16 }}>1개</Text>
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>10,000원</Text>
        </View>
      </View>

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
          <Text style={styles.price}>{Number(3000).toLocaleString()}원</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.subtitle}>할인금액</Text>
          <Text style={styles.price}>-{Number(3000).toLocaleString()}원</Text>
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
            {Number(0).toLocaleString()}원
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
    width: "50%",
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
