import { useState } from 'react';
import { Flex, Input } from 'antd';

import { useGetProductsQuery } from '@/services/product.service';
import {
  ProductCategory,
  ProductColor,
  ProductSize,
} from '@/common/types/product.type';
import Table from './components/Table';
import { FilterProducts } from '@/components/modals';

export interface FilterOptions {
  limit?: number;
  page?: number;
  code: number | null;
  category: ProductCategory | null;
  brand: string | null;
  sizes: ProductSize[];
  colors: ProductColor[];
}

const { Search } = Input;

const Products = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [code, setCode] = useState<number | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    limit: 10,
    page: 1,
    code: null,
    category: null,
    brand: null,
    sizes: [],
    colors: [],
  });
  const { data, isLoading } = useGetProductsQuery(filters);

  const handleSearch = () => {
    setFilters({ ...filters, code });
  };

  const handleOnCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value ? parseInt(e.target.value) : null);
  };

  return (
    <div>
      <Flex gap={10} justify="space-between">
        <Search
          placeholder="Search for products by code"
          loading={isLoading}
          enterButton
          value={code as number}
          onChange={handleOnCodeChange}
          onSearch={handleSearch}
          style={{ width: '60%' }}
        />

        <FilterProducts
          visibile={showModal}
          setVisible={setShowModal}
          filters={filters}
          setFilters={setFilters}
        />
      </Flex>

      <Table
        data={data}
        isLoading={isLoading}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default Products;
