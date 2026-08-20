import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider, useCart } from "@/context/cart-context";
import { products } from "@/data/products";

function Consumer() {
  const { itemCount, hydrated, addItem, clearCart } = useCart();
  return (
    <>
      <span>{hydrated ? `itens:${itemCount}` : "loading"}</span>
      <button onClick={() => addItem(products[0], "Volt", "40")}>add</button>
      <button onClick={clearCart}>clear</button>
    </>
  );
}

describe("CartProvider", () => {
  it("hydrates, adds and persists a product", async () => {
    localStorage.clear();
    render(<CartProvider><Consumer /></CartProvider>);
    await waitFor(() => expect(screen.getByText("itens:0")).toBeInTheDocument());
    await userEvent.click(screen.getByText("add"));
    expect(screen.getByText("itens:1")).toBeInTheDocument();
    await waitFor(() => expect(localStorage.getItem("sigma-cart-v1")).toContain("velocity-one"));
  });
});
