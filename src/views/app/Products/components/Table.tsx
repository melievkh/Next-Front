import { Product } from '@/common/types/product.type';
import { Table as ATable, Button, Image, TableProps, Tag } from 'antd';
import { FilterOptions } from '../Products';

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
  const setFilter = ({ name, value }: { name: string; value: number }) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        return <Image src={images[0]} height={110} width={120} />;
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
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
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
  ];

  return (
    <ATable
      columns={columns}
      dataSource={data?.result}
      loading={isLoading}
      pagination={{
        total: data?.count,
        current: filters.page,
        pageSize: filters.limit,
        onChange: (page) => setFilter({ name: 'page', value: page }),
      }}
    />
  );
};

export default Table;
