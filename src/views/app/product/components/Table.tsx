import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TableRowSelection } from 'antd/es/table/interface';
import {
  Table as ATable,
  Button,
  Image,
  Popconfirm,
  Row,
  TableProps,
  Tag,
  message,
} from 'antd';
import { MdOutlineEdit, MdDelete } from 'react-icons/md';

import { useDeleteProductMutation } from '@/services/productService';
import { ProductInfoModal } from '@/components/modals';
import { getUserRole } from '@/common/store/selectors';
import { Product } from '@/common/types/product.type';
import { FilterOptions } from '../Products';
import { ROUTES } from '@/router/routes';
import { UserRole } from '@/common/types/user.type';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

type Props = {
  data: {
    result: Product[];
    count: number;
  };
  isLoading: boolean;
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
};

const Table = ({ data, isLoading, filters, setFilters }: Props) => {
  const navigate = useNavigate();
  const [productInfoVisible, setProductInfoVisible] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<Product | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation();
  const userRole = useSelector(getUserRole);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const setFilter = ({ name, value }: { name: string; value: number }) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteProduct = async () => {
    await deleteProduct(selectedRowKeys)
      .then(() => {
        message.success('Deleted successfully');
      })
      .catch((error) => console.log(error));
    setSelectedRowKeys([]);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleRowClick = (record: Product) => {
    setSelectedRecord(record);
    setProductInfoVisible(true);
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
      dataIndex: 'images',
      key: 'images',
      render: (images) => {
        return (
          <Image.PreviewGroup items={images}>
            <Image width={200} src={images[0]} />
          </Image.PreviewGroup>
        );
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
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
  ];

  const isSuperAdmin = userRole === UserRole.SUPER_ADMIN;

  return (
    <Row className="gap-2">
      {selectedRowKeys.length > 0 && isSuperAdmin && (
        <Row className="gap-3">
          {selectedRowKeys.length === 1 && (
            <Button
              className="flex gap-2 items-center"
              onClick={() => {
                navigate(ROUTES.EDIT_PRODUCT, {
                  state: { productId: selectedRowKeys[0] },
                });
              }}
            >
              <MdOutlineEdit /> Edit
            </Button>
          )}
          <Popconfirm
            placement="top"
            title={'Are you sure to delete?'}
            okText="Sure, delete"
            okType="danger"
            cancelText="Cancel"
            onConfirm={handleDeleteProduct}
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
        rowKey="_id"
        columns={columns}
        dataSource={data?.result}
        loading={isLoading}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        pagination={{
          total: data?.count,
          current: filters.page,
          pageSize: filters.limit,
          onChange: (page) => setFilter({ name: 'page', value: page }),
        }}
      />

      <ProductInfoModal
        visible={productInfoVisible}
        setVisible={setProductInfoVisible}
        product={selectedRecord}
      />
    </Row>
  );
};

export default Table;
