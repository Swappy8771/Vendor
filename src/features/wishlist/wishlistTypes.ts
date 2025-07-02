export interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  images: { url: string }[];
  seller: string;
}

export interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
}
