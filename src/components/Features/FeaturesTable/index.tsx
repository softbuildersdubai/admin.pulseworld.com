import { edit } from '../../../images/other';
import GlobalTable from '../../Table/GlobalTable';
import { Feature } from '../../../store/features/featuresSlice';
import GlobalDialog from '../../Dialog';
import { useState } from 'react';
import FeaturesDetails from '../../../pages/Features/FeaturesDetails';
import { Tooltip } from '@mui/material';
import StatusChip from '../../StatusChip';

type Props = {
  data: Feature[];
  loading: boolean;
};

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'type', label: 'Type' },
  { id: 'description', label: 'Description' },
  { id: 'price', label: 'Price' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions', headCellClass: 'text-center' },
];

const FeaturesTable = ({ data, loading }: Props) => {
  const [openUpdateFeature, setOpenUpdateFeature] = useState(false);
  const [currentFeatureId, setCurrentFeatureId] = useState('');

  const rows = data?.map((_data) => {
    return {
      name: _data.name,
      type: _data.type,
      description: _data.description ?? '-',
      price: _data.price,
      status: <StatusChip status={_data.status ?? '-'} />,
      actions: (
        <Tooltip title="Edit Price">
          <div className="flex justify-center">
            <img
              src={edit}
              width={24}
              height={24}
              alt="Edit Icon"
              onClick={() => {
                setCurrentFeatureId(_data._id);
                setOpenUpdateFeature(true);
              }}
              className="cursor-pointer"
            />
          </div>
        </Tooltip>
      ),
    };
  });

  return (
    // TABLE
    <>
      <GlobalTable rows={rows} headCells={headCells} isLoading={loading} paginate={false} />
      <GlobalDialog
        open={openUpdateFeature}
        onClose={() => setOpenUpdateFeature(false)}
        content={
          <FeaturesDetails featureId={currentFeatureId} closeDialogHandler={() => setOpenUpdateFeature(false)} />
        }
        closeButtonShow={false}
      ></GlobalDialog>
    </>
  );
};

export default FeaturesTable;
