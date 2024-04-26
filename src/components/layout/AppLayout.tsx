import { Layout, theme } from 'antd';
import { ReactNode, useState } from 'react';

import LayoutHeader from './Header';
import MenuContent from './MenuContent';

const { Sider, Content, Footer } = Layout;

const AppLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="h-[100vh]">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <MenuContent />
      </Sider>

      <Layout>
        <div className="demo-logo" />
        <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
