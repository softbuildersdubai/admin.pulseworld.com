import { useState } from 'react';
import { useFormik } from 'formik';

// REDUX
import { errorAlert, successAlert } from '../../../utils/alerts';
import FormikInput from '../../FormikInput';
import { WALLET_ACTIONS } from '../../../constants';
import Button from '../../Button';
import { useWalletActions } from '../../../store/wallet/walletActions';

type Props = {
  action: {
    type: string;
    requestId: string;
  };
  onClose: any;
  requestFor: string;
};

const UpdateRequest = ({ action, onClose, requestFor }: Props) => {
  // STATES
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const { updateWithdrawRequest, getWithdrawRequests, updateMigrationRequest, getMigrationRequests } = useWalletActions();

  const initialValues: {
    reason?: string;
    trxHashUrl?: string;
    [key: string]: any;
  } = {
    reason: '',
    trxHashUrl: '',
  };

  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: async (values) => {
      setSaveLoading(true);

      let _values: any = {
        requestId: action.requestId,
        action: action.type,
      };

      if (action.type === WALLET_ACTIONS.ACCEPT) {
        if (!values.trxHashUrl && requestFor === 'WITHDRAW' ) {
          formik.setFieldError('trxHashUrl', 'Transaction Hash Url Required.');
          setSaveLoading(false);
          return;
        }

        if(requestFor === 'WITHDRAW') {
          _values = {
            ..._values,
            trxHashUrl: values.trxHashUrl,
          };
        }
        
      } else {
        if (!values.reason) {
          formik.setFieldError('reason', 'Rejection Reason is Required.');
          setSaveLoading(false);
          return;
        }

        _values = {
          ..._values,
          reason: values.reason,
        };
      }

      try {
        const response = requestFor === 'WITHDRAW' ? await updateWithdrawRequest(_values) : await updateMigrationRequest(_values);
        if (response?.data?.status) {
          successAlert(response?.data?.message);
          requestFor === 'WITHDRAW' ? getWithdrawRequests(true) : getMigrationRequests(true);
          onClose();
        } else {
          errorAlert(response?.data?.message);
        }
      } catch (error) {
        console.error(`Update ${requestFor === 'WITHDRAW' ? 'Withdraw':'Migration'} Request Error`, error);
      } finally {
        setSaveLoading(false);
      }
    },
  });

  return (
    <div className="w-full text-white max-w-[1700px] mx-auto">
      <form onSubmit={formik.handleSubmit} className="">
        <div className="grid grid-cols-1">
          <>
            {action?.type === WALLET_ACTIONS.REJECT && (
              <div>
                <FormikInput
                  label={'Reason'}
                  name={'reason'}
                  type={'text'}
                  placeholder={`Enter Reason`}
                  error={formik.errors.reason}
                  value={formik.values.reason}
                  onChange={(e: any) => formik.setFieldValue('reason', e.target.value)}
                />
              </div>
            )}

            {action?.type === WALLET_ACTIONS.ACCEPT && requestFor === 'WITHDRAW' && (
              <div>
                <FormikInput
                  label={'Transaction Hash Url'}
                  name={'trxHashUrl'}
                  type={'text'}
                  placeholder={`Enter Transaction Hash Url`}
                  error={formik.errors.trxHashUrl}
                  value={formik.values.trxHashUrl}
                  onChange={(e: any) => formik.setFieldValue('trxHashUrl', e.target.value)}
                />
              </div>
            )}
          </>
        </div>
      </form>

      <div className="mt-3 flex justify-end gap-x-2">
        <Button
          className={`border text-xs lg:text-sm !px-4 !py-1 lg:!py-2 lg:!px-8`}
          loading={saveLoading}
          onClick={() => formik.submitForm()}
          loadingType="circular"
        >
          {action.type === WALLET_ACTIONS.ACCEPT ? 'Accept' : 'Reject'}
        </Button>

        <Button
          className={`border text-xs lg:text-sm !px-4 !py-1 lg:!py-2 lg:!px-8 !bg-transparent hover:!bg-white/40 transition-all duration-200 ease-in-out`}
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default UpdateRequest;
