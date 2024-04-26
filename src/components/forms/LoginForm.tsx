import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';

import { AsyncThunks } from '@/common/store/thunks';
import { SignInFormValues } from '@/common/types/auth.type';
import { getLoginLoading } from '@/common/store/selectors';
import { useAppDispatch } from '@/common/store';

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useSelector(getLoginLoading);

  const [form] = Form.useForm();

  const handleSubmit = async (values: SignInFormValues) => {
    try {
      const response = await dispatch(AsyncThunks.login(values));
      if (response.meta.requestStatus === 'fulfilled') {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      className="w-[320px] h-auto flex flex-col gap-4 p-4 rounded-lg bg-[#f2f7ff]"
    >
      <div className="flex gap-2 items-center justify-center">
        <Typography.Title className="text-center text-[32px] font-bold">
          Next Store
        </Typography.Title>
      </div>

      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input type="email" placeholder="example@gmail.com" />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password
          type="password"
          placeholder="********"
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
