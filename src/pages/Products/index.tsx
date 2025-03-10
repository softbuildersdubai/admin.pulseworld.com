import { useEffect, useState } from 'react';
// REDUX
import { useSelector } from 'react-redux';

// COMMON
import { add, refresh } from '../../images/other';
import { useProductActions } from '../../store/products/productActions';
import { selectProductSlice } from '../../store/products/productSlice';
import ProductsTable from '../../components/ProductsTable';
import { Link } from 'react-router-dom';

const Products = () => {
  const { getProducts } = useProductActions();
  const { products } = useSelector(selectProductSlice);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getProducts();
      setLoading(false);
    })();
  }, []);

  return (
    <div className="w-full px-2">
      {/* PAGE TITLE */}
      <div className="flex bg-primary items-center text-white">
        <h1 className="flex-1 font-bold text-2xl py-1">Products</h1>

        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getProducts(true);
            setLoading(false);
          }}
        >
          <img src={refresh} alt="" width={24} height={24} />
          <span>Refresh</span>
        </div>

        <Link to={'/products/add'} className="flex gap-1 text-white items-center cursor-pointer px-3">
          <img src={add} alt="" width={24} height={24} />
          <span>Add Product</span>
        </Link>
      </div>

      {/* TABLE */}
      <ProductsTable data={products} loading={loading} page={page} setPage={setPage} />
    </div>
  );
};

export default Products;
