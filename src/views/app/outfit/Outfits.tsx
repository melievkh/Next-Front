import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Input, Typography } from 'antd';
import { CiSearch, CiCirclePlus } from 'react-icons/ci';

import { useGetOutfitsQuery } from '@/services/outfitService';
import {
  OutfitCategory,
  OutfitColor,
  OutfitSize,
} from '@/common/types/outfit.type';
import { FilterOutfits } from '@/components/modals';
import { ROUTES } from '@/router/routes';
import Table from './components/Table';

export interface FilterOptions {
  limit?: number;
  page?: number;
  code: string | null;
  category: OutfitCategory | null;
  brand: string | null;
  sizes: OutfitSize[];
  colors: OutfitColor[];
}

const Outfits = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    limit: 10,
    page: 1,
    code: null,
    category: null,
    brand: null,
    sizes: [],
    colors: [],
  });
  const { data, isLoading } = useGetOutfitsQuery({});
  const navigate = useNavigate();

  console.log(data);

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
      <Typography.Title level={2}>Base Info</Typography.Title>
      <Flex gap={10} justify="space-between">
        <Flex gap={20}>
          <Input
            placeholder="Search for outfits by code"
            onChange={handleOnCodeChange}
            prefix={<CiSearch size={20} />}
            style={{ width: '300px' }}
            size="large"
          />
          <FilterOutfits
            handleFilter={handleFilter}
            handleClear={handleClear}
          />
        </Flex>

        <Button
          type="primary"
          size="large"
          className="flex items-center gap-1"
          onClick={() => navigate(ROUTES.CREATE_OUTFIT)}
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

export default Outfits;
