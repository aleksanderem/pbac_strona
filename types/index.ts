export type Brand =
  | "samsung"
  | "lg"
  | "toshiba"
  | "gree"
  | "haier"
  | "aux"
  | "kaisai"
  | "daikin"
  | "mitsubishi-electric"
  | "mitsubishi-heavy"
  | "ge";

export type ProductCategory =
  | "scienny"
  | "multisplit"
  | "kasetonowy"
  | "kanalowy"
  | "podlogowy"
  | "przenosny";

export interface ProductVariant {
  power: string;
  area: string;
  price: number;
  energyClassCool?: string;
  energyClassHeat?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Product {
  slug: string;
  name: string;
  brand: Brand;
  category: ProductCategory;
  tagline: string;
  description: string;
  descriptionLong: string[];
  features: string[];
  advantages: { title: string; desc: string; icon: string }[];
  specs: {
    energyClass: string;
    refrigerant: string;
    noiseLevel: string;
    wifi: boolean;
    heating: boolean;
    dimensions?: string;
    weight?: string;
  };
  variants: ProductVariant[];
  warranty: { standard: number; compressor: number };
  imageUrl: string;
  imageAlt: string;
  gallery: GalleryImage[];
  faq?: FAQ[];
}

export interface BrandInfo {
  slug: Brand;
  name: string;
  description: string;
  logo: string;
  country: string;
}

export interface ArticleSection {
  heading: string;
  content: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  summary?: string;
  sections: ArticleSection[];
  date: string;
  category: string;
  readingTime: number;
  coverImage: string;
  coverAlt: string;
  authorSlug: string;
  relatedSlugs: string[];
}

export interface Author {
  slug: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface LocationSection {
  heading: string;
  content: string;
}

export interface Location {
  slug: string;
  name: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  sections: LocationSection[];
  faq: FAQ[];
  coordinates: { lat: number; lng: number };
  services: ("montaz" | "serwis")[];
}

export interface ServiceStep {
  title: string;
  description: string;
}

export interface ServiceInfo {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  steps: ServiceStep[];
  faq: FAQ[];
  link: string;
}

export interface Testimonial {
  name: string;
  body: string;
  rating: number;
  location?: string;
  service?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
