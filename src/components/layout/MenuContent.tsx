import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  MdOutlineDashboard,
  MdOutlineProductionQuantityLimits,
  MdOutlineBookmarkBorder,
  MdOutlineLocalGroceryStore,
} from 'react-icons/md';
import { getUserRole } from '@/common/store/selectors';
import { Role } from '@/common/types/auth.type';

const MenuContent = () => {
  const location = useLocation();
  const role = useSelector(getUserRole);

  const isAdmin = role === Role.ADMIN;

  const menuItems = [
    {
      key: 'menu',
      icon: <MdOutlineDashboard />,
      label: 'Dashboard',
      title: 'Dashboard',
      to: '/',
    },
    {
      key: 'outfits',
      icon: <MdOutlineProductionQuantityLimits />,
      label: 'Outfits',
      title: 'Outfits',
      to: '/outfits',
    },
    {
      key: 'orders',
      icon: <MdOutlineBookmarkBorder />,
      label: 'Orders',
      title: 'Orders',
      to: '/orders',
    },
    {
      key: 'stores',
      icon: <MdOutlineLocalGroceryStore />,
      label: 'Stores',
      title: 'Stores',
      to: '/stores',
    },
  ];

  const basePath = location.pathname.split('/')[1];

  const selectedKey = menuItems.find((item) =>
    item.to.includes(`/${basePath}`),
  )?.key;

  return (
    <Menu
      theme="dark"
      mode="vertical"
      defaultSelectedKeys={[selectedKey || '1']}
    >
      {menuItems.map((item) =>
        isAdmin || item.key !== 'stores' ? (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.to}>{item.label}</Link>
          </Menu.Item>
        ) : null,
      )}
    </Menu>
  );
};

export default MenuContent;
