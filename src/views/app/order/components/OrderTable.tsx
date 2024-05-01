import { useState } from 'react';
import { Button, Flex, Table, TableProps, Tag } from 'antd';
import { Order, OrderStatus } from '@/common/types/order.type';
import {
  useCancelOrderMutation,
  useCompleteOrderMutation,
  useAcceptOrderMutation,
} from '@/services/orderService';
import { getFormattedDate } from '@/utils/date';
import {
  getActionBackgroundColor,
  getActionButtonName,
  getButtonDisabled,
  getOrderStatusColor,
} from '@/utils/order.utils';
import { FilterOptions } from '../Orders';
import { OrderInfoModal } from '@/components/modals';

type Props = {
  orderData: Order[];
  dataCount: number;
  isLoading: boolean;
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
};

const OrderTable = ({
  orderData,
  dataCount,
  isLoading,
  filters,
  setFilters,
}: Props) => {
  const [orderInfoVisible, setOrderInfoVisible] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [acceptingOrder, setAcceptingOrder] = useState<string | null>(null);
  const [completingOrder, setCompletingOrder] = useState<string | null>(null);
  const [cancellingOrder, setCancellingOrder] = useState<string | null>(null);

  const [acceptOrder] = useAcceptOrderMutation();
  const [completeOrder] = useCompleteOrderMutation();
  const [cancelOrder] = useCancelOrderMutation();

  const handleSubmitOrder = async (id: string, status: OrderStatus) => {
    if (status === OrderStatus.PENDING) {
      setAcceptingOrder(id);
      await acceptOrder(id);
      setAcceptingOrder(null);
    } else if (status === OrderStatus.ACCEPTED) {
      setCompletingOrder(id);
      await completeOrder(id);
      setCompletingOrder(null);
    }
  };

  const handleCancelOrder = async (id: string) => {
    setCancellingOrder(id);
    await cancelOrder(id);
    setCancellingOrder(null);
  };

  const handleRowClick = (record: Order) => {
    setSelectedOrder(record);
    setOrderInfoVisible(true);
  };

  const columns: TableProps<Order>['columns'] = [
    {
      title: 'Order',
      dataIndex: 'order_number',
      key: 'order_number',
      render: (order_number: string) => <Tag>{order_number}</Tag>,
    },
    {
      title: 'Order by',
      dataIndex: 'order_by',
      key: 'order_by',
      render: (order_by: any) => <a>{order_by.phone_number}</a>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderStatus) => (
        <p style={{ color: getOrderStatusColor(status) }} key={status}>
          {status}
        </p>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'product',
      key: 'product',
      render: (product: any) => <a>{product.price} sum</a>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Order actions',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderStatus, record: Order) => (
        <Flex gap={10}>
          {status === OrderStatus.ACCEPTED && (
            <Button
              onClick={() => handleCancelOrder(record.id)}
              loading={cancellingOrder === record.id}
              size="small"
              danger
            >
              Cancel
            </Button>
          )}

          <Button
            size="small"
            type="primary"
            disabled={getButtonDisabled(status)}
            onClick={() => handleSubmitOrder(record.id, status)}
            loading={
              acceptingOrder === record.id || completingOrder === record.id
            }
            style={{ backgroundColor: getActionBackgroundColor(status) }}
          >
            {getActionButtonName(status)}
          </Button>
        </Flex>
      ),
    },
    {
      title: 'Deliver',
      dataIndex: 'deliver',
      key: 'deliver',
      render: (deliver?: any) => <a>{deliver?.phone_number}</a>,
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created: string) => <a>{getFormattedDate(created)}</a>,
    },
  ];

  return (
    <Flex>
      <Table
        style={{ width: '100%' }}
        rowKey="id"
        columns={columns}
        dataSource={orderData}
        loading={isLoading}
        onRow={(record: Order) => ({
          onClick: () => handleRowClick(record),
        })}
        pagination={{
          total: dataCount,
          current: filters.page,
          pageSize: filters.limit,
          onChange: (page: number) => {
            setFilters({ ...filters, page });
          },
        }}
      />

      <OrderInfoModal
        visible={orderInfoVisible}
        setVisible={setOrderInfoVisible}
        order={selectedOrder}
      />
    </Flex>
  );
};

export default OrderTable;
