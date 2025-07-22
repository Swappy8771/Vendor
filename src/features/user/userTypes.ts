export interface Address {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface SellerInfo {
  shopName?: string;
  gstNumber?: string;
  bio?: string;
  shopLogo?: string;
  verified?: boolean;
}

export interface User {
  isVerified?: boolean;
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: 'user' | 'seller' | 'admin';
  addresses?: Address[];
  sellerInfo?: SellerInfo;
  createdAt?: string;
  updatedAt?: string;
}
