export const endpoints = {
  login: '/auth/login',
  register: '/auth/register',

  me: '/store/me',
  stores: '/store',
  storeCreate: '/store',
  store: (id: string) => `/store/${id}`,
  storeUpdate: (id: string) => `/store/${id}`,
  storeDelete: `/store/delete`,
  storeChangePassword: (id: string) => `/store/change-password/${id}`,

  outfits: '/outfits',
  outfit: (id: string) => `/outfits/${id}`,
  outfitCreate: '/outfits',
  outfitUpdate: (id: string) => `/outfits/${id}`,
  outfitDelete: `/outfits/delete`,
  outfitImageDelete: `/outfits/delete-image`,

  orders: '/orders',
  order: (id: string) => `/orders/${id}`,
  orderAccept: (id: string) => `/orders/accept/${id}`,
  orderCancel: (id: string) => `/orders/cancel/${id}`,
  orderDelete: (id: string) => `/orders/${id}`,
  orderComplete: (id: string) => `/orders/complete/${id}`,
};
