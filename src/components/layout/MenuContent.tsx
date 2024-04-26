import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  MdOutlineDashboard,
  MdOutlineProductionQuantityLimits,
  MdOutlineBookmarkBorder,
} from 'react-icons/md';

const MenuContent = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: '1',
      icon: <MdOutlineDashboard />,
      label: 'Dashboard',
      title: 'Dashboard',
      to: '/',
    },
    {
      key: '2',
      icon: <MdOutlineProductionQuantityLimits />,
      label: 'Products',
      title: 'Products',
      to: '/products',
    },
    {
      key: '3',
      icon: <MdOutlineBookmarkBorder />,
      label: 'Orders',
      title: 'Orders',
      to: '/orders',
    },
  ];

  const selectedKey = menuItems.find(
    (item) => item.to === location.pathname,
  )?.key;

  return (
    <Menu
      theme="dark"
      mode="vertical"
      defaultSelectedKeys={[selectedKey || '1']}
    >
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.to}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default MenuContent;
