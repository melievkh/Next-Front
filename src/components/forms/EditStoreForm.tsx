import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Select,
  Col,
  Button,
  Typography,
  Upload,
  UploadProps,
  UploadFile,
  Image,
  message,
  Divider,
  Flex,
} from 'antd';
import { getBase64 } from '@/utils/common';
import { config } from '@/config/app.config';
import { Store } from '@/common/types/store.type';
import { Template } from '../layout';
import { useUpdateStoreMutation } from '@/services/storeService';

type Props = { storeData?: Store };

const EditStoreForm = ({ storeData }: Props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const [updateStore, { isLoading }] = useUpdateStoreMutation();

  const handleFormSubmit = async (values: any) => {
    try {
      const data = { ...values, id: storeData?.id };
      await updateStore(data).unwrap();
      message.success('Store updated successfully!');
    } catch (error) {
      console.error(error);
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

  const storeCategoryOptions = [
    { label: 'Outfits', value: 'outfits' },
    { label: 'Other', value: 'other' },
  ];

  const storeTypeOptions = [
    { label: 'Online', value: 'online' },
    { label: 'Physical', value: 'physical' },
  ];

  useEffect(() => {
    if (storeData) {
      form.setFieldsValue(storeData);
    }
  }, [storeData, form]);

  return (
    <Form
      form={form}
      onFinish={handleFormSubmit}
      layout="vertical"
      className="w-full flex flex-col gap-4"
    >
      <Template>
        <Typography.Title level={3}>Edit Store</Typography.Title>
        <Flex gap={30}>
          <Col span={4}>
            <Form.Item
              label="Store name"
              name="storename"
              rules={[{ required: true, message: 'Store name is required!' }]}
            >
              <Input placeholder="Enter store name" name="storename" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Email is required!' }]}
            >
              <Input placeholder="Enter email" name="email" />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: 'Please select category!' }]}
            >
              <Select
                mode="multiple"
                options={storeCategoryOptions}
                placeholder="Select category"
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Store type"
              name="type"
              rules={[{ required: true, message: 'Please select store type!' }]}
            >
              <Select
                options={storeTypeOptions}
                placeholder="Select store type"
              />
            </Form.Item>
          </Col>
        </Flex>
        <Divider />

        <Form.Item label="Photo" name="photo_url">
          <Col>
            <Upload
              name="image"
              accept="image"
              action={`${config.BASE_URL}/file-upload/image`}
              listType="picture-circle"
              fileList={fileList}
              beforeUpload={handleBeforeUpload}
              onPreview={handlePreview}
              onChange={handleMediaChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
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

        <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update Store
          </Button>
        </Form.Item>
      </Template>
    </Form>
  );
};

export default EditStoreForm;
