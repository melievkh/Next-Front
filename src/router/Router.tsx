import { Route, Routes } from 'react-router-dom';
import { Auth, Home, Products } from '@/views';
import { AppLayout } from '@/components/layout';

const AppRouter = () => {
  const isLoggedIn = true;

  return isLoggedIn ? (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </AppLayout>
  ) : (
    <Routes>
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default AppRouter;
