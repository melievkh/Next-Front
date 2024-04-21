import { Route, Routes } from 'react-router-dom';
import { Home, Products } from '@/views';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
};

export default AppRouter;
