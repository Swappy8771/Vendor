export interface Cart {
  product: string; // Product ID
  seller: string;  // Seller ID
  quantity: number;
}

export interface CartState {
  items: Cart[];
  loading: boolean;
  error: string | null;
}
