import Image from "next/image";
import type { Product } from "@/types/product";

export function ProductGallery({ product }: { product: Product }) {
  return (
    <div className="gallery-main">
      <Image src={product.images[0].src} alt={product.images[0].alt} width={1000} height={1250} priority />
    </div>
  );
}
