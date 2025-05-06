import Layout from "@/components/ui/Layout";
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Alert } from "react-native";
import Button from "@/components/Button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AddMenuModal from "./AddMenuModal";
import { MaterialIcons } from "@expo/vector-icons";

interface Option {
  optionName: string;
  optionPrice: number;
  optionOrder: number;
  optionAvailable: boolean;
}

interface OptionCategory {
  categoryName: string;
  categoryDescription: string;
  categoryOrder: number;
  options: Option[];
}

interface Menu {
  itemId: number;
  itemName: string;
  itemCategory: string;
  itemSubCategory: string;
  itemPictureUrl: string;
  itemPrice: number;
  itemSoldout: boolean;
}

interface MenuDetail extends Menu {
  itemMenuDetail: string;
  itemMakeTime: number;
  detailKcal: number;
  detailNa: number;
  detailGain: number;
  detailSugar: number;
  detailSatfat: number;
  detailTransfat: number;
  detailProtein: number;
  detailCaffeine: number;
  optionCategories: OptionCategory[];
}

interface MenuFormData {
  itemName: string;
  itemCategory: string;
  itemSubCategory: string;
  itemMenuDetail: string;
  itemMakeTime: number;
  itemPrice: number;
  itemPictureUrl: string;
  detailKcal: number;
  detailNa: number;
  detailGain: number;
  detailSugar: number;
  detailSatfat: number;
  detailTransfat: number;
  detailProtein: number;
  detailCaffeine: number;
  optionCategories: OptionCategory[];
}

const AdminMenuPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const queryClient = useQueryClient();

  // 메뉴 목록 조회
  const { data: menus } = useQuery<Menu[]>({
    queryKey: ["menus"],
    queryFn: async () => {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/menus`);
      const data = await res.json();
      return data;
    },
  });

  // 메뉴 상세 정보 조회
  const { data: menuDetail } = useQuery<MenuDetail>({
    queryKey: ["menuDetail", selectedMenu?.itemId],
    queryFn: async () => {
      if (!selectedMenu) return null;
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/menus/item/${selectedMenu.itemId}`
      );
      const data = await res.json();
      console.log("메뉴 상세 정보:", data); // 디버깅용 로그
      return data;
    },
    enabled: !!selectedMenu,
  });

  // 메뉴 삭제
  const deleteMutation = useMutation({
    mutationFn: async (itemId: number) => {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/menus/${itemId}`,
        {
          method: "DELETE",
        }
      );
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      Alert.alert("메뉴가 삭제되었습니다.");
    },
  });

  // 메뉴 품절 처리
  const soldoutMutation = useMutation({
    mutationFn: async ({ itemId }: { itemId: number; soldout: boolean }) => {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/menus/${itemId}/soldout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      Alert.alert("메뉴 상태가 변경되었습니다.");
    },
  });

  // 메뉴 수정
  const editMutation = useMutation({
    mutationFn: async ({
      itemId,
      data,
    }: {
      itemId: number;
      data: MenuFormData;
    }) => {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/admin/editMenus/${itemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      Alert.alert("메뉴가 수정되었습니다.");
      setIsModalVisible(false);
      setSelectedMenu(null);
    },
  });

  // 메뉴 추가
  const addMutation = useMutation({
    mutationFn: async (data: MenuFormData) => {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/admin/menus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      Alert.alert("메뉴가 추가되었습니다.");
      setIsModalVisible(false);
    },
  });

  const handleEdit = (menu: Menu) => {
    setSelectedMenu(menu);
    setIsModalVisible(true);
  };

  const handleSubmit = (data: MenuFormData) => {
    if (selectedMenu) {
      editMutation.mutate({ itemId: selectedMenu.itemId, data });
    } else {
      addMutation.mutate(data);
    }
  };

  const renderImage = (item: Menu) => {
    if (!item.itemPictureUrl) {
      return (
        <View style={[styles.menuImage, styles.noImageContainer]}>
          <MaterialIcons name="image" size={50} color="#ccc" />
          <Text style={styles.noImageText}>이미지 없음</Text>
        </View>
      );
    }

    return (
      <Image
        source={{ uri: item.itemPictureUrl }}
        style={styles.menuImage}
        onError={() => {
          // 이미지 로드 실패 시 처리
          console.log("이미지 로드 실패:", item.itemName);
        }}
      />
    );
  };

  return (
    <Layout>
      <ScrollView style={styles.container}>
        {/* 메뉴 추가 버튼 */}
        <Button
          text="+ 새 메뉴 추가"
          style={styles.addButton}
          backgroundColor="#452613"
          color="white"
          onPress={() => {
            setSelectedMenu(null);
            setIsModalVisible(true);
          }}
        />

        {/* 메뉴 목록 */}
        <View style={styles.menuGrid}>
          {menus?.map((item) => (
            <View key={item.itemId} style={styles.menuCard}>
              {renderImage(item)}
              <View style={styles.menuInfo}>
                <Text style={styles.menuName}>{item.itemName}</Text>
                <Text style={styles.menuPrice}>
                  {item.itemPrice.toLocaleString()}원
                </Text>
                <Text style={styles.menuCategory}>{item.itemSubCategory}</Text>
              </View>
              <View style={styles.menuActions}>
                <Button
                  text="수정"
                  style={styles.actionButton}
                  backgroundColor="#452613"
                  onPress={() => handleEdit(item)}
                />
                <Button
                  text={item.itemSoldout ? "품절 해제" : "품절"}
                  style={styles.actionButton}
                  backgroundColor={item.itemSoldout ? "#666" : "#FF4444"}
                  onPress={() =>
                    soldoutMutation.mutate({
                      itemId: item.itemId,
                      soldout: !item.itemSoldout,
                    })
                  }
                />
                <Button
                  text="삭제"
                  style={styles.actionButton}
                  backgroundColor="#FF4444"
                  onPress={() => {
                    Alert.alert(
                      "메뉴 삭제",
                      "정말로 이 메뉴를 삭제하시겠습니까?",
                      [
                        {
                          text: "취소",
                          style: "cancel",
                        },
                        {
                          text: "삭제",
                          onPress: () => deleteMutation.mutate(item.itemId),
                          style: "destructive",
                        },
                      ]
                    );
                  }}
                />
              </View>
            </View>
          ))}
        </View>

        <AddMenuModal
          isVisible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
            setSelectedMenu(null);
          }}
          onSubmit={handleSubmit}
          itemId={selectedMenu?.itemId?.toString()}
          isEdit={!!selectedMenu}
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
  menuCategory: {
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
  noImageContainer: {
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    marginTop: 8,
    color: "#888",
    fontSize: 14,
  },
});

export default AdminMenuPage;
