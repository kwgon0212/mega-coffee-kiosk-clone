import Layout from "@/components/ui/Layout";
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import Button from "@/components/Button";
import { useQuery } from "@tanstack/react-query";

interface Order {
  orderId: string;
  storeName: string;
  orderNumber: number;
  orderTime: string;
  orderStatus: string;
  orderCount: number;
  orderMenus: {
    itemName: string;
    itemPrice: number;
    itemCount: number;
    options: {
      optionName: string;
      optionPrice: number;
    }[];
  }[];
}

const AdminStatisticsPage = () => {
  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/orders/admin`
      );
      const data = await response.json();
      return data.data;
    },
  });

  // 매출 데이터 계산
  const calculateSalesData = () => {
    if (!orders.length) {
      return {
        labels: ["월", "화", "수", "목", "금", "토", "일"],
        datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }],
      };
    }

    const salesByDay = orders.reduce(
      (acc: { [key: string]: number }, order) => {
        const date = new Date(order.orderTime).toLocaleDateString("ko-KR", {
          weekday: "short",
        });
        const total = order.orderMenus.reduce((sum, menu) => {
          const menuTotal = (menu.itemPrice || 0) * (menu.itemCount || 0);
          const optionsTotal = menu.options.reduce(
            (optSum, opt) => optSum + (opt.optionPrice || 0),
            0
          );
          return sum + menuTotal + optionsTotal;
        }, 0);
        acc[date] = (acc[date] || 0) + total;
        return acc;
      },
      {}
    );

    return {
      labels: Object.keys(salesByDay),
      datasets: [{ data: Object.values(salesByDay) }],
    };
  };

  // 메뉴별 판매량 데이터 계산
  const calculateMenuData = () => {
    if (!orders.length) {
      return {
        labels: ["데이터 없음"],
        data: [1],
      };
    }

    const menuCounts = orders.reduce(
      (acc: { [key: string]: number }, order) => {
        order.orderMenus.forEach((menu) => {
          if (menu.itemName) {
            acc[menu.itemName] =
              (acc[menu.itemName] || 0) + (menu.itemCount || 0);
          }
        });
        return acc;
      },
      {}
    );

    const total = Object.values(menuCounts).reduce(
      (sum, count) => sum + count,
      0
    );
    if (total === 0) {
      return {
        labels: ["데이터 없음"],
        data: [1],
      };
    }

    return {
      labels: Object.keys(menuCounts),
      data: Object.values(menuCounts).map((count) => count / total),
    };
  };

  // 시간대별 주문량 데이터 계산
  const calculateTimeData = () => {
    if (!orders.length) {
      return {
        labels: ["0시", "6시", "12시", "18시"],
        datasets: [{ data: [0, 0, 0, 0] }],
      };
    }

    const ordersByHour = orders.reduce(
      (acc: { [key: string]: number }, order) => {
        const hour = new Date(order.orderTime).getHours();
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
      },
      {}
    );

    // 24시간 데이터를 4시간 단위로 그룹화
    const groupedData = {
      labels: ["0시", "6시", "12시", "18시"],
      datasets: [
        {
          data: [
            Object.entries(ordersByHour)
              .filter(([hour]) => parseInt(hour) < 6)
              .reduce((sum, [, count]) => sum + count, 0),
            Object.entries(ordersByHour)
              .filter(([hour]) => parseInt(hour) >= 6 && parseInt(hour) < 12)
              .reduce((sum, [, count]) => sum + count, 0),
            Object.entries(ordersByHour)
              .filter(([hour]) => parseInt(hour) >= 12 && parseInt(hour) < 18)
              .reduce((sum, [, count]) => sum + count, 0),
            Object.entries(ordersByHour)
              .filter(([hour]) => parseInt(hour) >= 18)
              .reduce((sum, [, count]) => sum + count, 0),
          ],
        },
      ],
    };

    return groupedData;
  };

  const salesData = calculateSalesData();
  const menuData = calculateMenuData();
  const timeData = calculateTimeData();

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>일별 매출 추이</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={salesData}
              width={400}
              height={220}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(69, 38, 19, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              bezier
              style={styles.chart}
            />
          </ScrollView>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>메뉴별 판매 비율</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <PieChart
              data={menuData.labels.map((label, index) => ({
                name: label,
                population: menuData.data[index] * 100,
                color: `rgba(69, 38, 19, ${1 - index * 0.15})`,
                legendFontColor: "#7F7F7F",
                legendFontSize: 12,
              }))}
              width={400}
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(69, 38, 19, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              style={styles.chart}
            />
          </ScrollView>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>시간대별 주문량</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <BarChart
              data={timeData}
              width={400}
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(69, 38, 19, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              style={styles.chart}
              fromZero
              showValuesOnTopOfBars
              verticalLabelRotation={0}
              horizontalLabelRotation={0}
              segments={4}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  chartContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  chart: {
    marginVertical: 5,
    borderRadius: 16,
  },
});

export default AdminStatisticsPage;
