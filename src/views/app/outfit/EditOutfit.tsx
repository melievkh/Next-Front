import { useLocation } from 'react-router-dom';

import { OutfitForm } from '@/components/forms';
import { useGetOutfitQuery } from '@/services/outfitService';

const EditProduct = () => {
  const location = useLocation();
  const { outfitId } = location.state;

  const { data } = useGetOutfitQuery(outfitId);

  return (
    <>
      <OutfitForm outfitData={data?.result} mode="EDIT" />
    </>
  );
};

export default EditProduct;
