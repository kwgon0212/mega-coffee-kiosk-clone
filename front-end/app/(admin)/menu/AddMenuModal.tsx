import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import Button from "@/components/Button";
import { useQuery } from "@tanstack/react-query";

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

interface MenuFormData {
  itemId?: string;
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
  optionCategories: any[];
}

interface AddMenuModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (data: MenuFormData) => void;
  itemId?: string;
  isEdit?: boolean;
}

const AddMenuModal = ({
  isVisible,
  onClose,
  onSubmit,
  itemId,
  isEdit = false,
}: AddMenuModalProps) => {
  const [formData, setFormData] = useState<MenuFormData>({
    itemName: "",
    itemCategory: "coffee",
    itemSubCategory: "",
    itemMenuDetail: "",
    itemMakeTime: 0,
    itemPrice: 0,
    itemPictureUrl: "",
    detailKcal: 0,
    detailNa: 0,
    detailGain: 0,
    detailSugar: 0,
    detailSatfat: 0,
    detailTransfat: 0,
    detailProtein: 0,
    detailCaffeine: 0,
    optionCategories: [],
  });

  const { data: menuDetail } = useQuery({
    queryKey: ["menuDetail", itemId],
    queryFn: async () => {
      if (!itemId) return null;
      const response = await fetch(`/api/menus/item/${itemId}`);
      if (!response.ok) throw new Error("메뉴 정보를 가져오는데 실패했습니다.");
      const data = await response.json();
      console.log("API 응답 데이터:", data);
      return data;
    },
    enabled: isEdit && !!itemId,
  });

  useEffect(() => {
    if (menuDetail) {
      const updatedFormData = {
        itemName: menuDetail.itemName,
        itemCategory: menuDetail.itemCategory || "coffee",
        itemSubCategory: menuDetail.itemSubCategory || "",
        itemMenuDetail: menuDetail.itemMenuDetail || "",
        itemMakeTime: menuDetail.itemMakeTime || 0,
        itemPrice: menuDetail.itemPrice || 0,
        itemPictureUrl: menuDetail.itemPictureUrl || "",
        detailKcal: menuDetail.detail?.detailKcal || 0,
        detailNa: menuDetail.detail?.detailNa || 0,
        detailGain: menuDetail.detail?.detailGain || 0,
        detailSugar: menuDetail.detail?.detailSugar || 0,
        detailSatfat: menuDetail.detail?.detailSatfat || 0,
        detailTransfat: menuDetail.detail?.detailTransfat || 0,
        detailProtein: menuDetail.detail?.detailProtein || 0,
        detailCaffeine: menuDetail.detail?.detailCaffeine || 0,
        optionCategories: menuDetail.optionCategories || [],
      };

      console.log("업데이트된 폼 데이터:", updatedFormData);
      setFormData(updatedFormData);
    }
  }, [menuDetail]);

  const handleSubmit = () => {
    if (!formData.itemName || !formData.itemPrice || !formData.itemPictureUrl) {
      Alert.alert("입력 오류", "필수 항목을 모두 입력해주세요.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <Text style={styles.title}>
              {isEdit ? "메뉴 수정" : "새 메뉴 추가"}
            </Text>

            <Text style={styles.label}>메뉴 이름</Text>
            <TextInput
              style={styles.input}
              value={formData.itemName}
              onChangeText={(text) =>
                setFormData({ ...formData, itemName: text })
              }
              placeholder="메뉴 이름을 입력하세요"
            />

            <Text style={styles.label}>가격</Text>
            <TextInput
              style={styles.input}
              value={formData.itemPrice.toString()}
              onChangeText={(text) =>
                setFormData({ ...formData, itemPrice: Number(text) })
              }
              keyboardType="numeric"
              placeholder="가격을 입력하세요"
            />

            <Text style={styles.label}>이미지 URL</Text>
            <TextInput
              style={styles.input}
              value={formData.itemPictureUrl}
              onChangeText={(text) =>
                setFormData({ ...formData, itemPictureUrl: text })
              }
              placeholder="이미지 URL을 입력하세요"
            />

            <Text style={styles.label}>서브 카테고리</Text>
            <TextInput
              style={styles.input}
              value={formData.itemSubCategory}
              onChangeText={(text) =>
                setFormData({ ...formData, itemSubCategory: text })
              }
              placeholder="서브 카테고리를 입력하세요"
            />

            <Text style={styles.label}>메뉴 설명</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.itemMenuDetail}
              onChangeText={(text) =>
                setFormData({ ...formData, itemMenuDetail: text })
              }
              placeholder="메뉴 설명을 입력하세요"
              multiline
              numberOfLines={3}
            />

            <Text style={styles.label}>제조 시간 (초)</Text>
            <TextInput
              style={styles.input}
              value={formData.itemMakeTime.toString()}
              onChangeText={(text) =>
                setFormData({ ...formData, itemMakeTime: Number(text) })
              }
              keyboardType="numeric"
              placeholder="제조 시간을 입력하세요"
            />

            <Text style={styles.sectionTitle}>영양 정보</Text>

            <Text style={styles.label}>칼로리 (kcal)</Text>
            <TextInput
              style={styles.input}
              value={formData.detailKcal.toString()}
              onChangeText={(text) =>
                setFormData({ ...formData, detailKcal: Number(text) })
              }
              keyboardType="numeric"
              placeholder="칼로리를 입력하세요"
            />

            <Text style={styles.label}>나트륨 (mg)</Text>
            <TextInput
              style={styles.input}
              value={formData.detailNa.toString()}
              onChangeText={(text) =>
                setFormData({ ...formData, detailNa: Number(text) })
              }
              keyboardType="numeric"
              placeholder="나트륨을 입력하세요"
            />

            <Text style={styles.label}>탄수화물 (g)</Text>
            <TextInput
              style={styles.input}
              value={formData.detailGain.toString()}
              onChangeText={(text) =>
                setFormData({ ...formData, detailGain: Number(text) })
              }
              keyboardType="numeric"
              placeholder="탄수화물을 입력하세요"
            />

            <Text style={styles.label}>당류 (g)</Text>
            <TextInput
              style={styles.input}
              value={formData.detailSugar.toString()}
              onChangeText={(text) =>
                setFormData({ ...formData, detailSugar: Number(text) })
              }
              keyboardType="numeric"
              placeholder="당류를 입력하세요"
            />

            <Text style={styles.label}>포화지방 (g)</Text>
            <TextInput
              style={styles.input}
              value={formData.detailSatfat.toString()}
              onChangeText={(text) =>
                setFormData({ ...formData, detailSatfat: Number(text) })
              }
              keyboardType="numeric"
              placeholder="포화지방을 입력하세요"
            />

            <Text style={styles.label}>트랜스지방 (g)</Text>
            <TextInput
              style={styles.input}
              value={formData.detailTransfat.toString()}
              onChangeText={(text) =>
                setFormData({ ...formData, detailTransfat: Number(text) })
              }
              keyboardType="numeric"
              placeholder="트랜스지방을 입력하세요"
            />

            <Text style={styles.label}>단백질 (g)</Text>
            <TextInput
              style={styles.input}
              value={formData.detailProtein.toString()}
              onChangeText={(text) =>
                setFormData({ ...formData, detailProtein: Number(text) })
              }
              keyboardType="numeric"
              placeholder="단백질을 입력하세요"
            />

            <Text style={styles.label}>카페인 (mg)</Text>
            <TextInput
              style={styles.input}
              value={formData.detailCaffeine.toString()}
              onChangeText={(text) =>
                setFormData({ ...formData, detailCaffeine: Number(text) })
              }
              keyboardType="numeric"
              placeholder="카페인을 입력하세요"
            />

            <View style={styles.buttonContainer}>
              <Button
                text="취소"
                onPress={onClose}
                style={styles.button}
                backgroundColor="#e8e4e0"
                color="#452613"
              />
              <Button
                text={isEdit ? "수정" : "추가"}
                onPress={handleSubmit}
                style={styles.button}
                backgroundColor="#452613"
                color="white"
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 20,
  },
  button: {
    flex: 1,
  },
});

export default AddMenuModal;
