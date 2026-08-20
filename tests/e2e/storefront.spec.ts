import { test, expect } from "@playwright/test";

test("filters, adds a product and opens checkout", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Beyond limits/i })).toBeVisible();
  await page.getByRole("link", { name: /Explorar coleção/i }).first().click();
  const mobile = (page.viewportSize()?.width || 1280) <= 960;
  if (mobile) {
    await page.getByRole("button", { name: "Filtros" }).click();
  }
  await page.getByLabel("Categoria").filter({ visible: true }).selectOption("calçados");
  if (mobile) await page.getByRole("button", { name: "Ver resultados" }).click();
  await page.getByRole("link", { name: /Ver Velocity One/i }).click();
  await page.getByRole("button", { name: "40" }).click();
  await page.getByRole("button", { name: /Adicionar ao carrinho/i }).click();
  await expect(page.getByRole("dialog", { name: /Seu carrinho/i })).toBeVisible();
  await page.getByRole("link", { name: "Ver carrinho" }).click();
  await expect(page.getByRole("heading", { name: /Seu carrinho/i })).toBeVisible();
  await page.getByRole("link", { name: /Finalizar compra/i }).click();
  await expect(page.getByRole("heading", { name: /Último passo/i })).toBeVisible();
});
