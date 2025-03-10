import { RichTextField } from "mui-quill";
import React from "react";

import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";

interface Props {
  value: any;
  onChange: (input) => void;
  label: string;
}
const RichEditor = ({ value, onChange, label }: Props) => {
  return (
    <>
      <label>{label}</label>
      <ReactQuill
        style={{ width: "100%", marginTop: '10px' }}
        value={value}
        onChange={(nextValue: any) => onChange(nextValue)}

        placeholder={undefined}
      />
    </>
  );
};

export default RichEditor;
