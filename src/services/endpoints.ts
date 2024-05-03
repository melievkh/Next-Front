export const endpoints = {
  login: '/auth/login',
  register: '/auth/register',

  me: '/store/me',
  stores: '/store',

  outfits: '/outfits',
  outfit: (id: string) => `/outfits/${id}`,
  outfitCreate: '/outfits',
  outfitUpdate: (id: string) => `/outfits/${id}`,
  outfitDelete: `/outfits/delete`,

  orders: '/orders',
  order: (id: string) => `/orders/${id}`,
  orderAccept: (id: string) => `/orders/accept/${id}`,
  orderCancel: (id: string) => `/orders/cancel/${id}`,
  orderDelete: (id: string) => `/orders/${id}`,
  orderComplete: (id: string) => `/orders/complete/${id}`,
};
