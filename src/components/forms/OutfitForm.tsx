import { Form, Input, Select, Row, Col, Button, Typography, Flex } from 'antd';
import {
  categoryOptions,
  colorOptions,
  sizeOptions,
} from '@/constants/outfit.constants';
import {
  useCreateOutfitMutation,
  useUpdateOutfitMutation,
} from '@/services/outfitService';
import { Outfit } from '@/common/types/outfit.type';

type Props = { mode: string; outfitData?: Outfit };

const OutfitForm = ({ mode, outfitData }: Props) => {
  const [form] = Form.useForm();
  const [updateOutfit, { isLoading: isUpdateLoading }] =
    useUpdateOutfitMutation();
  const [createOutfit, { isLoading: isCreateLoading }] =
    useCreateOutfitMutation();

  const isEditMode = mode === 'EDIT';
  if (isEditMode) {
    form.setFieldsValue(outfitData);
  }

  const handleFormSubmit = async (values: any) => {
    console.log(values);
  };

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
          <Form.Item label="Brand" name="brand">
            <Input placeholder="brand" name="brand" />
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
          <Form.Item label="Code" name="code" rules={[{ required: true }]}>
            <Input placeholder="Enter code" name="code" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <Input type="number" placeholder="Enter price" name="price" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Title" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter title" name="name" />
          </Form.Item>
        </Col>
      </Row>

      <Flex justify="space-between">
        <Col style={{ width: '45%' }}>
          <Form.Item label="Description" name="description">
            <Input.TextArea
              placeholder="Enter description"
              name="description"
              rows={4}
              style={{ resize: 'none' }}
            />
          </Form.Item>
        </Col>
        <Col style={{ width: '45%' }}>
          <Form.Item
            label="Images urls"
            name="images"
            rules={[{ required: true }]}
          >
            <Input.TextArea
              placeholder="Enter image urls"
              name="images"
              rows={4}
              style={{ resize: 'none' }}
            />
          </Form.Item>
        </Col>
      </Flex>

      <Form.Item>
        <Button
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
