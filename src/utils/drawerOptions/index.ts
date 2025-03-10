//IMAGES
import {
  Home,
  ArrowDown,
  emptyWallet,
  flash,
  Swap,
  HomeDark,
  Features,
  FeauresDark,
  History,
  HistoryDark,
  Admin,
  AdminDark,
} from '../../images/drawer/light';
import { ArrowDown_, emptyWallet_, flash_, Swap_ } from '../../images/drawer/dark';
import { setting, settingDark, swapIcon, users, usersDark } from '../../images/other';

export interface DrawerOption {
  name: string;
  icon_light: string;
  icon_dark: string;
  url: string | null;
  key?: string;
  options?: DrawerOption[];
  active?: boolean;
  disable?: boolean;
  permissions: string[];
}
interface DrawerSection {
  options: DrawerOption[];
}

export const allDrawerOptions: DrawerSection[] = [
  {
    options: [
      {
        name: 'Dashboard',
        icon_light: Home,
        icon_dark: HomeDark,
        url: '/',
        key: 'dashboard',
        active: false,
        options: [],
        permissions: [`all`, `superadmin`, 'dashboard'],
      },
    ],
  },
  // {
  //   options: [
  //     {
  //       name: 'Features',
  //       icon_light: Features,
  //       icon_dark: FeauresDark,
  //       url: '/features',
  //       key: 'features',
  //       active: false,
  //       options: [],
  //       permissions: [`all`, `superadmin`, 'features'],
  //     },
  //   ],
  // },
  // {
  //   options: [
  //     {
  //       name: 'Tokens Settings',
  //       icon_light: emptyWallet,
  //       icon_dark: emptyWallet_,
  //       url: '',
  //       key: 'token-settings',
  //       active: false,
  //       options: [
  //         {
  //           name: 'Assets',
  //           icon_light: setting,
  //           icon_dark: setting,
  //           url: '/tokens',
  //           key: 'tokens',
  //           active: false,
  //           options: [],
  //           permissions: [`all`, `superadmin`, 'tokens_settings-assets'],
  //         },
  //         {
  //           name: 'Deposit',
  //           icon_light: setting,
  //           icon_dark: setting,
  //           url: '/tokens/settings/deposit',
  //           key: 'tokens-deposit-settings',
  //           active: false,
  //           options: [],
  //           permissions: [`all`, `superadmin`, 'tokens_settings-deposit'],
  //         },
  //         {
  //           name: 'Withdraw',
  //           icon_light: setting,
  //           icon_dark: setting,
  //           url: '/tokens/settings/withdraw',
  //           key: 'tokens-withdraw-settings',
  //           active: false,
  //           options: [],
  //           permissions: [`all`, `superadmin`, 'tokens_settings-withdraw'],
  //         },
  //         // {
  //         //   name: 'Migrate',
  //         //   icon_light: setting,
  //         //   icon_dark: setting,
  //         //   url: '/tokens/settings/migrate',
  //         //   key: 'token-migrate-settings',
  //         //   active: false,
  //         //   options: [],
  //         //   permissions: [`all`, `superadmin`, 'tokens_settings-migrate'],
  //         // },
  //         // {
  //         //   name: 'Swap',
  //         //   icon_light: setting,
  //         //   icon_dark: setting,
  //         //   url: '/tokens/settings/swap',
  //         //   key: 'token-swap-settings',
  //         //   active: false,
  //         //   options: [],
  //         //   permissions: [`all`, `superadmin`, 'tokens_settings-swap'],
  //         // },
  //         {
  //           name: 'Token Pairs',
  //           icon_light: setting,
  //           icon_dark: setting,
  //           url: '/tokens/settings/token-pairs',
  //           key: 'token-pairs',
  //           active: false,
  //           options: [],
  //           permissions: [`all`, `superadmin`, 'tokens_settings-pairs'],
  //         },
  //       ],
  //       permissions: [`all`, `superadmin`, 'tokens_settings'],
  //     },
  //   ],
  // },
  {
    options: [
      {
        name: 'Users',
        icon_light: users,
        icon_dark: usersDark,
        url: '',
        key: 'users',
        active: false,
        options: [
          {
            name: 'List',
            icon_light: ArrowDown,
            icon_dark: ArrowDown_,
            url: '/users',
            key: 'user-list',
            active: false,
            permissions: [`all`, `superadmin`, 'users-list'],
          },
          {
            name: 'KYC Verification Requests',
            icon_light: ArrowDown,
            icon_dark: ArrowDown_,
            url: '/users/verifications',
            key: 'user-verifications',
            active: false,
            permissions: [`all`, `superadmin`, 'users-verification_requests'],
          },
        ],
        permissions: [`all`, `superadmin`, 'users'],
      },
    ],
  },

  {
    options: [
      {
        name: 'Withdraw Requests',
        icon_light: Swap,
        icon_dark: Swap_,
        url: '/withdraw-requests',
        key: 'withdraw-requests',
        active: false,
        options: [

          // {
          //   name: 'Migration Requests',
          //   icon_light: Swap,
          //   icon_dark: Swap_,
          //   url: '/migration-requests',
          //   key: 'migration-requests',
          //   active: false,
          //   options: [],
          //   permissions: [`all`, `superadmin`, 'transaction_requests-migrate'],
          // },
        ],
        permissions: [`all`, `superadmin`, 'transaction_requests'],
      },
    ],
  },

  // {
  //   options: [
  //     {
  //       name: 'KYC Requests',
  //       icon_light: Swap,
  //       icon_dark: Swap_,
  //       url: '',
  //       key: 'kyc-requests',
  //       active: false,
  //       options: [
  //         {
  //           name: 'KYC Requests',
  //           icon_light: Swap,
  //           icon_dark: Swap_,
  //           url: '/kyc-requests',
  //           key: 'kyc-requests',
  //           active: false,
  //           options: [],
  //           permissions: [`all`, `superadmin`, 'transaction_requests-withdraw'],
  //         },
  //         // {
  //         //   name: 'Migration Requests',
  //         //   icon_light: Swap,
  //         //   icon_dark: Swap_,
  //         //   url: '/migration-requests',
  //         //   key: 'migration-requests',
  //         //   active: false,
  //         //   options: [],
  //         //   permissions: [`all`, `superadmin`, 'transaction_requests-migrate'],
  //         // },
  //       ],
  //       permissions: [`all`, `superadmin`, 'transaction_requests'],
  //     },
  //   ],
  // },
  {
    options: [
      {
        name: 'Transaction History',
        icon_light: History,
        icon_dark: HistoryDark,
        url: '',
        key: 'histoy',
        active: false,
        options: [
          {
            name: 'Claim History',
            icon_light: Swap,
            icon_dark: Swap,
            url: '/history/claim-history',
            key: 'claim-history',
            active: false,
            permissions: [`all`, `superadmin`, 'history-claims'],
          },
          {
            name: 'Withdraw History',
            icon_light: Swap,
            icon_dark: Swap,
            url: '/history/withdrawhistory',
            key: 'withdraw-history',
            active: false,
            permissions: [`all`, `superadmin`, 'history-withdraw'],
          },
          // {
          //   name: 'Migration History',
          //   icon_light: Swap,
          //   icon_dark: Swap,
          //   url: '/history/migrationhistory',
          //   key: 'migration-history',
          //   active: false,
          //   permissions: [`all`, `superadmin`, 'history-migration'],
          // },
          // {
          //   name: 'Swap History',
          //   icon_light: Swap,
          //   icon_dark: Swap,
          //   url: '/history/swaphistory',
          //   key: 'swap-history',
          //   active: false,
          //   permissions: [`all`, `superadmin`, 'history-swap'],
          // },
          // {
          //   name: 'Feature Purchase History',
          //   icon_light: Swap,
          //   icon_dark: Swap,
          //   url: '/history/feature-purchase-history',
          //   key: 'feature-purchase-history',
          //   active: false,
          //   permissions: [`all`, `superadmin`, 'history-feature_purchase'],
          // },
          // {
          //   name: 'Product Purchase History',
          //   icon_light: Swap,
          //   icon_dark: Swap,
          //   url: '/history/product-purchase-history',
          //   key: 'product-purchase-history',
          //   active: false,
          //   permissions: [`all`, `superadmin`, 'history-product_purchase'],
          // },
        ],
        permissions: [`all`, `superadmin`, 'history'],
      },
    ],
  },
 
  {
    options: [
      {
        name: 'Admins',
        icon_light: Admin,
        icon_dark: AdminDark,
        url: '/admins',
        key: 'admins',
        active: false,
        options: [],
        permissions: [`all`, `superadmin`, 'admins'],
      },
    ],
  },
];
