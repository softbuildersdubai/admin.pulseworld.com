import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../TextInput';
import Button from '../Button';
import { useEffect, useRef, useState } from 'react';
import { errorAlert, successAlert } from '../../utils/alerts';
import { useAdminActions } from '../../store/admin/adminActions';
import { debounce } from '../../utils/debounce';
import { check, close } from '../../images/other';
import { CircularProgress } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCustomerActions } from '../../store/customer/customerActions';
import ReactSelect from '../ReactSelect';
import { useSelector } from 'react-redux';
import { selectAdminPermissionsList } from '../../store/admin/adminSlice';

export default function AdminDeatils({ create = false }: { create?: boolean }) {
  const { updateCustomer } = useCustomerActions();
  const { createAdminData, getAdminPermissionsList, checkAdminEmail, checkAdminUsername } = useAdminActions();
  const adminPermissionsList = useSelector(selectAdminPermissionsList);
  const navigate = useNavigate();

  const location: any = useLocation();
  const params: any = useParams();

  const [edit] = useState<boolean>(location?.state?.edit);
  const state = location?.state?._data;
  const formikRef = useRef<any>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isTypingEmail, setIsTypingEmail] = useState<boolean | null>(null);
  const [availablityEmail, setAvailablityEmail] = useState<boolean | null>(null);
  const [isTypingUsername, setIsTypingUsername] = useState<boolean>(false);
  const [availablityUsername, setAvailablityUsername] = useState<boolean | null>(null);

  const initialValues = {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    adminPermissions: [],
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    username: Yup.string().required('Username is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    password: Yup.string()
      .min(6, 'Must be at least 6 characters')
      .matches(/[a-z]/, 'Must have at least 1 lowercase letter')
      .matches(/[A-Z]/, 'Must have at least 1 uppercase letter')
      .matches(/[0-9]/, 'Must have at least 1 number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must have at least 1 symbol')
      .required('Password is required'),
  });

  useEffect(() => {
    (async () => {
      if (!adminPermissionsList.length) {
        await getAdminPermissionsList();
      }

      if (formikRef && state) {
        formikRef.current.setValues({
          email: state?.email ? state?.email : '',
          username: state?.username ? state?.username : '',
          firstName: state?.firstName ? state?.firstName : '',
          lastName: state?.lastName ? state?.lastName : '',
          phoneNumber: state?.phoneNumber ? state?.phoneNumber : '',
          password: state?.password ? state?.password : '',
          adminPermissions: state?.adminPermissions.map((permission) => {
            return {
              label: permission.name,
              value: permission._id,
            };
          }),
        });
        formikRef.current.setFieldTouched('username', false);
      }
    })();
  }, []);

  useEffect(() => {}, [adminPermissionsList, formikRef.current]);

  const handleSubmit = async (values) => {
    // enter the submitting
    setIsSubmitting(true);
    const _values = {
      ...values,
      adminPermissions: values.adminPermissions.map((permission) => permission.value),
    };
    if (
      //CREATE ADMIN
      edit === undefined
    ) {
      const response = await createAdminData(_values);

      if (response?.admin) {
        successAlert('Admin created, Successfully!');
        navigate('/admins');
      } else {
        errorAlert(response?.message);
      }
    } else if (
      //EDIT ADMIN
      edit
    ) {
      const response = await updateCustomer(params.id, _values);
      console.log({ response });

      if (response?.status) {
        successAlert('Admin edited, Successfully!');
        navigate('/admins');
      } else if (!response?.status) {
        errorAlert(response?.message);
      }
    }

    // exit the submitting
    setIsSubmitting(false);
  };

  const handleInput = async (input: string, type: 'email' | 'username'): Promise<void> => {
    if (type === 'email') setIsTypingEmail(true);
    if (type === 'username') setIsTypingUsername(true);

    debounce(input, 1000, async () => {
      try {
        if (type === 'email') {
          const responseEmail = await checkAdminEmail(input);
          setAvailablityEmail(responseEmail.available);
        }
        if (type === 'username') {
          const responseUsername = await checkAdminUsername(input);
          setAvailablityUsername(responseUsername.available);
        }
      } catch (error) {
        if (type === 'email') setAvailablityEmail(false);
        else if (type === 'username') setAvailablityUsername(false);
      }

      if (type === 'email') setIsTypingEmail(false);
      else if (type === 'username') setIsTypingUsername(false);
    });
  };

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8 text-white max-w-[1700px] mx-auto">
      <div className="mx-auto text-start flex gap-4 items-center">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          {create ? 'Create' : <>{edit ? 'Edit' : 'View'}</>} Admin
        </h2>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ errors, handleChange, values, touched, setFieldValue, setFieldTouched, setFieldError }) => {
          return (
            <Form className="h-full gap-10 space-y-9 w-full md:w-[70%] m-auto">
              <div className="grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-2 mt-12">
                <div className="flex flex-col gap-2 items-end">
                  <div className="w-full relative">
                    <TextInput
                      label="Email"
                      name="email"
                      shrink={true}
                      isError={errors.email && touched.email ? true : false}
                      value={values.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldTouched('email', true);
                        setFieldValue('email', e.target.value.trim());
                        handleInput(e.target.value, 'email');
                      }}
                      disabled={edit !== undefined && !edit}
                      showAdornment={true}
                      adornment={
                        <>
                          {touched.email && isTypingEmail !== null && !isTypingEmail && (
                            <>
                              {availablityEmail ? (
                                <img src={check} className="mr-2 w-5 h-5" />
                              ) : (
                                <img src={close} className="cursor-pointer mr-2 w-5 h-5" />
                              )}
                            </>
                          )}
                        </>
                      }
                      adornmentOnClick={() => {
                        setFieldValue('email', ' ');
                        setFieldError('email', '');
                        setIsTypingEmail(null);
                        setAvailablityEmail(null);
                      }}
                    />
                    {touched.email && (edit || edit === undefined) && (
                      <>
                        {(!errors.email || (typeof errors.email === 'string' && errors.email)) &&
                          values.email !== '' && (
                            <div className={`absolute top-[20px] right-[0px] flex items-center px-4 text-gray-600`}>
                              {isTypingEmail && <CircularProgress size={20} className="-mt-0.5" />}
                            </div>
                          )}
                        {values.email !== '' && isTypingEmail !== null && !isTypingEmail && !availablityEmail && (
                          <div className="flex justify-end mt-2">
                            <div className="text-red-500 text-xs"> {'Email already exists'} </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-end">
                  <div className="w-full relative">
                    <TextInput
                      label="Username"
                      type="username"
                      name="username"
                      shrink={true}
                      isError={errors.username !== '' && touched.username ? true : false}
                      value={values.username}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldTouched('username', true);
                        handleChange(e);
                        handleInput(e.target.value, 'username');
                      }}
                      disabled={edit !== undefined && !edit}
                      showAdornment={true}
                      adornment={
                        <>
                          {touched.username && isTypingUsername !== null && !isTypingUsername && (
                            <>
                              {availablityUsername ? (
                                <img src={check} className="w-5 h-5 mr-2" />
                              ) : (
                                <img
                                  src={close}
                                  onClick={() => {
                                    setFieldValue('username', '');
                                  }}
                                  className="cursor-pointer w-5 h-5 mr-2"
                                />
                              )}
                            </>
                          )}
                        </>
                      }
                    />
                    {touched.username && (edit || edit === undefined) && (
                      <>
                        {(!errors.username || (typeof errors.username === 'string' && errors.username)) &&
                          values.username !== '' && (
                            <div className={`absolute top-[20px] right-[0px] flex items-center px-4 text-gray-600`}>
                              {isTypingUsername && <CircularProgress size={20} className="-mt-0.5" />}
                            </div>
                          )}
                        {touched.username &&
                          values.username !== '' &&
                          isTypingUsername !== null &&
                          !isTypingUsername &&
                          !availablityUsername && (
                            <div className="flex justify-end mt-2">
                              <div className="text-red-500 text-xs"> {'Username already exists'} </div>
                            </div>
                          )}
                      </>
                    )}
                  </div>
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
                      disabled={edit !== undefined && !edit}
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
                      disabled={edit !== undefined && !edit}
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
                      disabled={edit !== undefined && !edit}
                    />
                  </div>
                  <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-xs" />
                </div>

                {edit === undefined && (
                  <div className="flex flex-col gap-2 items-end">
                    <div className="w-full">
                      <TextInput
                        label="Password"
                        type="password"
                        name="password"
                        shrink={true}
                        isError={errors.password !== '' && touched.password ? true : false}
                        value={values.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                        }}
                        disabled={edit !== undefined && !edit}
                      />
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
                  </div>
                )}
              </div>

              {/* ADMIN PERMISSIONS */}
              <div className="flex flex-col">
                <span className={`text-sm mb-1 ${!edit && 'text-[#666666] font-medium'}`}>Admin Permissions</span>
                <ReactSelect
                  formik={formikRef?.current}
                  name="adminPermissions"
                  label="Admin Permissions"
                  options={adminPermissionsList.map((permission) => ({
                    label: permission.name,
                    value: permission._id,
                  }))}
                  isMulti={true}
                  placeholder="Select Admin Permissions..."
                  disabled={!edit}
                  isSearchable={true}
                  onChange={(e) => {
                    formikRef.current.setFieldValue('adminPermissions', e);
                  }}
                />
              </div>

              {(edit || edit === undefined) && (
                <Button className="w-full" loading={isSubmitting} loadingType="circular" buttonType="submit">
                  Submit
                </Button>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
