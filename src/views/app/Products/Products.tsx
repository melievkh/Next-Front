import { useState } from 'react';
import { Button, Flex, Input } from 'antd';
import { CiSearch, CiCirclePlus } from 'react-icons/ci';

import { useGetProductsQuery } from '@/services/product.service';
import {
  ProductBrand,
  ProductCategory,
  ProductColor,
  ProductSize,
} from '@/common/types/product.type';
import Table from './components/Table';
import { FilterProducts } from '@/components/modals';

export interface FilterOptions {
  limit?: number;
  page?: number;
  code: string | null;
  category: ProductCategory | null;
  brand: ProductBrand | null;
  sizes: ProductSize[];
  colors: ProductColor[];
}

const Products = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
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

  const handleOnCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setFilters({ ...filters, code: inputValue });
  };

  return (
    <Flex gap={20} vertical>
      <Flex gap={10} justify="space-between">
        <Flex gap={20}>
          <Input
            placeholder="Search for products by code"
            onChange={handleOnCodeChange}
            prefix={<CiSearch size={20} />}
            style={{ width: '300px' }}
            size="large"
          />
          <FilterProducts
            visibile={showModal}
            setVisible={setShowModal}
            filters={filters}
            setFilters={setFilters}
          />
        </Flex>

        <Button type="primary" size="large" className="flex items-center gap-2">
          <CiCirclePlus size={22} />
          Create Product
        </Button>
      </Flex>

      <Table
        data={data}
        isLoading={isLoading}
        filters={filters}
        setFilters={setFilters}
      />
    </Flex>
  );
};

export default Products;
