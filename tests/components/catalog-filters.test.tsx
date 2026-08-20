import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { CatalogFilters } from "@/components/catalog/catalog-filters";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  usePathname: () => "/catalogo",
  useSearchParams: () => new URLSearchParams("sort=price-asc"),
}));

describe("CatalogFilters", () => {
  it("updates one filter and preserves sorting", async () => {
    render(<CatalogFilters />);
    await userEvent.selectOptions(screen.getByLabelText("Categoria"), "roupas");
    expect(push).toHaveBeenCalledWith("/catalogo?sort=price-asc&category=roupas", { scroll: false });
  });
});
