export interface OrderItem {
  product: string;
  seller: string;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  paymentResult?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}
