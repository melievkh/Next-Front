import { useLocation } from 'react-router-dom';

import { OutfitForm } from '@/components/forms';

const EditProduct = () => {
  const location = useLocation();
  const { outfit } = location.state;

  return (
    <>
      <OutfitForm outfitData={outfit} mode="EDIT" />
    </>
  );
};

export default EditProduct;
