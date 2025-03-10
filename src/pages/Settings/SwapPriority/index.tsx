import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveBar from '../../../components/SaveBar';
import 'react-toastify/dist/ReactToastify.css';

// REDUX
import { errorAlert, successAlert } from '../../../utils/alerts';
import { useSettingsActions } from '../../../store/settings/settingsActions';
import ReactSelect from '../../../components/ReactSelect';
import { SWAP_PRIORITY_TYPE } from '../../../constants';
import { useTokenActions } from '../../../store/token/tokenAction';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../store/token/tokenSlice';

const priorityTypeMapping = {
  BLANK: 'Blank',
  TOP_BALANCE: 'Top Balance',
  PREFERED_TOKEN: 'Preferred Token',
};

const validationSchema = Yup.object().shape({
  fromToken: Yup.mixed(),
  toToken: Yup.mixed(),
  type: Yup.mixed().required(),
});

const SwapPriority = () => {
  // STATES
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const { getSwapPriority, updateSwapPriority } = useSettingsActions();
  const { getTokensList } = useTokenActions();
  const { tokensList } = useSelector(selectToken);

  const initialValues: {
    fromToken: any;
    toToken: any;
    type: any;
    [key: string]: any;
  } = {
    fromToken: { label: '', value: '' },
    toToken: { label: '', value: '' },
    type: { label: '', value: '' },
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      const _vlaues = {
        type: values.type.value,
        fromToken: values.fromToken?.value,
        toToken: values.toToken?.value,
      };

      if (values.type.value !== SWAP_PRIORITY_TYPE.PREFERED_TOKEN) {
        delete _vlaues.fromToken;
        delete _vlaues.toToken;
      }

      setSaveLoading(true);
      try {
        const response = await updateSwapPriority(_vlaues);
        if (response.status) {
          successAlert(response?.message);
        } else {
          errorAlert(response?.message);
        }
      } catch (error) {
        console.error(`Swap Priority update error`, error);
      } finally {
        setSaveLoading(false);
      }
    },
  });

  useEffect(() => {
    (async () => {
      // GET TOKENS
      await getTokensList(true);

      // GET QUICKIPAY SETTINGS
      const res: any = await getSwapPriority();

      // SET VALUES
      if (res.status) {
        formik.setValues({
          fromToken: {
            label: res.data?.fromToken ? res.data.fromToken.name : '',
            value: res.data?.fromToken ? res.data.fromToken._id : '',
          },
          toToken: {
            label: res.data?.toToken ? res.data.toToken.name : '',
            value: res.data?.toToken ? res.data.fromToken._id : '',
          },
          type: {
            label: priorityTypeMapping[res.data.type],
            value: res.data.type,
          },
        });
      }
    })();
  }, []);

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8 text-white max-w-[1700px] mx-auto">
      <div className="mx-auto text-start">
        <h2 className="text-2xl font-bold">{`Swap Priority`}</h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="mt-6">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6">
          <ReactSelect
            formik={formik}
            label="Priority Type"
            name="type"
            options={[
              { label: 'Blank', value: SWAP_PRIORITY_TYPE.BLANK },
              { label: 'Top Balance', value: SWAP_PRIORITY_TYPE.TOP_BALANCE },
              { label: 'Preferred Token', value: SWAP_PRIORITY_TYPE.PREFERED_TOKEN },
            ]}
            className="z-50"
            onChange={(e: any) => {
              formik.setFieldValue('type', e);
            }}
          />

          {formik.values.type.value === 'PREFERED_TOKEN' && (
            <ReactSelect
              formik={formik}
              label="From Token"
              name="fromToken"
              options={tokensList
                .filter((token) => token.swapFromEnabled)
                .map((token) => ({
                  label: token.name,
                  value: token._id,
                }))}
              className="z-50"
              onChange={(e: any) => {
                formik.setFieldValue('fromToken', e);
              }}
            />
          )}
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

export default SwapPriority;
