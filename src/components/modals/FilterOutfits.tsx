import { useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Typography,
  Flex,
  Row,
  Col,
} from 'antd';
import {
  categoryOptions,
  colorOptions,
  sizeOptions,
} from '@/constants/outfit.constants';
import { FilterOptions } from '@/views/app/outfit/Outfits';

type Props = {
  handleFilter: (values: FilterOptions) => void;
  handleClear: () => void;
};

const FilterOutfitsForm = ({ handleFilter, handleClear }: Props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onFinish = (values: FilterOptions) => {
    handleFilter(values);
    setVisible(false);
  };

  const onCancel = () => {
    form.resetFields();
    handleClear();
    setVisible(false);
  };

  return (
    <>
      <Flex gap={10} align="center">
        <Typography.Text>Filter:</Typography.Text>
        <Button size="large" onClick={() => setVisible(true)}>
          Filter
        </Button>
      </Flex>

      <Modal
        title="Filter outfits"
        open={visible}
        onCancel={onCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            category: undefined,
            brand: '',
            colors: [],
            sizes: [],
          }}
        >
          <Form.Item label="Category" name="category">
            <Select placeholder="Select category" options={categoryOptions} />
          </Form.Item>

          <Form.Item label="Brand" name="brand">
            <Input placeholder="Enter brand" />
          </Form.Item>

          <Row className="justify-between">
            <Col span={11}>
              <Form.Item label="Colors" name="colors">
                <Select
                  mode="multiple"
                  placeholder="Select colors"
                  options={colorOptions}
                />
              </Form.Item>
            </Col>

            <Col span={11}>
              <Form.Item label="Sizes" name="sizes">
                <Select
                  mode="multiple"
                  placeholder="Select sizes"
                  options={sizeOptions}
                />
              </Form.Item>
            </Col>
          </Row>

          <Flex justify="flex-end" gap={10}>
            <Button onClick={() => form.resetFields()}>Clear</Button>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

export default FilterOutfitsForm;
