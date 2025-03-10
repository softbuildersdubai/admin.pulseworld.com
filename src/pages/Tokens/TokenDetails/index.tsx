import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveBar from '../../../components/SaveBar';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// REDUX
import { errorAlert, successAlert } from '../../../utils/alerts';
import FormikInput from '../../../components/FormikInput';
import { useSelector } from 'react-redux';
import { FormControlLabel, Switch } from '@mui/material';
import { Token, selectToken } from '../../../store/token/tokenSlice';
import { useTokenActions } from '../../../store/token/tokenAction';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required.'),
  symbol: Yup.string().required('Symbol is required.'),
  canWithdraw: Yup.boolean(),
  canMigrate: Yup.boolean(),
  canTopup: Yup.boolean(),
  isSwapable: Yup.boolean(),
  allowNegativeBalance: Yup.boolean(),
});

const formFields = [
  { key: 'name', label: 'Token Name', type: 'text' },
  { key: 'symbol', label: 'Symbol', type: 'text' },
];

const switches = [
  { key: 'canWithdraw', label: 'Can Withdraw' },
  { key: 'canMigrate', label: 'Can Migrate' },
  { key: 'canTopup', label: 'Can Topup' },
  { key: 'swapFromEnabled', label: 'Swapable From' },
  { key: 'swapToEnabled', label: 'Swapable To' },
  { key: 'allowNegativeBalance', label: 'Allow Negative Balance' },
];

const TokenDetails = () => {
  // STATES
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const { updateToken, getTokenById } = useTokenActions();
  const { tokensList } = useSelector(selectToken);

  const { id } = useParams();

  const navigate = useNavigate();

  const initialValues: {
    name: string;
    symbol: string;
    canWithdraw: boolean;
    canMigrate: boolean;
    canTopup: boolean;
    swapFromEnabled: boolean;
    swapToEnabled: boolean;
    allowNegativeBalance: boolean;
    [key: string]: any;
  } = {
    name: '',
    symbol: '',
    canWithdraw: false,
    canMigrate: false,
    canTopup: false,
    swapFromEnabled: false,
    swapToEnabled: false,
    allowNegativeBalance: false,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setSaveLoading(true);

      try {
        const response = id && (await updateToken(id, values));
        if (response.status) {
          if (!id) {
            successAlert(response?.message);

            navigate('/providers');
          } else {
            successAlert(response?.message);
            navigate('/tokens');
          }
        } else {
          errorAlert(response?.message);
        }
      } catch (error) {
        console.error(`Token ${id ? 'update' : 'add'} error`, error);
      } finally {
        setSaveLoading(false);
      }
    },
  });

  useEffect(() => {
    (async () => {
      if (id) {
        // GET PROVIDER
        let token: Token | undefined = tokensList.find((token: Token) => {
          return token._id === id;
        });

        if (!token) {
          // FETCHG FROM API
          const res = await getTokenById(id);
          token = res;
        }

        // SET VALUES
        if (token) {
          formik.setValues({
            name: token.name,
            symbol: token.symbol,
            canWithdraw: token.canWithdraw,
            canMigrate: token.canMigrate,
            canTopup: token.canTopup,
            swapFromEnabled: token.swapFromEnabled,
            swapToEnabled: token.swapToEnabled,
            allowNegativeBalance: token.allowNegativeBalance,
          });
        }
      }
    })();
  }, [id]);

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8 text-white max-w-[1700px] mx-auto">
      <ToastContainer />

      <form onSubmit={formik.handleSubmit} className="">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 mt-12">
          {formFields.map((field) => (
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
              />
            </div>
          ))}
        </div>

        <div className="grid col-span-1 grid-cols-2 gap-y-6 mt-6">
          {switches.map((item) => {
            return (
              <>
                <FormControlLabel
                  control={<Switch />}
                  label={item.label}
                  checked={formik.values[item.key]}
                  onChange={(e: any) => {
                    formik.setFieldValue(item.key, e.target.checked);
                  }}
                />
              </>
            );
          })}
        </div>
      </form>

      <div className="mt-3">
        <SaveBar
          btnText={'Submit'}
          onSubmit={formik.handleSubmit}
          loading={saveLoading}
          disabled={saveLoading}
          onCancel={() => navigate('/tokens')}
        />
      </div>
    </div>
  );
};

export default TokenDetails;
