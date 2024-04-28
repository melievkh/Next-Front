import { Product } from '@/common/types/product.type';
import { Button, Flex, Image, Modal, Tag } from 'antd';

type Props = {
  product: Product | null;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<any>>;
};

const ProductInfoModal = ({ product, visible, setVisible }: Props) => {
  const onCancel = () => {
    setVisible(false);
  };

  return (
    <Modal open={visible} onCancel={onCancel} footer={null} width={600}>
      <Flex gap={20}>
        <Image.PreviewGroup items={product?.images}>
          <Image
            height={300}
            style={{ borderRadius: 4 }}
            src={product?.images[0]}
          />
        </Image.PreviewGroup>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#474747] font-serif">
              {product?.title}
            </h1>
            <p>code: {product?.code}</p>
            <p>{product?.description}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="font-sans text-[#7d7d7d]">Colors</h2>
            <ul className="flex gap-2">
              {product?.colors.map((color) => (
                <Button
                  key={color}
                  style={{ backgroundColor: color }}
                  type="primary"
                  shape="circle"
                  size="small"
                />
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-sans text-[#7d7d7d]">Sizes</h2>
            <ul>{product?.sizes.map((size) => <Tag>{size}</Tag>)}</ul>
          </div>
        </div>
      </Flex>
    </Modal>
  );
};

export default ProductInfoModal;
