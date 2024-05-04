import { Menu, MenuProps } from 'antd';
import { useSelector } from 'react-redux';
import {
  MdOutlineDashboard,
  MdOutlineProductionQuantityLimits,
  MdOutlineBookmarkBorder,
  MdOutlineLocalGroceryStore,
} from 'react-icons/md';
import { LiaUserEditSolid } from 'react-icons/lia';
import { FaRegUser } from 'react-icons/fa';
import { getUserRole } from '@/common/store/selectors';
import { Role } from '@/common/types/auth.type';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const MenuContent = () => {
  const [current, setCurrent] = useState('menu');
  const role = useSelector(getUserRole);
  const navigate = useNavigate();

  const isAdmin = role === Role.ADMIN;

  const menuItems: MenuItem[] = [
    {
      key: 'menu',
      icon: <MdOutlineDashboard />,
      label: 'Dashboard',
    },
    {
      key: 'profile',
      icon: <FaRegUser />,
      label: 'Profile',
      children: [
        {
          key: 'profile/edit',
          icon: <LiaUserEditSolid />,
          label: 'Edit Profile',
        },
      ],
    },
    {
      key: 'outfits',
      icon: <MdOutlineProductionQuantityLimits />,
      label: 'Outfits',
    },
    {
      key: 'orders',
      icon: <MdOutlineBookmarkBorder />,
      label: 'Orders',
    },
  ];

  if (isAdmin) {
    menuItems.push({
      key: 'stores',
      icon: <MdOutlineLocalGroceryStore />,
      label: 'Stores',
    });
  }

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
    setCurrent(e.key);
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={onClick}
      items={menuItems}
      selectedKeys={[current]}
      defaultSelectedKeys={['menu']}
    />
  );
};

export default MenuContent;
