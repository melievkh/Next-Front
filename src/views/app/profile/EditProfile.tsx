import { getUserId } from '@/common/store/selectors';
import { ChangePasswordForm, EditStoreForm } from '@/components/forms';
import { useGetStoreQuery } from '@/services/storeService';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';

const EditProfile = () => {
  const storeId = useSelector(getUserId);
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
          children: <ChangePasswordForm storeId={data?.result.id} />,
        },
      ]}
    />
  );
};

export default EditProfile;
