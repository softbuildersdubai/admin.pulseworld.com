import GlobalTable from "../../Table/GlobalTable";
import moment from "moment";


type Props = {
  cells: any;
  data: any;
  loading: boolean;
  page: number;
  setPage: (_: any) => void;
};

const VerificationHistoryTable = ({ cells, data, loading, page, setPage }: Props) => {


  const rows = data?.map((_data) => {
    return {
      Id: _data?._id,
      email:_data.email,
      createdAt: moment(_data?.createdAt).format("MMM, DD YYYY hh:mm"),
      status:  _data.status ? (
        <span className={_data.status ==='REJECT' ?  'text-red-600' : _data.status ==='VERIFIED' ? 'text-greenSecondary' : 'text-yellow-600'}>
          {_data.status}
        </span>
      ) : "-",
      type: _data?.type,
    };
  });

  return (
    <>
      <GlobalTable
        rows={rows}
        headCells={cells}
        isLoading={loading}
        page={page}
        handlePageChange={setPage}
      />
    </>
  );
};

export default VerificationHistoryTable;
