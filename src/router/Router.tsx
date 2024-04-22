import { Route, Routes, Navigate } from 'react-router-dom';
import { Auth, Home, Products } from '@/views';
import { AppLayout } from '@/components/layout';
import { ROUTES } from './routes';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '@/store/selectors';

const AppRouter = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  console.log(isLoggedIn);

  return isLoggedIn ? (
    <AppLayout>
      <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTES.PRODUCTS} element={<Products />} />
        <Route path={ROUTES.ORDERS} element={<Products />} />
        <Route path={ROUTES.USERS} element={<Products />} />
        <Route path="*" element={<p>Not Found Page!</p>} />
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
