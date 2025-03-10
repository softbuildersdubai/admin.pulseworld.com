import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveBar from '../../../components/SaveBar';
import 'react-toastify/dist/ReactToastify.css';

// REDUX
import { errorAlert, successAlert } from '../../../utils/alerts';
import FormikInput from '../../../components/FormikInput';
import { useSettingsActions } from '../../../store/settings/settingsActions';
import ReactSelect from '../../../components/ReactSelect';
import { WITHDRAW_FEE_TYPES } from '../../../constants';
import { CapitalizeFirstLetter } from '../../../utils/utils';

const validationSchema = Yup.object().shape({
  trxFee: Yup.number().required(),
  trxFeeType: Yup.mixed().required(),
});

const formFields = [{ key: 'trxFee', label: 'Transaction Fee', type: 'text' }];

const QuickyPaySettings = () => {
  // STATES
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const { getQuickiPaySettings, updateQuickiPaySettings } = useSettingsActions();

  const initialValues: {
    _id: string;
    trxFee: number;
    trxFeeType: any;
    [key: string]: any;
  } = {
    _id: '',
    trxFee: 0,
    trxFeeType: { label: '', value: '' },
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setSaveLoading(true);
      try {
        const response = await updateQuickiPaySettings(values);
        if (response.status) {
          successAlert(response?.message);
        } else {
          errorAlert(response?.message);
        }
      } catch (error) {
        console.error(`Quiiki pay update error`, error);
      } finally {
        setSaveLoading(false);
      }
    },
  });

  useEffect(() => {
    (async () => {
      // GET QUICKIPAY SETTINGS
      const res: any = await getQuickiPaySettings();

      // SET VALUES
      if (res.status) {
        formik.setValues({
          _id: res.data._id,
          trxFee: res.data.trxFee,
          trxFeeType: {
            label: CapitalizeFirstLetter(res.data.trxFeeType),
            value: res.data.trxFeeType,
          },
        });
      }
    })();
  }, []);

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8 text-white max-w-[1700px] mx-auto">
      <div className="mx-auto text-start">
        <h2 className="text-2xl font-bold">{`Update Quiki Pay Settings`}</h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="mt-6">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6">
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
                showAdornment={true}
                adornment={field.key === 'trxFee' && formik.values.trxFeeType.value === 'PERCENTAGE' ? '%' : '$'}
              />
            </div>
          ))}

          <ReactSelect
            formik={formik}
            label="Tranasction Fee Type"
            name="trxFeeType"
            options={[
              { label: 'Amount', value: WITHDRAW_FEE_TYPES.AMOUNT },
              { label: 'Percentage', value: WITHDRAW_FEE_TYPES.PERCENTAGE },
            ]}
            className="z-50"
            onChange={(e: any) => {
              formik.setFieldValue('trxFeeType', e);
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
          showCancelButton={false}
          onCancel={() => {}}
        />
      </div>
    </div>
  );
};

export default QuickyPaySettings;
