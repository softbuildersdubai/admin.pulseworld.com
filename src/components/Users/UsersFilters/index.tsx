import { useEffect } from 'react';
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';

// REDUX
// import { errorAlert, successAlert } from '../../../utils/alerts';
import ReactSelect from '../../ReactSelect';
import { TextField } from '@mui/material';
import { useCustomerActions } from '../../../store/customer/customerActions';
import { useSelector } from 'react-redux';
import { selectCustomerSlice } from '../../../store/customer/customerSlice';

const UserFilters = ({ filters, handleFilterChange, clearFilters }) => {
  // STATES
  const { getCountries } = useCustomerActions();
  const { countries } = useSelector(selectCustomerSlice);

  const formik = useFormik({
    initialValues: { country: '', accountType: '', twoFA: '', status: '' },
    onSubmit: async () => {},
  });

  useEffect(() => {
    (async () => {
      await getCountries();
    })();
  }, []);

  return (
    <div className="w-full py-2  text-white  mx-auto">
      <div className="mx-auto text-start flex gap-4 items-center mt-6 md:mt-0">
        {/* <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{`Filters`}</h2> */}
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-3">
        <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 rounded-md mt-8`}>
          <TextField
            label={'Name / Email / Username'}
            variant="outlined"
            className={`w-full`}
            type={'text'}
            name={'search'}
            onChange={handleFilterChange}
            value={filters.search}
            sx={{
              '& .css-10m55e3-MuiFormLabel-root-MuiInputLabel-root': {
                fontSize: '0.8rem',
              },
              '& .css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input': {
                fontSize: '0.8rem',
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Search Users (Name / Email / Username)"
          />

          <ReactSelect
            formik={formik}
            label="Country"
            height="52px"
            name="country"
            options={countries}
            className="z-50"
            onChange={(e) => {
              formik.setFieldValue('country', e);
              handleFilterChange({ ...e, name: 'country' });
            }}
            placeholder="Select Country"
            placeholderColor="#181717"
            isSearchable={true}
            isClearable={true}
            clearValueHandler={() => {
              formik.setFieldValue('country', '');
              handleFilterChange({ name: 'country', label: '', value: '' });
            }}
          />

          <ReactSelect
            formik={formik}
            label="Account"
            height="52px"
            name="accountType"
            options={[
              { label: 'Individual', value: 'INDIVIDUAL' },
              { label: 'Company', value: 'COMPANY' },
            ]}
            className="z-50"
            onChange={(e) => {
              formik.setFieldValue('accountType', e);
              handleFilterChange({ ...e, name: 'accountType' });
            }}
            placeholder="Select Account Type"
            placeholderColor="#181717"
            isClearable={true}
            clearValueHandler={() => {
              formik.setFieldValue('accountType', '');
              handleFilterChange({ name: 'accountType', label: '', value: '' });
            }}
          />

          <ReactSelect
            formik={formik}
            label="Two Factor Auth"
            height="52px"
            name="twoFA"
            options={[
              { label: 'Enabled', value: true },
              { label: 'Disabled', value: false },
            ]}
            className="z-50"
            onChange={(e) => {
              formik.setFieldValue('twoFA', e);
              handleFilterChange({ ...e, name: 'twoFA' });
            }}
            placeholderColor="#181717"
            placeholder="Select 2FA"
            isClearable={true}
            clearValueHandler={() => {
              formik.setFieldValue('twoFA', null);
              handleFilterChange({ name: 'twoFA', label: '', value: null });
            }}
          />

          <ReactSelect
            formik={formik}
            label="Verified"
            height="52px"
            name="verified"
            options={[
              { label: 'Verified', value: true },
              { label: 'Non-Verified', value: false },
            ]}
            className="z-50"
            onChange={(e) => {
              formik.setFieldValue('verified', e);
              handleFilterChange({ ...e, name: 'verified' });
            }}
            placeholderColor="#181717"
            placeholder="Select verified"
            isClearable={true}
            clearValueHandler={() => {
              formik.setFieldValue('verified', null);
              handleFilterChange({ name: 'verified', label: '', value: null });
            }}
          />

          <ReactSelect
            formik={formik}
            label="Status"
            height="52px"
            name="status"
            options={[
              { label: 'Active', value: 'ACTIVE' },
              { label: 'Block', value: 'BLOCK' },
            ]}
            className="z-50"
            onChange={(e) => {
              formik.setFieldValue('status', e);
              handleFilterChange({ ...e, name: 'status' });
            }}
            placeholderColor="#181717"
            placeholder="Select Status"
            isClearable={true}
            clearValueHandler={() => {
              formik.setFieldValue('status', '');
              handleFilterChange({ name: 'status', label: '', value: '' });
            }}
          />
        </div>

        {/* CLEAR FILTERS */}
        <p
          onClick={() => {
            clearFilters();
            formik.setFieldValue('country', '');
            formik.setFieldValue('accountType', '');
            formik.setFieldValue('twoFA', '');
            formik.setFieldValue('verified', '');
            formik.setFieldValue('status', '');
          }}
          className="text-right text-[14px] cursor-pointer"
        >
          Clear Filters
        </p>
      </div>
    </div>
  );
};

export default UserFilters;
