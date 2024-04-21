import { ReactNode } from 'react';
import { Dashboard, Header } from '@/components/layout-components';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-[100vw] flex">
      <Header />
      <Dashboard />

      <div className="w-[75%] pt-20 pl-14 bg-[#f7f7f7]">{children}</div>
    </div>
  );
};

export default AppLayout;
