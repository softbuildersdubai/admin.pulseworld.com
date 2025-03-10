import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// REDUX
import { errorAlert, successNotify } from '../../../utils/alerts';
import { FormControlLabel, Switch } from '@mui/material';
import { useSettingsActions } from '../../../store/settings/settingsActions';

enum PAGE_NAMES {
  SWAP = 'SWAP',
  MIGRATE = 'MIGRATE',
  WITHDRAW = 'WITHDRAW',
  DEPOSIT = 'DEPOSIT',
}

const validationSchema = Yup.object().shape({
  [PAGE_NAMES.SWAP]: Yup.boolean(),
  [PAGE_NAMES.MIGRATE]: Yup.boolean(),
  [PAGE_NAMES.WITHDRAW]: Yup.boolean(),
  [PAGE_NAMES.DEPOSIT]: Yup.boolean(),
});

const switches = [
  { key: PAGE_NAMES.SWAP, label: 'Show Swap Page' },
  { key: PAGE_NAMES.MIGRATE, label: 'Show Migrate Page' },
  { key: PAGE_NAMES.WITHDRAW, label: 'Show Withdraw Page' },
  { key: PAGE_NAMES.DEPOSIT, label: 'Show Deposit Page' },
];

const ShowPages = () => {
  // STATES
  const { getShowPagesList, updateShowPage } = useSettingsActions();

  const [page, setPage] = useState('');

  const initialValues: {
    [PAGE_NAMES.SWAP]: boolean;
    [PAGE_NAMES.MIGRATE]: boolean;
    [PAGE_NAMES.WITHDRAW]: boolean;
    [PAGE_NAMES.DEPOSIT]: boolean;
    [key: string]: any;
  } = {
    [PAGE_NAMES.SWAP]: false,
    [PAGE_NAMES.MIGRATE]: false,
    [PAGE_NAMES.WITHDRAW]: false,
    [PAGE_NAMES.DEPOSIT]: false,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        const response = await updateShowPage({ page, show: values[page] });
        if (response.status) {
          successNotify('Page status updated.');
          // successAlert(response?.message);
        } else {
          errorAlert(response?.message);
        }
      } catch (error) {
        console.error(`Show Page update error`, error);
      }
    },
  });

  useEffect(() => {
    (async () => {
      // FETCHG FROM API
      const res = await getShowPagesList();

      // SET VALUES
      if (res.status) {
        let newObj: any = {};
        res.data.forEach((item: any) => {
          newObj = { ...newObj, [item.page]: item.show };
        });
        formik.setValues(newObj);
      } else {
        errorAlert(res.message);
      }
    })();
  }, []);

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8 text-white max-w-[1700px] mx-auto">
      <ToastContainer />
      <h1 className="flex-1 font-bold text-2xl py-1">Show/Hide Pages</h1>

      <form onSubmit={formik.handleSubmit} className="">
        <div className="flex flex-col gap-y-2 mt-6">
          {switches.map((item) => {
            return (
              <div className="flex items-center">
                <div className="w-[200px]">{item.label}</div>
                <FormControlLabel
                  control={<Switch />}
                  label={''}
                  checked={formik.values[item.key]}
                  onChange={(e: any) => {
                    formik.setFieldValue(item.key, e.target.checked);
                    setPage(item.key);
                    formik.submitForm();
                  }}
                />
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default ShowPages;
