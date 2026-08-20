import { test, expect } from "@playwright/test";

test("filters, adds a product and opens checkout", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Beyond limits/i })).toBeVisible();
  await page.getByRole("link", { name: /Explorar coleção/i }).first().click();
  await page.getByLabel("Categoria").first().selectOption("calçados");
  await page.getByRole("link", { name: /Ver Velocity One/i }).click();
  await page.getByRole("button", { name: "40" }).click();
  await page.getByRole("button", { name: /Adicionar ao carrinho/i }).click();
  await expect(page.getByRole("dialog", { name: /Seu carrinho/i })).toBeVisible();
  await page.getByRole("link", { name: "Ver carrinho" }).click();
  await expect(page.getByRole("heading", { name: /Seu carrinho/i })).toBeVisible();
  await page.getByRole("link", { name: /Finalizar compra/i }).click();
  await expect(page.getByRole("heading", { name: /Último passo/i })).toBeVisible();
});
