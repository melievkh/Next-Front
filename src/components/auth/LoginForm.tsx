import { Button, Typography } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import Input from '../ui/input';
import { AsyncThunks } from '@/common/store/thunks';
import { SignInFormValues } from '@/common/types/auth.type';
import { getLoginLoading } from '@/common/store/selectors';
import { useAppDispatch } from '@/common/store';
import { validateForm } from './auth.utils';

const LoginForm = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<SignInFormValues>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const loading = useSelector(getLoginLoading);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = () => {
    const errors = validateForm(formValues);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(AsyncThunks.login(formValues));
    }
  };

  return (
    <form className="w-[320px] h-auto flex flex-col gap-4 p-4 rounded-lg bg-[#f2f7ff]">
      <div className="flex gap-2 items-center justify-center">
        <Typography.Title className="text-center text-[32px] font-bold">
          Next Store
        </Typography.Title>
      </div>

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="example@gmail.com"
        value={formValues.email}
        onChange={handleInputChange}
        error={errors.email}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="********"
        value={formValues.password}
        onChange={handleInputChange}
        password
        visibilityToggle={{
          visible: passwordVisible,
          onVisibleChange: setPasswordVisible,
        }}
        error={errors.password}
      />

      <Button type="primary" onClick={handleSubmit} loading={loading}>
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
