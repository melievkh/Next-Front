import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Input, Tabs, Typography } from 'antd';
import { CiSearch, CiCirclePlus } from 'react-icons/ci';

import { useGetOutfitsQuery } from '@/services/outfitService';
import {
  OutfitCategory,
  OutfitColor,
  OutfitSize,
} from '@/common/types/outfit.type';
import { FilterOutfits } from '@/components/modals';
import { ROUTES } from '@/router/routes';
import OutfitTable from './components/OutfitTable';
import { Template } from '@/components/layout';

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
  const { data, isLoading } = useGetOutfitsQuery(filters);
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

  const onChange = (key: string) => {
    switch (key) {
      case 'all':
        setFilters({ ...filters, category: null });
        break;
      case 'shoes':
        setFilters({ ...filters, category: OutfitCategory.SHOES });
        break;
      case 'sneakers':
        setFilters({ ...filters, category: OutfitCategory.SNEAKERS });
        break;
      case 't_shirts':
        setFilters({ ...filters, category: OutfitCategory.T_SHIRTS });
        break;
      case 'pants':
        setFilters({ ...filters, category: OutfitCategory.PANTS });
        break;
      case 'caps':
        setFilters({ ...filters, category: OutfitCategory.CAPS });
        break;
      case 'other':
        setFilters({ ...filters, category: OutfitCategory.OTHER });
        break;
      default:
        setFilters({ ...filters, category: null });
    }
  };

  return (
    <Flex gap={20} vertical>
      <Typography.Title level={3}>Base Info</Typography.Title>
      <Template>
        <Flex gap={10} justify="space-between" className="mb-6">
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
            Create Outfit
          </Button>
        </Flex>

        <Tabs
          defaultActiveKey={'1'}
          onChange={onChange}
          style={{ width: '100%' }}
          items={[
            {
              label: 'All',
              key: 'all',
              children: (
                <OutfitTable
                  data={data}
                  isLoading={isLoading}
                  filters={filters}
                  setFilters={setFilters}
                />
              ),
            },
            {
              label: 'Shoes',
              key: 'shoes',
              children: (
                <OutfitTable
                  data={data}
                  isLoading={isLoading}
                  filters={filters}
                  setFilters={setFilters}
                />
              ),
            },
            {
              label: 'Sneakers',
              key: 'sneakers',
              children: (
                <OutfitTable
                  data={data}
                  isLoading={isLoading}
                  filters={filters}
                  setFilters={setFilters}
                />
              ),
            },
            {
              label: 'T-Shirts',
              key: 't_shirts',
              children: (
                <OutfitTable
                  data={data}
                  isLoading={isLoading}
                  filters={filters}
                  setFilters={setFilters}
                />
              ),
            },
            {
              label: 'Pants',
              key: 'pants',
              children: (
                <OutfitTable
                  data={data}
                  isLoading={isLoading}
                  filters={filters}
                  setFilters={setFilters}
                />
              ),
            },
            {
              label: 'Caps',
              key: 'caps',
              children: (
                <OutfitTable
                  data={data}
                  isLoading={isLoading}
                  filters={filters}
                  setFilters={setFilters}
                />
              ),
            },
            {
              label: 'Other',
              key: 'other',
              children: (
                <OutfitTable
                  data={data}
                  isLoading={isLoading}
                  filters={filters}
                  setFilters={setFilters}
                />
              ),
            },
          ]}
        />
      </Template>
    </Flex>
  );
};

export default Outfits;
