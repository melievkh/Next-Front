import { Button, Flex, Image, Modal, Tag } from 'antd';
import { Outfit } from '@/common/types/outfit.type';

type Props = {
  outfit: Outfit | null;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<any>>;
};

const outfitInfoModal = ({ outfit, visible, setVisible }: Props) => {
  const onCancel = () => {
    setVisible(false);
  };

  return (
    <Modal open={visible} onCancel={onCancel} footer={null} width={600}>
      <Flex gap={20}>
        <Image.PreviewGroup items={outfit?.image_urls}>
          <Image
            height={300}
            style={{ borderRadius: 4 }}
            src={outfit?.image_main}
          />
        </Image.PreviewGroup>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#474747] font-serif">
              {outfit?.name}
            </h1>
            <p>code: {outfit?.code}</p>
            <p>{outfit?.description}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="font-sans text-[#7d7d7d]">Colors</h2>
            <ul className="flex gap-2">
              {outfit?.colors.map((color) => (
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
            <ul>{outfit?.sizes.map((size) => <Tag key={size}>{size}</Tag>)}</ul>
          </div>
        </div>
      </Flex>
    </Modal>
  );
};

export default outfitInfoModal;
