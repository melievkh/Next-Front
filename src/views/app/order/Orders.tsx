import { Flex, Input, Tabs, Typography } from 'antd';
import { useGetOrdersQuery } from '@/services/orderService';
import OrderTable from './components/OrderTable';
import { useState } from 'react';
import { OrderStatus } from '@/common/types/order.type';
import { CiSearch } from 'react-icons/ci';

export interface FilterOptions {
  limit: number;
  page: number;
  status: OrderStatus | null;
  order_number: number | null;
}

const Orders = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    limit: 20,
    page: 1,
    status: null,
    order_number: null,
  });
  const { data, isFetching } = useGetOrdersQuery(filters);

  const onChange = (key: string) => {
    switch (key) {
      case '1':
        setFilters({ ...filters, status: null });
        break;
      case '2':
        setFilters({ ...filters, status: OrderStatus.PENDING });
        break;
      case '3':
        setFilters({ ...filters, status: OrderStatus.ACCEPTED });
        break;
      case '4':
        setFilters({ ...filters, status: OrderStatus.COMPLETED });
        break;
      case '5':
        setFilters({ ...filters, status: OrderStatus.CANCELLED });
        break;
      default:
        setFilters({ ...filters, status: null });
    }
  };

  const handleOrderNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, order_number: Number(e.target.value) });
  };

  return (
    <div>
      <Typography.Title level={3}>Orders</Typography.Title>
      <Flex justify="flex-end">
        <Input
          placeholder="Search by order number"
          onChange={handleOrderNumberChange}
          prefix={<CiSearch size={20} />}
          style={{ width: '300px' }}
        />
      </Flex>
      <Tabs
        defaultActiveKey={'1'}
        onChange={onChange}
        items={[
          {
            label: 'All',
            key: '1',
            children: (
              <OrderTable
                orderData={data?.result}
                dataCount={data?.count}
                isLoading={isFetching}
                filters={filters}
                setFilters={setFilters}
              />
            ),
          },
          {
            label: 'Active',
            key: '2',
            children: (
              <OrderTable
                orderData={data?.result}
                dataCount={data?.count}
                isLoading={isFetching}
                filters={filters}
                setFilters={setFilters}
              />
            ),
          },
          {
            label: 'Delivering',
            key: '3',
            children: (
              <OrderTable
                orderData={data?.result}
                dataCount={data?.count}
                isLoading={isFetching}
                filters={filters}
                setFilters={setFilters}
              />
            ),
          },
          {
            label: 'Completed',
            key: '4',
            children: (
              <OrderTable
                orderData={data?.result}
                dataCount={data?.count}
                isLoading={isFetching}
                filters={filters}
                setFilters={setFilters}
              />
            ),
          },
          {
            label: 'Cancelled',
            key: '5',
            children: (
              <OrderTable
                orderData={data?.result}
                dataCount={data?.count}
                isLoading={isFetching}
                filters={filters}
                setFilters={setFilters}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default Orders;
