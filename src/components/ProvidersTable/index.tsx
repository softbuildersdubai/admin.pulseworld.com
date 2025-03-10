import { useNavigate } from 'react-router-dom';
import { edit } from '../../images/other';
import GlobalTable from '../Table/GlobalTable';
import { Provider } from '../../store/providers/providerSlice';
import { Tooltip } from '@mui/material';
import StatusChip from '../StatusChip';

type Props = {
  data: {
    list: Provider[];
    paginate: any;
  };
  loading: boolean;
  page: number;
  setPage: (_: any) => void;
};

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'description', label: 'Description' },
  { id: 'logo', label: 'Logo' },
  { id: 'status', label: 'Status', dataClass: 'text-center' },
  { id: 'actions', label: 'Actions', headCellClass: 'text-center' },
];

const ProvidersTable = ({ data, loading, page, setPage }: Props) => {
  const navigate = useNavigate();

  const rows = data?.list?.map((_data) => {
    return {
      name: _data.name,
      description: _data.description,
      logo: _data.logo ? <img src={_data.logo?.path} className="object-contain w-14 h-14" alt="Provider Logo" /> : '-',
      status: <StatusChip status={_data.status} />,
      actions: (
        <div className="flex justify-center">
          <Tooltip title="Edit Provider">
            <img
              src={edit}
              width={24}
              height={24}
              alt="View Icon"
              onClick={() => navigate(`/providers/details/${_data._id}`)}
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

export default ProvidersTable;
