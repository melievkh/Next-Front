import { Button, Form, Input, Typography, message } from 'antd';
import { Template } from '../layout';
import { useChangePasswordMutation } from '@/services/storeService';

const ChangePasswordForm = ({ storeId }: { storeId: string }) => {
  const [form] = Form.useForm();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleOnFinish = async (values: any) => {
    try {
      if (values.oldPassword === values.newPassword) {
        message.error('Old password and new password cannot be the same');
        return;
      }

      await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        id: storeId,
      }).unwrap();
      message.success('Password changed successfully');
    } catch (error) {
      console.error(error);
    }
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
            { required: true, message: 'Old Password is required!' },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message: 'Password is not strong enough!',
            },
          ]}
        >
          <Input.Password placeholder="Enter old password" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            { required: true, message: 'Old Password is required!' },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message: 'Password is not strong enough!',
            },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: 'Please input your confirm password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Enter confirm password" />
        </Form.Item>

        <Form.Item className="flex justify-end">
          <Button loading={isLoading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Template>
  );
};

export default ChangePasswordForm;
