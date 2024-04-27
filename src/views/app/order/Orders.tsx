import { Divider, Tabs, Typography } from 'antd';
import { useGetOrdersQuery } from '@/services/orderService';
import OrderTable from './components/OrderTable';
import { useState } from 'react';
import { OrderStatus } from '@/common/types/order.type';

const Orders = () => {
  const [filters, setFilters] = useState({
    limit: 20,
    page: 1,
    status: OrderStatus.PENDING,
  });

  const { data, isFetching } = useGetOrdersQuery(filters);
  console.log(isFetching);

  const onChange = (key: string) => {
    switch (key) {
      case '1':
        setFilters({ ...filters, status: OrderStatus.PENDING });
        break;
      case '2':
        setFilters({ ...filters, status: OrderStatus.CONFIRMED });
        break;
      case '3':
        setFilters({ ...filters, status: OrderStatus.COMPLETED });
        break;
      case '4':
        setFilters({ ...filters, status: OrderStatus.CANCELLED });
        break;
      default:
        setFilters({ ...filters, status: OrderStatus.PENDING });
    }
  };

  return (
    <div>
      <Typography.Title level={2}>Orders</Typography.Title>
      <Tabs
        defaultActiveKey={'1'}
        onChange={onChange}
        size="large"
        items={[
          {
            label: 'Active orders',
            key: '1',
            children: (
              <OrderTable orderData={data?.result} isLoading={isFetching} />
            ),
          },
          {
            label: 'Delivering',
            key: '2',
            children: (
              <OrderTable orderData={data?.result} isLoading={isFetching} />
            ),
          },
          {
            label: 'Completed',
            key: '3',
            children: (
              <OrderTable orderData={data?.result} isLoading={isFetching} />
            ),
          },
          {
            label: 'Cancelled',
            key: '4',
            children: (
              <OrderTable orderData={data?.result} isLoading={isFetching} />
            ),
          },
        ]}
      />
    </div>
  );
};

export default Orders;
