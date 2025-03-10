import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveBar from '../../../components/SaveBar';
import 'react-toastify/dist/ReactToastify.css';

// REDUX
import { errorAlert, successAlert } from '../../../utils/alerts';
import FormikInput from '../../../components/FormikInput';
import { useSettingsActions } from '../../../store/settings/settingsActions';

export enum LINK_TYPE {
  // WIKI = 'WIKI',
  LEGAL = 'LEGAL',
  APP_STORE = 'APP_STORE',
  PLAY_STORE = 'PLAY_STORE',
}

const validationSchema = Yup.object().shape({
  // [LINK_TYPE.WIKI]: Yup.string(),
  [LINK_TYPE.LEGAL]: Yup.string(),
  [LINK_TYPE.APP_STORE]: Yup.string(),
  [LINK_TYPE.PLAY_STORE]: Yup.string(),
});

const formFields = [
  // { key: LINK_TYPE.WIKI, label: 'Wiki', type: 'text' },
  { key: LINK_TYPE.LEGAL, label: 'Legal', type: 'text' },
  { key: LINK_TYPE.APP_STORE, label: 'App Store', type: 'text' },
  { key: LINK_TYPE.PLAY_STORE, label: 'Play Store', type: 'text' },
];

const Links = () => {
  // STATES
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const { getLinkSettings, updateLinkSettings } = useSettingsActions();

  const initialValues: {
    // WIKI: string;
    LEGAL: string;
    APP_STORE: string;
    PLAY_STORE: string;
  } = {
    // WIKI: '',
    LEGAL: '',
    APP_STORE: '',
    PLAY_STORE: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      const obj = [
        // {
        //   type: LINK_TYPE.WIKI,
        //   url: values.WIKI,
        // },
        {
          type: LINK_TYPE.LEGAL,
          url: values.LEGAL,
        },
        {
          type: LINK_TYPE.APP_STORE,
          url: values.APP_STORE,
        },
        {
          type: LINK_TYPE.PLAY_STORE,
          url: values.PLAY_STORE,
        },
      ];

      setSaveLoading(true);
      try {
        const response = await updateLinkSettings(obj);

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
      const res: any = await getLinkSettings();
      let newObj: any = {};
      // SET VALUES
      if (res.status) {
        res.data.list.forEach((item: any) => {
          newObj = { ...newObj, [item.type]: item.url };
        });
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
                <FormikInput
                  label={field.label}
                  name={field.key}
                  type={field.type}
                  touched={true}
                  error={formik.errors[field.key]}
                  placeholder={`Enter ${field.label}`}
                  value={formik.values[field.key]}
                  onChange={(e: any) => {
                    formik.setFieldValue(field.key, e.target.value);
                  }}
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

export default Links;
