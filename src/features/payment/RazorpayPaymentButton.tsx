import { createRazorpayOrder } from './razorAPI';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const RazorpayPaymentButton = ({ amount }: { amount: number }) => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    // 1. Create Razorpay order from backend
    const order = await createRazorpayOrder(amount); // amount in paisa

    // 2. Setup Razorpay Checkout
    const options = {
      key: 'YOUR_RAZORPAY_TEST_KEY', // 🧠 Replace with Razorpay test key
      amount: order.amount,
      currency: order.currency,
      name: "EcomApp",
      description: "Purchase Products",
      order_id: order.id, // From backend
      handler: function (response: any) {
        alert("Payment Success! Razorpay ID: " + response.razorpay_payment_id);
        // Optional: You can show confirmation or redirect here
      },
      prefill: {
        name: "Swapnil Patil",
        email: "user@example.com",
        contact: "9999999999"
      },
      notes: {
        address: "Ecom Buyer Address"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Pay ₹{amount / 100}
    </button>
  );
};
