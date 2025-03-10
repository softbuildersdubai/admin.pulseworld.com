import { useEffect, useState } from 'react';
import FormikInput from '../FormikInput';
import { VERIFICATION_TYPE } from '../../utils/constance';

type Props = {
  data: any;
  className?: string;
};

type KeyField = {
  value: string;
  label: string;
};

const VerificationNameRow = ({ data, className }: Props) => {
  const [list, setList] = useState<KeyField[]>([]);

  const emailObject = {
    label: 'Email',
    value: 'email',
  };

  useEffect(() => {
    if (data.type === VERIFICATION_TYPE.KYC) {
      setList([
        {
          label: 'First Name',
          value: 'firstName',
        },
        {
          label: 'Last Name',
          value: 'lastName',
        },
        emailObject,
      ]);
    } else if (data.type === VERIFICATION_TYPE.KYB) {
      setList([
        {
          label: 'Company Name',
          value: 'companyName',
        },
        emailObject,
      ]);
    }
  }, []);

  return (
    <div>
      <div className={`grid grid-cols-1 md:grid-cols-3 w-full gap-5 ${className}`}>
        {list.map((item) => {
          return (
            <FormikInput
              label={item.label}
              name={item.value}
              type={'text'}
              placeholder={''}
              onChange={() => {}}
              value={data[item.value]}
              disabled={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VerificationNameRow;
