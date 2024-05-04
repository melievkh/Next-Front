import { Button, Flex, Input, Row, Select } from 'antd';
import StoresTable from './components/StoresTable';
import { useGetStoresQuery } from '@/services/storeService';
import { useState } from 'react';
import { FilterStoresOptions } from '@/common/types/store.type';
import { CiSearch } from 'react-icons/ci';
import { Option } from 'antd/es/mentions';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/routes';
import { Template } from '@/components/layout';

const Stores = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterStoresOptions>({
    limit: 10,
    page: 1,
    address: null,
    available: null,
    storename: null,
  });
  const { data, isFetching } = useGetStoresQuery(filters);

  const handleStorenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, storename: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    if (value === 'all') {
      setFilters({ ...filters, available: null });
    } else if (value === 'available') {
      setFilters({ ...filters, available: true });
    } else {
      setFilters({ ...filters, available: false });
    }
  };

  return (
    <Template>
      <Row>
        <Flex justify="space-between" gap={20}>
          <Flex gap={10}>
            <Input
              placeholder="Search by store name"
              onChange={handleStorenameChange}
              prefix={<CiSearch size={18} />}
              style={{ width: '300px' }}
            />
            <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={handleSelectChange}
              placeholder="Account Status"
            >
              <Option value="all">All</Option>
              <Option value="available">Available</Option>
              <Option value="unavailable">Unavailable</Option>
            </Select>
          </Flex>
          <Button type="primary" onClick={() => navigate(ROUTES.CREATE_STORE)}>
            Create Store
          </Button>
        </Flex>

        <StoresTable
          storeData={data?.result}
          dataCount={data?.count}
          isLoading={isFetching}
          filters={filters}
          setFilters={setFilters}
        />
      </Row>
    </Template>
  );
};

export default Stores;
