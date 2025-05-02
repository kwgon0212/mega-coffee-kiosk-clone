import Layout from "@/components/ui/Layout";
import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import Button from "@/components/Button";

const AdminStatisticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "day" | "week" | "month"
  >("day");
  const [selectedChart, setSelectedChart] = useState<
    "sales" | "menu" | "category"
  >("sales");

  // 임시 데이터 (실제로는 API에서 받아와야 함)
  const salesData = {
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
      },
    ],
  };

  const menuData = {
    labels: ["아메리카노", "카페라떼", "카푸치노", "에스프레소", "케이크"],
    data: [0.4, 0.3, 0.1, 0.1, 0.1],
  };

  const categoryData = {
    labels: ["커피", "논커피", "디저트"],
    datasets: [
      {
        data: [300, 150, 100],
      },
    ],
  };

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.filterContainer}>
            <View style={styles.periodButtons}>
              <Button
                text="일간"
                onPress={() => setSelectedPeriod("day")}
                backgroundColor={
                  selectedPeriod === "day" ? "#452613" : "#D9D9D9"
                }
                color={selectedPeriod === "day" ? "white" : "black"}
                style={styles.filterButton}
              />
              <Button
                text="주간"
                onPress={() => setSelectedPeriod("week")}
                backgroundColor={
                  selectedPeriod === "week" ? "#452613" : "#D9D9D9"
                }
                color={selectedPeriod === "week" ? "white" : "black"}
                style={styles.filterButton}
              />
              <Button
                text="월간"
                onPress={() => setSelectedPeriod("month")}
                backgroundColor={
                  selectedPeriod === "month" ? "#452613" : "#D9D9D9"
                }
                color={selectedPeriod === "month" ? "white" : "black"}
                style={styles.filterButton}
              />
            </View>

            <View style={styles.chartTypeButtons}>
              <Button
                text="매출"
                onPress={() => setSelectedChart("sales")}
                backgroundColor={
                  selectedChart === "sales" ? "#452613" : "#D9D9D9"
                }
                color={selectedChart === "sales" ? "white" : "black"}
                style={styles.filterButton}
              />
              <Button
                text="메뉴별"
                onPress={() => setSelectedChart("menu")}
                backgroundColor={
                  selectedChart === "menu" ? "#452613" : "#D9D9D9"
                }
                color={selectedChart === "menu" ? "white" : "black"}
                style={styles.filterButton}
              />
              <Button
                text="카테고리별"
                onPress={() => setSelectedChart("category")}
                backgroundColor={
                  selectedChart === "category" ? "#452613" : "#D9D9D9"
                }
                color={selectedChart === "category" ? "white" : "black"}
                style={styles.filterButton}
              />
            </View>
          </View>
        </View>

        <View style={styles.chartContainer}>
          {selectedChart === "sales" && (
            <>
              <Text style={styles.chartTitle}>일별 매출 추이</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <LineChart
                  data={salesData}
                  width={600}
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
            </>
          )}

          {selectedChart === "menu" && (
            <>
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
                  width={600}
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
            </>
          )}

          {selectedChart === "category" && (
            <>
              <Text style={styles.chartTitle}>카테고리별 판매량</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <BarChart
                  data={categoryData}
                  width={600}
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
                />
              </ScrollView>
            </>
          )}
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
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  filterContainer: {
    gap: 10,
  },
  periodButtons: {
    flexDirection: "row",
    gap: 10,
  },
  chartTypeButtons: {
    flexDirection: "row",
    gap: 10,
  },
  filterButton: {
    flex: 1,
  },
  chartContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default AdminStatisticsPage;
