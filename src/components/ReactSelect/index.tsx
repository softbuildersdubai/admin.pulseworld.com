import React, { useState } from 'react';
import Select from 'react-select';
import { components } from 'react-select';
import { closeWhite } from '../../images/other';

type Props = {
  formik: any;
  label: string;
  options: any;
  stylesObject?: object;
  height?: string;
  name: string;
  className?: string;
  selectContainerClassName?: string;
  isSearchable?: boolean;
  onChange?: any;
  placeholder?: string;
  isAddButton?: boolean;
  isAddButtonText?: string;
  disabled?: boolean;
  placeholderColor?: string;
  isClearable?: boolean;
  clearValueHandler?: () => void;
  isMulti?: boolean;
};
const { ValueContainer, Placeholder, ClearIndicator } = components;

const CustomValueContainer = (props: any) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(props.children, (child) => (child && child.type !== Placeholder ? child : null))}
    </ValueContainer>
  );
};

const ReactSelect = ({
  formik,
  options,
  height = '50.39px',
  name,
  className = '',
  selectContainerClassName = '',
  isSearchable = false,
  onChange = (e: any) => {
    formik.setFieldValue(name, e?.value);
  },
  placeholder,
  disabled = false,
  placeholderColor,
  isClearable,
  clearValueHandler = () => {},
  isMulti = false,
}: Props) => {
  const [focused, setFocused] = useState(false);

  const CustomClearIndicator = (props) => {
    return (
      <ClearIndicator {...props}>
        <div onClick={clearValueHandler} className="cursor-pointer">
          <img src={closeWhite} />
        </div>
      </ClearIndicator>
    );
  };

  return (
    <>
      <div className={`${selectContainerClassName} flex flex-col w-full z-0`}>
        <div className="flex items-center w-full">
          <Select
            className={`w-full ${className}`}
            name={name}
            options={options}
            value={formik?.values[name]}
            isSearchable={isSearchable}
            components={{
              ValueContainer: CustomValueContainer,
              ClearIndicator: CustomClearIndicator,
            }}
            menuPortalTarget={document.body}
            styles={{
              // @ts-ignore
              control: (baseStyles, state) => {
                setFocused(state.isFocused);
                return {
                  ...baseStyles,
                  minHeight: height,
                  backgroundColor: 'transparent',
                  border: state.isFocused
                    ? 'none'
                    : formik?.errors[name] && formik?.touched[name]
                    ? '1px solid #f44336'
                    : '1px solid #666666',
                  '&:hover': {
                    border: !state.isFocused && '1px solid white',
                  },
                  boxShadow: '0px',
                  outline: state.isFocused && '2px #90CAF9 solid',
                };
              },
              menuList: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: '#353535',
              }),
              menuPortal(base) {
                return {
                  ...base,
                  zIndex: 9999,
                };
              },
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isSelected ? 'white' : 'transparent',
                color: state.isSelected ? '#262626' : 'white',
                zIndex: 100,
                '&:hover': {
                  color: '#262626',
                  backgroundColor: 'white',
                },
              }),
              input: (baseStyles) => ({
                ...baseStyles,
                color: 'white',
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: 'white',
              }),
              multiValue: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: '#353535',
              }),
              multiValueLabel: (baseStyles) => ({
                ...baseStyles,
                color: 'white',
              }),
              placeholder: (provided, state) => ({
                ...provided,
                color: disabled ? '#666666' : focused ? '#90CAF9' : 'white',
                backgroundColor:
                  state.hasValue || state.selectProps.inputValue
                    ? placeholderColor
                      ? placeholderColor
                      : 'black'
                    : 'transparent',
                padding: '0px 4px',
                position: 'absolute',
                display: isMulti && state.hasValue ? 'none' : 'block',
                top: state.hasValue || state.selectProps.inputValue ? '-22px' : isSearchable ? '5px' : '0px',
                transition: 'top 0.1s, font-size 0.1s',
                fontSize: (state.hasValue || state.selectProps.inputValue) && '12px',
              }),
              valueContainer: (provided) => ({
                ...provided,
                overflow: 'visible',
              }),
            }}
            onChange={(e: any) => {
              console.log({ e });
              if (isMulti) {
                onChange(e);
              } else if (typeof e?.label === 'string') {
                onChange(e);
              }
            }}
            placeholder={
              placeholder ? placeholder : `Select ${name[0].toUpperCase().concat(name.slice(1, name.length))}...`
            }
            isDisabled={disabled}
            isClearable={isClearable}
            isMulti={isMulti}
          />
        </div>

        {formik?.errors[name] && formik?.touched[name] && (
          <div className="text-errorColor text-xs mt-1">{formik?.errors[name]}</div>
        )}
      </div>
    </>
  );
};

export default ReactSelect;
