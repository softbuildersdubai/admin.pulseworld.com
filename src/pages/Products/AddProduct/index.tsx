import { useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveBar from '../../../components/SaveBar';
// import FileUpload from '@/components/upload/FileUpload';
import { download, photo } from '../../../images/other';
import { useNavigate, useParams } from 'react-router-dom';

// REDUX
import { useProductActions } from '../../../store/products/productActions';
import ReactSelect from '../../../components/ReactSelect';
import { errorAlert, successAlert } from '../../../utils/alerts';
import FormikInput from '../../../components/FormikInput';
import { useProvidersActions } from '../../../store/providers/providerActions';
import { useSelector } from 'react-redux';
import { selectProviderSlice } from '../../../store/providers/providerSlice';
import { Product, selectProductSlice } from '../../../store/products/productSlice';
import VouchersTable from '../../../components/VouchersTable';
import Dialog from '../../../components/Dialog/BasicDialog';

const validationSchema = Yup.object().shape({
  provider: Yup.mixed().required('Provider is required.'),
  status: Yup.mixed().required('Status is required.'),
  name: Yup.string().required('Name is required.'),
  description: Yup.string().required('Description is required.'),
  price: Yup.number().required('Price is required.'),
  image: Yup.mixed().required('Product Image is required.'),
  vouchers: Yup.mixed().required('Vouchers are required.'),
});

const updateValidationSchema = Yup.object().shape({
  provider: Yup.mixed().required('Provider is required.'),
  status: Yup.mixed().required('Status is required.'),
  name: Yup.string().required('Name is required.'),
  description: Yup.string().required('Description is required.'),
  price: Yup.number().required('Price is required.'),
  image: Yup.mixed().required('Product Image is required.'),
  vouchers: Yup.string(),
});

const formFields = [
  { key: 'name', label: 'Product Name', type: 'text' },
  { key: 'description', label: 'Description', type: 'text' },
  { key: 'price', label: 'Price', type: 'number' },
  { key: 'purchaseCount', label: 'Purchase Count', type: 'text' },
];

const PRODUCT_STATUS_LABEL: any = {
  ACTIVE: 'Active',
  INACTIVE: 'In-Active',
};

const AddProduct = () => {
  // STATES
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [duplicateVouchers, setDuplicateVouchers] = useState({ open: false, duplicates: [] });

  const { addProduct, getProducts, updateProduct, getProductById } = useProductActions();
  const { getProviders } = useProvidersActions();

  const navigate = useNavigate();

  const { providers } = useSelector(selectProviderSlice);
  const { products } = useSelector(selectProductSlice);

  const { id } = useParams();

  const fileInputRef = useRef<any>(null);

  const initialValues: {
    provider: any;
    status: any;
    name: string;
    description: string;
    price: string;
    image: any;
    vouchers: any;
    [key: string]: any;
  } = {
    provider: '',
    status: '',
    name: '',
    description: '',
    price: '',
    image: '',
    vouchers: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: id ? updateValidationSchema : validationSchema,

    onSubmit: async (values) => {
      setSaveLoading(true);
      const _values: any = {
        ...values,
        provider: values.provider?.value,
        status: values.status?.value,
      };

      const formData = new FormData();
      for (const key in _values) {
        if (key === 'image') {
          if (_values.image instanceof Blob) {
            formData.append(key, _values[key]);
            continue;
          } else {
            continue;
          }
        }

        // if (key === 'vouchers' && id) {
        //   continue;
        // }

        formData.append(key, _values[key]);
      }
      try {
        let response;

        if (id) {
          response = await updateProduct(id, formData);
        } else {
          response = await addProduct(formData);
        }

        if (response?.status) {
          await getProducts(true);
          if (!id) {
            successAlert(response?.message);
            navigate('/products');
          } else {
            successAlert(response?.message);
          }
        } else {
          if (response.data?.errorVouchers) {
            setDuplicateVouchers({ open: true, duplicates: response.data?.errorVouchers });
          } else {
            errorAlert(response?.message);
          }
        }
      } catch (error) {
        console.error(`Product ${id ? 'update' : 'add'} failed`, error);
      } finally {
        setSaveLoading(false);
      }
    },
  });

  useEffect(() => {
    let product: any;
    product = products?.list?.find((product: Product | any) => {
      return product?._id === id;
    });

    (async () => {
      if (!providers?.list?.length) {
        await getProviders(true);
      }

      if (id) {
        if (!product) product = await getProductById(id);

        // GET PROVIDER
        const _provider = providers?.list?.find((provider) => {
          return provider?._id === product?.provider?._id;
        });

        if (_provider) {
          // SET VALUES
          formik.setValues({
            provider: { label: _provider?.name, value: _provider?._id },
            status: {
              label: PRODUCT_STATUS_LABEL[product?.status],
              value: product?.status,
            },
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image.path,
            vouchers: '',
            purchaseCount: product?.purchaseCount,
          });
        }
      }
    })();
  }, [providers]);

  const handleProductImageChange = (e: any) => {
    if (e?.target?.files[0]?.size > 10 * 1024 * 1024) {
      formik.setFieldError('image', 'Image size should be less than 10MB');
    } else if (['webp'].includes(e?.target?.files[0].name.split('.').pop().toLowerCase())) {
      formik.setFieldError(`image`, `profile can be of type .jpg .jpeg only.`);
    } else {
      formik.setFieldValue('image', e.target.files[0]);
    }
  };

  const handleProductVouchersChange = (e: any) => {
    if (e?.target?.files[0]?.size > 5 * 1024 * 1024) {
      formik.setFieldError('vouchers', 'Vouchers size should be less than 5MB');
    } else if (!['csv'].includes(e?.target?.files[0].name.split('.').pop().toLowerCase())) {
      formik.setFieldError(`vouchers`, `Vouchers can be of type .csv only.`);
    } else {
      formik.setFieldValue('vouchers', e.target.files[0]);
    }
  };

  const handleSelectProductImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8 text-white max-w-[1700px] mx-auto">
      <div className="mx-auto text-start">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{id ? 'Update' : 'Add'} Product</h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="">
        {/* PRODUCT IMAGE */}
        <div className="w-full flex flex-col justify-center items-center mt-8">
          <div className="overflow-hidden mb-4 text-center">
            <img
              src={
                typeof formik?.values?.image === 'string' && formik.values.image
                  ? formik.values.image
                  : formik.values.image instanceof Blob
                  ? URL.createObjectURL(formik?.values?.image)
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

          {formik.errors.image && formik.touched.image && (
            <span className="text-xs text-red-500">{formik.errors.image.toString()}</span>
          )}

          <span className="border-b cursor-pointer text-sm" onClick={handleSelectProductImageClick}>
            Upload Product Image
          </span>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 mt-12">
          <ReactSelect
            formik={formik}
            label="Provider"
            name="provider"
            options={providers?.list?.map((provider) => {
              return {
                value: provider?._id,
                label: provider?.name,
              };
            })}
            className="z-50"
            onChange={(e: any) => {
              formik.setFieldValue('provider', e);
            }}
          />

          <ReactSelect
            formik={formik}
            label="Status"
            name="status"
            options={[
              { label: 'Active', value: 'ACTIVE' },
              { label: 'In-Active', value: 'INACTIVE' },
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
                touched={formik.touched[field.key]}
                value={formik.values[field.key]}
                onChange={(e: any) => formik.setFieldValue(field.key, e.target.value)}
              />
            </div>
          ))}

          <div className="flex flex-col">
            <FormikInput
              label={id ? 'Add More Vouchers' : 'Add Vouchers'}
              error={formik.errors.vouchers}
              touched={formik.touched.vouchers}
              shrink={true}
              type="file"
              name="vouchers"
              onChange={handleProductVouchersChange}
              inputStyle={{
                padding: '14px 16px 20px 16px',
              }}
            />
            <div className="flex items-center gap-1 mt-2" onClick={() => {}}>
              <a
                href="https://storage.googleapis.com/softbuilder/pulseworld/vouchers-example.csv"
                className="flex gap-1 hover:opacity-80 cursor-pointer transition-opacity duration-150 ease-in-out"
              >
                <span className="text-xs">Example File</span>
                <img src={download} alt="" className="w-3 h-3 mb-1" />
              </a>
              <span className="text-xs"> | Accepted File Ext. (.csv)</span>
            </div>
          </div>
        </div>
      </form>
      <div className="mt-3">
        <SaveBar
          btnText={'Submit'}
          onSubmit={formik.handleSubmit}
          loading={saveLoading}
          disabled={saveLoading}
          onCancel={() => navigate('/products')}
        />
      </div>
      {id && <VouchersTable id={id} status="AVAILABLE" />}

      <Dialog
        className="max-w-4xl"
        open={duplicateVouchers.open}
        onClose={() => setDuplicateVouchers((prev) => ({ ...prev, open: false }))}
      >
        <h2 className="text-red-500 text-center">Duplicate Vouchers Found!</h2>
        <p className="font-light text-xs">Please resolve the file and re upload</p>
        <p className="font-light text-xs italic">Below are the duplicate vouchers</p>
        <div className="flex gap-2 flex-wrap w-full my-3">
          {duplicateVouchers.duplicates.map((dup: any, i: number) => (
            <span key={i} className="px-4 py-1 rounded-full bg-slate-700">
              {dup}
            </span>
          ))}
        </div>
      </Dialog>
    </div>
  );
};

export default AddProduct;
