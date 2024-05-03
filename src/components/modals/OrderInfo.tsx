import { Order } from '@/common/types/order.type';
import { Modal, Tag, Typography } from 'antd';
import YandexMap from '../map/YandexMap';

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
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p>
              <strong>Order number:</strong> <Tag>{order?.order_number}</Tag>
            </p>
            <p>
              <strong>Order item details: </strong>
              <span className="font-sans">{order?.order_item_details}</span>
            </p>
            <p>
              <strong>Client number: </strong>
              <Tag>{order?.order_by.phone_number}</Tag>
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p>
              <strong>Quantity: </strong>
              <Tag>{order?.quantity}</Tag>
            </p>
            <p>
              <strong>Status: </strong>
              <Tag>{order?.status}</Tag>
            </p>
            <p>
              <strong>Address: </strong>
              {order?.address}
            </p>
          </div>
        </div>

        <YandexMap latitude={order?.latitude} longitude={order?.longitude} />
      </div>
    </Modal>
  );
};

export default OrderInfoModal;
