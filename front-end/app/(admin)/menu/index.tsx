import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  RefreshControl,
  TextInput,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AddMenuModal from "./AddMenuModal";
import EditMenuModal from "./EditMenuModal";
import { Ionicons } from "@expo/vector-icons";

interface Menu {
  itemId: number;
  itemName: string;
  itemCategory: string;
  itemSubCategory: string;
  itemPictureUrl: string;
  itemPrice: number;
  itemSoldout: boolean;
  itemMenuDetail: string;
  itemMakeTime: number;
  detail: {
    detailKcal: number;
    detailNa: number;
    detailGain: number;
    detailSugar: number;
    detailSatfat: number;
    detailTransfat: number;
    detailProtein: number;
    detailCaffeine: number;
  };
  optionCategories: {
    categoryName: string;
    categoryDescription: string;
    categoryOrder: number;
    options: {
      optionName: string;
      optionPrice: number;
      optionOrder: number;
      optionAvailable: boolean;
    }[];
  }[];
}

const MenuList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const queryClient = useQueryClient();

  const fetchMenus = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/menus`
    );
    const data = await response.json();
    return data;
  };

  const {
    data: menus,
    isLoading,
    refetch,
  } = useQuery<Menu[]>({
    queryKey: ["menus"],
    queryFn: fetchMenus,
  });

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // const categories = ["전체", "coffee", "decaf", "drink", "기타"];
  const categories = [
    "전체",
    ...new Set(menus?.map((menu) => menu.itemCategory)),
  ];

  const updateMenuMutation = useMutation({
    mutationFn: async (updatedMenu: Menu) => {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/admin/editMenus/${updatedMenu.itemId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMenu),
        }
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });

  const handleEdit = (menu: Menu) => {
    setSelectedMenu(menu);
    setIsEditModalVisible(true);
  };

  const handleSave = (updatedMenu: Menu) => {
    updateMenuMutation.mutate(updatedMenu, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menus"] });
        setIsEditModalVisible(false);
        setSelectedMenu(null);
      },
    });
  };

  const handleSoldout = async (menuId: number) => {
    const menuResponse = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/menus/item/${menuId}`
    );
    const menu = await menuResponse.json();

    Alert.alert(
      menu.itemSoldout ? "판매" : "품절",
      menu.itemSoldout
        ? "해당 메뉴를 판매처리하시겠습니까?"
        : "해당 메뉴를 품절처리하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: menu.itemSoldout ? "판매" : "품절",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(
                `${process.env.EXPO_PUBLIC_BASE_URL}/api/admin/editMenus/${menuId}/soldout`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    ...menu,
                    itemSoldout: !menu.itemSoldout,
                  }),
                }
              );
              if (response.ok) {
                queryClient.invalidateQueries({ queryKey: ["menus"] });
              }
            } catch (error) {
              console.error("상태 변경 중 오류 발생:", error);
            }
          },
        },
      ]
    );
  };

  const handleDelete = async (menuId: number) => {
    Alert.alert("삭제", "해당 메뉴를 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch(
              `${process.env.EXPO_PUBLIC_BASE_URL}/api/admin/deleteMenus/${menuId}`,
              {
                method: "DELETE",
              }
            );
            if (response.ok) {
              queryClient.invalidateQueries({ queryKey: ["menus"] });
            }
          } catch (error) {
            console.error("메뉴 삭제 중 오류 발생:", error);
          }
        },
      },
    ]);
  };

  const filteredMenus = menus?.filter((menu) => {
    const matchesSearch = menu.itemName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "전체" || menu.itemCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>메뉴 관리</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.addButtonText}>메뉴 추가</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
        >
          {categories &&
            categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category &&
                    styles.selectedCategoryButton,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category &&
                      styles.selectedCategoryButtonText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="메뉴 검색"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery("")}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        style={styles.menuList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>메뉴를 불러오는 중...</Text>
          </View>
        ) : (
          filteredMenus &&
          filteredMenus.map((menu) => (
            <View key={menu.itemId} style={styles.menuCard}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: menu.itemPictureUrl }}
                  style={styles.menuImage}
                />
                {menu.itemSoldout && (
                  <View style={styles.soldoutOverlay}>
                    <Text style={styles.soldoutOverlayText}>품절</Text>
                  </View>
                )}
              </View>
              <View style={styles.menuInfo}>
                <Text style={styles.menuName}>{menu.itemName}</Text>
                <Text style={styles.menuPrice}>
                  {menu.itemPrice.toLocaleString()}원
                </Text>
                <Text style={styles.menuCategory}>
                  {menu.itemCategory} / {menu.itemSubCategory}
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => handleEdit(menu)}
                  >
                    <Ionicons name="pencil" size={20} color="white" />
                    <Text style={styles.editButtonText}>수정</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      menu.itemSoldout
                        ? styles.soldoutButton
                        : styles.availableButton,
                    ]}
                    onPress={() => handleSoldout(menu.itemId)}
                  >
                    <Ionicons
                      name={
                        menu.itemSoldout ? "checkmark-circle" : "close-circle"
                      }
                      size={20}
                      color="white"
                    />
                    <Text style={styles.buttonText}>
                      {menu.itemSoldout ? "판매" : "품절"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(menu.itemId)}
                  >
                    <Ionicons name="trash" size={20} color="white" />
                    <Text style={styles.buttonText}>삭제</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <AddMenuModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      <EditMenuModal
        visible={isEditModalVisible}
        onClose={() => {
          setIsEditModalVisible(false);
          setSelectedMenu(null);
        }}
        menu={selectedMenu}
        onSave={handleSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  menuList: {
    flex: 1,
  },
  menuCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
  },
  menuImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  menuInfo: {
    padding: 16,
  },
  menuName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  menuPrice: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  menuCategory: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  soldoutOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  soldoutOverlayText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  editButton: {
    backgroundColor: "#452613",
  },
  editButtonText: {
    color: "white",
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
  },
  availableButton: {
    backgroundColor: "#ffdc00",
  },
  soldoutButton: {
    backgroundColor: "#ffdc00",
  },
  deleteButton: {
    backgroundColor: "#e8e4e0",
  },
  buttonText: {
    color: "#333",
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    padding: 4,
  },
  categoryContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedCategoryButton: {
    backgroundColor: "#452613",
    borderColor: "#452613",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  selectedCategoryButtonText: {
    color: "white",
  },
});

export default MenuList;
