import { useState } from 'react';
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
  ProductBrand,
  ProductCategory,
  ProductColor,
  ProductSize,
} from '@/common/types/product.type';

type Props = {
  visibile: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
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
    setFilterOptions({ ...filterOptions, sizes: value });
  };

  const handleColorChange = (value: ProductColor[]) => {
    setFilterOptions({ ...filterOptions, colors: value });
  };

  const handleBrandChange = (value: ProductBrand) => {
    setFilterOptions({ ...filterOptions, brand: value });
  };

  const handleCategoryChange = (value: ProductCategory) => {
    setFilterOptions({ ...filterOptions, category: value });
  };

  const handleFilter = () => {
    setFilters({
      ...filters,
      ...filterOptions,
    });
    setVisible(false);
  };

  const handleClear = () => {
    setFilterOptions({
      brand: null,
      category: null,
      colors: [],
      sizes: [],
    });
    setFilters({ ...filters, ...filterOptions });
  };

  return (
    <>
      <Flex gap={10} align="center">
        <Typography.Text>Filter:</Typography.Text>
        <Button size="large" onClick={() => setVisible(true)}>
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
        footer={
          <Flex justify="flex-end" gap={10}>
            <Button onClick={handleClear}>Clear</Button>
            <Button type="primary" onClick={handleFilter}>
              Search
            </Button>
          </Flex>
        }
      >
        <Flex vertical gap={10}>
          <Flex vertical gap={4}>
            <label>Category</label>
            <Select
              placeholder="category"
              onChange={handleCategoryChange}
              options={categoryOptions}
              value={filterOptions.category}
            />
          </Flex>

          <Flex vertical gap={4}>
            <label>Brand</label>
            <Select
              placeholder="brand"
              onChange={handleBrandChange}
              options={brandOptions}
              value={filterOptions.brand}
            />
          </Flex>

          <Flex justify="space-between">
            <Flex vertical style={{ width: '45%' }} gap={4}>
              <label>Colors: </label>
              <Select
                mode="multiple"
                allowClear
                placeholder="Colors"
                onChange={handleColorChange}
                options={colorOptions}
                value={filterOptions.colors}
              />
            </Flex>
            <Flex vertical style={{ width: '45%' }} gap={4}>
              <label>Sizes: </label>
              <Select
                mode="multiple"
                allowClear
                placeholder="Sizes"
                onChange={handleSizeChange}
                options={sizeOptions}
                value={filterOptions.sizes}
              />
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default FilterProducts;
