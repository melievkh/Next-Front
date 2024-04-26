import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  Typography,
  Flex,
  message,
} from 'antd';
import {
  categoryOptions,
  colorOptions,
  sizeOptions,
} from '@/constants/product.constants';
import { Product } from '@/common/types/product.type';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '@/services/product.service';

type Props = { mode: string; productData?: Product };

const ProductForm = ({ mode, productData }: Props) => {
  const [form] = Form.useForm();
  const [updateProduct, { isLoading: isUpdateLoading }] =
    useUpdateProductMutation();
  const [createProduct, { isLoading: isCreateLoading }] =
    useCreateProductMutation();

  const isEditMode = mode === 'EDIT';
  if (isEditMode) {
    form.setFieldsValue(productData);
  }

  const handleFormSubmit = async (values: any) => {
    try {
      if (isEditMode) {
        await updateProduct({
          _id: productData?._id,
          ...values,
        }).unwrap();
        message.success('Product updated successfully');
      } else {
        const imagesArray = values.images
          .split(',')
          .map((url: string) => url.trim());

        const productToCreate = {
          ...values,
          price: Number(values.price),
          images: imagesArray,
        };
        await createProduct(productToCreate).unwrap();
        message.success('Product created successfully');
      }
    } catch (error) {
      console.log(error);
    }
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
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input placeholder="Enter title" name="title" />
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
          {isEditMode ? 'Update Product' : 'Create Product'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
