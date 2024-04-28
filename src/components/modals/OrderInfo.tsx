import { Order } from '@/common/types/order.type';
import { Button, Modal, Tag, Typography } from 'antd';

type Props = {
  order: Order | null;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<any>>;
};

const OrderInfoModal = ({ order, visible, setVisible }: Props) => {
  const onCancel = () => {
    setVisible(false);
  };

  return (
    <Modal open={visible} onCancel={onCancel} footer={null} width={600}>
      <Typography.Title level={4}>Order Info</Typography.Title>

      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-mono">
            <strong>Code:</strong> {order?.product.code}
          </p>
          <p className="font-mono">
            <strong>Title:</strong> {order?.product.title}
          </p>
          <p className="font-mono">
            <strong>Brand:</strong> {order?.product?.brand}
          </p>
          <p className="flex gap-1 items-center font-mono">
            <strong>Color: </strong>
            <Button
              style={{ backgroundColor: order?.color }}
              type="primary"
              shape="circle"
              size="small"
            />
            ({order?.color})
          </p>

          <p className="font-mono">
            <strong>Size: </strong>
            <Tag>{order?.size}</Tag>
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-mono">
            <strong>Ordered by: </strong>
            <Tag>{order?.order_by.phone_number}</Tag>
          </p>
          <p className="font-mono">
            <strong>Deliver by: </strong>
            <Tag>{order?.deliver?.phone_number || 'not confirmed'}</Tag>
          </p>
          <p className="font-mono">
            <strong>Quantity: </strong>
            <Tag>{order?.quantity}</Tag>
          </p>
          <p className="font-mono">
            <strong>Status: </strong>
            <Tag>{order?.status}</Tag>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default OrderInfoModal;
