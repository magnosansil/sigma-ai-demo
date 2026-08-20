import { describe, expect, it } from "vitest";
import { filterProducts, getProduct } from "@/lib/catalog";

describe("catalog", () => {
  it("finds a product by slug", () => {
    expect(getProduct("velocity-one")?.name).toBe("Velocity One");
  });

  it("combines filters and ignores invalid category", () => {
    expect(filterProducts({ category: "roupas", audience: "feminino" })).toHaveLength(2);
    expect(filterProducts({ category: "inválida" })).toHaveLength(8);
  });

  it("searches and sorts prices", () => {
    expect(filterProducts({ query: "tênis" })[0]?.slug).toBe("velocity-one");
    const sorted = filterProducts({ sort: "price-asc" });
    expect(sorted[0].price).toBeLessThanOrEqual(sorted.at(-1)!.price);
  });
});
