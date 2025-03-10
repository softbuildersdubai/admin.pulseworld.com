export const WALLET_ACTIONS = {
  ACCEPT: 'ACCEPT',
  REJECT: 'REJECT',
};

export const MIGRATION_ACTIONS = {
  ACCEPT: 'ACCEPT',
  REJECT: 'REJECT',
};

export const WITHDRAW_FEE_TYPES = {
  AMOUNT: 'AMOUNT',
  PERCENTAGE: 'PERCENTAGE',
};

export const TRANSACTION_TYPES = {
  MANUAL: 'MANUAL',
  AUTOMATIC: 'AUTOMATIC',
};

export const ProviderStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  COMING_SOON: 'COMING_SOON',
};

export const dashboardUserOverviewTitles: any = {
  totalUsers: 'Total Users',
  pendingWithdrawCount: 'Pending Withdraws',
  pendingMigrateCount: 'Pending Migrations',
  pendingKycCount: 'Pending Kyc Approvals',
  totalOnline: 'Online Users',
};

export const dashboardOrdersOverviewTitles: any = {
  productPurchasesCount: 'Product Purchases',
  totalProductValue: 'Products Purchases Amount',
  featurePurchasesCount: 'Feature Purchases',
  totalFeatureValue: 'Features Purchases Amount',
  walletDepositsCount: 'Wallet Deposits',
  totalWalletDeposits: 'Wallet Deposits Amount',
};

export const dashboardProductsOverviewTitles: any = {
  providersCount: 'Providers',
  activeProductsCount: 'Active Products',
  vouchersExhaustedProducts: 'Vouchers Exhausted',
};

export const USER_STATUS: any = {
  ACTIVE: 'ACTIVE',
  TEMP_BLOCK: 'TEMP_BLOCK',
  BLOCK: 'BLOCK',
};

export const SWAP_PRIORITY_TYPE: {
  BLANK: string;
  TOP_BALANCE: string;
  PREFERED_TOKEN: string;
} = {
  BLANK: 'BLANK',
  TOP_BALANCE: 'TOP_BALANCE',
  PREFERED_TOKEN: 'PREFERED_TOKEN',
};
