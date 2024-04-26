import { useLocation } from 'react-router-dom';

import { ProductForm } from '@/components/forms';
import { useGetProductQuery } from '@/services/product.service';

const EditProduct = () => {
  const location = useLocation();
  const { productId } = location.state;

  const { data } = useGetProductQuery(productId);

  return (
    <div>
      <ProductForm productData={data?.result} mode="EDIT" />
    </div>
  );
};

export default EditProduct;
