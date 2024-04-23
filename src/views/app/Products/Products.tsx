import { useState } from 'react';

import { useGetProductsQuery } from '@/services/product.service';
import Table from './components/Table';

interface FilterOptions {
  search: string;
  brand: string;
  size: string;
  color: string;
  price: string;
}

const Products: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    brand: '',
    size: '',
    color: '',
    price: '',
  });
  const { data } = useGetProductsQuery(filters);

  // const handleFilterChange = (key: keyof FilterOptions, value: string) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [key]: value,
  //   }));
  // };

  return (
    <div className="p-4 h-[100vh]">
      <div className="flex items-center justify-between mb-4"></div>

      <Table data={data?.result} />
    </div>
  );
};

export default Products;
