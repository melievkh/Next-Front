export enum ProductCategory {
  SHOES = 'shoes',
  CLOTHES = 'clothes',
}

export enum ProductSize {
  MEDIUM = 'M',
  SMALL = 'S',
  XSMALL = 'XS',
  LARGE = 'L',
  XLARGE = 'XL',
  XXLARGE = 'XXL',
  S38 = '38',
  S39 = '39',
  S40 = '40',
  S41 = '41',
  S42 = '42',
  S43 = '43',
  S44 = '44',
  S45 = '45',
  S46 = '46',
}

export enum ProductColor {
  WHITE = 'white',
  BLACK = 'black',
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow',
  ORANGE = 'orange',
  PURPLE = 'purple',
}

export enum ProductBrand {
  NIKE = 'Nike',
  ADIDAS = 'Adidas',
  REEBOK = 'Reebok',
}

export interface Product {
  _id: string;
  code: string;
  title: string;
  brand: string;
  images: string[];
  price: number;
  description?: string;
  category: ProductCategory;
  sizes: ProductSize[];
  colors: ProductColor[];
}
