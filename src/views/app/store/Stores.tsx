import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Input, Row, Select, message } from 'antd';
import { CiSearch } from 'react-icons/ci';
import {
  useDeleteStoreMutation,
  useGetStoresQuery,
} from '@/services/storeService';
import { FilterStoresOptions } from '@/common/types/store.type';
import { ROUTES } from '@/router/routes';
import { Template } from '@/components/layout';
import StoresTable from './components/StoresTable';

const Stores = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterStoresOptions>({
    limit: 10,
    page: 1,
    address: null,
    available: null,
    storename: null,
  });
  const { data, isFetching, refetch } = useGetStoresQuery(filters);
  const [deleteStore] = useDeleteStoreMutation();

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

  const handleDeleteStore = async (storeId: string) => {
    try {
      await deleteStore(storeId).unwrap();
      message.success('Store deleted successfully');
      refetch();
    } catch (error) {
      console.error(error);
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
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="available">Available</Select.Option>
              <Select.Option value="unavailable">Unavailable</Select.Option>
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
          onDeleteStore={handleDeleteStore}
        />
      </Row>
    </Template>
  );
};

export default Stores;
