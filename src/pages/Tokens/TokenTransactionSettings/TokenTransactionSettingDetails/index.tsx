import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveBar from '../../../../components/SaveBar';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ausd, pusd, usdt, xpl } from '../../../../images/other';

// REDUX
import { errorAlert, successAlert } from '../../../../utils/alerts';
import FormikInput from '../../../../components/FormikInput';
import { TokenTransactionSettingType } from '../../../../store/token/tokenSlice';
import { useTokenActions } from '../../../../store/token/tokenAction';
import { CapitalizeFirstLetter } from '../../../../utils/utils';
import ReactSelect from '../../../../components/ReactSelect';
import { TRANSACTION_TYPES, WITHDRAW_FEE_TYPES } from '../../../../constants';

const validationSchema = Yup.object().shape({
  feeType: Yup.mixed(),
  fee: Yup.number(),
  dailyAmountLimit: Yup.number().nullable(),
  dailyTrxCountLimit: Yup.number().nullable(),
  minimumTrxAmount: Yup.number().nullable(),
  trxProcess: Yup.mixed(),
  tokenName: Yup.string(),
});

const formFields = [
  { key: 'tokenName', label: 'Token Name', type: 'text' },
  { key: 'minimumTrxAmount', label: 'Min. Transaction Amount', type: 'text' },
  { key: 'dailyTrxCountLimit', label: 'Daily Transaction Count', type: 'text' },
  { key: 'dailyAmountLimit', label: 'Daily Amount Limit', type: 'text' },
  { key: 'fee', label: 'Fee', type: 'text' },
];

export const tokenImages: any = {
  AUSD: ausd,
  PUSD: pusd,
  Tether: usdt,
  XPL: xpl,
};

const TokenTransactionSettingDetails = () => {
  // STATES
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const { state }: { state: TokenTransactionSettingType } = useLocation();

  const { updateTokenTransactionSettings, getTokenTransactionSettingList, getTokenTransactionSettingById } =
    useTokenActions();

  const { id } = useParams();

  const navigate = useNavigate();

  const initialValues: TokenTransactionSettingType = {
    feeType: '',
    fee: 0,
    dailyAmountLimit: 0,
    dailyTrxCountLimit: 0,
    minimumTrxAmount: 0,
    trxProcess: '',
    tokenName: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      const _values = {
        ...values,
        feeType: values.feeType.value,
        trxProcess: values.trxProcess.value,
      };
      delete _values.tokenName;
      setSaveLoading(true);

      try {
        const response = id && (await updateTokenTransactionSettings(id, _values));
        if (response.status) {
          await getTokenTransactionSettingList(true);
          successAlert(response?.message);
          navigate(`/tokens/settings/${CapitalizeFirstLetter(state.transactionType)}`);
        } else {
          errorAlert(response?.message);
        }
      } catch (error) {
        console.error(`Token Transaction Setting ${id ? 'update' : 'add'} error`, error);
      } finally {
        setSaveLoading(false);
      }
    },
  });

  useEffect(() => {
    (async () => {
      if (id) {
        let _state = state;

        if (!_state) {
          // FETCHG FROM API
          _state = await getTokenTransactionSettingById(id);
        }

        // SET VALUES
        if (_state) {
          formik.setValues({
            feeType: { label: CapitalizeFirstLetter(_state.feeType), value: _state.feeType },
            fee: _state.fee,
            dailyAmountLimit: _state.dailyAmountLimit,
            dailyTrxCountLimit: _state.dailyTrxCountLimit,
            minimumTrxAmount: _state.minimumTrxAmount,
            trxProcess: { label: CapitalizeFirstLetter(_state.trxProcess), value: _state.trxProcess },
            tokenSymbol: _state.tokenSymbol,
            tokenName: _state.tokenName,
          });
        }
      }
    })();
  }, []);

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8 text-white max-w-[1700px] mx-auto">
      <div className="mx-auto text-start flex gap-4 items-center">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{`${
          id ? 'Update' : 'Add'
        } Token Setting (${CapitalizeFirstLetter(state?.transactionType ?? '')})`}</h2>
        <span className="flex items-center gap-1 text-2xl">
          <img
            src={tokenImages[formik.values.tokenName ? formik.values.tokenName : 'USDT']}
            alt=""
            className="w-9 h-9 object-contain"
          />
          {formik.values.tokenName === 'Tether' ? 'USDT' : formik.values.tokenName}
        </span>
      </div>

      <form onSubmit={formik.handleSubmit} className="">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 mt-12">
          {formFields.map((field) => {
            return state?.transactionType === 'SWAP' && field.key === 'fee' ? (
              <></>
            ) : (
              <div key={field.key}>
                <FormikInput
                  label={field.label}
                  name={field.key}
                  type={field.type}
                  placeholder={`Enter ${field.label}`}
                  error={formik.errors[field.key]}
                  value={formik.values[field.key]}
                  onChange={(e: any) => formik.setFieldValue(field.key, e.target.value)}
                  disabled={field.key === 'tokenName'}
                  touched={formik.touched[field.key]}
                  shrink={true}
                />
              </div>
            );
          })}

          {state?.transactionType !== 'SWAP' && (
            <ReactSelect
              formik={formik}
              label="Fee Type"
              name="feeType"
              options={[
                { label: 'Amount', value: WITHDRAW_FEE_TYPES.AMOUNT },
                { label: 'Percentage', value: WITHDRAW_FEE_TYPES.PERCENTAGE },
              ]}
              className="z-50"
              onChange={(e: any) => {
                formik.setFieldValue('feeType', e);
              }}
            />
          )}

          <ReactSelect
            formik={formik}
            label="Transaction Process"
            name="trxProcess"
            options={[
              { label: 'Manual', value: TRANSACTION_TYPES.MANUAL },
              { label: 'Automatic', value: TRANSACTION_TYPES.AUTOMATIC },
            ]}
            className="z-50"
            onChange={(e: any) => {
              formik.setFieldValue('trxProcess', e);
            }}
          />
        </div>
      </form>

      <div className="mt-3">
        <SaveBar
          btnText={'Submit'}
          onSubmit={formik.handleSubmit}
          loading={saveLoading}
          disabled={saveLoading}
          onCancel={() => navigate(`/tokens/settings/${state?.transactionType?.toLowerCase()}`)}
        />
      </div>
    </div>
  );
};

export default TokenTransactionSettingDetails;
