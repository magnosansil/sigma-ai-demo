import { formatCurrency } from "@/lib/currency";

export function Price({ value }: { value: number }) {
  return <span className="price">{formatCurrency(value)}</span>;
}
