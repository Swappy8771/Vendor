import API from '../../services/axios';
import type { Order } from './orderTypes';

// Create Order
export const placeOrder = async (order: Partial<Order>): Promise<Order> => {
  const res = await API.post('/api/orders', order);
  return res.data;
};

// Get My Orders
export const fetchUserOrders = async (): Promise<Order[]> => {
  const res = await API.get('/api/orders');
  return res.data;
};

// Get Order by ID
export const fetchOrderById = async (id: string): Promise<Order> => {
  const res = await API.get(`/api/orders/${id}`);
  return res.data;
};

// Admin/Seller: Update Order Status
export const updateOrderStatus = async ({
  id,
  status
}: {
  id: string;
  status: string;
}): Promise<Order> => {
  const res = await API.put(`/api/orders/${id}`, { status });
  return res.data;
};
