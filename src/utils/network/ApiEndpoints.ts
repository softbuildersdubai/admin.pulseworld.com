export const API_INSTANCE = import.meta.env.VITE_API_INSTANCE + '/admin';

//Auth
export const LOGIN = '/auth/login';
export const GET_PROFILE = '/profile';

// Token
export const TOKEN = '/token';
export const TOKEN_TRANSACTION_SETTING = '/token/settings';
export const TOKEN_PAIRS = '/swap/pairs';
export const TOKEN_PAIRS_SETTING = '/swap/pairs';
export const TOKEN_PAIRS_EDIT = '/swap/pairs';

// USER
export const USER = '/user';
export const USER_VERIFICATION = '/user-verification';
export const USER_VERIFICATION_HISTORY = '/user-verification/user';
export const USER_ACCESS = '/user/access';
export const USER_MESSAGE = '/user/message';
export const BULK_USER_MESSAGES = '/user/messages';
export const BULK_USER_ACCESS = '/user/bulk-access';
export const IMPERSONATE_USER = '/user/impersonate';

// WALLET
export const WALLET_WITHDRAWS = '/wallet/withdraws';
export const WALLET_WITHDRAWS_ACTIONS = '/wallet/withdraw/action';

// FEATURE
export const FEATURE = '/feature';

// DASHBOARD
export const DASHBOARD_USER_OVERVIEW = '/dashboard/user-overview';
export const DASHBOARD_TOKEN_OVERVIEW = '/dashboard/token-balance';
export const DASHBOARD_FEE_COLLECTED_OVERVIEW = '/dashboard/fee-collected';
export const DASHBOARD_ORDER_OVERVIEW = '/dashboard/order-overview';
export const DASHBOARD_PRODUCTS_OVERVIEW = '/dashboard/products-overview';

// SETTINGS
export const QUICKI_PAY_SETTINGS = '/wallet/quikipay/settings';
export const LINKS_SETTINGS = '/setting/link';
export const SWAP_PRIORITY = '/swap/priority';
export const LEGAL_CONTENT = '/legal-content';
export const SHOW_PAGES = '/setting/showpage';

// MIGRATION
export const WALLET_MIGRATIONS = '/wallet/migrations';
export const WALLET_MIGRATIONS_ACTIONS = '/wallet/migration/action';

// HISTORY
export const WALLET_SWAP_HISTORY = '/wallet/swap/history';
export const WALLET_MIGRATE_HISTORY = '/wallet/migrate/history';
export const WALLET_DEPOSIT_HISTORY = '/wallet/deposit/history';
export const WALLET_WITHDRAW_HISTORY = '/wallet/withdraw/history';
export const WALLET_CLAIM_HISTORY = '/wallet/claim/history';
export const FEATURE_PURCHASE_HISTORY = '/feature/purchase/history';
export const PRODUCT_PURCHASE_HISTORY = '/product/purchase/history';

// PROVIDER
export const PROVIDER = '/provider';

// PRODUCT
export const PRODUCT = '/product';

// UTILS
export const COUNTRIES = '/utils/countries';

//Update Profile
export const UPDATE_PROFILE = '/profile/personal-info';
export const UPDATE_PROFILE_PICTURE = '/profile/picture';
export const SEND_OTP = '/auth/send-otp';
export const VERIFY_EMAIL = '/auth/verify-email';
export const UPDATE_EMAIL = '/profile/update-email';
export const CHANGE_PASSWORD = '/profile/change-password';
export const USER_INFO = '/profile';
export const CHECK_EMAIL = '/auth/check-email';
export const CHECK_REF_ID = '/auth/check-referral-code';
export const CHECK_USERNAME = '/auth/check-username';
export const GENERATE_GOOGLE_2FA = '/profile/qr-code';
export const VERIFY_GOOGLE2FA = '/profile/toggle-2fa';
export const SET_SECURITY_CODE = '/profile/security-code';
export const NOTIFICATIONS_SETTINGS = '/profile/notification-preference';
export const RECENT_DEVICES = '/profile/user-activity';

//KYC
export const VERIFY_DOCS = '/profile/user-verification/document';
export const POST_VERIFY = '/profile/user-verification';

//Wallet
export const WALLET_OVERVIEW = '/wallet/overview';
export const WALLET_ASSETS = '/wallet/assets';
export const WALLET_GROWTH = '/wallet/growth?token=';
export const WITHDRAW_HISTORY = '/wallet/history';
export const ALL_TOKENS = '/wallet/tokens';
export const ALL_NETWORKS = '/wallet/networks';
export const POST_WITHDRAW = '/wallet/withdraw';
export const POST_SWAP = '/wallet/swap';
export const WITHDRAW_ADDRESS = '/wallet/withdraw/addresses';

//Shop
export const SHOP_PROVIDERS = '/shop/providers';
export const SHOP_METHODS = '/shop/payment-methods';
export const GET_PRODUCTS = '/shop/products?searchKey=&page=1&provider=';
export const BUY_PRODUCT = '/shop/buy';
export const GET_PURCHASES = '/shop/purchases';
export const VERIFYING_EMAIL = '/auth/verify-email';
export const STEPPER = '/user/onboarding-steps';
export const STEPPER_ACCOUNT = '/user/set-ktm';

//Notifications
export const GET_NOTIFICATIONS = '/notifications/all';
export const READ_NOTIFICATIONS = '/dashboard/notification';
export const DELETE_NOTIFICATIONS = '/notifications/delete/';
export const READ_ALL_NOTIFICATIONS = '/notifications/mark-all-read';
export const NOTIFICATIONS_BADGE = '/notifications/badge';
export const GET_USER_ACTIVITY = '/dashboard/notification';
export const REFERRAL_ACTIVITY_HISTORY = '/user/members-activity';
export const REFERRAL_ANALYTICS = '/user/community/ref-analytics';
export const TOOLS_BASE_SERVER = 'https://tools.blpro8.club';
export const CHECK_USER_API: string = TOOLS_BASE_SERVER + '/check-broker-user';
export const ACTIVE_STRATEGY = TOOLS_BASE_SERVER + '/active-strategy';
export const BROKER_ACCOUNT_REGISTRATION: string = TOOLS_BASE_SERVER + '/register-broker';

//ADMIN
export const ADMIN_INFO = '/user/admin-information';
export const ADMIN_CREATE = '/user/admin-create';
export const ADMIN_UPDATE = '/user/admin-update';
export const ADMIN_CHECK_EMAIL = '/user/check-email';
export const ADMIN_CHECK_USERNAME = '/user/check-username';
export const ADMIN_ACCESS = '/user/access';
export const DISTABLE_USER_2FA = '/user/2fa-disable';
export const ADMIN_ACTIVITY = '/user/activity';
export const ADMIN_PERMISSIONS = '/permissions';

//ADMIN DASHBOARD
export const ADMIN_DASHBOARD = '/dashboard/user-overview';




