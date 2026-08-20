export const categories = ["calçados", "roupas", "acessórios"] as const;
export const audiences = ["feminino", "masculino", "unissex"] as const;

export type Category = (typeof categories)[number];
export type Audience = (typeof audiences)[number];

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: Category;
  audience: Audience;
  price: number;
  featured?: boolean;
  newArrival?: boolean;
  colors: ProductColor[];
  sizes: string[];
  images: ProductImage[];
  details: string[];
  stock: number;
}
