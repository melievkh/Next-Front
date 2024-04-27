import { OrderStatus } from '@/common/types/order.type';

const getOrderStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return '#5e76e0';
    case OrderStatus.CONFIRMED:
      return '#3bc46b';
    case OrderStatus.COMPLETED:
      return '#50785e';
    case OrderStatus.CANCELLED:
      return '#fa5f5f';
    default:
      return 'default';
  }
};

const getActionBackgroundColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return '#5e76e0';
    case OrderStatus.CONFIRMED:
      return '#3bc46b';
    default:
      return 'default';
  }
};

const getActionButtonName = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return 'Confirm';
    case OrderStatus.CONFIRMED:
      return 'Complete';
    case OrderStatus.COMPLETED:
      return 'Completed';
    case OrderStatus.CANCELLED:
      return 'Cancelled';
    default:
      return 'default';
  }
};

const getButtonDisabled = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.CONFIRMED:
      return false;
    case OrderStatus.COMPLETED:
      return true;
    case OrderStatus.CANCELLED:
      return true;
    default:
      return false;
  }
};

export {
  getOrderStatusColor,
  getActionBackgroundColor,
  getActionButtonName,
  getButtonDisabled,
};
