import { DOCUMENT_TYPE } from '../utils/constance';

export interface verificationFile {
  kycContract: {
    documentType: string;
    name: string;
    path: string;
    _id: string;
  } | null;
  drivingLicence: any | null;
  governmentId: any | null;
  passport: any | null;
  selfiVerification: any | null;
}
