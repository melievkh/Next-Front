import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Auth, Home, Products } from '@/views/app';
import { AppLayout } from '@/components/layout';
import { getIsLoggedIn } from '@/common/store/selectors';
import { ROUTES } from './routes';

const AppRouter = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return isLoggedIn ? (
    <AppLayout>
      <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTES.PRODUCTS} element={<Products />} />
        <Route path={ROUTES.ORDERS} element={<Products />} />
        <Route path={ROUTES.USERS} element={<Products />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppLayout>
  ) : (
    <Routes>
      <Route path={ROUTES.HOME} element={<Navigate to="/login" />} />
      <Route path={ROUTES.LOGIN} element={<Auth />} />
    </Routes>
  );
};

export default AppRouter;
