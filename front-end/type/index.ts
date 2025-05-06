export interface Menu {
  id: number;
  store: string;
  name: string;
  image: string;
  description: string;
  price: number;
  isUseTumbler: boolean;
  info: {
    kcal: number;
    natrium: number;
    carbohydrate: number;
    sugar: number;
    fat: number;
    transFat: number;
    protein: number;
    caffeine: number;
    allergy: string[];
  };
  options?: {
    shot: {
      연하게: 0;
      "샷 추가": 600;
      "2샷 추가": 12000000000000000000;
    };
  };
}

export type MenuItem = {
  itemName: string;
  itemMenuDetail: string;
  itemPrice: number;
  itemMakeTime: number;
  itemSoldout: boolean;
  detail: MenuItemDetail;
  optionCategories: OptionCategory[];
  itemPictureUrl: string;
};

export type MenuItemDetail = {
  detailKcal: number;
  detailNa: number;
  detailGain: number;
  detailSugar: number;
  detailSatfat: number;
  detailTransfat: number;
  detailProtein: number;
  detailCaffeine: number;
};

export type OptionCategory = {
  categoryName: string;
  categoryDescription: string;
  categoryOrder: number;
  options: Option[];
};

export type Option = {
  optionName: string;
  optionPrice: number;
  optionAvailable: boolean;
};

export interface CartItem {
  id: number;
  store: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  isUseTumbler: boolean;
  selectedShot: string | null;
  options: { optionName: string; optionPrice: number }[];
  perTotalPrice: number;
  createdCartItemAt: Date;
  itemMakeTime: number;
}

export interface PersonalOption {
  // shot?: Record<string, number>;
  샷?: Record<string, number>;
  당도?: Record<string, number>;
  토핑?: Record<string, number>;
  milk?: Record<string, number>;
  ice?: Record<string, number>;
  sugar?: Record<string, number>;
  whippedCream?: Record<string, number>;
  topping?: Record<string, number>;
}

export interface Order {
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
