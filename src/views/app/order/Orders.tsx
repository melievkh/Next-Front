import { Flex, InputNumber, Tabs, Typography } from 'antd';
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
    limit: 10,
    page: 1,
    status: null,
    order_number: null,
  });
  const { data, isFetching } = useGetOrdersQuery(filters);

  const onChange = (key: string) => {
    switch (key) {
      case 'all':
        setFilters({ ...filters, status: null });
        break;
      case 'pending':
        setFilters({ ...filters, status: OrderStatus.PENDING });
        break;
      case 'accepted':
        setFilters({ ...filters, status: OrderStatus.ACCEPTED });
        break;
      case 'completed':
        setFilters({ ...filters, status: OrderStatus.COMPLETED });
        break;
      case 'cancelled':
        setFilters({ ...filters, status: OrderStatus.CANCELLED });
        break;
      default:
        setFilters({ ...filters, status: null });
    }
  };

  const handleOrderNumberChange = (value: number | null) => {
    setFilters({ ...filters, order_number: value });
  };

  return (
    <div>
      <Typography.Title level={3}>Orders</Typography.Title>
      <Flex justify="flex-end">
        <InputNumber
          placeholder="Search by order number"
          onChange={handleOrderNumberChange}
          prefix={<CiSearch size={20} />}
          style={{ width: '300px' }}
        />
      </Flex>
      <Tabs
        defaultActiveKey={'all'}
        onChange={onChange}
        items={[
          {
            label: 'All',
            key: 'all',
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
            key: 'pending',
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
            key: 'accepted',
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
            key: 'completed',
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
            key: 'cancelled',
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
