import { useGetOrdersQuery } from '@/services/orderService';

const Orders = () => {
  const { data } = useGetOrdersQuery({});

  console.log(data);

  return <div>Orders</div>;
};

export default Orders;
