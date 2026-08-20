import type { CartItem, CartTotals } from "@/types/cart";
import type { Product } from "@/types/product";

export const MAX_QUANTITY = 10;
export const FREE_SHIPPING_THRESHOLD = 60000;
export const STANDARD_SHIPPING = 2900;

export function cartKey(productId: string, color: string, size?: string) {
  return [productId, color, size || "único"].join(":");
}

export function clampQuantity(quantity: number) {
  return Math.min(MAX_QUANTITY, Math.max(1, Math.floor(quantity) || 1));
}

export function createCartItem(product: Product, color: string, size?: string, quantity = 1): CartItem {
  return {
    key: cartKey(product.id, color, size),
    product,
    color,
    size,
    quantity: clampQuantity(quantity),
  };
}

export function calculateTotals(items: CartItem[]): CartTotals {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  return { subtotal, shipping, total: subtotal + shipping };
}
