import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  Typography,
  Flex,
  Upload,
  UploadProps,
  UploadFile,
  Image,
  message,
} from 'antd';
import {
  categoryOptions,
  colorOptions,
  sizeOptions,
} from '@/constants/outfit.constants';
import {
  useCreateOutfitMutation,
  useDeleteOutfitImageMutation,
  useUpdateOutfitMutation,
} from '@/services/outfitService';
import { getBase64 } from '@/utils/common';
import { config } from '@/config/app.config';
import { Outfit } from '@/common/types/outfit.type';
import { Template } from '../layout';
import { getExistingFilelist } from '@/utils/form.utils';

type Props = { mode: string; outfitData?: Outfit };

const OutfitForm = ({ mode, outfitData }: Props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[] | any>([]);

  const [form] = Form.useForm();
  const [updateOutfit, { isLoading: isUpdateLoading }] =
    useUpdateOutfitMutation();
  const [createOutfit, { isLoading: isCreateLoading }] =
    useCreateOutfitMutation();
  const [deleteOutfitImage] = useDeleteOutfitImageMutation();

  const isEditMode = mode === 'EDIT';

  const handleFormSubmit = async (values: any) => {
    const imageUrls = fileList.map((file: UploadFile) => file.name);
    if (isEditMode) {
      await updateOutfit({ id: outfitData?.id, ...values }).unwrap();
      message.success('Outfit updated successfully');
    } else {
      await createOutfit({
        image_urls: imageUrls,
        image_main: imageUrls[0],
        ...values,
      }).unwrap();
      message.success('Outfit created successfully');
    }
  };

  const uploadButton = (
    <button className="b-0 bg-none" type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleBeforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt5M = file.size / (1024 * 1024) < 5;
    if (!isLt5M) {
      message.error('Image must smaller than 5MB!');
    }
    return isJpgOrPng && isLt5M;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as any);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleMediaChange: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);

  const handleDeleteMedia = async (file: UploadFile) => {
    if (isEditMode) {
      await deleteOutfitImage({
        store_id: outfitData?.store_id,
        outfit_id: outfitData?.id,
        image_url: file.url,
      }).unwrap();
    }

    const newFileList = fileList.filter(
      (item: UploadFile) => item.uid !== file.uid,
    );
    setFileList(newFileList);
  };

  useEffect(() => {
    if (isEditMode) form.setFieldsValue(outfitData);

    const existingFileList = getExistingFilelist(outfitData?.image_urls);
    setFileList(existingFileList);
  }, [outfitData, form, isEditMode]);

  return (
    <Form
      form={form}
      onFinish={handleFormSubmit}
      layout="vertical"
      className="flex flex-col gap-4"
    >
      <Typography.Title level={3}>
        {isEditMode ? 'Edit Outfit' : 'Create Outfit'}
      </Typography.Title>

      <Template>
        <Typography.Title level={4}>Base Info</Typography.Title>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: 'Please select a category!' }]}
            >
              <Select options={categoryOptions} placeholder="Select category" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Sizes"
              name="sizes"
              rules={[{ required: true, message: 'Please select size!' }]}
            >
              <Select
                mode="multiple"
                options={sizeOptions}
                placeholder="Select sizes"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Title"
              name="name"
              rules={[{ required: true, message: 'Title is required!' }]}
            >
              <Input placeholder="Enter title" name="name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Colors"
              name="colors"
              rules={[{ required: true, message: 'Please select color!' }]}
            >
              <Select
                mode="multiple"
                options={colorOptions}
                placeholder="Select sizes"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Code"
              name="code"
              rules={[{ required: true, message: 'Code is required!' }]}
            >
              <Input placeholder="Enter code" name="code" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Price is required!' }]}
            >
              <Input type="number" placeholder="Enter price" name="price" />
            </Form.Item>
          </Col>
        </Row>

        <Flex justify="space-between">
          <Col className="w-[45%]">
            <Form.Item label="Brand" name="brand">
              <Input placeholder="Enter brand" name="brand" />
            </Form.Item>
          </Col>
          <Col className="w-[50%]">
            <Form.Item label="Description" name="description">
              <Input.TextArea
                placeholder="Enter description"
                name="description"
                rows={4}
                style={{ resize: 'none' }}
              />
            </Form.Item>
          </Col>
        </Flex>
      </Template>

      <Template>
        <Form.Item
          label="Images"
          rules={[
            { required: true, message: 'At least one image is required!' },
          ]}
        >
          <Col>
            <Upload
              name="image"
              accept="image"
              action={`${config.BASE_URL}/file-upload/image`}
              listType="picture-card"
              fileList={fileList}
              beforeUpload={handleBeforeUpload}
              onPreview={handlePreview}
              onChange={handleMediaChange}
              onRemove={(image) => handleDeleteMedia(image)}
            >
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: 'none' }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewImage}
              />
            )}
          </Col>
        </Form.Item>
      </Template>

      <Form.Item>
        <Button
          className="w-full"
          loading={isEditMode ? isUpdateLoading : isCreateLoading}
          type="primary"
          htmlType="submit"
        >
          {isEditMode ? 'Update Outfit' : 'Create Outfit'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OutfitForm;
