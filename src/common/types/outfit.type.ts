export enum OutfitCategory {
  PANTS = 'pants',
  SHOES = 'shoes',
  T_SHIRTS = 't_shirts',
  CAPS = 'caps',
  SNEAKERS = 'sneakers',
  OTHER = 'other',
}

export enum OutfitSize {
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

export enum OutfitColor {
  WHITE = 'white',
  BLACK = 'black',
  RED = 'red',
  BLUE = 'blue',
  GRAY = 'gray',
  GREEN = 'green',
  YELLOW = 'yellow',
  ORANGE = 'orange',
  PURPLE = 'purple',
}

export interface Outfit {
  id: string;
  brand: string;
  category: OutfitCategory;
  colors: OutfitColor[];
  code: string;
  description?: string;
  image_urls: string[];
  image_main: string;
  name: string;
  price: number;
  sizes: OutfitSize[];
  store_id: string;
}

export interface CreateOutfit {
  code: string;
  title: string;
  brand: string;
  images: string[];
  price: number;
  description?: string;
  category: OutfitCategory | string;
  sizes: OutfitSize[];
  colors: OutfitColor[];
}

export interface UpdateOutfit extends CreateOutfit {}
