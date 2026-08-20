import type { Product } from "@/types/product";

export interface CartItem {
  key: string;
  product: Product;
  color: string;
  size?: string;
  quantity: number;
}

export interface CartTotals {
  subtotal: number;
  shipping: number;
  total: number;
}
