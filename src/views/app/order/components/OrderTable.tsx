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

  const [acceptOrder] = useAcceptOrderMutation();
  const [completeOrder] = useCompleteOrderMutation();
  const [cancelOrder] = useCancelOrderMutation();

  const handleSubmitOrder = async (id: string, status: OrderStatus) => {
    if (status === OrderStatus.PENDING) {
      await acceptOrder(id);
    } else if (status === OrderStatus.ACCEPTED) {
      await completeOrder(id);
    }
  };

  const handleCancelOrder = async (id: string) => {
    await cancelOrder(id);
  };

  const handleClickShowMore = (record: Order) => {
    setSelectedOrder(record);
    setOrderInfoVisible(true);
  };

  const columns: TableProps<Order>['columns'] = [
    {
      title: 'Order number',
      dataIndex: 'order_number',
      render: (order_number: string) => <Tag>{order_number}</Tag>,
    },
    {
      title: 'Client number',
      dataIndex: 'order_by',
      render: (order_by: any) => <a>{order_by.phone_number1}</a>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: OrderStatus) => (
        <p style={{ color: getOrderStatusColor(status) }} key={status}>
          {status}
        </p>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'total_price',
      render: (total_price: number) => <a>{total_price} sum</a>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Order actions',
      dataIndex: 'status',
      render: (status: OrderStatus, record: Order) => (
        <Flex gap={10}>
          {status === OrderStatus.ACCEPTED && (
            <Button
              onClick={() => handleCancelOrder(record.id)}
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
            style={{ backgroundColor: getActionBackgroundColor(status) }}
          >
            {getActionButtonName(status)}
          </Button>
        </Flex>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      render: (created: string) => <a>{getFormattedDate(created)}</a>,
    },
    {
      title: 'Other',
      dataIndex: 'other',
      render: (_, record) => {
        return (
          <Button
            type="default"
            size="small"
            onClick={() => handleClickShowMore(record)}
          >
            more...
          </Button>
        );
      },
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
