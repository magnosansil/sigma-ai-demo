"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Price } from "@/components/ui/price";
import type { Product } from "@/types/product";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const { addItem } = useCart();

  function add() {
    if (product.sizes.length && !size) {
      setError("Selecione um tamanho antes de adicionar.");
      return;
    }
    setError("");
    addItem(product, color, size || undefined, quantity);
  }

  return (
    <div className="purchase">
      <span className="eyebrow">{product.category} / {product.audience}</span>
      <h1>{product.name}</h1>
      <p className="lead">{product.description}</p>
      <Price value={product.price} />
      <span className="option-label">Cor · {color}</span>
      <div className="swatches">
        {product.colors.map((option) => (
          <button className={`swatch ${color === option.name ? "selected" : ""}`} key={option.name} onClick={() => setColor(option.name)} aria-pressed={color === option.name}>
            <span className="swatch-dot" style={{ background: option.hex }} />{option.name}
          </button>
        ))}
      </div>
      {product.sizes.length > 0 && (
        <>
          <span className="option-label">Tamanho</span>
          <div className="sizes">
            {product.sizes.map((option) => (
              <button className={`size-btn ${size === option ? "selected" : ""}`} key={option} onClick={() => { setSize(option); setError(""); }} aria-pressed={size === option}>{option}</button>
            ))}
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
        </>
      )}
      <div className="purchase-row">
        <select className="quantity" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} aria-label="Quantidade">
          {[1, 2, 3, 4, 5].map((number) => <option key={number}>{number}</option>)}
        </select>
        <button className="btn btn-dark" onClick={add}><ShoppingBag size={17} /> Adicionar ao carrinho</button>
      </div>
      <ul className="details-list">{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
    </div>
  );
}
