import { useLocation } from 'react-router-dom';

import { ProductForm } from '@/components/forms';
import { useGetProductQuery } from '@/services/productService';

const EditProduct = () => {
  const location = useLocation();
  const { productId } = location.state;

  const { data } = useGetProductQuery(productId);

  return (
    <>
      <ProductForm productData={data?.result} mode="EDIT" />
    </>
  );
};

export default EditProduct;
