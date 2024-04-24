import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  MdOutlineDashboard,
  MdOutlineProductionQuantityLimits,
  MdOutlineBookmarkBorder,
} from 'react-icons/md';

const MenuContent = () => {
  const menuItems = [
    {
      key: '1',
      icon: <MdOutlineDashboard />,
      label: 'Dashboard',
      to: '/',
    },
    {
      key: '2',
      icon: <MdOutlineProductionQuantityLimits />,
      label: 'Products',
      to: '/products',
    },
    {
      key: '3',
      icon: <MdOutlineBookmarkBorder />,
      label: 'Orders',
      to: '/orders',
    },
  ];

  return (
    <Menu theme="dark" mode="vertical" defaultSelectedKeys={['1']}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.to}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default MenuContent;
