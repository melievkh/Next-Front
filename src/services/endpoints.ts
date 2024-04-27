export const endpoints = {
  login: '/auth/login',
  register: '/auth/register',

  me: '/user/me',

  products: '/products',
  product: (id: string) => `/products/${id}`,
  productCreate: '/products',
  productUpdate: (id: string) => `/products/${id}`,
  productDelete: `/products/delete`,

  orders: '/orders',
  order: (id: string) => `/orders/${id}`,
  orderConfirm: (id: string) => `/orders/confirm/${id}`,
  orderCancel: (id: string) => `/orders/cancel/${id}`,
  orderDelete: (id: string) => `/orders/${id}`,
  orderComplete: (id: string) => `/orders/complete/${id}`,
};
