import { Menu, MenuProps } from 'antd';
import { useSelector } from 'react-redux';
import {
  MdOutlineDashboard,
  MdOutlineProductionQuantityLimits,
  MdOutlineBookmarkBorder,
  MdOutlineLocalGroceryStore,
} from 'react-icons/md';
import { IoAddCircleOutline } from 'react-icons/io5';
import { HiMenuAlt1 } from 'react-icons/hi';

import { LiaUserEditSolid } from 'react-icons/lia';
import { FaRegUser } from 'react-icons/fa';
import { getUserRole } from '@/common/store/selectors';
import { Role } from '@/common/types/auth.type';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/routes';

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
      key: ROUTES.PROFILE,
      icon: <FaRegUser />,
      label: 'Profile',
      children: [
        {
          key: ROUTES.EDIT_PROFILE,
          icon: <LiaUserEditSolid />,
          label: 'Edit Profile',
        },
      ],
    },
    {
      key: ROUTES.OUTFITS,
      icon: <MdOutlineProductionQuantityLimits />,
      label: 'Outfits',
    },
    {
      key: ROUTES.ORDERS,
      icon: <MdOutlineBookmarkBorder />,
      label: 'Orders',
    },
  ];

  if (isAdmin) {
    const storesMenu: MenuItem = {
      key: ROUTES.STORE,
      icon: <MdOutlineLocalGroceryStore />,
      label: 'Stores',
      children: [
        {
          key: ROUTES.STORES,
          icon: <HiMenuAlt1 />,
          label: 'Stores List',
        },
        {
          key: ROUTES.CREATE_STORE,
          icon: <IoAddCircleOutline />,
          label: 'Create Store',
        },
      ],
    };
    const profileIndex = menuItems.findIndex(
      (item) => item?.key === ROUTES.PROFILE,
    );
    if (profileIndex !== -1) {
      menuItems.splice(profileIndex + 1, 0, storesMenu);
    } else {
      menuItems.push(storesMenu);
    }
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
