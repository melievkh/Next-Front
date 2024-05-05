import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableRowSelection } from 'antd/es/table/interface';
import {
  Table as ATable,
  Button,
  Flex,
  Image,
  Popconfirm,
  Row,
  TableProps,
  Tag,
  message,
} from 'antd';
import { MdOutlineEdit, MdDelete } from 'react-icons/md';

import { ROUTES } from '@/router/routes';
import { Outfit } from '@/common/types/outfit.type';
import { FilterOptions } from '../Outfits';
import { useDeleteOutfitMutation } from '@/services/outfitService';
import { OutfitInfoModal } from '@/components/modals';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

type Props = {
  data: {
    result: Outfit[];
    count: number;
  };
  isLoading: boolean;
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
};

const OutfitTable = ({ data, isLoading, filters, setFilters }: Props) => {
  const navigate = useNavigate();
  const [outfitInfoVisible, setOutfitInfoVisible] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<Outfit | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [deleteOutfit, { isLoading: isDeleteLoading }] =
    useDeleteOutfitMutation();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const setFilter = ({ name, value }: { name: string; value: number }) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteOutfit = async () => {
    await deleteOutfit(selectedRowKeys)
      .then(() => {
        message.success('Deleted successfully');
      })
      .catch((error) => console.error(error));
    setSelectedRowKeys([]);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleClickShowMore = (record: Outfit) => {
    setSelectedRecord(record);
    setOutfitInfoVisible(true);
  };

  const handleNavigateToEdit = (outfit: Outfit) => {
    navigate(ROUTES.EDIT_OUTFIT, { state: { outfitId: outfit.id } });
  };

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: (text) => <Tag className="text-[#2f49bd]">{text}</Tag>,
    },
    {
      title: 'Image',
      dataIndex: 'image_urls',
      key: 'image_urls',
      render: (images) => {
        return (
          <Image.PreviewGroup items={images}>
            <Image width={200} height={200} draggable src={images[0]} />
          </Image.PreviewGroup>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Sizes',
      dataIndex: 'sizes',
      key: 'sizes',
      render: (sizes) => {
        return sizes.map((size: string, index: number) => (
          <Tag key={index}>{size}</Tag>
        ));
      },
    },
    {
      title: 'Color',
      dataIndex: 'colors',
      key: 'colors',
      render: (colors) => {
        return colors?.map((color: string) => (
          <Button
            key={color}
            style={{ backgroundColor: color }}
            type="primary"
            shape="circle"
            size="small"
          />
        ));
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        return (
          <Flex gap={10}>
            <Button
              type="default"
              size="small"
              className="bg-[#e3edfc]"
              onClick={() => handleNavigateToEdit(record)}
            >
              <MdOutlineEdit />
            </Button>
            <Button
              type="default"
              size="small"
              onClick={() => handleClickShowMore(record)}
            >
              more
            </Button>
          </Flex>
        );
      },
    },
  ];

  return (
    <Row className="gap-2">
      {selectedRowKeys.length > 0 && (
        <Row>
          <Popconfirm
            placement="top"
            title={'Are you sure to delete?'}
            okText="Sure, delete"
            okType="danger"
            cancelText="Cancel"
            onConfirm={handleDeleteOutfit}
          >
            <Button
              danger
              className="flex gap-2 items-center"
              loading={isDeleteLoading}
            >
              <MdDelete />
              {selectedRowKeys.length > 1 ? 'Delete all' : 'Delete'}
            </Button>
          </Popconfirm>
        </Row>
      )}

      <ATable
        rowKey="id"
        columns={columns}
        dataSource={data?.result}
        loading={isLoading}
        rowSelection={rowSelection}
        style={{ width: '100%' }}
        pagination={{
          total: data?.count,
          current: filters.page,
          pageSize: filters.limit,
          onChange: (page) => setFilter({ name: 'page', value: page }),
        }}
      />

      <OutfitInfoModal
        visible={outfitInfoVisible}
        setVisible={setOutfitInfoVisible}
        outfit={selectedRecord}
      />
    </Row>
  );
};

export default OutfitTable;
