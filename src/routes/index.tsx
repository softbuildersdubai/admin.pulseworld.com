//REACT
import React from 'react';

//ROUTER-DOM
import { createBrowserRouter } from 'react-router-dom';

//COMPONENTS
import Loader from '../components/Loader/Loader';
import Layout from '../components/Layout';

// CONSTANTS
import PathConstants from './pathConstants';
import AuthLayout from '../components/AuthLayout';

// PAGES
import Login from '../pages/Login';
import Error from '../pages/Error';
import { ProtectedRoute } from '../utils/protectedRoute';
import Tokens from '../pages/Tokens';
import Users from '../pages/Users';
import UserVerificationRequests from '../pages/Users/UserVerifications';
import WithdrawRequests from '../pages/Wallet/WithdrawRequests';
import Providers from '../pages/Providers';
import Products from '../pages/Products';
import AddProduct from '../pages/Products/AddProduct';
import AddProvider from '../pages/Providers/AddProvider';
import UserVerificationDetails from '../pages/Users/UserVerifications/UserVerificationDetails';
import MigrationRequests from '../pages/Wallet/MigrationRequests';
import TokenDetails from '../pages/Tokens/TokenDetails';
// import Settings from '../pages/Settings';
import TokenTransactionSettingDetails from '../pages/Tokens/TokenTransactionSettings/TokenTransactionSettingDetails';
import Features from '../pages/Features';
import QuickyPaySettings from '../pages/Settings/QucikyPaySettings';
import Dashboard from '../pages/Dashboard';
import TokenDepositSetting from '../pages/Tokens/TokenTransactionSettings/Deposit';
import TokenWithdrawSettings from '../pages/Tokens/TokenTransactionSettings/Withdraw';
import TokenSwapSettings from '../pages/Tokens/TokenTransactionSettings/Swap';
import TokenPairs from '../pages/Tokens/TokenTransactionSettings/TokenPairs';
import TokenMigrateSettings from '../pages/Tokens/TokenTransactionSettings/Migrate';
import UserDetails from '../pages/Users/UserDetails';
import Links from '../pages/Settings/Links';
import PrivacyPolicy from '../pages/Settings/PrivacyPolicy';
import TermsAndConditions from '../pages/Settings/TermsAndConditions';
import SwapHistory from '../pages/TransactionHistory/SwapHistory';
import TokenPairSettingDetails from '../pages/Tokens/TokenTransactionSettings/TokenPairSettingDetails';
import WithdrawHistory from '../pages/TransactionHistory/WithdrawHistory';
import DepositHistory from '../pages/TransactionHistory/DepositHistory';
import MigrationHistory from '../pages/TransactionHistory/MIgrationHistory';
import Profile from '../pages/Profile';
import Admins from '../pages/Admins';
import SwapPriority from '../pages/Settings/SwapPriority';
import FeaturePurchaseHistory from '../pages/TransactionHistory/FeaturePurchaseHistory';
import ProductPurchaseHistory from '../pages/TransactionHistory/ProductPurchaseHistory';
import ShowPages from '../pages/Settings/ShowPages';
import AdminDeatils from '../components/Admin/AdminDeatils';
import ClaimHistory from '../pages/TransactionHistory/ClaimHistory';
export const router = createBrowserRouter([
  {
    path: PathConstants.DASHBOARD,
    element: (
      <React.Suspense fallback={<Loader />}>
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      </React.Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/tokens',
        element: (
          <ProtectedRoute>
            <Tokens />
          </ProtectedRoute>
        ),
      },
      {
        path: '/tokens/details/:id',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <TokenDetails />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/tokens/settings/deposit',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <TokenDepositSetting />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/tokens/settings/withdraw',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <TokenWithdrawSettings />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/tokens/settings/swap',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <TokenSwapSettings />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/tokens/settings/token-pairs',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <TokenPairs />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/tokens/settings/token-pair/details/:id',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <TokenPairSettingDetails />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/tokens/settings/migrate',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <TokenMigrateSettings />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/tokens/settings/:type/details/:id',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <TokenTransactionSettingDetails />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/users',
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: '/users/view/:id',
        element: (
          <ProtectedRoute>
            <UserDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: '/users/edit/:id',
        element: (
          <ProtectedRoute>
            <UserDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: '/users/verifications',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <UserVerificationRequests />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/users/verifications/:id',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <UserVerificationDetails />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/withdraw-requests',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <WithdrawRequests />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/migration-requests',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <MigrationRequests />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/history/swaphistory',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <SwapHistory />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/history/withdrawhistory',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <WithdrawHistory />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/history/claim-history',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <ClaimHistory />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/history/deposithistory',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <DepositHistory />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/history/migrationhistory',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <MigrationHistory />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/history/feature-purchase-history',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <FeaturePurchaseHistory />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/history/product-purchase-history',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <ProductPurchaseHistory />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/providers',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <Providers />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/providers/add',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <AddProvider />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/providers/details/:id',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <AddProvider />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/products',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/products/add',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/products/details/:id',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/features',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <Features />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/settings/quicky-pay',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <QuickyPaySettings />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/settings/links',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <Links />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/settings/show-pages',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <ShowPages />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/settings/swap-priority',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <SwapPriority />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/settings/privacypolicy',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <PrivacyPolicy />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/profile',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/admins',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <Admins />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/admins/view/:id',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <AdminDeatils />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/admins/edit/:id',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <AdminDeatils />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/admins/create',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <AdminDeatils create={true} />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/settings/termsandconditions',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <TermsAndConditions />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: '/auth',
    element: (
      <React.Suspense fallback={<Loader />}>
        <AuthLayout />
      </React.Suspense>
    ),
    children: [
      {
        path: 'login',
        element: (
          <React.Suspense fallback={<Loader />}>
            <Login />
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <React.Suspense fallback={<Loader />}>
        <Error />
      </React.Suspense>
    ),
  },
]);
