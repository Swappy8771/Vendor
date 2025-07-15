// src/components/shared/Sidebar/sidebarConfig.ts

export const sidebarConfig = {
  user: [
    { label: 'Home', icon: '🏠', path: '/user/home' },
    { label: 'Orders', icon: '📦', path: '/user/orders' },
    { label: 'Wishlist', icon: '❤️', path: '/user/wishlist' },
    { label: 'Profile', icon: '👤', path: '/user/profile' },
    { label: 'Add To Cart', icon: '👤', path: '/user/add-to-cart' },

  ],
  seller: [
    { label: 'Dashboard', icon: '📊', path: '/seller/dashboard' },
    { label: 'My Products', icon: '🛍️', path: '/seller/products' },
    { label: 'Orders', icon: '📦', path: '/seller/orders' },
    { label: 'Profile', icon: '👤', path: '/seller/profile' },
  ],
  admin: [
    { label: 'Dashboard', icon: '📊', path: '/admin/dashboard' },
    { label: 'Manage Users', icon: '🧑‍💼', path: '/admin/users' },
    { label: 'Manage Sellers', icon: '🏪', path: '/admin/sellers' },
    { label: 'Manage Orders', icon: '📦', path: '/admin/orders' },
    { label: 'Categories', icon: '📂', path: '/admin/categories' },
  ],
};
