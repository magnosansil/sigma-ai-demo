import { describe, expect, it } from "vitest";
import { products } from "@/data/products";
import { calculateTotals, cartKey, clampQuantity, createCartItem } from "@/lib/cart";

describe("cart", () => {
  it("builds stable variant keys", () => {
    expect(cartKey("one", "Volt", "40")).toBe("one:Volt:40");
  });

  it("clamps quantities", () => {
    expect(clampQuantity(0)).toBe(1);
    expect(clampQuantity(99)).toBe(10);
  });

  it("calculates shipping and totals", () => {
    const low = calculateTotals([createCartItem(products[7], "Volt")]);
    const high = calculateTotals([createCartItem(products[0], "Volt", "40")]);
    expect(low.total).toBe(low.subtotal + 2900);
    expect(high.shipping).toBe(0);
  });
});
