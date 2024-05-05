import { ChangePasswordForm, EditStoreForm } from '@/components/forms';
import { Tabs } from 'antd';
import { useLocation } from 'react-router-dom';

const EditStore = () => {
  const location = useLocation();
  const { store } = location.state;

  return (
    <Tabs
      defaultActiveKey={'edit_profile'}
      style={{ width: '100%' }}
      items={[
        {
          label: 'Edit Profile',
          key: 'edit_profile',
          children: <EditStoreForm storeData={store} />,
        },
        {
          label: 'Change password',
          key: 'change_password',
          children: <ChangePasswordForm storeId={store.id} />,
        },
      ]}
    />
  );
};

export default EditStore;
