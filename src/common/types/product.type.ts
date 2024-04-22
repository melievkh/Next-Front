export enum ProductCategory {
  SHOES = 'shoes',
  CLOTHES = 'clothes',
}

export interface Product {
  _id: string;
  code: number;
  title: string;
  brand: string;
  images: string[];
  price: number;
  description?: string;
  category: ProductCategory;
  sizes: string[];
  colors: string[];
}
