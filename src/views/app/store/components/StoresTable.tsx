import { FilterStoresOptions, Store } from '@/common/types/store.type';
import { ROUTES } from '@/router/routes';
import {
  Avatar,
  Button,
  Flex,
  Image,
  Switch,
  Table,
  TableProps,
  Tag,
} from 'antd';
import { MdOutlineEdit, MdOutlineLocalGroceryStore } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

type Props = {
  storeData: Store[];
  dataCount: number;
  isLoading: boolean;
  filters: FilterStoresOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterStoresOptions>>;
};

const StoresTable = ({
  storeData,
  isLoading,
  dataCount,
  filters,
  setFilters,
}: Props) => {
  const navigate = useNavigate();

  const handleNavigateToEdit = (store: Store) => {
    navigate(ROUTES.EDIT_STORE, { state: { store } });
  };

  const columns: TableProps<Store>['columns'] = [
    {
      title: 'No.',
      dataIndex: 'id',
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'storename',
    },
    {
      title: 'Photo',
      dataIndex: 'photo_url',
      render: (photo: string) => {
        return (
          <>
            {photo ? (
              <Image width={100} src={photo} />
            ) : (
              <Avatar
                style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
                size={64}
                icon={<MdOutlineLocalGroceryStore />}
              />
            )}
          </>
        );
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (type: string) => {
        return <Tag>{type}</Tag>;
      },
    },
    {
      title: 'Availability',
      dataIndex: 'available',
      render: (available: boolean) => {
        return <Switch checked={available} />;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => {
        return (
          <Button
            type="default"
            size="small"
            className="bg-[#e3edfc]"
            onClick={() => handleNavigateToEdit(record)}
          >
            <MdOutlineEdit />
          </Button>
        );
      },
    },
  ];

  return (
    <Flex className="w-full">
      <Table
        style={{ width: '100%' }}
        rowKey="id"
        columns={columns}
        dataSource={storeData}
        loading={isLoading}
        pagination={{
          total: dataCount,
          current: filters.page,
          pageSize: filters.limit,
          onChange: (page: number) => {
            setFilters({ ...filters, page });
          },
        }}
      />
    </Flex>
  );
};

export default StoresTable;
