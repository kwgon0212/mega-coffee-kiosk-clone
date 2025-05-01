import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import Button from "@/components/Button";

export interface MenuFormData {
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  category: string;
  options: string[];
  nutrition: {
    kcal: string;
    natrium: string;
    carbohydrate: string;
    sugar: string;
    fat: string;
    transFat: string;
    protein: string;
    caffeine: string;
    allergy: string[];
  };
}

interface AddMenuModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (data: MenuFormData) => void;
  categories: string[];
}

const initialFormData: MenuFormData = {
  name: "",
  price: "",
  description: "",
  imageUrl: "",
  category: "커피",
  options: [],
  nutrition: {
    kcal: "",
    natrium: "",
    carbohydrate: "",
    sugar: "",
    fat: "",
    transFat: "",
    protein: "",
    caffeine: "",
    allergy: [],
  },
};

const AddMenuModal = ({
  isVisible,
  onClose,
  onSubmit,
  categories,
}: AddMenuModalProps) => {
  const [formData, setFormData] = useState<MenuFormData>(initialFormData);
  const [newOption, setNewOption] = useState("");

  const handleAddOption = () => {
    if (newOption.trim()) {
      setFormData({
        ...formData,
        options: [...formData.options, newOption.trim()],
      });
      setNewOption("");
    }
  };

  const handleRemoveOption = (index: number) => {
    setFormData({
      ...formData,
      options: formData.options.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData(initialFormData);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView
            style={styles.modalScroll}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.modalTitle}>새 메뉴 추가</Text>

            {/* 기본 정보 */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>메뉴명</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                placeholder="메뉴명을 입력하세요"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>가격</Text>
              <TextInput
                style={styles.input}
                value={formData.price}
                onChangeText={(text) =>
                  setFormData({ ...formData, price: text })
                }
                placeholder="가격을 입력하세요"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>설명</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) =>
                  setFormData({ ...formData, description: text })
                }
                placeholder="메뉴 설명을 입력하세요"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>카테고리</Text>
              <View style={styles.categoryButtonGroup}>
                {categories.map((category) => (
                  <Pressable
                    key={category}
                    style={[
                      styles.categoryButton,
                      formData.category === category && styles.selectedCategory,
                    ]}
                    onPress={() =>
                      setFormData({ ...formData, category: category })
                    }
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        formData.category === category &&
                          styles.selectedCategoryText,
                      ]}
                    >
                      {category}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* 옵션 추가 */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>옵션</Text>
              <View style={styles.optionInputContainer}>
                <TextInput
                  style={[styles.input, styles.optionInput]}
                  value={newOption}
                  onChangeText={setNewOption}
                  placeholder="옵션을 입력하세요"
                />
                <Button
                  text="추가"
                  onPress={handleAddOption}
                  style={styles.optionAddButton}
                />
              </View>
              <View style={styles.optionList}>
                {formData.options.map((option, index) => (
                  <View key={index} style={styles.optionItem}>
                    <Text>{option}</Text>
                    <Pressable
                      onPress={() => handleRemoveOption(index)}
                      style={styles.optionRemoveButton}
                    >
                      <Text style={styles.optionRemoveText}>×</Text>
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>

            {/* 영양성분 */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>영양성분</Text>
              <View style={styles.nutritionGrid}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>칼로리(kcal)</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.nutrition.kcal}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        nutrition: { ...formData.nutrition, kcal: text },
                      })
                    }
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>나트륨(mg)</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.nutrition.natrium}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        nutrition: { ...formData.nutrition, natrium: text },
                      })
                    }
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>탄수화물(g)</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.nutrition.carbohydrate}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        nutrition: {
                          ...formData.nutrition,
                          carbohydrate: text,
                        },
                      })
                    }
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>당류(g)</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.nutrition.sugar}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        nutrition: { ...formData.nutrition, sugar: text },
                      })
                    }
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>지방(g)</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.nutrition.fat}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        nutrition: { ...formData.nutrition, fat: text },
                      })
                    }
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>트랜스지방(g)</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.nutrition.transFat}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        nutrition: { ...formData.nutrition, transFat: text },
                      })
                    }
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>단백질(g)</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.nutrition.protein}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        nutrition: { ...formData.nutrition, protein: text },
                      })
                    }
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>카페인(mg)</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.nutrition.caffeine}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        nutrition: { ...formData.nutrition, caffeine: text },
                      })
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* 알레르기 정보 */}
              <View style={[styles.formGroup, { marginTop: 10 }]}>
                <Text style={styles.nutritionLabel}>알레르기 유발 성분</Text>
                <View style={styles.optionInputContainer}>
                  <TextInput
                    style={[styles.input, styles.optionInput]}
                    value={newOption}
                    onChangeText={setNewOption}
                    placeholder="알레르기 유발 성분을 입력하세요"
                  />
                  <Button
                    text="추가"
                    onPress={() => {
                      if (newOption.trim()) {
                        setFormData({
                          ...formData,
                          nutrition: {
                            ...formData.nutrition,
                            allergy: [
                              ...formData.nutrition.allergy,
                              newOption.trim(),
                            ],
                          },
                        });
                        setNewOption("");
                      }
                    }}
                    style={styles.optionAddButton}
                  />
                </View>
                <View style={styles.optionList}>
                  {formData.nutrition.allergy.map((item, index) => (
                    <View key={index} style={styles.optionItem}>
                      <Text>{item}</Text>
                      <Pressable
                        onPress={() => {
                          setFormData({
                            ...formData,
                            nutrition: {
                              ...formData.nutrition,
                              allergy: formData.nutrition.allergy.filter(
                                (_, i) => i !== index
                              ),
                            },
                          });
                        }}
                        style={styles.optionRemoveButton}
                      >
                        <Text style={styles.optionRemoveText}>×</Text>
                      </Pressable>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.modalActions}>
              <Button
                text="취소"
                onPress={() => {
                  onClose();
                  setFormData(initialFormData);
                }}
                style={styles.modalButton}
                backgroundColor="#888"
              />
              <Button
                text="저장"
                onPress={handleSubmit}
                style={styles.modalButton}
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
    width: "90%",
    maxHeight: "70%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalScroll: {
    maxHeight: "100%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  categoryButtonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
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
  categoryText: {
    fontSize: 16,
    color: "#666",
  },
  selectedCategoryText: {
    color: "white",
  },
  optionInputContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  optionInput: {
    flex: 1,
  },
  optionAddButton: {
    width: 80,
  },
  optionList: {
    gap: 8,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
  },
  optionRemoveButton: {
    padding: 5,
  },
  optionRemoveText: {
    fontSize: 20,
    color: "#ff4444",
  },
  nutritionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  nutritionItem: {
    flex: 1,
    minWidth: "45%",
  },
  nutritionLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
  },
});

export default AddMenuModal;
