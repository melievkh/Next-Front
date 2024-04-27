import { useState } from 'react';
import { Button, Flex, Input } from 'antd';
import { CiSearch, CiCirclePlus } from 'react-icons/ci';

import { useGetProductsQuery } from '@/services/productService';
import {
  ProductCategory,
  ProductColor,
  ProductSize,
} from '@/common/types/product.type';
import Table from './components/Table';
import { FilterProducts } from '@/components/modals';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/routes';

export interface FilterOptions {
  limit?: number;
  page?: number;
  code: string | null;
  category: ProductCategory | null;
  brand: string | null;
  sizes: ProductSize[];
  colors: ProductColor[];
}

const Products = () => {
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
  const navigate = useNavigate();

  const handleOnCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setFilters({ ...filters, code: inputValue });
  };

  const handleFilter = (values: FilterOptions) => {
    setFilters({ ...filters, ...values });
  };

  const handleClear = () => {
    setFilters({
      ...filters,
      code: null,
      category: null,
      brand: null,
      sizes: [],
      colors: [],
    });
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
            handleFilter={handleFilter}
            handleClear={handleClear}
          />
        </Flex>

        <Button
          type="primary"
          size="large"
          className="flex items-center gap-1"
          onClick={() => navigate(ROUTES.CREATE_PRODUCT)}
        >
          <CiCirclePlus size={22} />
          Create
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
