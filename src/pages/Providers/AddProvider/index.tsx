import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveBar from '../../../components/SaveBar';
import { photo } from '../../../images/other';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// REDUX
import ReactSelect from '../../../components/ReactSelect';
import { errorAlert, successAlert } from '../../../utils/alerts';
import FormikInput from '../../../components/FormikInput';
import { useProvidersActions } from '../../../store/providers/providerActions';
import { ProviderStatus } from '../../../constants';
import { useSelector } from 'react-redux';
import { Provider, selectProviderSlice } from '../../../store/providers/providerSlice';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required.'),
  description: Yup.string().required('Description is required.'),
  logo: Yup.mixed().required('Product Image is required'),
  status: Yup.mixed().required('Status is required.'),
});

const formFields = [
  { key: 'name', label: 'Provider Name', type: 'text' },
  { key: 'description', label: 'Description', type: 'text' },
];

const AddProvider = () => {
  // STATES
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const { addProvider, getProviders, updateProvider, getProviderById } = useProvidersActions();
  const { providers } = useSelector(selectProviderSlice);

  const { id } = useParams();

  const navigate = useNavigate();

  const fileInputRef = useRef<any>(null);

  const initialValues: {
    name: string;
    description: string;
    logo: any;
    status: any;
    [key: string]: any;
  } = {
    name: '',
    description: '',
    logo: '',
    status: { label: 'Active', value: ProviderStatus.ACTIVE },
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setSaveLoading(true);

      const _values: any = {
        ...values,
        status: values.status.value,
      };

      const formData = new FormData();
      for (const key in _values) {
        if (key === 'logo') {
          if (_values.logo instanceof Blob) {
            formData.append(key, _values[key]);
            continue;
          } else {
            continue;
          }
        }

        formData.append(key, _values[key]);
      }

      try {
        const response = id ? await updateProvider(id, formData) : await addProvider(formData);
        if (response.status) {
          await getProviders(true);
          if (!id) {
            successAlert(response?.message);
            navigate('/providers');
          } else {
            successAlert(response?.message);
          }
        } else {
          errorAlert(response?.message);
        }
      } catch (error) {
        console.error(`Provider ${id ? 'update' : 'add'} error`, error);
      } finally {
        setSaveLoading(false);
      }
    },
  });

  useEffect(() => {
    (async () => {
      if (id) {
        // GET PROVIDER
        let provider: Provider | any = providers.list.find((provider: Provider) => {
          return provider._id === id;
        });

        if (!provider) {
          // FETCHG FROM API
          const res = await getProviderById(id);
          provider = res.data;
        }

        if (provider) {
          // SET VALUES
          formik.setValues({
            name: provider.name,
            description: provider.description,
            logo: provider.logo.path,
            status: { label: provider.status, value: provider.status },
          });
        }
      }
    })();
  }, []);

  const handleProductImageChange = (e: any) => {
    if (e?.target?.files[0]?.size > 10 * 1024 * 1024) {
      formik.setFieldError('logo', 'Image size should be less than 10MB');
    } else if (['webp'].includes(e?.target?.files[0].name.split('.').pop().toLowerCase())) {
      formik.setFieldError(`logo`, `profile can be of type .jpg .jpeg only.`);
    } else {
      formik.setFieldValue('logo', e.target.files[0]);
    }
  };

  const handleSelectProductImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8 text-white max-w-[1700px] mx-auto">
      <ToastContainer />

      <div className="mx-auto text-start">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{`${id ? 'Update' : 'Add'} Provider`}</h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="">
        {/* PRODUCT IMAGE */}
        <div className="w-full flex flex-col justify-center items-center mt-8">
          <div className="overflow-hidden mb-4 text-center">
            <img
              src={
                typeof formik?.values?.logo === 'string' && formik.values.logo
                  ? formik.values.logo
                  : formik.values.logo instanceof Blob
                  ? URL.createObjectURL(formik?.values?.logo)
                  : photo
              }
              alt=""
              className="object-contain w-48 h-48 text-center"
            />
          </div>
          <input
            type="file"
            className="border w-64"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleProductImageChange}
          />

          {formik.errors.logo && <span className="text-xs text-red-500">{formik.errors.logo.toString()}</span>}

          <span className="border-b cursor-pointer text-sm" onClick={handleSelectProductImageClick}>
            Upload Provider Logo
          </span>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 mt-12">
          <ReactSelect
            formik={formik}
            label="Status"
            name="status"
            options={[
              { label: 'Active', value: ProviderStatus.ACTIVE },
              { label: 'In-Active', value: ProviderStatus.INACTIVE },
              { label: 'Coming Soon', value: ProviderStatus.COMING_SOON },
            ]}
            className="z-50"
            onChange={(e: any) => {
              formik.setFieldValue('status', e);
            }}
          />

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
              />
            </div>
          ))}
        </div>
      </form>

      <div className="mt-3">
        <SaveBar
          btnText={'Submit'}
          onSubmit={formik.handleSubmit}
          loading={saveLoading}
          disabled={saveLoading}
          onCancel={() => navigate('/providers')}
        />
      </div>
    </div>
  );
};

export default AddProvider;
