import { Button, Flex, Modal, Select, Typography } from 'antd';
import { HiOutlineFilter } from 'react-icons/hi';

import { FilterOptions } from '@/views/app/Products/Products';
import {
  brandOptions,
  categoryOptions,
  colorOptions,
  sizeOptions,
} from './FilterProducts.constants';
import {
  ProductCategory,
  ProductColor,
  ProductSize,
} from '@/common/types/product.type';
import { useState } from 'react';

type Props = {
  visibile: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
};

const FilterProducts = ({
  visibile,
  setVisible,
  filters,
  setFilters,
}: Props) => {
  const [filterOptions, setFilterOptions] = useState({
    brand: filters.brand,
    category: filters.category,
    colors: filters.colors,
    sizes: filters.sizes,
  });
  const handleSizeChange = (value: ProductSize[]) => {
    setFilterOptions({ ...filters, sizes: value });
  };

  const handleColorChange = (value: ProductColor[]) => {
    setFilterOptions({ ...filters, colors: value });
  };

  const handleBrandChange = (value: string) => {
    setFilterOptions({ ...filters, brand: value });
  };

  const handleCategoryChange = (value: ProductCategory) => {
    setFilterOptions({ ...filters, category: value });
  };

  const handleFilter = () => {
    setFilters({ ...filterOptions });
  };

  return (
    <>
      <Flex gap={10} align="center">
        <Typography.Text>Filter:</Typography.Text>
        <Button onClick={() => setVisible(true)}>
          <HiOutlineFilter />
        </Button>
      </Flex>

      <Modal
        title="Filter products"
        open={visibile}
        okText="Search"
        onOk={handleFilter}
        onCancel={() => setVisible(false)}
        cancelText="cancel"
      >
        <Flex vertical gap={10}>
          <Select
            placeholder="Category"
            onChange={handleCategoryChange}
            options={categoryOptions}
          />
          <Select
            placeholder="Brand"
            onChange={handleBrandChange}
            options={brandOptions}
          />
          <Select
            mode="multiple"
            allowClear
            placeholder="Colors"
            onChange={handleColorChange}
            options={colorOptions}
          />
          <Select
            mode="multiple"
            allowClear
            placeholder="Sizes"
            onChange={handleSizeChange}
            options={sizeOptions}
          />
        </Flex>
      </Modal>
    </>
  );
};

export default FilterProducts;
