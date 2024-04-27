import { useState } from 'react';
import { Order, OrderStatus } from '@/common/types/order.type';
import {
  useCancelOrderMutation,
  useCompleteOrderMutation,
  useConfirmOrderMutation,
} from '@/services/orderService';
import { getFormattedDate } from '@/utils/date';
import {
  getActionBackgroundColor,
  getActionButtonName,
  getButtonDisabled,
  getOrderStatusColor,
} from '@/utils/order.utils';
import { Button, Flex, Table, TableProps, Tag } from 'antd';

type Props = { orderData: Order[]; isLoading: boolean };

const OrderTable = ({ orderData, isLoading }: Props) => {
  const [confirmingOrder, setConfirmingOrder] = useState<string | null>(null);
  const [completingOrder, setCompletingOrder] = useState<string | null>(null);
  const [cancellingOrder, setCancellingOrder] = useState<string | null>(null);

  const [confirmOrder] = useConfirmOrderMutation();
  const [completeOrder] = useCompleteOrderMutation();
  const [cancelOrder] = useCancelOrderMutation();

  const handleSubmitOrder = async (id: string, status: OrderStatus) => {
    if (status === OrderStatus.PENDING) {
      setConfirmingOrder(id);
      await confirmOrder(id);
      setConfirmingOrder(null);
    } else if (status === OrderStatus.CONFIRMED) {
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
      dataIndex: 'price',
      key: 'price',
      render: (price: any) => <a>{price} sum</a>,
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created: string) => <a>{getFormattedDate(created)}</a>,
    },
    {
      title: 'Order actions',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderStatus, record: Order) => (
        <Flex gap={10}>
          {status === OrderStatus.CONFIRMED && (
            <Button
              onClick={() => handleCancelOrder(record._id)}
              loading={cancellingOrder === record._id}
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
            onClick={() => handleSubmitOrder(record._id, status)}
            loading={
              confirmingOrder === record._id || completingOrder === record._id
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
  ];

  return (
    <Flex>
      <Table
        style={{ width: '100%' }}
        rowKey="_id"
        columns={columns}
        dataSource={orderData}
        loading={isLoading}
      />
    </Flex>
  );
};

export default OrderTable;
