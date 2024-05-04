import { Button, Form, Input, Typography } from 'antd';
import { Template } from '../layout';

const ChangePasswordForm = () => {
  const [form] = Form.useForm();

  const handleOnFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <Template>
      <Typography.Title level={3}>Change Password</Typography.Title>

      <Form
        form={form}
        onFinish={handleOnFinish}
        layout="vertical"
        className="w-full flex flex-col gap-4"
      >
        <Form.Item
          name="oldPassword"
          label="Old Password"
          rules={[
            {
              required: true,
              message: 'Please input your old password!',
            },
          ]}
        >
          <Input.Password placeholder="Enter old password" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: 'Please input your new password!',
            },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[
            {
              required: true,
              message: 'Please input your confirm password!',
            },
          ]}
        >
          <Input.Password placeholder="Enter confirm password" />
        </Form.Item>

        <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Template>
  );
};

export default ChangePasswordForm;
