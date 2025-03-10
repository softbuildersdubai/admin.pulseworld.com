import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageWrapper from '../../../components/Layout/PageWrapper';
import { useCustomerActions } from '../../../store/customer/customerActions';
import FormikInput from '../../../components/FormikInput';
import Loader from '../../../components/Loader/Loader';
import ZoomImage from '../../../components/ZoomImage';
import { VERIFICATION_ACTION_STATUS, VERIFICATION_DOCUMENT_FIELD_TITLE } from '../../../utils/constance';
import { verificationFile } from '../../../interfaces/verificationFile';
import VerificationNameRow from '../../../components/Verification/VerificationNameRow';
import PoliticallyExposedPerson from '../../../components/Verification/PoliticallyExposedPerson';
import { formattedDate } from '../../../utils/utils';
import Button from '../../../components/Button';
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog';
import { errorAlert, successAlert } from '../../../utils/alerts';
import UserVerificationHistory from '../UserVerificationHistory';

const UserVerificationDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<{
    verificationFiles: verificationFile;
    [x: string]: any;
  }>();

  const { getSingleCustomerVerificationInfo, verification_action } = useCustomerActions();

  const fetchData = async () => {
    const info = await getSingleCustomerVerificationInfo(params.id);
    setData(info);
  };

  useEffect(() => {
    fetchData();
    console.log(data)
  }, []);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [acceptedLoading, setAcceptedLoading] = useState<boolean>(false);

  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionReasonError, setRejectionReasonError] = useState('');
  const [rejectedLoading, setRejectedLoading] = useState<boolean>(false);
  const { getCustomerVerificationRequests } = useCustomerActions();

  return (
    <PageWrapper title={`${data?.type || ''}`}>
      {data ? (
        <div>
          <div>
            <ConfirmDialog
              title="Approved Verification?"
              open={confirmOpen}
              onClose={() => setConfirmOpen(false)}
              onConfirm={async () => {
                setAcceptedLoading(true);
                const res = await verification_action(params.id, VERIFICATION_ACTION_STATUS.VERIFIED);
                if (!res.status) {
                  errorAlert(res.message);
                  setAcceptedLoading(false);
                  setConfirmOpen(false);
                  return;
                }
                await getCustomerVerificationRequests(true);
                setAcceptedLoading(false);
                setConfirmOpen(false);
                navigate('/users/verifications');
                successAlert(res.message);
              }}
            >
              Are you sure you want to Approve this verification?
            </ConfirmDialog>

            <ConfirmDialog
              title="Reject Verification?"
              open={rejectOpen}
              onClose={() => setRejectOpen(false)}
              onConfirm={async () => {
                if (!rejectionReason) {
                  setRejectionReasonError('Required');
                  return;
                }
                setRejectedLoading(true);
                const res = await verification_action(params.id, VERIFICATION_ACTION_STATUS.REJECTED, rejectionReason);
                if (!res.status) {
                  errorAlert(res.message);
                  setRejectedLoading(false);
                  setRejectOpen(false);
                  return;
                }
                await getCustomerVerificationRequests(true);
                setRejectedLoading(false);
                setRejectOpen(false);
                navigate('/users/verifications');
                successAlert(res.message);
              }}
            >
              <div className="flex flex-col gap-6">
                <span>Are you sure you want to Reject this verification?</span>
                <FormikInput
                  label={'Rejection Reason'}
                  name={'rejectionReason'}
                  type={'text'}
                  placeholder={'Enter rejection reason'}
                  onChange={(e) => {
                    rejectionReasonError && setRejectionReasonError('');
                    setRejectionReason(e.target.value);
                  }}
                  value={rejectionReason}
                  error={rejectionReasonError}
                  touched={true}
                />
              </div>
            </ConfirmDialog>

            <VerificationNameRow data={data} className="pt-3 pb-5" />

            <PoliticallyExposedPerson isCheck={data?.isPoliticalyExposed || false} className="pb-5" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-5">
              {/* <FormikInput
                label={'Government ID Number'}
                name={'governmentIdNumber'}
                type={'text'}
                placeholder={''}
                onChange={() => {}}
                value={data?.governmentIdNumber}
                disabled={true}
              /> */}

              <FormikInput
                label={'Verification Request Date'}
                name={'createdAt'}
                type={'text'}
                placeholder={''}
                onChange={() => {}}
                value={formattedDate(data?.createdAt)}
                disabled={true}
              />

              <FormikInput
                label={'Verification Status'}
                name={'status'}
                type={'text'}
                placeholder={''}
                onChange={() => {}}
                value={data?.status}
                className="!cursor-none"
                disabled={true}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-5">
              {data?.verificationFiles?.kycContract && (
                <div className="border border-[#222222] border-dashed flex justify-center items-center flex-col py-6 bg-[#0f0f0f] rounded-md">
                  <p className="text-sm text-white font-semibold pb-5">
                    {VERIFICATION_DOCUMENT_FIELD_TITLE[data.verificationFiles.kycContract.documentType]}
                  </p>
                  <ZoomImage
                    path={data.verificationFiles.kycContract.path}
                    alt="Government Photo"
                    className="w-full md:w-72 border-solid border-2 border-gray-400 rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-center gap-2">
              <Button
                className="bg-green-700 w-36 hover:bg-green-600 text-white  py-2 px-4 rounded !shadow-[0px]"
                loading={acceptedLoading}
                loadingType="circular"
                onClick={async () => setConfirmOpen(true)}
              >
                Approve
              </Button>

              <Button
                className="bg-red-700 w-36 hover:bg-red-600 text-white  py-2 px-4 rounded !shadow-[0px]"
                loading={rejectedLoading}
                loadingType="circular"
                onClick={() => setRejectOpen(true)}
              >
                Reject
              </Button>
            </div>
          </div>

          {/* VERIFICATION HISTORY */}
          {/* <UserVerificationHistory currentVerificationRequestId={params.id} userId={data?.user?._id} /> */}
        </div>
      ) : (
        <Loader />
      )}
    </PageWrapper>
  );
};

export default UserVerificationDetails;
