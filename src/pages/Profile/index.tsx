//REACT
import { useEffect, useRef, useState } from 'react';
//FORMIK & YUP
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//COMPONENTS
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';
import { selectAdminData } from '../../store/admin/adminSlice';
import { useAdminActions } from '../../store/admin/adminActions';
import { values } from 'lodash';
import { errorAlert, successAlert } from '../../utils/alerts';
import { useUserActions } from '../../store/user/userActions';

export default function Profile(): JSX.Element {
  const { getAdminData } = useAdminActions();
  const { getUserProfiles } = useUserActions();
  useEffect(() => {
    getAdminData();
  }, []);
  const admin = useSelector(selectAdminData);

  const formikRef = useRef<any>(null);

  const initialValues = {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  };

  useEffect(() => {
    formikRef &&
      formikRef.current.setValues({
        email: admin?.email || '',
        username: admin?.username || '',
        firstName: admin?.firstName || '',
        lastName: admin?.lastName || '',
        phoneNumber: admin?.phoneNumber || '',
      })
  }, [admin])

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    username: Yup.string().required('Username is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
  });

  const { updateAdminData } = useAdminActions();

  const handleSubmit = async (values) => {
    // enter the submitting
    setIsSubmitting(true);

    const response = await updateAdminData(values);

    if(response.status) {
      successAlert("Successful updated Profile!");
    }
    else {
      errorAlert(response.message)
    }

    // exit the submitting
    setIsSubmitting(false);
  };

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8 text-white max-w-[1700px] mx-auto">
      <div className="mx-auto text-start">
        <h2 className="text-2xl font-bold">Profile</h2>
      </div>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} innerRef={formikRef}>
        {({ errors, handleChange, values, touched }) => (
          <Form className="h-full gap-10 space-y-9 w-full md:w-[70%] m-auto">
            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="flex flex-col gap-2 items-end">
                <div className="w-full">
                  <TextInput
                    label="Email"
                    type="email"
                    name="email"
                    shrink={true}
                    isError={errors.email !== '' && touched.email ? true : false}
                    value={values.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
              </div>

              <div className="flex flex-col gap-2 items-end">
                <div className="w-full">
                  <TextInput
                    label="Username"
                    type="username"
                    name="username"
                    shrink={true}
                    isError={errors.username !== '' && touched.username ? true : false}
                    value={values.username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <ErrorMessage name="username" component="div" className="text-red-500 text-xs" />
              </div>

              <div className="flex flex-col gap-2 items-end">
                <div className="w-full">
                  <TextInput
                    label="First Name"
                    type="firstName"
                    name="firstName"
                    shrink={true}
                    isError={errors.firstName !== '' && touched.firstName ? true : false}
                    value={values.firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs" />
              </div>

              <div className="flex flex-col gap-2 items-end">
                <div className="w-full">
                  <TextInput
                    label="Last Name"
                    type="lastName"
                    name="lastName"
                    shrink={true}
                    isError={errors.lastName !== '' && touched.lastName ? true : false}
                    value={values.lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs" />
              </div>

              <div className="flex flex-col gap-2 items-end">
                <div className="w-full">
                  <TextInput
                    label="Phone Number"
                    type="phoneNumber"
                    name="phoneNumber"
                    shrink={true}
                    isError={errors.phoneNumber !== '' && touched.phoneNumber ? true : false}
                    value={values.phoneNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-xs" />
              </div>
            </div>

            <Button className="w-full" loading={isSubmitting} loadingType="circular" buttonType="submit">
              Edit Admin
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
