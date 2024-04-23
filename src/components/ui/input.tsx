import { Input as AInput, InputProps as AInputProps } from 'antd';

export interface InputProps extends AInputProps {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  password?: boolean;
}

const Input = ({ label, icon, error, password, ...rest }: InputProps) => {
  return (
    <div className="flex flex-col relative gap-1">
      {label && <label htmlFor={rest.id}>{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}

        {password ? <AInput.Password {...rest} /> : <AInput {...rest} />}
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default Input;
