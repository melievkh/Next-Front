import { ROUTES } from '@/router/routes';
import { useState } from 'react';
import { GoHome } from 'react-icons/go';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<string>('dashboard');

  const listStyle =
    'w-full h-10 flex items-center font-[500] gap-1 pl-6 transition-colors duration-300 cursor-pointer text-[#455560] hover:text-[#3e79f7]';
  const activeListStyle =
    'bg-[#e8eefa] text-[#3e79f7] border-r-2 border-[#3e79f7] transition-colors duration-300';

  const dashboardConstants = [
    {
      to: ROUTES.PRODUCTS,
      activeSession: 'products',
      title: 'Products',
    },
    {
      to: ROUTES.ORDERS,
      activeSession: 'orders',
      title: 'Orders',
    },
    {
      to: ROUTES.USERS,
      activeSession: 'users',
      title: 'Users',
    },
  ];

  return (
    <div className="w-[25%] h-[100vh] pt-20 shadow-lg">
      <Link
        to={ROUTES.HOME}
        className={`${listStyle} ${
          activeSection === 'dashboard' && activeListStyle
        }`}
        onClick={() => setActiveSection('dashboard')}
      >
        <GoHome />
        Dashboard
      </Link>

      <ul>
        {dashboardConstants.map(({ to, activeSession, title }) => (
          <Link key={to} to={to}>
            <li
              className={`${listStyle} ${
                activeSection === activeSession && activeListStyle
              }`}
              onClick={() => setActiveSection(activeSession)}
            >
              {title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
