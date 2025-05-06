import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import HeaderOptions from "@/components/HeaderOptions";
import MenuCard from "../MenuCard";
import CartButton from "@/components/CartButton";
import { Menu } from "@/type";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/ui/Layout";

interface MenuList {
  itemId: number;
  itemName: string;
  itemPrice: number;
  itemSoldout: boolean;
  itemCategory: string;
  itemSubCategory: string;
  itemPictureUrl: string;
}

export default function StoreMenu() {
  const { store } = useLocalSearchParams<{ store: string }>();
  const [selectedCategory, setSelectedCategory] = useState("coffee");
  const [selectedSubCategory, setSelectedSubCategory] = useState("espresso");
  const [filteredMenuList, setFilteredMenuList] = useState<MenuList[]>([]);
  const [filter, setFilter] = useState(1);

  const fetchMenuCategoryData = async (
    category: string
  ): Promise<MenuList[]> => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/menus?category=${category}`
    );
    const data = await response.json();
    return data;
  };

  const getSubCategory = (menuList: MenuList[]) => {
    return [...new Set(menuList.map((menu) => menu.itemSubCategory))];
  };

  const getFilteredMenuList = (menuList: MenuList[], subCategory: string) => {
    return menuList.filter((menu) => menu.itemSubCategory === subCategory);
  };

  const {
    data: menuList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["menuList", selectedCategory],
    queryFn: () => fetchMenuCategoryData(selectedCategory),
  });

  useEffect(() => {
    if (menuList) {
      setFilteredMenuList(getFilteredMenuList(menuList, selectedSubCategory));
    }
  }, [menuList, selectedSubCategory]);

  useEffect(() => {
    if (menuList) {
      setSelectedSubCategory(getSubCategory(menuList)[0]);
    }
  }, [menuList]);
  console.log(JSON.stringify(menuList, null, 2));

  if (isLoading)
    return (
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Loading...</Text>
      </Layout>
    );

  if (error)
    return (
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Error: {error.message}</Text>
      </Layout>
    );

  if (!menuList) return null;

  return (
    <Layout>
      <HeaderOptions
        selectedOption={selectedCategory}
        onSelect={setSelectedCategory}
        options={[
          { id: "coffee", label: "커피" },
          { id: "decaf", label: "디카페인" },
          { id: "drink", label: "음료" },
          { id: "tea", label: "티" },
        ]}
      />

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subCategoryContainer}
        >
          {getSubCategory(menuList).map((subCategory) => (
            <Pressable
              key={subCategory}
              style={[
                styles.subCategoryButton,
                selectedSubCategory === subCategory &&
                  styles.selectedSubCategory,
              ]}
              onPress={() => setSelectedSubCategory(subCategory)}
            >
              <Text
                style={[
                  styles.subCategoryText,
                  selectedSubCategory === subCategory &&
                    styles.selectedSubCategory,
                ]}
              >
                {subCategory}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.filter}>
          <Text style={styles.filterText}>{menuList.length}개</Text>
          <Pressable onPress={() => setFilter((prev) => (prev === 1 ? 3 : 1))}>
            <Text style={styles.filterText}>{filter}열 보기</Text>
          </Pressable>
        </View>

        <View>
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              rowGap: 30,
              paddingHorizontal: 20,
              paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
          >
            {filteredMenuList.map((menu) => (
              <MenuCard
                key={menu.itemId + menu.itemName}
                menu={menu}
                filter={filter === 1 ? 3 : 1}
                onPress={() => {
                  router.push(`/(menu)/${store}/${menu.itemId}`);
                }}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{store}</Text>
        <CartButton color="white" />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  filter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  mainContainer: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    rowGap: 30,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: "black",
    height: 100,
  },
  footerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  filterText: {
    fontSize: 18,
  },
  subCategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 10,
  },
  subCategoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 999,
  },
  selectedSubCategory: {
    backgroundColor: "black",
    color: "white",
  },
  subCategoryText: {
    color: "black",
    fontSize: 16,
  },
});
