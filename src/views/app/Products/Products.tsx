import { useState } from 'react';
import { CiFilter } from 'react-icons/ci';

import { useGetProductsQuery } from '@/services/product.service';
import { Button } from '@/components/ui/button';
import Table from './components/Table';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface FilterOptions {
  search: string;
  brand: string;
  size: string;
  color: string;
  price: string;
}

const Products: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    brand: '',
    size: '',
    color: '',
    price: '',
  });
  const { data } = useGetProductsQuery(filters);

  // const handleFilterChange = (key: keyof FilterOptions, value: string) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [key]: value,
  //   }));
  // };

  console.log(data);

  return (
    <div className="p-4 h-[100vh]">
      <div className="flex items-center justify-between mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <CiFilter /> filter
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filter products by:</DialogTitle>
            </DialogHeader>

            <DialogFooter>
              <Button type="submit">Filter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table data={data?.result} />
    </div>
  );
};

export default Products;
