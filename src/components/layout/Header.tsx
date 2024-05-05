import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Layout, Popover, theme } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { LuLogOut } from 'react-icons/lu';

import { authActions } from '@/common/store/slices/auth.slice';
import { useAppDispatch } from '@/common/store';
import { useGetStoreQuery } from '@/services/storeService';
import { ROUTES } from '@/router/routes';
import { useSelector } from 'react-redux';
import { getUserId } from '@/common/store/selectors';

const { Header } = Layout;

type LayoutHeaderProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const LayoutHeader = ({ collapsed, setCollapsed }: LayoutHeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [arrow, setArrow] = useState<string>('Show');

  const storeId = useSelector(getUserId);
  const { data } = useGetStoreQuery(storeId);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate(ROUTES.LOGIN);
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
          <Button icon={<LuLogOut />} onClick={handleLogout} danger>
            sign out
          </Button>
        }
        arrow={mergedArrow}
        className="flex gap-2 items-center"
      >
        <Button type="primary" shape="circle" icon={<UserOutlined />} />
        {data?.result.storename ?? data?.result.email}
      </Popover>
    </Header>
  );
};

export default LayoutHeader;
