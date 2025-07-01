import { buyerFooterLinks, socialLinks } from "./FooterLinks";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa";

const BuyerFooter = () => {
  return (
    <footer className="bg-purple-50 text-gray-800 w-full border-t border-gray-200">
      {/* Newsletter */}
      <div className="w-full bg-purple-100 px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-purple-800">
            Sign up to our news & offers
          </h3>
          <p className="text-sm text-purple-700">
            Be the first to know about exclusive offers, new services & tools!
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="email"
            placeholder="email@address.com"
            className="px-4 py-2 w-full md:w-64 rounded border border-gray-300"
          />
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Sign Up
          </button>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="w-full px-6 py-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* Brand Info */}
        <div className="col-span-2 md:col-span-1">
          <h1 className="text-2xl font-extrabold text-purple-900 mb-2">Nilson</h1>
          <p className="text-sm text-gray-600">
            Empowering global deliveries with speed and trust.
          </p>
        </div>

        {/* Dynamic Footer Links */}
        {buyerFooterLinks.map((section, i) => (
          <div key={i}>
            <h4 className="font-semibold text-gray-700 mb-2">{section.title}</h4>
            <ul className="space-y-1">
              {section.links.map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Social Section */}
        <div className="col-span-2 md:col-span-1">
          <h4 className="font-semibold text-gray-700 mb-2">Connect with us</h4>
          <div className="flex gap-4 text-3xl text-purple-700">
            {socialLinks.map((social, idx) => (
              <a key={idx} href={social.href} title={social.name} className="hover:text-purple-900">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Trust & Payment Info */}
      <div className="w-full px-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 text-center text-sm text-gray-600 gap-4 mb-6">
          <p>🚚 Shipping to over 200 countries</p>
          <p>🔒 100% Secure Checkout</p>
          <p>💬 Outstanding Worldwide Support</p>
          <p>⭐ 9,000+ Genuine Reviews</p>
        </div>

        {/* Payment Methods */}
        <div className="flex items-center justify-center gap-6 text-3xl text-gray-600">
          <FaCcVisa />
          <FaCcMastercard />
          <FaCcPaypal />
          <FaApplePay />
          <FaGooglePay />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-xs text-gray-500 py-4 bg-purple-100">
        © 2025 Nilson. All rights reserved.
      </div>
    </footer>
  );
};

export default BuyerFooter;
