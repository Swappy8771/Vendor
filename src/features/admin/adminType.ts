// src/features/admin/adminType.ts
export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface AdminSeller extends AdminUser {
  sellerInfo?: {
    verified: boolean;
  };
}

export interface AdminOrder {
  _id: string;
  totalPrice: number;
  isPaid: boolean;
  createdAt: string;
  user?: {
    name: string;
    email: string;
  };
  items: {
    product: {
      name: string;
      price: number;
    };
  }[];
}

export interface AdminStats {
  users: number;
  sellers: number;
  orders: number;
  totalSales: number;
}

export interface AdminState {
  stats: AdminStats | null;
  users: AdminUser[];
  sellers: AdminSeller[];
  orders: AdminOrder[];
  loading: boolean;
  error: string | null;
}
