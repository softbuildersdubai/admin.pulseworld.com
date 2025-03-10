import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import FormikInput from "../../FormikInput";
import Button from "../../Button";
import { useCustomerActions } from "../../../store/customer/customerActions";
import { errorAlert, successAlert } from "../../../utils/alerts";

type Props = {
  onClose: any;
  user?: any;
  bulkMail?: boolean;
  userIds?: Array<string>;
};

const validationSchema = Yup.object().shape({
  subject: Yup.string().required("Subject is required."),
  message: Yup.string().required("Message is required."),
});

const formFields = [
  { key: "subject", label: "Subject", type: "text" },
  { key: "message", label: "Message", type: "textarea" },
];

const MailUser = ({ onClose, user, bulkMail, userIds }: Props) => {
  const [loading, setLoading] = useState(false);
  const { sendUserMail, sendBulkMailToUsers } = useCustomerActions();

  const initialValues: any = {
    subject: "",
    message: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response: any = bulkMail
          ? await sendBulkMailToUsers(userIds, values)
          : await sendUserMail(user?._id, values);
        if (response?.data?.status) {
          successAlert(response?.data?.message);
          onClose();
        } else {
          errorAlert(response?.data?.message);
        }
      } catch (error) {
        console.error(`Error sending Mail to User`, error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="">
      <div className="grid grid-cols-1 gap-x-6 gap-y-6">
        <div className={`grid grid-cols-1 gap-6 rounded-md mt-8`}>
          {formFields.map((field) => (
            <div key={field.key}>
              <FormikInput
                label={field.label}
                name={field.key}
                type={field.type}
                placeholder={`Enter ${field.label}`}
                error={formik.errors[field.key]}
                value={formik.values[field.key]}
                onChange={(e: any) =>
                  formik.setFieldValue(field.key, e.target.value)
                }
                touched={formik.touched[field.key]}
                shrink={true}
                multiline={field.key === "message" ? true : false}
                rows={6}
              />
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4">
          <Button
            className="shadow-none border bg-transparent !py-2 hover:bg-gray-100/20"
            onClick={onClose}
            buttonType="button"
          >
            Close
          </Button>
          <Button
            className="shadow-none border bg-transparent !py-2 hover:bg-gray-100/20"
            onClick={formik.submitForm}
            loading={loading}
          >
            Send
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MailUser;
