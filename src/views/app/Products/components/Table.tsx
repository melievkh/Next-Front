import { Product } from '@/common/types/product.type';

type Props = {
  data: Product[];
};

const Table = ({ data }: Props) => {
  const tableStyle = 'border border-gray-300 px-4 py-2';

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className={tableStyle}>Code</th>
          <th className={tableStyle}>Brand</th>
          <th className={tableStyle}>Size</th>
          <th className={tableStyle}>Color</th>
          <th className={tableStyle}>Price</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((product: Product) => (
          <tr key={product._id} className="hover:bg-gray-100">
            <td className={tableStyle}>{product.code}</td>
            <td className={tableStyle}>{product.brand}</td>
            <td className={tableStyle}>{product.sizes}</td>
            <td className={tableStyle}>{product.colors}</td>
            <td className={tableStyle}>{product.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
