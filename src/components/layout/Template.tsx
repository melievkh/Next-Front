import { theme } from 'antd';
import { ReactNode } from 'react';

interface TemplateProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Template = ({ children }: TemplateProps) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      style={{
        backgroundColor: colorBgContainer,
        borderRadius: borderRadiusLG,
        overflow: 'auto',
        padding: '20px',
        paddingBottom: '20px',
        paddingTop: '20px',
      }}
    >
      {children}
    </div>
  );
};

export default Template;
