import React, { useEffect, useState } from 'react';
import { useTokenActions } from '../../../../store/token/tokenAction';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FormikInput from '../../../../components/FormikInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveBar from '../../../../components/SaveBar';
import ReactSelect from '../../../../components/ReactSelect';
import { WITHDRAW_FEE_TYPES } from '../../../../constants';
import { errorAlert, successAlert } from '../../../../utils/alerts';
import { CapitalizeFirstLetter } from '../../../../utils/utils';
import TokenNameWithLogo from '../../../../components/TokenNameWithLogo';
import { swapIcon } from '../../../../images/other';

const formFields = [
  { key: 'swapFee', label: 'Swap Fee', type: 'number' },
  { key: 'rate', label: 'Rate', type: 'number' },
];

function TokenPairSettingDetails() {
  const { state } = useLocation();
  const { id } = useParams();

  const { editSingleTokenPairSetting } = useTokenActions();
  const { getTokenPairs, getTokenPairById } = useTokenActions();

  const formik = useFormik({
    initialValues: {
      swapFeeType: state.swapFeeType ? state.swapFeeType : '',
      swapFee: state.swapFee ? state.swapFee : 0,
      rate: state.rate ? state.rate : 0,
    },
    validationSchema: Yup.object().shape({
      swapFeeType: Yup.mixed(),
      swapFee: Yup.string(),
      rate: Yup.string(),
    }),
    onSubmit: async (values: any) => {
      let _state;
      setSaveLoading(true);
      if (!state) {
        _state = await getTokenPairById(id ?? '');
      }
      const data = {
        pairedToken: !state ? _state.pairedToken._id : state.pairedToken._id,
        rate: values.rate * 1,
        swapFee: values.swapFee * 1,
        swapFeeType: values.swapFeeType.value,
      };

      try {
        const response = await editSingleTokenPairSetting(data);
        if (response.status) {
          await getTokenPairs(true);
          successAlert(response?.message);
          navigate('/tokens/settings/token-pairs');
        } else {
          errorAlert(response?.message);
        }
      } catch (error) {
        console.error(`Token Transaction Setting ${state.pairedToken._id ? 'update' : 'add'} error`, error);
      } finally {
        setSaveLoading(false);
      }
    },
  });
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let data = state;

      if (!data) {
        data = await getTokenPairById(id ?? '');
      }

      formik.setValues({
        swapFeeType: { label: CapitalizeFirstLetter(data.swapFeeType), value: data.swapFeeType },
        swapFee: data.swapFee,
        rate: data.rate,
      });
    })();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8  max-w-[1700px] mx-auto">
      <div className="mx-auto text-start flex gap-4 items-center text-white">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Swap Edit</h2>
        <div className="flex gap-1 text-sm">
          <TokenNameWithLogo tokenName={state.baseToken.name} showText={false} tokenImageClassName="!w-7 !h-7" />
          <img src={swapIcon} alt="" className="w-8 h-8 object-contain" />
          <TokenNameWithLogo tokenName={state.pairedToken.name} showText={false} tokenImageClassName="!w-7 !h-7" />
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 mt-12">
          {formFields.map((field) => (
            <div key={field.key}>
              <FormikInput
                label={
                  field.label === 'Rate' ? `1 USD = ${formik.values[field.key]} ${state.pairedToken.name}` : field.label
                }
                name={field.key}
                type={field.type}
                placeholder={`Enter ${field.label}`}
                error={formik.errors[field.key]}
                value={formik.values[field.key]}
                onChange={(e: any) => formik.setFieldValue(field.key, e.target.value)}
                disabled={field.key === 'tokenName'}
                touched={formik.touched[field.key]}
                shrink={true}
                adornment={formik.values.swapFeeType.value === WITHDRAW_FEE_TYPES.AMOUNT ? '€' : '%'}
                showAdornment={field.key === 'swapFee'}
              />
            </div>
          ))}

          <ReactSelect
            formik={formik}
            label="Swap Fee Type"
            height="52px"
            name="swapFeeType"
            options={[
              { label: 'Amount', value: WITHDRAW_FEE_TYPES.AMOUNT },
              { label: 'Percentage', value: WITHDRAW_FEE_TYPES.PERCENTAGE },
            ]}
            className="z-50 "
            onChange={(e: any) => {
              formik.setFieldValue('swapFeeType', e);
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
          onCancel={() => navigate('/tokens/settings/token-pairs')}
        />
      </div>
    </div>
  );
}

export default TokenPairSettingDetails;
