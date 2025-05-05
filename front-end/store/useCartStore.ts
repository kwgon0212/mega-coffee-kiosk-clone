import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem } from "@/type";

type CartStore = {
  cart: CartItem[];
  count: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  setQuantity: (createdCartItemAt: Date, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  // persist(
  (set) => ({
    cart: [],
    count: 0,
    addToCart: (item) =>
      set((state) => ({
        cart: [...state.cart, item],
        count: state.count + 1,
      })),
    removeFromCart: (itemId: number) =>
      set((state) => ({
        cart: state.cart.filter((item) => item.id !== itemId),
        count: state.count - 1,
      })),
    setQuantity: (createdCartItemAt: Date, quantity: number) =>
      set((state) => ({
        cart: state.cart.map((item) =>
          item.createdCartItemAt === createdCartItemAt
            ? { ...item, quantity }
            : item
        ),
      })),
    clearCart: () => set({ cart: [], count: 0 }),
  })
  // {
  //   name: "cart-storage",
  //   storage: createJSONStorage(() => AsyncStorage),
  // }
  // )
);
