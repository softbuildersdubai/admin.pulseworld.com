import React from "react";

type Props = {
  rows: any[];
  headers: any[];
  isLoading: boolean;
  page: number;
  handlePageChange: Function;
};

const AppTable = ({
  rows,
  headers,
  isLoading,
  page,
  handlePageChange,
}: Props) => {
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {headers.map((head) => {
                return (
                  <th scope="col" className="px-6 py-3">
                    {head.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((colum) => {
              return (
                <tr>
                  {headers.map((head, index) => {
                    return <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">{colum[head?.id]}</th>;
                  })}
                </tr>
              );
            })}
            <div></div>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppTable;
