import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  Typography,
  Upload,
  UploadProps,
  UploadFile,
  Image,
  message,
  Divider,
} from 'antd';
import { getBase64 } from '@/utils/common';
import { config } from '@/config/app.config';
import { Store } from '@/common/types/store.type';

type Props = { mode: string; storeData?: Store };

const StoreForm = ({ mode, storeData }: Props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  const isEditMode = mode === 'EDIT';
  if (isEditMode && storeData) {
    form.setFieldsValue(storeData);
  }

  const handleFormSubmit = async (values: any) => {
    console.log(values);
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

  return (
    <Form
      form={form}
      onFinish={handleFormSubmit}
      layout="vertical"
      className="flex flex-col gap-4"
    >
      <Typography.Text className="text-[30px] font-bold">
        Basic Info
      </Typography.Text>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Store name"
            name="storename"
            rules={[{ required: true, message: 'Store name is required!' }]}
          >
            <Input placeholder="Enter store name" name="storename" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email is required!' }]}
          >
            <Input placeholder="Enter email" name="email" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Password is required!' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                message:
                  'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
              },
            ]}
          >
            <Input.Password placeholder="Enter password" name="password" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
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
      </Row>

      <Divider />

      <Form.Item label="Photo" name="photo_url">
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

      <Divider />

      <Form.Item>
        <Button className="w-full" type="primary" htmlType="submit">
          {isEditMode ? 'Update Store' : 'Create Store'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StoreForm;
