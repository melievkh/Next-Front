import { ReactNode } from 'react';
import { Dashboard, Header } from '@/components/layout';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-[100vw] flex">
      <Header />
      <Dashboard />

      <div className="w-[75%] max-h-[100vh] pt-20 pl-14 bg-[#f7f7f7] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
