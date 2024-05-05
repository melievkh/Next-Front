import { ChangePasswordForm, EditStoreForm } from '@/components/forms';
import { useGetStoreQuery } from '@/services/storeService';
import { Tabs } from 'antd';
import { useLocation } from 'react-router-dom';

const EditStore = () => {
  const location = useLocation();
  const { storeId } = location.state;
  const { data } = useGetStoreQuery(storeId);

  return (
    <Tabs
      defaultActiveKey={'edit_profile'}
      style={{ width: '100%' }}
      items={[
        {
          label: 'Edit Profile',
          key: 'edit_profile',
          children: <EditStoreForm storeData={data?.result} />,
        },
        {
          label: 'Change password',
          key: 'change_password',
          children: <ChangePasswordForm storeId={data?.result} />,
        },
      ]}
    />
  );
};

export default EditStore;
