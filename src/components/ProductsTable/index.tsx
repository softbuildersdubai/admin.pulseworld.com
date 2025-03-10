import { useNavigate } from 'react-router-dom';
import { edit } from '../../images/other';
import GlobalTable from '../Table/GlobalTable';
import { Product } from '../../store/products/productSlice';
import { Tooltip } from '@mui/material';
import StatusChip from '../StatusChip';

type Props = {
  data: {
    list: Product[];
    paginate: any;
  };
  loading: boolean;
  page: number;
  setPage: (_: any) => void;
};

const headCells = [
  { id: 'name', label: 'Name', dataClass: 'w-32' },
  { id: 'price', label: 'Price' },
  { id: 'description', label: 'Description' },
  { id: 'provider', label: 'Provider' },
  { id: 'image', label: 'Image' },
  { id: 'status', label: 'Status', dataClass: 'text-center' },
  { id: 'actions', label: 'Actions', headCellClass: 'text-center' },
];

const ProductsTable = ({ data, loading, page, setPage }: Props) => {
  const navigate = useNavigate();

  const rows = data?.list?.map((_data) => {
    return {
      name: _data?.name,
      price: _data?.price,
      description: _data?.description,
      provider: (
        <div className="flex gap-2 items-center">
          <img src={_data?.image?.path} className="object-contain w-14 h-14" alt="Product Image" />
          <span>{_data?.provider?.name}</span>
        </div>
      ),
      image: _data?.image ? (
        <img src={_data?.image?.path} className="object-contain w-14 h-14" alt="Product Image" />
      ) : (
        '-'
      ),
      status: <StatusChip status={_data.status} />,
      actions: (
        <div className="flex justify-center">
          <Tooltip title="Edit Product">
            <img
              src={edit}
              width={24}
              height={24}
              alt="Edit Icon"
              onClick={() => navigate(`/products/details/${_data?._id}`)}
              className="cursor-pointer"
            />
          </Tooltip>
        </div>
      ),
    };
  });

  return (
    // TABLE
    <GlobalTable rows={rows} headCells={headCells} isLoading={loading} page={page} handlePageChange={setPage} />
  );
};

export default ProductsTable;
