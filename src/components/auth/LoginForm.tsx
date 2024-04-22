import { useState } from 'react';
import { CiLock } from 'react-icons/ci';
import { MdAlternateEmail } from 'react-icons/md';
import { SiNextbilliondotai } from 'react-icons/si';

import { AsyncThunks } from '@/common/store/thunks';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { SignInFormValues } from '@/common/types/auth.type';
import { useAppDispatch } from '@/common/store';
import { validateForm } from './auth.utils';

const LoginForm = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formValues, setFormValues] = useState<SignInFormValues>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(formValues);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(AsyncThunks.login(formValues));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[320px] h-auto flex flex-col gap-4 p-4 rounded-lg bg-[#f2f7ff]"
    >
      <div className="flex gap-2 items-center justify-center">
        <SiNextbilliondotai size={30} />
        <h1 className="text-center text-[32px] font-bold">Next Store</h1>
      </div>

      <Input
        type="email"
        name="email"
        label="Email"
        placeholder="example@gmail.com"
        value={formValues.email}
        icon={<MdAlternateEmail />}
        onChange={handleInputChange}
        error={errors.email}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="********"
        value={formValues.password}
        icon={<CiLock />}
        onChange={handleInputChange}
        error={errors.password}
      />

      <Button type="submit">Sign in</Button>
    </form>
  );
};

export default LoginForm;
