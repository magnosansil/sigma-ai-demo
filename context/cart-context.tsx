"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState, type PropsWithChildren } from "react";
import { clampQuantity, createCartItem } from "@/lib/cart";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

const STORAGE_KEY = "sigma-cart-v1";

type Action =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; item: CartItem }
  | { type: "quantity"; key: string; quantity: number }
  | { type: "remove"; key: string }
  | { type: "clear" };

function reducer(items: CartItem[], action: Action): CartItem[] {
  if (action.type === "hydrate") return action.items;
  if (action.type === "clear") return [];
  if (action.type === "remove") return items.filter((item) => item.key !== action.key);
  if (action.type === "quantity") {
    return items.map((item) => item.key === action.key ? { ...item, quantity: clampQuantity(action.quantity) } : item);
  }
  const existing = items.find((item) => item.key === action.item.key);
  if (existing) {
    return items.map((item) =>
      item.key === action.item.key
        ? { ...item, quantity: clampQuantity(item.quantity + action.item.quantity) }
        : item,
    );
  }
  return [...items, action.item];
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  hydrated: boolean;
  drawerOpen: boolean;
  message: string;
  addItem: (product: Product, color: string, size?: string, quantity?: number) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function isStoredCart(value: unknown): value is { version: 1; items: CartItem[] } {
  if (!value || typeof value !== "object") return false;
  const payload = value as { version?: unknown; items?: unknown };
  return payload.version === 1 && Array.isArray(payload.items);
}

export function CartProvider({ children }: PropsWithChildren) {
  const [items, dispatch] = useReducer(reducer, []);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : null;
      if (isStoredCart(parsed)) {
        const safe = parsed.items.filter((item) =>
          item && typeof item.key === "string" && typeof item.quantity === "number" && item.product?.id,
        );
        dispatch({ type: "hydrate", items: safe });
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, items }));
    }
  }, [items, hydrated]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", drawerOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [drawerOpen]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    hydrated,
    drawerOpen,
    message,
    addItem(product, color, size, quantity = 1) {
      dispatch({ type: "add", item: createCartItem(product, color, size, quantity) });
      setMessage(`${product.name} adicionado ao carrinho.`);
      setDrawerOpen(true);
    },
    updateQuantity(key, quantity) {
      dispatch({ type: "quantity", key, quantity });
      setMessage("Quantidade atualizada.");
    },
    removeItem(key) {
      dispatch({ type: "remove", key });
      setMessage("Item removido do carrinho.");
    },
    clearCart() {
      dispatch({ type: "clear" });
      setMessage("Carrinho esvaziado.");
    },
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
  }), [items, hydrated, drawerOpen, message]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <p aria-live="polite" className="sr-only">{message}</p>
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
