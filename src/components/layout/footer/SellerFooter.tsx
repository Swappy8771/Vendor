import { sellerFooterLinks, socialLinks } from "./FooterLinks";

export const SellerFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h1 className="text-xl font-bold mb-2">Shoply Seller</h1>
          <p className="text-sm text-gray-400">Grow your business with Shoply.</p>
        </div>

        {sellerFooterLinks.map((section, i) => (
          <div key={i}>
            <h4 className="font-semibold mb-2">{section.title}</h4>
            <ul className="space-y-1">
              {section.links.map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm hover:underline text-gray-300">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 md:col-span-1">
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <div className="flex gap-3">
            {socialLinks.map((social, idx) => (
              <a key={idx} href={social.href} title={social.name} className="text-xl">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center text-xs py-4 text-gray-400 border-t border-gray-700">
        © 2025 Shoply for Sellers. All rights reserved.
      </div>
    </footer>
  );
};
