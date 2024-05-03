import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Auth,
  CreateOutfit,
  CreateStore,
  EditOutfit,
  EditStore,
  Home,
  Orders,
  Outfits,
  Stores,
} from '@/views/app';
import { AppLayout } from '@/components/layout';
import { getIsLoggedIn } from '@/common/store/selectors';
import { ROUTES } from './routes';

const AppRouter = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return isLoggedIn ? (
    <AppLayout>
      <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTES.PROFILE} element={<Outfits />} />
        <Route path={ROUTES.EDIT_PROFILE} element={<Outfits />} />
        <Route path={ROUTES.OUTFITS} element={<Outfits />} />
        <Route path={ROUTES.CREATE_OUTFIT} element={<CreateOutfit />} />
        <Route path={ROUTES.EDIT_OUTFIT} element={<EditOutfit />} />
        <Route path={ROUTES.ORDERS} element={<Orders />} />
        <Route path={ROUTES.STORES} element={<Stores />} />
        <Route path={ROUTES.CREATE_STORE} element={<CreateStore />} />
        <Route path={ROUTES.EDIT_STORE} element={<EditStore />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppLayout>
  ) : (
    <Routes>
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
      <Route path={ROUTES.LOGIN} element={<Auth />} />
    </Routes>
  );
};

export default AppRouter;
