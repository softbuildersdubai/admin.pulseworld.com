import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveBar from '../../../components/SaveBar';
import 'react-toastify/dist/ReactToastify.css';

// REDUX
import { errorAlert, successAlert } from '../../../utils/alerts';
import { useSettingsActions } from '../../../store/settings/settingsActions';
import RichEditor from '../../../components/RichEditor';

export enum LINK_TYPE {
  CONTENT = 'CONTENT',
}

const validationSchema = Yup.object().shape({
  type: Yup.string().required(),
  content: Yup.string().required(),
});

const formFields = [{ key: 'content', label: 'Privacy Policy', type: 'text' }];

const PrivacyPolicy = () => {
  // STATES
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const { getPrivacySettings, updatePrivacySettings } = useSettingsActions();

  const initialValues: {
    TYPE: string;
    CONTENT: string;
  } = {
    TYPE: '',
    CONTENT: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setSaveLoading(true);
      try {
        const response = await updatePrivacySettings(values);

        if (response.status) {
          successAlert(response?.message);
        } else {
          errorAlert(response?.message);
        }
      } catch (error) {
        console.error(`links update error`, error);
      } finally {
        setSaveLoading(false);
      }
    },
  });

  useEffect(() => {
    (async () => {
      const res: any = await getPrivacySettings();
      let newObj: any = {};
      // SET VALUES
      if (res.status) {
        newObj = { type: res.data.type, content: res.data.content };
        formik.setValues(newObj);
      }
    })();
  }, []);

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8 text-white max-w-[1700px] mx-auto">
      <div className="mx-auto text-start">
        <h2 className="text-2xl font-bold">{`Update Links Settings`}</h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="mt-6">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6">
          {formFields.map((field) => {
            return (
              <div key={field.key}>
                <RichEditor
                  value={formik.values[field.key]}
                  onChange={(e: any) => {
                    formik.setFieldValue(field.key, e);
                  }}
                  label={field.label}
                />
              </div>
            );
          })}
        </div>
      </form>

      <div className="mt-3">
        <SaveBar
          btnText={'Update'}
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

export default PrivacyPolicy;
