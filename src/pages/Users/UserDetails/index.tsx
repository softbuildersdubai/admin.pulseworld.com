import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import SaveBar from '../../../components/SaveBar';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
// import * as Yup from 'yup';
// import { ausd, pusd, usdt, xpl } from '../../../images/other';

// REDUX
import { errorAlert, successAlert } from '../../../utils/alerts';
import FormikInput from '../../../components/FormikInput';
import ReactSelect from '../../../components/ReactSelect';
import { USER_STATUS } from '../../../constants';
import { Customer, selectCustomerSlice } from '../../../store/customer/customerSlice';
import { CapitalizeFirstLetter } from '../../../utils/utils';
import { tokenImages } from '../../Tokens/TokenTransactionSettings/TokenTransactionSettingDetails';
import { useCustomerActions } from '../../../store/customer/customerActions';
import { useSelector } from 'react-redux';

// const validationSchema = Yup.object().shape({
//   account: Yup.string(),
//   totalBalance: Yup.number(),
//   tokensBalance: Yup.mixed(),
//   companyName: Yup.string(),
//   email: Yup.string(),
//   firstName: Yup.string(),
//   lastName: Yup.string(),
//   refCode: Yup.string(),
//   sponsor: Yup.mixed(),
//   status: Yup.string(),
//   twoFA: Yup.boolean(),
//   username: Yup.string(),
//   verified: Yup.boolean(),
// });

const formFields = [
  { key: 'firstName', label: 'First Name', type: 'text' },
  { key: 'lastName', label: 'Last Name', type: 'text' },
  { key: 'phoneNumber', label: 'Phone Number', type: 'text' },
  { key: 'companyName', label: 'Company Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'refCode', label: 'Ref. Code', type: 'text' },
  { key: 'twoFA', label: 'Two Factor Authentication', type: 'text' },
  { key: 'username', label: 'username', type: 'text' },
];

const UserDetails = () => {
  // STATES
  const location: any = useLocation();

  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [edit] = useState<boolean>(location?.state?.edit);
  const state = location?.state?._data;

  const { updateCustomer, getCountries, getCustomerById } = useCustomerActions();
  const { countries } = useSelector(selectCustomerSlice);

  const { id } = useParams();
  const navigate = useNavigate();

  const initialValues: Customer = {
    account: '',
    totalBalance: 0,
    canPurchase: '',
    tokensBalance: { AUSD: {}, PUSD: {}, USDT: {}, XPL: {} },
    companyName: '',
    phoneNumber: '',
    country: '',
    email: '',
    firstName: '',
    lastName: '',
    refCode: '',
    sponsor: {
      _id: '',
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      companyName: '',
      accountType: '',
    },
    status: '',
    twoFA: false,
    username: '',
    verified: false,
  };

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,

    onSubmit: async (values) => {
      setSaveLoading(true);
      const _values = {
        firstName: values.firstName,
        lastName: values.lastName,
        companyName: values.companyName,
        country: values.country.value || null,
        phoneNumber: values.phoneNumber,
        email: values.email,
        refCode: values.refCode,
        username: values.username,
        accountType: values.account.value,
        status: values.status.value,
        isVerified: values.verified.value,
        canPurchase: values.canPurchase.value,
        twoFactorAuthEnabled: values.twoFA.value,
      };

      const response = await updateCustomer(id, _values);

      if (response.status) {
        successAlert(response?.message);
        setSaveLoading(false);
        navigate('/users');
      } else {
        errorAlert(response?.message);
      }
    },
  });

  useEffect(() => {
    (async () => {
      await getCountries();

      if (id) {
        let _state: Customer = state;

        if (!_state) {
          // FETCHG FROM API
          _state = await getCustomerById(id);
        }
        // SET VALUES
        if (_state) {
          formik.setValues({
            account: { label: CapitalizeFirstLetter(_state.accountType), value: _state.accountType },
            totalBalance: _state.balance.totalBalance,
            tokensBalance: _state.balance.tokens,
            companyName: _state.companyName,
            phoneNumber: _state?.phoneNumber,
            country: { label: _state?.country?.name ?? '', value: _state?.country?._id ?? '' },
            email: _state.email,
            firstName: _state.firstName,
            lastName: _state.lastName,
            refCode: _state.refCode,
            sponsor: _state.refParent,
            status: { label: CapitalizeFirstLetter(_state.status), value: _state.status },
            twoFA: { label: _state.twoFA ? 'Enabled' : 'Disabled', value: _state.twoFA },
            username: _state.username,
            verified: { label: _state.verified ? 'Verfied' : 'Not Verified', value: _state.verified },
            canPurchase: { label: _state?.canPurchase ? 'Allow' : 'Disallow', value: _state?.canPurchase },
          });
        }
      }
    })();
  }, []);

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8 text-white max-w-[1700px] mx-auto">
      <div className="mx-auto text-start flex gap-4 items-center">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{`${edit ? 'Edit' : 'View'} User Details`}</h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-2 mt-12">
          {/* BALANCE */}
          {!edit && (
            <div className={`flex flex-col gap-4 border rounded-md p-8 gradient-bg`}>
              {/* HEADING */}
              <div className="flex items-center gap-2">
                <span className="text-2xl">User Balance - </span>
                <div className="text-USDTColor">
                  <span className="text-xl">{`${formik.values.totalBalance}`}</span>
                  <span className="font-bold text-sm ml-1">USDT</span>
                </div>
              </div>

              {/* TOKENS BALANCE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {formik.values.tokensBalance && Object.keys(formik.values.tokensBalance).map((token) => {
                  return (
                    <div className="flex gap-3 py-2 px-4 bg-slate-900 rounded-2xl">
                      <img src={tokenImages[token === 'USDT' ? 'Tether' : token]} className="w-6 h-6 object-contain" />
                      {`${formik.values.tokensBalance[token].balance}
                       ${token}`}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {/* BALANCE-END */}

          {/* SPONSOR */}
          {!edit && (
            <div className="flex flex-col gap-3 border rounded-md p-8 gradient-bg ">
              {/* HEADING */}
              <span className="text-2xl font-semibold">Sponsor</span>

              <div className="flex flex-col">
                <span className="text-lg">
                  {formik.values?.sponsor?.companyName
                    ? formik.values.sponsor.companyName
                    : formik.values.sponsor.firstName
                    ? `${formik.values.sponsor.firstName} ${formik.values.sponsor.lastName}`
                    : formik.values.username}
                </span>
                <span className="text-xs">{formik.values.sponsor.email}</span>
              </div>
            </div>
          )}
          {/* SPONSOR-END */}

          <div
            className={`grid sm:grid-cols-2 gap-6 border rounded-md p-8 ${edit ? 'gradient-bg' : 'border-white/40'}`}
          >
            {formFields.map((field) => {
              if (formik.values.account.value === 'INDIVIDUAL' && field.key === 'companyName') {
                return <></>;
              }
              if (
                formik.values.account.value === 'COMPANY' &&
                (field.key === 'firstName' || field.key === 'lastName')
              ) {
                return <></>;
              }

              if (field.key === 'twoFA') {
                return (
                  <div key={field.key}>
                    <ReactSelect
                      formik={formik}
                      label="Two Factor Authentication"
                      name="twoFA"
                      options={[
                        { label: 'Enabled', value: true },
                        { label: 'Disabled', value: false },
                      ]}
                      className="z-50"
                      onChange={(e: any) => {
                        formik.setFieldValue('twoFA', e);
                      }}
                      disabled={edit && formik.values[field.key].value ? false : true}
                      placeholder="Two Factor Authentication"
                    />
                  </div>
                );
              }

              return edit && field.key === 'twoFA' ? (
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
                    touched={formik.touched[field.key]}
                    shrink={true}
                    disabled={!edit}
                  />
                </div>
              );
            })}
          </div>
          {/* account, sponsor, status, verified */}
          <div className={`flex flex-col gap-6 border rounded-md p-8 ${edit ? 'gradient-bg' : 'border-white/40'}`}>
            <div className="flex flex-col gap-6">
              {!edit && (
                <ReactSelect
                  formik={formik}
                  label="Account Type"
                  name="account"
                  options={[
                    { label: 'Individual', value: 'INDIVIDUAL' },
                    { label: 'Company', value: 'COMPANY' },
                  ]}
                  className="z-50"
                  onChange={(e: any) => {
                    formik.setFieldValue('account', e);
                  }}
                  clearValueHandler={() => {
                    formik.setFieldValue('account', '');
                  }}
                  disabled={!edit}
                />
              )}

              <ReactSelect
                formik={formik}
                label="Status"
                name="status"
                options={[
                  { label: 'Active', value: USER_STATUS.ACTIVE },
                  { label: 'Block', value: USER_STATUS.BLOCK },
                ]}
                className="z-50"
                onChange={(e: any) => {
                  formik.setFieldValue('status', e);
                }}
                clearValueHandler={() => {
                  formik.setFieldValue('status', '');
                }}
                disabled={!edit}
              />

              <ReactSelect
                formik={formik}
                label="Verfied"
                name="verified"
                options={[
                  { label: 'Verified', value: true },
                  { label: 'Not Verifed', value: false },
                ]}
                className="z-50"
                onChange={(e: any) => {
                  formik.setFieldValue('verified', e);
                }}
                clearValueHandler={() => {
                  formik.setFieldValue('verified', '');
                }}
                disabled={!edit}
              />

              <ReactSelect
                formik={formik}
                label="Country"
                name="country"
                options={countries}
                className="z-50"
                onChange={(e) => {
                  formik.setFieldValue('country', e);
                }}
                isSearchable={true}
                isClearable={true}
                clearValueHandler={() => {
                  formik.setFieldValue('country', '');
                }}
                disabled={!edit}
              />

              <ReactSelect
                formik={formik}
                label="Can Purchase"
                name="canPurchase"
                placeholder="Can Purchase"
                options={[
                  { label: 'Allow', value: true },
                  { label: 'Disallow', value: false },
                ]}
                className="z-50"
                onChange={(e) => {
                  formik.setFieldValue('canPurchase', e);
                }}
                isClearable={true}
                clearValueHandler={() => {
                  formik.setFieldValue('canPurchase', '');
                }}
                disabled={!edit}
              />
            </div>
          </div>
        </div>
      </form>

      {edit && (
        <div className="mt-3">
          <SaveBar
            btnText={'Submit'}
            onSubmit={formik.handleSubmit}
            loading={saveLoading}
            disabled={saveLoading}
            onCancel={() => navigate(`/users`)}
          />
        </div>
      )}
    </div>
  );
};

export default UserDetails;
