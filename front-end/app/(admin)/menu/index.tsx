import Layout from "@/components/ui/Layout";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import Button from "@/components/Button";
import AddMenuModal, { MenuFormData } from "./AddMenuModal";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  options?: string[];
  nutrition?: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
}

const initialFormData: MenuFormData = {
  name: "",
  price: "",
  description: "",
  imageUrl: "",
  category: "커피",
  options: [],
  nutrition: {
    calories: "",
    protein: "",
    fat: "",
    carbs: "",
  },
};

const AdminMenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("커피");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const categories = ["커피", "논커피", "디저트"];
  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "아메리카노",
      price: 4500,
      description: "깊고 진한 에스프레소의 맛",
      imageUrl: "https://example.com/americano.jpg",
      category: "커피",
    },
    // 더미 데이터
  ];

  const handleSubmit = (data: MenuFormData) => {
    // TODO: API 연동
    console.log(data);
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <ScrollView style={styles.container}>
        {/* 카테고리 선택 */}
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <Button
              key={category}
              text={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category)}
              color={selectedCategory === category ? "white" : "#666"}
            />
          ))}
        </View>

        {/* 메뉴 추가 버튼 */}
        <Button
          text="+ 새 메뉴 추가"
          style={styles.addButton}
          backgroundColor="#452613"
          color="white"
          onPress={() => setIsModalVisible(true)}
        />

        {/* 메뉴 목록 */}
        <View style={styles.menuGrid}>
          {menuItems
            .filter((item) => item.category === selectedCategory)
            .map((item) => (
              <View key={item.id} style={styles.menuCard}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.menuImage}
                />
                <View style={styles.menuInfo}>
                  <Text style={styles.menuName}>{item.name}</Text>
                  <Text style={styles.menuPrice}>
                    {item.price.toLocaleString()}원
                  </Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                </View>
                <View style={styles.menuActions}>
                  <Button text="수정" style={styles.actionButton} />
                  <Button
                    text="삭제"
                    style={styles.actionButton}
                    backgroundColor="#FF4444"
                  />
                </View>
              </View>
            ))}
        </View>

        <AddMenuModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleSubmit}
          categories={categories}
        />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  selectedCategory: {
    backgroundColor: "#452613",
  },
  addButton: {
    marginBottom: 20,
  },
  menuGrid: {
    gap: 20,
  },
  menuCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  menuInfo: {
    marginBottom: 15,
  },
  menuName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  menuPrice: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  menuDescription: {
    fontSize: 14,
    color: "#888",
  },
  menuActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  actionButton: {
    flex: 1,
  },
});

export default AdminMenuPage;
