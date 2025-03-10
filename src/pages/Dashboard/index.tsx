import { useEffect, useState } from 'react';
import { useDashboardActions } from '../../store/Dashboard/dashboardActions';
import { useSelector } from 'react-redux';
import { selectDashboard } from '../../store/Dashboard/dashboardSlice';
import {
  dashboardUserOverviewTitles,
  dashboardOrdersOverviewTitles,
  dashboardProductsOverviewTitles
} from '../../constants';
import Card from '../../components/Dashboard/Card';
import Loader from '../../components/Loader/Loader';
import TokenNameWithLogo from '../../components/TokenNameWithLogo';
import { users } from '../../images/other';
import GlobalTable from '../../components/Table/GlobalTable';
import { Tabs } from 'antd';
import { Tab } from '@mui/material';
import Button from '../../components/Button';
import { log } from 'console';
import TransactionHistory from '../TransactionHistory';
import ClaimHistory from '../TransactionHistory/ClaimHistory';
import WithdrawHistory from '../TransactionHistory/WithdrawHistory';
import { useNavigate } from 'react-router-dom';
const DUMMY_TRANSACTION_DATA = [
  {
    _id: '1',
    transactionId: 'TXN001',
    email: 'user1@example.com',
    amount: '1000',
    'new-balance': '5000',
    'previous-balance': '4000',
    date: '2024-03-20',
  },
  {
    _id: '2',
    transactionId: 'TXN002',
    email: 'user2@example.com',
    amount: '500',
    'new-balance': '2500',
    'previous-balance': '2000',
    date: '2024-03-19',
  },
  {
    _id: '3',
    transactionId: 'TXN003',
    email: 'user3@example.com',
    amount: '250',
    'new-balance': '1250',
    'previous-balance': '1000',
    date: '2024-03-18',
  },
  {
    _id: '4',
    transactionId: 'TXN004',
    email: 'user4@example.com',
    amount: '750',
    'new-balance': '3750',
    'previous-balance': '3000',
    date: '2024-03-17',
  },
  {
    _id: '5',
    transactionId: 'TXN005',
    email: 'user5@example.com',
    amount: '100',
    'new-balance': '1100',
    'previous-balance': '1000',
    date: '2024-03-16',
  }
];

const TRANSACTION_COLUMNS = [
  { id: 'transactionId', label: 'Transaction ID', show: true },
  { id: 'email', label: 'Email', show: true },
  { id: 'amount', label: 'Amount', show: true },
  { id: 'new-balance', label: 'New Balance', show: true },
  { id: 'previous-balance', label: 'Previous Balance', show: true },
  { id: 'date', label: 'Date', show: true },
];
const Dashboard = () => {
  const { getDashboardStats } = useDashboardActions();
  const { allTokensBalance, feeCollected, ordersOverview, productsOverview, usersOverview } = useSelector(selectDashboard);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({
    sortKey: '',
    direction: ''
  });
  const navigate = useNavigate();

  console.log(usersOverview);
  const UsersOverview = () => {
    return (
      <>
        <div className='flex justify-between items-center'>
          <h1 className="text-5xl font-semibold">{usersOverview?.totalUsers ?? 0}</h1>
          <Button 
            className='bg-primary text-white text-xs'
            onClick={() => navigate('/users')}
          >
            View All
          </Button>
        </div>
      </>
    );
  };

  const KYCRequests = () => {
    return (
      <div className='flex justify-between items-center w-full'>
        <h1 className="text-5xl font-semibold">{usersOverview?.pendingKycCount ?? 0}</h1>
        <Button 
          className='bg-primary text-white text-xs'
          onClick={() => navigate('/users/verifications')}
        >
          View All
        </Button>
      </div>
    )
  }

  const WithdrawRequests = () => {
    return (
      <div className='flex justify-between items-center w-full'>
        <h1 className="text-5xl font-semibold">{usersOverview?.pendingWithdrawalCount ?? 0}</h1>
        <Button 
          className='bg-primary text-white text-xs'
          onClick={() => navigate('/withdraw-requests')}
        >
          View All
        </Button>
      </div>
    )
  }

  useEffect(() => {
    (async () => {
      await getDashboardStats();
      setLoading(false);
    })();
  }, []);

  const items = [
    {
      key: '1',
      label: 'Claim History',
      children: <ClaimHistory />,
    },
    {
      key: '2',
      label: 'Withdraw History',
      children: <WithdrawHistory />,
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="p-5 grid md:grid-cols-2 gap-6">
            <div className='col-span-2'>
              <Card title={'Total Users'} Content={UsersOverview} imgsrc={users} />
            </div>
            <Card title={'KYC Requests'} Content={KYCRequests} imgsrc={users} />
            <Card title={'Withdraw Requests'} Content={WithdrawRequests} imgsrc={users} />
          </div>
          <div className="p-5">
            <Tabs
              defaultActiveKey="1"
              items={items}
              className="bg-[#1A1A1A] p-4 rounded text-white [&_.ant-tabs-tab]:text-white"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
