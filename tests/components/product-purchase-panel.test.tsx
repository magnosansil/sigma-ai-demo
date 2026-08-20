import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider } from "@/context/cart-context";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { products } from "@/data/products";

describe("ProductPurchasePanel", () => {
  it("requires a size before adding apparel", async () => {
    render(<CartProvider><ProductPurchasePanel product={products[1]} /></CartProvider>);
    await userEvent.click(screen.getByRole("button", { name: /adicionar ao carrinho/i }));
    expect(screen.getByRole("alert")).toHaveTextContent("Selecione um tamanho");
  });

  it("adds after choosing a size", async () => {
    render(<CartProvider><ProductPurchasePanel product={products[1]} /></CartProvider>);
    await userEvent.click(screen.getByRole("button", { name: "M" }));
    await userEvent.click(screen.getByRole("button", { name: /adicionar ao carrinho/i }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
