export interface ProductImage {
  url: string;
  public_id?: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  category: string;
  images: ProductImage[];
  seller: string; // or { _id: string; name: string } if populated
  ratings: number;
  numReviews: number;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}
