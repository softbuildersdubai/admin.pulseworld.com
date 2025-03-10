export enum DOCUMENT_TYPE {
  CERTIFICATE_OF_INCORPORATION = "CERTIFICATE_OF_INCORPORATION",
  SHAREHOLDER_REGISTRY = "SHAREHOLDER_REGISTRY",
  DIRECTOR_REGISTRY = "DIRECTOR_REGISTRY",
  DIRECTOR_IDENTIFICATION = "DIRECTOR_IDENTIFICATION",
  GOVERMENT_ID = "GOVERMENT_ID",
  SELFIE_VERIFICATION = "SELFIE_VERIFICATION",
}

export enum VERIFICATION_DOCUMENT_FIELD_TITLE {
  CERTIFICATE_OF_INCORPORATION = "Certificate of incorporation",
  SHAREHOLDER_REGISTRY = "Shareholder Registry",
  DIRECTOR_REGISTRY = "Director Registry",
  DIRECTOR_IDENTIFICATION = "Identification documents of the director and key controller",
  GOVERMENT_ID = "Government ID",
  SELFIE_VERIFICATION = "Selfie Verification",
}

export enum VERIFICATION_TYPE {
  KYC = "KYC",
  KYB = "KYB",
}

export enum VERIFICATION_ACTION_STATUS {
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
}

export const USERS_TABLE_DEFAULT_FILTERS = {
  search: null,
  country: "",
  accountType: "",
  twoFA: null,
  verified: null,
  page: -1,
  status: "",
};

export const SWAP_HISTORY_DEFAULT_FILTERS = {
  search: "",
  Token: "",
  Fee: "",
  page: 1,
};
