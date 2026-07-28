"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getProductById,
  sizeAdjustments,
  type SizeOption,
  type SweetnessOption,
} from "./menu-data";

export type CartItem = {
  cartItemId: string;
  productId: string;
  name: string;
  size: SizeOption;
  sweetness: SweetnessOption;
  instructions: string;
  quantity: number;
  unitPrice: number;
};

export type OrderSnapshot = {
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  total: number;
};

type AddItemInput = {
  productId: string;
  size: SizeOption;
  sweetness: SweetnessOption;
  instructions: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (input: AddItemInput) => void;
  increaseQuantity: (cartItemId: string) => void;
  decreaseQuantity: (cartItemId: string) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  lastOrder: OrderSnapshot | null;
  generateOrder: () => OrderSnapshot | null;
};

const CartContext = createContext<CartContextValue | null>(null);

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderSnapshot | null>(null);

  const addItem = useCallback((input: AddItemInput) => {
    const product = getProductById(input.productId);
    if (!product) return;
    const unitPrice = product.basePrice + sizeAdjustments[input.size];

    setItems((prev) => [
      ...prev,
      {
        cartItemId: makeId(),
        productId: product.id,
        name: product.name,
        size: input.size,
        sweetness: input.sweetness,
        instructions: input.instructions,
        quantity: input.quantity,
        unitPrice,
      },
    ]);
    setDrawerOpen(true);
  }, []);

  const increaseQuantity = useCallback((cartItemId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((cartItemId: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items]
  );

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const generateOrder = useCallback((): OrderSnapshot | null => {
    if (items.length === 0) return null;
    const order: OrderSnapshot = {
      orderNumber: `HOLA-${Math.floor(100000 + Math.random() * 899999)}`,
      createdAt: new Date().toISOString(),
      items,
      total: subtotal,
    };
    setLastOrder(order);
    setItems([]);
    setDrawerOpen(false);
    return order;
  }, [items, subtotal]);

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    isDrawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    lastOrder,
    generateOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
