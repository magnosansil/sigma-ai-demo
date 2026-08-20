import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link href={`/produto/${product.slug}`} aria-label={`Ver ${product.name}`}>
        <div className="product-media">
          <Image src={product.images[0].src} alt={product.images[0].alt} width={700} height={875} />
          <div className="product-badges">
            {product.newArrival && <Badge>Novo</Badge>}
            {product.featured && <Badge>Destaque</Badge>}
          </div>
        </div>
        <div className="product-meta">
          <div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-tagline">{product.tagline}</p>
          </div>
          <Price value={product.price} />
        </div>
      </Link>
    </article>
  );
}
