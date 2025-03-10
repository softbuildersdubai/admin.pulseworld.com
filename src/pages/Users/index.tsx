import { useEffect, useState } from 'react';
// REDUX
import { useSelector } from 'react-redux';
import { selectCustomerSlice } from '../../store/customer/customerSlice';
import { useCustomerActions } from '../../store/customer/customerActions';

// COMMON
import { download, refresh } from '../../images/other';
import UsersTable from '../../components/Users/UsersTable';
import UserFilters from '../../components/Users/UsersFilters';
import { USERS_TABLE_DEFAULT_FILTERS } from '../../utils/constance';
import { downloadCSV } from '../../utils/utils';

type SORT_TYPE = {
  sortKey: string | null;
  direction: 'ASC' | 'DESC' | '' | null;
};

type FITLERS_TYPE = {
  search?: any;
  country?: any;
  accountType?: string;
  twoFA?: boolean | null;
  verified?: boolean | null;
  page?: number;
  status?: string;
};

const Users = () => {
  const { getCustomersList } = useCustomerActions();
  const { customersList } = useSelector(selectCustomerSlice);
  const [loading, setLoading] = useState(true);
  const [reFetch, setReFetch] = useState<string>('');

  const [filters, setFilters] = useState<FITLERS_TYPE>(USERS_TABLE_DEFAULT_FILTERS);
  const [sort, setSort] = useState<SORT_TYPE>({
    sortKey: null,
    direction: null,
  });

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target ? e.target.name : e.name]: e.target ? e.target.value : e.value,
    }));
  };

  const clearFilters = () => {
    setFilters(USERS_TABLE_DEFAULT_FILTERS);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);

      filters.page !== -1 && setFilters((prev) => ({ ...prev, page: 1 }));
      await getCustomersList({ ...filters, page: filters.page === -1 ? 1 : 1 });
      setLoading(false);
    })();
  }, [filters.country, filters.accountType, filters.twoFA, filters.verified, filters.status]);

  useEffect(() => {
    if (filters.page !== -1) {
      (async () => {
        setLoading(true);
        await getCustomersList(filters);
        setLoading(false);
      })();
    }
  }, [filters.page]);

  useEffect(() => {
    if (reFetch === 'fetch') {
      (async () => {
        setLoading(true);
        await getCustomersList({
          ...filters,
          page: filters.page === -1 ? 1 : 1,
        });
        setLoading(false);
        setReFetch('');
      })();
    }
  }, [reFetch]);

  useEffect(() => {
    if (filters.search !== null) {
      const search = setTimeout(async () => {
        setLoading(true);
        setFilters((prev) => ({ ...prev, page: 1 }));
        await getCustomersList(filters);
        setLoading(false);
      }, 400);
      return () => clearTimeout(search);
    }
  }, [filters.search]);

  useEffect(() => {
    if (sort.sortKey !== null) {
      (async () => {
        const query =
          sort.sortKey !== ''
            ? {
                ...filters,
                page: 1,
                sortKey: sort.sortKey,
                sortBy: sort.direction,
              }
            : { ...filters, page: 1 };
        await getCustomersList(query);
      })();
    }
  }, [sort]);

  return (
    <div className="w-full px-5">
      {/* PAGE TITLE */}
      <div className="flex  items-center text-white">
        <h1 className="flex-1 font-bold text-2xl py-5">Users</h1>

        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={async () => {
            setLoading(true);

            downloadCSV([
              { name: "John Doe", age: 28, city: "New York" },
              { name: "Jane Smith", age: 34, city: "Los Angeles" },
              { name: "Mike Johnson", age: 45, city: "Chicago" }
            ]);

            setLoading(false);
          }}
        >
          <img src={download} alt="download" width={20} height={20} />
          <span>Download</span>
        </div>

        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={async () => {
            setLoading(true);
            await getCustomersList({ ...USERS_TABLE_DEFAULT_FILTERS, page: 1 });
            setLoading(false);
          }}
        >
          <img src={refresh} alt="refresh" width={24} height={24} />
          <span>Refresh</span>
        </div>
      </div>

      {/* Filter & Actions */}
      <UserFilters filters={filters} handleFilterChange={handleFilterChange} clearFilters={clearFilters} />

      {/* TABLE */}
      <UsersTable
        data={customersList}
        loading={loading}
        page={filters.page}
        setPage={(val) => setFilters((prev) => ({ ...prev, page: val }))}
        setReFetch={setReFetch}
        sort={sort}
        setSort={setSort}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default Users;
