import { describe, expect, it } from "vitest";
import { checkoutSchema } from "@/lib/checkout-schema";

const valid = {
  name: "Pessoa de Teste",
  email: "teste@example.com",
  phone: "11999999999",
  postalCode: "01001000",
  address: "Praça da Sé",
  number: "1",
  city: "São Paulo",
  state: "SP",
  shipping: "standard",
  cardName: "PESSOA TESTE",
  cardNumber: "4242424242424242",
  expiry: "12/30",
  cvv: "123",
};

describe("checkout schema", () => {
  it("accepts fictitious complete data", () => {
    expect(checkoutSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects incomplete data", () => {
    expect(checkoutSchema.safeParse({ ...valid, email: "invalid" }).success).toBe(false);
  });
});
