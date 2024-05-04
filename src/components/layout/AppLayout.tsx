import { Layout } from 'antd';
import { ReactNode, useState } from 'react';

import LayoutHeader from './Header';
import MenuContent from './MenuContent';

const { Sider, Content } = Layout;

const AppLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Layout className="h-[100vh]">
      <Sider width={240} trigger={null} collapsible collapsed={collapsed}>
        <MenuContent />
      </Sider>

      <Layout>
        <div className="demo-logo" />
        <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        <Content
          style={{
            padding: 24,
            minHeight: 280,
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
