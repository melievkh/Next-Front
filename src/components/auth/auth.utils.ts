import { SignInFormValues } from '@/common/types/auth.type';

export const validateForm = (formValues: SignInFormValues) => {
  const errors: { [key: string]: string } = {};

  if (!formValues.email) {
    errors.email = 'Email is required';
  }
  if (!formValues.password) {
    errors.password = 'Password is required';
  }
  return errors;
};
