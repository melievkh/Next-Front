import { useMemo, useState } from 'react';
import { Button, Layout, Popover, theme } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { authActions } from '@/common/store/slices/auth.slice';
import { useAppDispatch } from '@/common/store';
import { useGetMeQuery } from '@/services/user.service';

const { Header } = Layout;

type LayoutHeaderProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const LayoutHeader = ({ collapsed, setCollapsed }: LayoutHeaderProps) => {
  const dispatch = useAppDispatch();
  const [arrow, setArrow] = useState<string>('Show');
  const { data } = useGetMeQuery({});
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false;
    }

    if (arrow === 'Show') {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  return (
    <Header
      style={{ background: colorBgContainer }}
      className="p-0 flex justify-between items-center pr-10"
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />

      <Popover
        placement="bottomLeft"
        content={
          <Button type="default" danger onClick={handleLogout}>
            sign out
          </Button>
        }
        arrow={mergedArrow}
        className="flex gap-2 items-center"
      >
        <Button type="primary" shape="circle" icon={<UserOutlined />} />
        {data?.result.email}
      </Popover>
    </Header>
  );
};

export default LayoutHeader;
