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
      "2샷 추가": 1200;
    };
  };
}

export interface CartItem {
  id: number;
  store: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  isUseTumbler: boolean;
  options: {
    shot?: string | null;
    syrup?: string[];
    sweetener?: string[];
    topping?: string[];
  };
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

const americanoOptions: PersonalOption = {
  샷: {
    연하게: 0,
    "샷 추가": 600,
    "2샷 추가": 1200,
  },
  당도: {
    연유추가: 700,
    "저당 스테비아 추가": 700,
  },
  토핑: {
    "초코젤라또 추가": 700,
    휘핑추가: 500,
    "타피오카펄 추가": 700,
  },
};

const bigAmericanoOptions: PersonalOption = {
  샷: {
    연하게: 0,
    "샷 추가": 600,
    "2샷 추가": 1200,
  },
  당도: {
    연유추가: 700,
    "저당 스테비아 추가": 700,
  },
  토핑: {
    "초코젤라또 추가": 700,
    휘핑추가: 500,
    "타피오카펄 추가": 700,
  },
};
