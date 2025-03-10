import GlobalTable from "../../Table/GlobalTable";
import moment from "moment";


type Props = {
  cells: any;
  data: any;
  loading: boolean;
  page: number;
  setPage: (_: any) => void;
};

const HistoryTable = ({ cells, data, loading, page, setPage }: Props) => {


  const rows = data?.map((_data) => {
    return {
      Id: _data?._id,
      createdAt: moment(_data?.createdAt).format("MMM, DD YYYY hh:mm"),
      fromToken: _data?.fromWallet?.token?.name,
      amount: _data?.amount,
      toToken: _data?.toWallet?.token?.name,
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

export default HistoryTable;
