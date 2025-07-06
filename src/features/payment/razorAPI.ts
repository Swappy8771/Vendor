import axios from 'axios';

// Call your backend Razorpay order creator
export const createRazorpayOrder = async (amount: number) => {
  const response = await axios.post('/api/payments/intent', { amount });
  return response.data; // Should return { id, amount, currency, ... }
};
