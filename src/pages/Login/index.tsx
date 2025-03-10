//REACT
import React, { useState } from 'react';
//ROUTER-DOM
import { useNavigate } from 'react-router-dom';
//REDUX-TOOLKIT
import { useUserActions } from '../../store/user/userActions';
//ALERTS
import {  errorAlert } from '../../utils/alerts';
//FORMIK & YUP
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//COMPONENTS
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { visibility, visibilityOff } from '../../images/other';

export default function Login(): JSX.Element {
  const { userLogin } = useUserActions();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/, 'Invalid email domain')
      .required('Email or Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    // enter the submitting
    try {
      setIsSubmitting(true);

      // fire api
      const { data } = await userLogin({
        email: values.email,
        password: values.password,
      });

      // exit the submitting
      setIsSubmitting(false);

      if (!data?.status) {
        errorAlert(data.message);
        return;
      }
      navigate('/');
    } catch (error: any) {
      errorAlert(error?.message);
    }
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, handleChange, values, touched }) => (
        <Form className="h-full flex items-center flex-col gap-10 w-full md:w-[30rem]">
          <div className="flex flex-col gap-3">
            <p className="font-semibold tracking-wide !text-white text-lg lg:text-xl text-center leading-8">
              Sign in to your Account
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-2 items-end">
              <div className="w-full">
                <TextInput
                  label="Email"
                  type="email"
                  name="email"
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
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={values.password}
                  isError={errors.password !== '' && touched.password ? true : false}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                  }}
                  adornment={<img src={showPassword ? visibility : visibilityOff} className="w-6 h-6" />}
                  showAdornment={true}
                  adornmentClassName="cursor-pointer"
                  adornmentOnClick={() => {
                    setShowPassword((state) => !state);
                  }}
                />
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 items-center">
            <Button className="w-full" loading={isSubmitting} loadingType="circular" buttonType="submit">
              Login
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
