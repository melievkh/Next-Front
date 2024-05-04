import { ChangePasswordForm, EditStoreForm } from '@/components/forms';
import { useGetMeQuery } from '@/services/storeService';
import { Flex, Tabs } from 'antd';

const EditProfile = () => {
  const { data } = useGetMeQuery({});

  return (
    <Flex>
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
            children: <ChangePasswordForm />,
          },
        ]}
      />
    </Flex>
  );
};

export default EditProfile;
