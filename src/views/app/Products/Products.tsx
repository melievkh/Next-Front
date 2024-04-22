import { useState } from 'react';
import { CiFilter } from 'react-icons/ci';

import { useGetProductsQuery } from '@/services/product.service';
import { Button } from '@/components/ui/button';
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

  console.log(data);

  return (
    <div className="p-4 h-[100vh]">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="sm">
          <CiFilter />
          filter
        </Button>
      </div>

      <Table data={data?.result} />
    </div>
  );
};

export default Products;
