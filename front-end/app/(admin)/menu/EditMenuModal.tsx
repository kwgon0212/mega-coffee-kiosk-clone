import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";

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

interface EditMenuModalProps {
  visible: boolean;
  onClose: () => void;
  menu: Menu | null;
  onSave: (updatedMenu: Menu) => void;
}

const EditMenuModal: React.FC<EditMenuModalProps> = ({
  visible,
  onClose,
  menu,
  onSave,
}) => {
  const [formData, setFormData] = useState<Menu>({
    itemId: 0,
    itemName: "",
    itemCategory: "",
    itemSubCategory: "",
    itemPictureUrl: "",
    itemPrice: 0,
    itemSoldout: false,
    itemMenuDetail: "",
    itemMakeTime: 0,
    detail: {
      detailKcal: 0,
      detailNa: 0,
      detailGain: 0,
      detailSugar: 0,
      detailSatfat: 0,
      detailTransfat: 0,
      detailProtein: 0,
      detailCaffeine: 0,
    },
    optionCategories: [],
  });

  const { data: menuDetail } = useQuery({
    queryKey: ["menuDetail", menu?.itemId],
    queryFn: async () => {
      if (!menu?.itemId) return null;
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/menus/item/${menu.itemId}`
      );
      return response.json();
    },
    enabled: !!menu?.itemId,
  });

  useEffect(() => {
    if (menuDetail) {
      setFormData({
        ...menu,
        ...menuDetail,
        detail: menuDetail.detail || {
          detailKcal: 0,
          detailNa: 0,
          detailGain: 0,
          detailSugar: 0,
          detailSatfat: 0,
          detailTransfat: 0,
          detailProtein: 0,
          detailCaffeine: 0,
        },
        optionCategories: menuDetail.optionCategories || [],
      });
    }
  }, [menuDetail, menu]);

  if (!menu) {
    return null;
  }

  const addOptionCategory = () => {
    setFormData({
      ...formData,
      optionCategories: [
        ...formData.optionCategories,
        {
          categoryName: "",
          categoryDescription: "",
          categoryOrder: formData.optionCategories.length,
          options: [],
        },
      ],
    });
  };

  const removeOptionCategory = (categoryIndex: number) => {
    const newCategories = [...formData.optionCategories];
    newCategories.splice(categoryIndex, 1);
    setFormData({ ...formData, optionCategories: newCategories });
  };

  const addOption = (categoryIndex: number) => {
    const newCategories = [...formData.optionCategories];
    newCategories[categoryIndex].options.push({
      optionName: "",
      optionPrice: 0,
      optionOrder: newCategories[categoryIndex].options.length,
      optionAvailable: true,
    });
    setFormData({ ...formData, optionCategories: newCategories });
  };

  const removeOption = (categoryIndex: number, optionIndex: number) => {
    const newCategories = [...formData.optionCategories];
    newCategories[categoryIndex].options.splice(optionIndex, 1);
    setFormData({ ...formData, optionCategories: newCategories });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>메뉴 수정</Text>
          <ScrollView
            style={styles.formContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sectionTitle}>기본 정보</Text>
            <Text style={styles.inputLabel}>메뉴명</Text>
            <TextInput
              style={styles.input}
              placeholder="메뉴명을 입력하세요"
              value={formData.itemName}
              onChangeText={(text) =>
                setFormData({ ...formData, itemName: text })
              }
            />
            <Text style={styles.inputLabel}>이미지 URL</Text>
            <TextInput
              style={styles.input}
              placeholder="이미지 URL을 입력하세요"
              value={formData.itemPictureUrl}
              onChangeText={(text) =>
                setFormData({ ...formData, itemPictureUrl: text })
              }
            />
            <Text style={styles.inputLabel}>메뉴 상세설명</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="메뉴에 대한 상세 설명을 입력하세요"
              multiline
              numberOfLines={4}
              value={formData.itemMenuDetail}
              onChangeText={(text) =>
                setFormData({ ...formData, itemMenuDetail: text })
              }
            />
            <Text style={styles.inputLabel}>메뉴 가격</Text>
            <TextInput
              style={styles.input}
              placeholder="가격을 입력하세요"
              keyboardType="numeric"
              value={formData.itemPrice.toString()}
              onChangeText={(text) =>
                setFormData({ ...formData, itemPrice: Number(text) })
              }
            />
            <Text style={styles.inputLabel}>제조 시간</Text>
            <TextInput
              style={styles.input}
              placeholder="제조 시간(분)을 입력하세요"
              keyboardType="numeric"
              value={formData.itemMakeTime?.toString() || "0"}
              onChangeText={(text) =>
                setFormData({ ...formData, itemMakeTime: Number(text) || 0 })
              }
            />

            <Text style={styles.sectionTitle}>영양성분</Text>
            <View style={styles.nutritionContainer}>
              <View style={styles.nutritionColumn}>
                <Text style={styles.inputLabel}>칼로리</Text>
                <TextInput
                  style={styles.input}
                  placeholder="칼로리(kcal)를 입력하세요"
                  keyboardType="numeric"
                  value={formData.detail.detailKcal.toString()}
                  onChangeText={(text) =>
                    setFormData({
                      ...formData,
                      detail: { ...formData.detail, detailKcal: Number(text) },
                    })
                  }
                />
                <Text style={styles.inputLabel}>나트륨</Text>
                <TextInput
                  style={styles.input}
                  placeholder="나트륨(mg)을 입력하세요"
                  keyboardType="numeric"
                  value={formData.detail.detailNa.toString()}
                  onChangeText={(text) =>
                    setFormData({
                      ...formData,
                      detail: { ...formData.detail, detailNa: Number(text) },
                    })
                  }
                />
                <Text style={styles.inputLabel}>탄수화물</Text>
                <TextInput
                  style={styles.input}
                  placeholder="탄수화물(g)을 입력하세요"
                  keyboardType="numeric"
                  value={formData.detail.detailGain.toString()}
                  onChangeText={(text) =>
                    setFormData({
                      ...formData,
                      detail: { ...formData.detail, detailGain: Number(text) },
                    })
                  }
                />
                <Text style={styles.inputLabel}>당류</Text>
                <TextInput
                  style={styles.input}
                  placeholder="당류(g)를 입력하세요"
                  keyboardType="numeric"
                  value={formData.detail.detailSugar.toString()}
                  onChangeText={(text) =>
                    setFormData({
                      ...formData,
                      detail: { ...formData.detail, detailSugar: Number(text) },
                    })
                  }
                />
              </View>
              <View style={styles.nutritionColumn}>
                <Text style={styles.inputLabel}>포화지방</Text>
                <TextInput
                  style={styles.input}
                  placeholder="포화지방(g)을 입력하세요"
                  keyboardType="numeric"
                  value={formData.detail.detailSatfat.toString()}
                  onChangeText={(text) =>
                    setFormData({
                      ...formData,
                      detail: {
                        ...formData.detail,
                        detailSatfat: Number(text),
                      },
                    })
                  }
                />
                <Text style={styles.inputLabel}>트랜스지방</Text>
                <TextInput
                  style={styles.input}
                  placeholder="트랜스지방(g)을 입력하세요"
                  keyboardType="numeric"
                  value={formData.detail.detailTransfat.toString()}
                  onChangeText={(text) =>
                    setFormData({
                      ...formData,
                      detail: {
                        ...formData.detail,
                        detailTransfat: Number(text),
                      },
                    })
                  }
                />
                <Text style={styles.inputLabel}>단백질</Text>
                <TextInput
                  style={styles.input}
                  placeholder="단백질(g)을 입력하세요"
                  keyboardType="numeric"
                  value={formData.detail.detailProtein.toString()}
                  onChangeText={(text) =>
                    setFormData({
                      ...formData,
                      detail: {
                        ...formData.detail,
                        detailProtein: Number(text),
                      },
                    })
                  }
                />
                <Text style={styles.inputLabel}>카페인</Text>
                <TextInput
                  style={styles.input}
                  placeholder="카페인(mg)을 입력하세요"
                  keyboardType="numeric"
                  value={formData.detail.detailCaffeine.toString()}
                  onChangeText={(text) =>
                    setFormData({
                      ...formData,
                      detail: {
                        ...formData.detail,
                        detailCaffeine: Number(text),
                      },
                    })
                  }
                />
              </View>
            </View>

            <Text style={styles.sectionTitle}>옵션 카테고리</Text>
            {formData.optionCategories.map((category, categoryIndex) => (
              <View key={categoryIndex} style={styles.categoryContainer}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryTitle}>
                    카테고리 {categoryIndex + 1}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeOptionCategory(categoryIndex)}
                    style={styles.deleteButton}
                  >
                    <Ionicons name="trash-outline" size={24} color="#ff4444" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.inputLabel}>카테고리 이름</Text>
                <TextInput
                  style={styles.input}
                  placeholder="카테고리 이름을 입력하세요"
                  value={category.categoryName}
                  onChangeText={(text) => {
                    const newCategories = [...formData.optionCategories];
                    newCategories[categoryIndex] = {
                      ...category,
                      categoryName: text,
                    };
                    setFormData({
                      ...formData,
                      optionCategories: newCategories,
                    });
                  }}
                />
                <Text style={styles.inputLabel}>카테고리 설명</Text>
                <TextInput
                  style={styles.input}
                  placeholder="카테고리 설명을 입력하세요"
                  value={category.categoryDescription}
                  onChangeText={(text) => {
                    const newCategories = [...formData.optionCategories];
                    newCategories[categoryIndex] = {
                      ...category,
                      categoryDescription: text,
                    };
                    setFormData({
                      ...formData,
                      optionCategories: newCategories,
                    });
                  }}
                />

                <Text style={styles.subSectionTitle}>옵션</Text>
                {category.options.map((option, optionIndex) => (
                  <View key={optionIndex} style={styles.optionContainer}>
                    <View style={styles.optionHeader}>
                      <Text style={styles.optionTitle}>
                        옵션 {optionIndex + 1}
                      </Text>
                      <TouchableOpacity
                        onPress={() => removeOption(categoryIndex, optionIndex)}
                        style={styles.deleteButton}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={20}
                          color="#ff4444"
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.inputLabel}>옵션 이름</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="옵션 이름을 입력하세요"
                      value={option.optionName}
                      onChangeText={(text) => {
                        const newCategories = [...formData.optionCategories];
                        newCategories[categoryIndex].options[optionIndex] = {
                          ...option,
                          optionName: text,
                        };
                        setFormData({
                          ...formData,
                          optionCategories: newCategories,
                        });
                      }}
                    />
                    <Text style={styles.inputLabel}>옵션 가격</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="옵션 가격을 입력하세요"
                      keyboardType="numeric"
                      value={option.optionPrice.toString()}
                      onChangeText={(text) => {
                        const newCategories = [...formData.optionCategories];
                        newCategories[categoryIndex].options[optionIndex] = {
                          ...option,
                          optionPrice: Number(text),
                        };
                        setFormData({
                          ...formData,
                          optionCategories: newCategories,
                        });
                      }}
                    />
                  </View>
                ))}
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addOption(categoryIndex)}
                >
                  <Text style={styles.addButtonText}>옵션 추가</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={styles.addButton}
              onPress={addOptionCategory}
            >
              <Text style={styles.addButtonText}>카테고리 추가</Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>
          </View>
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
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  formContainer: {
    maxHeight: "70%",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: "#e8e4e0",
  },
  saveButton: {
    backgroundColor: "#452613",
  },
  saveButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonText: {
    color: "#333",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  nutritionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  nutritionColumn: {
    flex: 1,
  },
  categoryContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  optionContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  optionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  deleteButton: {
    padding: 4,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 12,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#ffdc00",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  addButtonText: {
    color: "#333",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default EditMenuModal;
