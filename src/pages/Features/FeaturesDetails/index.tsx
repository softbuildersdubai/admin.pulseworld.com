import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveBar from '../../../components/SaveBar';
import 'react-toastify/dist/ReactToastify.css';

// REDUX
import { errorAlert, successAlert } from '../../../utils/alerts';
import FormikInput from '../../../components/FormikInput';
import { useSelector } from 'react-redux';
import { Feature, selectFeatures } from '../../../store/features/featuresSlice';
import { useFeaturesActions } from '../../../store/features/featuresAction';
import { CapitalizeFirstLetter } from '../../../utils/utils';
import ReactSelect from '../../../components/ReactSelect';

const validationSchema = Yup.object().shape({
  price: Yup.number().required(),
});

const formFields = [
  { key: 'description', label: 'Description', type: 'text' },
  { key: 'price', label: 'Price', type: 'number' },
];

const FeaturesDetails = ({ featureId, closeDialogHandler }: { featureId: string; closeDialogHandler: any }) => {
  // STATES
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const { featuresList } = useSelector(selectFeatures);
  const { updateFeature, getFeaturesList } = useFeaturesActions();

  const initialValues: {
    price: number;
    status: any;
    description: string;
  } = {
    price: 0,
    status: '',
    description: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setSaveLoading(true);
      const _values = { ...values, status: values.status.value };

      try {
        const response = featureId && (await updateFeature(featureId, _values));
        if (response.status) {
          closeDialogHandler();
          successAlert(response?.message);
          await getFeaturesList(true);
        } else {
          errorAlert(response?.message);
        }
      } catch (error) {
        console.error(`Token ${featureId ? 'update' : 'add'} error`, error);
      } finally {
        setSaveLoading(false);
      }
    },
  });

  useEffect(() => {
    (async () => {
      if (featureId) {
        // GET FEATURE
        const feature: Feature | undefined = featuresList.find((feature: Feature) => {
          return feature._id === featureId;
        });

        // SET VALUES
        if (feature) {
          formik.setValues({
            price: feature.price ? feature.price : 0,
            description: feature.description ? feature.description : '',
            status: feature.status && { label: CapitalizeFirstLetter(feature.status), value: feature.status },
          });
        }
      }
    })();
  }, []);

  return (
    <div className="w-full text-white">
      <div className="mx-auto text-start">
        <h2 className="text-lg font-bold tracking-">{`${featureId ? 'Update' : 'Add'} Feature`}</h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="mt-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-6">
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

          <ReactSelect
            formik={formik}
            label="Status"
            name="status"
            options={[
              {
                value: 'ACTIVE',
                label: 'Active',
              },
              {
                value: 'INACTIVE',
                label: 'In-Active',
              },
            ]}
            className="z-50"
            onChange={(e: any) => {
              formik.setFieldValue('status', e);
            }}
            placeholderColor="#383838"
          />
        </div>
      </form>

      <div className="mt-3">
        <SaveBar
          btnText={'Submit'}
          onSubmit={formik.handleSubmit}
          loading={saveLoading}
          disabled={saveLoading}
          onCancel={() => closeDialogHandler()}
        />
      </div>
    </div>
  );
};

export default FeaturesDetails;
